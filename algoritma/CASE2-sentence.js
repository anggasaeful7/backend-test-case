function longest(sentence) {
  const words = sentence.split(" ");

  let longestWord = "";

  words.forEach((word) => {
    if (word.length > longestWord.length) {
      longestWord = word;
    }
  });

  return `${longestWord}: ${longestWord.length} character`;
}

const sentence = "Saya sangat senang mengerjakannya soal algoritma";
console.log(longest(sentence));
