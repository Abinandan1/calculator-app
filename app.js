import { keys } from "./utils/keys.js";
const values = keys.map(({ id, key }) => key.toString());

const keypad = document.querySelector(".keypad");
const inputs = document.querySelectorAll("input[type='radio']");
const output = document.querySelector(".output input");
const aside = document.querySelector("aside");

inputs.forEach((input) => {
  input.addEventListener("click", () => {
    inputs.forEach((input) => {
      document.body.classList.remove(`theme-${input.id}`);
    });
    document.body.classList.add(`theme-${input.id}`);
  });
});
keypad.innerHTML = keys
  .map(({ id, key }) => {
    return `<button class="key">${key}</button>`;
  })
  .join("");

keypad.addEventListener("click", (e) => {
  let value = e.target.textContent;
  if (value === "x") value = "*";
  const otherOps = ["DEL", "RESET", "="];
  // DISPLAY THE VALUE IN OUTPUT SCREEN
  if (e.target.classList.contains("key") && !otherOps.includes(value)) {
    const keyValue = value;
    output.value += keyValue;
  }
  // EVALUATE WHEN = is CLICKED
  if (value === "=") {
    try {
      output.value = math.evaluate(output.value) ?? output.value;
    } catch (error) {
      // NOTIFY THE ERROR LIKE REACT TOASTIFY
      aside.classList.add("notify");
      setTimeout(() => {
        aside.classList.remove("notify");
      }, 3000);
      const message = aside.querySelector(".message p");
      message.textContent = error.message;
    }
  }
  // RESET TO '' WHEN RESET IS CLICKED
  if (value === "RESET") {
    output.value = "";
  }
  // DELETE SINGLE CHAR FROM THE END WHEN DEL IS CLICKED
  if (value === "DEL") {
    output.value = output.value.substring(0, output.value.length - 1);
  }
});
