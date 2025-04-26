"use client";

import { useEffect, useState } from "react";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/text-input";
import { fetchP2P, getP2P } from "../../actions/p2p";

export const P2P = () => {
  const [amount, setAmount] = useState<number>(0);
  const [toUser, setToUser] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  interface Transaction {
    id: number;
    amount: number;
    timestamp: Date;
    fromUserId: number;
    toUserId: number;
  }
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);

  const handleTransfer = async () => {
    if (amount <= 0 || !toUser) {
      alert("Please enter both amount and receiver number.");
      return;
    }
    try {
      setLoading(true);
      const response = await getP2P({ amount, to: toUser });
      setLoading(false);
      console.log(response);
      alert(response?.message);
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("Error transferring funds.");
    }
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetchP2P();
        if (response?.data) {
          setTransactions(response?.data);
        } else {
          setTransactions([]);
        }
      } catch (error) {
        console.log(error);
        alert("Error fetching transactions.");
        return;
      }
    };
  
    fetchTransactions();
  }, []);
  

  return (
    <div className="mt-20 flex flex-col">
      <Card title="p2p Transfer">
        <TextInput
          label={"Amount"}
          placeholder={"Amount"}
          onChange={(val) => setAmount(parseFloat(val))}
        />

        <TextInput
          label={"Receiver Number"}
          placeholder={"Receiver"}
          onChange={(val) => setToUser(val)}
        />

        <div className="flex justify-center pt-4">
          <Button onClick={handleTransfer} disabled={loading}>
            {loading ? (
              <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
            ) : (
              "Transfer"
            )}
          </Button>
        </div>
      </Card>
      <div className="mt-4">
  <Card title="Recent Transactions">
    {loading ? (
      <div>Loading...</div>
    ) : transactions && transactions.length > 0 ? (
      <div className="space-y-4">
        {transactions.map((x) => (
          <div key={x.id} className="border-b pb-2">
            <div>Amount: ₹{x.amount}</div>
            <div>From: User #{x.fromUserId}</div>
            <div>To: User #{x.toUserId}</div>
            <div>Time: {new Date(x.timestamp).toLocaleString()}</div>
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
