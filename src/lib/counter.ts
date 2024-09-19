export class Counter {
  private count: number;

  private displayElement: HTMLElement;

  private incrementButton: HTMLButtonElement;

  private decrementButton: HTMLButtonElement;

  public constructor(
    displayElement: HTMLElement,
    incrementButton: HTMLButtonElement,
    decrementButton: HTMLButtonElement
  ) {
    this.count = 0;
    this.displayElement = displayElement;
    this.incrementButton = incrementButton;
    this.decrementButton = decrementButton;
  }

  // 副作用を持つ処理をコンストラクタから外へ
  public init() {
    this.incrementButton.addEventListener("click", () => this.increment());
    this.decrementButton.addEventListener("click", () => this.decrement());
    this.updateDisplay();
  }

  private increment() {
    this.count += 1;
    this.updateDisplay();
  }

  private decrement() {
    this.count -= 1;
    this.updateDisplay();
  }

  private updateDisplay() {
    this.displayElement.textContent = this.count.toString();
  }
}
