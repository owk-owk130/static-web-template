import { Counter } from "~/lib/counter";

window.addEventListener("DOMContentLoaded", () => {
  const displayElement = document.getElementById("countDisplay")!;
  const incrementButton = document.getElementById("incrementButton") as HTMLButtonElement;
  const decrementButton = document.getElementById("decrementButton") as HTMLButtonElement;

  const counter = new Counter(displayElement, incrementButton, decrementButton);
  counter.init();
});
