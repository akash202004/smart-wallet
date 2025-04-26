import { useState } from "react";
import { HistoryIcon, Home, Send, Menu, X, Shuffle } from "lucide-react";

export const Sidebar = ({ activePage, setActivePages }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        className="md:hidden fixed top-20 right-4 z-50 bg-black text-white p-2 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed h-full w-64 bg-black text-white py-24 px-4 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block border-r`}
      >
        <ul className="space-y-6">
          <li>
            <button
              onClick={() => setActivePages("home")}
              className={`flex items-center gap-2 w-full px-4 py-2 rounded-md ${
                activePage === "home"
                  ? "bg-gray-600 text-white"
                  : "hover:text-gray-200"
              }`}
            >
              <Home size={24} />
              <span>Home</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActivePages("transfer")}
              className={`flex items-center gap-2 w-full px-4 py-2 rounded-md ${
                activePage === "transfer"
                  ? "bg-gray-700 text-white"
                  : "hover:text-gray-200"
              }`}
            >
              <Send size={24} />
              <span>Transfer</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActivePages("transaction")}
              className={`flex items-center gap-2 w-full px-4 py-2 rounded-md ${
                activePage === "transaction"
                  ? "bg-gray-700 text-white"
                  : "hover:text-gray-200"
              }`}
            >
              <HistoryIcon size={24} />
              <span>Transaction</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActivePages("p2ptransfer")}
              className={`flex items-center gap-2 w-full px-4 py-2 rounded-md ${
                activePage === "p2ptransfer"
                  ? "bg-gray-700 text-white"
                  : "hover:text-gray-200"
              }`}
            >
              <Shuffle size={24} />
              <span>p2p</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};
