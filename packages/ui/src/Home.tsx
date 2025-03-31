export const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 mt-10 bg-black  md:p-8">
      <div className="bg-white shadow-md rounded-2xl p-4 md:p-6 w-full max-w-3xl">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Good Afternoon, User</h1>
        <p className="text-gray-500 mt-2">Your portfolio value</p>

        {/* Portfolio Value Box */}
        <div className="mt-4 p-4 bg-gray-50 border rounded-lg">
          <span className="text-3xl md:text-4xl font-bold text-gray-900">$0.00</span>
        </div>

        {/* Graph Placeholder */}
        <div className="mt-6 h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600">
          [Graph Placeholder]
        </div>

        {/* Actions Buttons */}
        <div className="mt-6 flex flex-wrap justify-center gap-2 md:gap-4">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 text-sm md:text-base">
            Buy
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 text-sm md:text-base">
            Sell
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 text-sm md:text-base">
            Deposit
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 text-sm md:text-base">
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
};