function reverseAlphabetKeepNumber(input) {
  const match = input.match(/[0-9]+$/);
  let numberPart = "";
  let letterPart = input;

  if (match) {
    numberPart = match[0];
    letterPart = input.slice(0, -numberPart.length);
  }

  const reversedLetters = letterPart.split("").reverse().join("");

  return reversedLetters + numberPart;
}

const inputString = "NEGIE1";
const result = reverseAlphabetKeepNumber(inputString);
console.log("Hasil =", result);
