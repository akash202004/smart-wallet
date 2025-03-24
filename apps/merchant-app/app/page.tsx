"use client";

<<<<<<< HEAD
// import { useBalance } from "@repo/store/balance";

export default function () {
  // const balance = useBalance();
  return (
    <div>
      <h1>fsdfasd</h1>
      {/* hi there {balance} */}
    </div>
  );
}
=======
import { useBalance } from "@repo/store/balance";

export default function() {
  const balance = useBalance();
  return <div>
    hi there {balance}
  </div>
}
>>>>>>> fffa302 (re-intilizing the repo)
