import { useState } from "react";

function Counter() {
  const [counter, changeCounter] = useState(0);
  return (
    <div>
      <h2 className="text-3xl font-bold">Counter: {counter}</h2>
      <div className="flex justify-center gap-2 mt-2">
        <button
          className="border px-2"
          onClick={() => changeCounter(counter - 10)}
        >
          -
        </button>
        <button
          className="border px-2"
          onClick={() => changeCounter(counter + 1000)}
        >
          +
        </button>
        <button className="border px-2" onClick={() => changeCounter(0)}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Counter;
