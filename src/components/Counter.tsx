import { useCounter } from "~/hooks/useCounter";

export const Counter = () => {
  const { count, increment, decrement } = useCounter();

  return (
    <div>
      <div>{count}</div>
      <button type="button" onClick={increment}>
        Increment
      </button>
      <button type="button" onClick={decrement}>
        Decrement
      </button>
    </div>
  );
};
