function countOccurrences(input, query) {
  const frequency = {};

  input.forEach((word) => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  const result = query.map((word) => {
    return frequency[word] || 0;
  });

  return result;
}

// Contoh array INPUT dan QUERY
const INPUT = ["xc", "dz", "bbb", "dz"];
const QUERY = ["bbb", "ac", "dz"];

// Menjalankan fungsi dan mencetak hasilnya
const output = countOccurrences(INPUT, QUERY);
console.log("OUTPUT =", output);
