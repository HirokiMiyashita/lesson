export default class Hello {
    message: string
  // messegeの値を初期化↓
    constructor(message: string) {
    this.message = message
}
public sayHello(elem: HTMLElement | null): void {
    if (elem) {
        elem.innerHTML = this.message
        }
    }
}
