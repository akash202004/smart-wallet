"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useEffect, useState } from "react";
import { TextInput } from "@repo/ui/text-input";
import {
  createOnrampTransaction,
  getOnrampTransactions,
} from "../../actions/createOnrampTransaction";
import { getUserBalance } from "../../actions/userActions"

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

interface Transaction {
  id: number;
  amount: number;
  status: string;
  startTime: string;
}

type OnrampResult = {
  transactions?: Transaction[];
  message?: string;
};

type BalanceResult = {
  amount: number;
};

export const Transfer = () => {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const [amount, setAmount] = useState<number>(0);
  const [provider, setProvider] = useState<string>(
    SUPPORTED_BANKS[0]?.name || ""
  );
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = (await getOnrampTransactions()) as OnrampResult;
      if ("transactions" in res) {
        setTransactions(res.transactions || null);
      }
      const amount = await getUserBalance();
      if ("user" in amount && amount.user) {
        setBalance(amount.user.amount);
      }
      setLoading(false);
    };

    fetchTransactions();
    const interval = setInterval(fetchTransactions, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-20 flex flex-col">
      <div>
        <Card title="Users Balance">
          <div>Balance: ₹{balance / 100}</div>
        </Card>
      </div>

      <div className="mt-4">
        <Card title="Add Money">
          <div className="w-full">
            <TextInput
              label={"Amount"}
              placeholder={"Amount"}
              onChange={(val) => setAmount(parseFloat(val))}
            />
            <div className="py-4 text-left">Bank</div>
            <Select
              onSelect={(value) => {
                const selected = SUPPORTED_BANKS.find((x) => x.name === value);
                setRedirectUrl(selected?.redirectUrl || "");
                setProvider(selected?.name || "");
              }}
              options={SUPPORTED_BANKS.map((x) => ({
                key: x.name,
                value: x.name,
              }))}
            />
            <div className="flex justify-center pt-4">
              <Button
                onClick={async () => {
                  try {
                    await createOnrampTransaction({
                      amount,
                      provider,
                    });
                    window.location.href = redirectUrl || "";
                  } catch (err) {
                    console.error("Failed to create transaction:", err);
                  }
                }}
              >
                Add Money
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-4">
        <Card title="Recent Transactions">
          {loading ? (
            <div>Loading...</div>
          ) : transactions && transactions.length > 0 ? (
            <div className="space-y-4">
              {transactions.map((x) => (
                <div key={x.id} className="border-b pb-2">
                  <div>Amount: ₹{x.amount / 100}</div>
                  <div>Status: {x.status}</div>
                  <div>Time: {new Date(x.startTime).toLocaleString()}</div>
                </div>
              ))}
            </div>
          ) : (
            <div>No transactions found</div>
          )}
        </Card>
      </div>
    </div>
  );
};
