import { HistoryIcon, Home, Send } from "lucide-react";

export const Sidebar = ({
  activePage,
  setActivePages,
}: {
  activePage: string;
  setActivePages: (page: string) => void;
}) => {
  return (
    <div className="fixed md:relative z-40 h-full w-64 bg-black text-white py-8 px-4 border-r transform -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out">
      <ul className="space-y-6">
        <li>
          <button
            onClick={() => setActivePages("home")}
            className={`flex items-center gap-2 w-full px-4 py-2 rounded-md ${
              activePage === "home" ? "bg-gray-600 text-white" : "hover:text-gray-200"
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
              activePage === "transfer" ? "bg-gray-700 text-white" : "hover:text-gray-200"
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
              activePage === "transaction" ? "bg-gray-700 text-white" : "hover:text-gray-200"
            }`}
          >
            <HistoryIcon size={24} />
            <span>Transaction</span>
          </button>
        </li>
      </ul>
    </div>
  );
};