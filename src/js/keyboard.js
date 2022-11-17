export class Keyboard {
  #swichEl;
  #fontSelectEl;
  #containerEl;
  #keyboardEl;
  #inputGroupEl;
  #inputEl;
  //예외처리
  #keyPress = false;
  #MouseDown = false;
  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#containerEl = document.getElementById("container");
    this.#swichEl = this.#containerEl.querySelector("#switch");
    this.#fontSelectEl = this.#containerEl.querySelector("#font");
    this.#keyboardEl = this.#containerEl.querySelector("#keyboard");
    this.#inputGroupEl = this.#containerEl.querySelector("#input-group");
    this.#inputEl = this.#inputGroupEl.querySelector("#input");
  }

  #addEvent() {
    this.#swichEl.addEventListener("change", this.#onChangeTheme);
    this.#fontSelectEl.addEventListener("change", this.#onChangeFont);
    document.addEventListener("keydown", this.#onKeyDown.bind(this));
    document.addEventListener("keyup", this.#onKeyUp.bind(this));
    this.#inputEl.addEventListener("input", this.#onInput);
    this.#keyboardEl.addEventListener(
      "mousedown",
      this.#onMouseDown.bind(this)
    );
    document.addEventListener("mouseup", this.#onMouseUp.bind(this));
  }

  #onMouseUp(event) {
    //키보드를 누를 때 마우스가 동작하지 않도록 해주고
    //mouseUp상태니까 this.#MouseDown = false;로 .
    if (this.#keyPress) return;
    this.#MouseDown = false;
    const KeyEl = event.target.closest("div.key");

    const isActive = !!KeyEl?.classList.contains("active");

    const val = KeyEl?.dataset.val;

    if (isActive && !!val && val !== "Space" && val !== "Backspace") {
      this.#inputEl.value += val;
    }

    if (isActive && val === "Space") {
      this.#inputEl.value += " ";
    }

    if (isActive && val === "Backspace") {
      this.#inputEl.value = this.#inputEl.value.slice(0, -1);
    }

    this.#keyboardEl.querySelector(".active")?.classList.remove("active");
  }

  #onMouseDown(event) {
    //키보드를 입력하고 있을 때 마우스핸들러는 작동하지 않아야 한다.
    //아예 메소드 자체가 실행이 안되고 밑에 있는 코드들에 접근하지 못하게 막는다.
    if (this.#keyPress) return;
    this.#MouseDown = true;
    event.target.closest("div.key")?.classList.add("active");
  }

  #onInput(event) {
    event.target.value = event.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, "");
  }

  #onKeyDown(event) {
    //#MouseDown 상태면 키보드 이벤트핸들러는 동작할 수 없게해라
    if (this.#MouseDown) return;
    //onKeyDown한 상태니까 keyPress가 true인 상태.
    this.#keyPress = true;

    this.#inputGroupEl.classList.toggle(
      "error",
      /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(event.key)
    );

    this.#keyboardEl
      .querySelector(`[data-code=${event.code}]`)
      ?.classList.add("active");
  }

  #onKeyUp(event) {
    //#MouseDown 상태면 키보드 이벤트핸들러는 동작할 수 없게해라
    if (this.#MouseDown) return;
    //onKeyUp을 하면 키보드가 눌려진 상태가 아니니까 false.
    this.#keyPress = false;

    this.#keyboardEl
      .querySelector(`[data-code=${event.code}]`)
      ?.classList.remove("active");
  }

  #onChangeTheme(event) {
    document.documentElement.setAttribute(
      "theme",
      event.target.checked ? "dark-mode" : ""
    );
    console.log(event.target.checked);
  }

  #onChangeFont(event) {
    document.body.style.fontFamily = event.target.value;
  }
}
