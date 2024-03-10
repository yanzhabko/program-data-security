const fs = require("fs");
const readline = require("readline");

// Функція для шифрування тексту шифром Цезаря
function encryptCaesar(text, shift) {
  return text
    .split("")
    .map((char) => {
      if (char.match(/[a-zA-Z]/)) {
        const code = char.charCodeAt(0);
        const shiftAmount = code <= 90 ? 65 : 97;
        return String.fromCharCode(
          ((code - shiftAmount + shift) % 26) + shiftAmount
        );
      }
      return char;
    })
    .join("");
}

// Функція для розшифрування тексту шифром Цезаря
function decryptCaesar(text, shift) {
  return encryptCaesar(text, (26 - shift) % 26);
}

// Функція для частотного аналізу
function frequencyAnalysis(text) {
  const frequency = {};
  const totalChars = text.length;

  for (let char of text) {
    if (char.match(/[a-zA-Z]/)) {
      if (frequency[char]) {
        frequency[char]++;
      } else {
        frequency[char] = 1;
      }
    }
  }

  for (let char in frequency) {
    frequency[char] = (frequency[char] / totalChars) * 100;
  }

  return frequency;
}

// Функція для зчитування файлу
function readFile(filename) {
  return fs.readFileSync(filename, "utf8");
}

// Функція для запису у файл
function writeFile(filename, data) {
  fs.writeFileSync(filename, data);
}

// Функція для вводу з клавіатури
async function input(prompt) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer);
    })
  );
}

// Основна функція
async function main() {
  const inputFile = "C:\\Users\\Yan\\Documents\\security\\Ceaser\\input.txt";
  const encryptedFile =
    "C:\\Users\\Yan\\Documents\\security\\Ceaser\\encrypted.txt";
  const decryptedFile =
    "C:\\Users\\Yan\\Documents\\security\\Ceaser\\decrypted.txt";

  // Вводимо зміщення для шифрування
  const shift = parseInt(await input("Enter the shift for Caesar cipher: "));

  // Шифруємо текст і записуємо його у файл
  const plaintext = readFile(inputFile);
  const encryptedText = encryptCaesar(plaintext, shift);
  writeFile(encryptedFile, encryptedText);

  console.log("Text encrypted and written to", encryptedFile);

  // Розшифровуємо текст і виводимо його на екран
  const decryptedText = decryptCaesar(encryptedText, shift);
  writeFile(decryptedFile, decryptedText);

  console.log("Decrypted text:\n", decryptedText);

  // Проводимо частотний аналіз зашифрованого тексту
  const encryptedTextFrequency = frequencyAnalysis(encryptedText);
  console.log(
    "Frequency analysis of encrypted text:\n",
    encryptedTextFrequency
  );
}

main().catch(console.error);
