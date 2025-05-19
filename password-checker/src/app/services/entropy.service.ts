import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EntropyService {
  constructor() {}

  calculatePasswordEntropy(password: string): number {
    const entropyPerSymbol = {
      numerals: 3.322, // Arabic numerals (0-9)
      hexadecimal: 4.0, // Hexadecimal numerals (0-9, A-F)
      caseInsensitiveAlphabet: 4.7, // Case insensitive Latin alphabet (a-z or A-Z)
      caseInsensitiveAlphanumeric: 5.17, // Case insensitive alphanumeric (a-z, A-Z, 0-9)
      caseSensitiveAlphabet: 5.7, // Case sensitive Latin alphabet (a-z, A-Z)
      caseSensitiveAlphanumeric: 5.954, // Case sensitive alphanumeric (a-z, A-Z, 0-9)
      asciiPrintable: 6.555, // All ASCII printable characters except space
      extendedAscii: 7.768, // All extended ASCII printable characters
      binary: 8.0, // Binary (0-255 or 8 bits or 1 byte)
    };

    const symbolMatchers = [
      { regex: /^[0-9]+$/, entropy: entropyPerSymbol.numerals },
      { regex: /^[0-9A-Fa-f]+$/, entropy: entropyPerSymbol.hexadecimal },
      {
        regex: /^[a-zA-Z]+$/,
        entropy: entropyPerSymbol.caseInsensitiveAlphabet,
      },
      {
        regex: /^[a-zA-Z0-9]+$/,
        entropy: entropyPerSymbol.caseInsensitiveAlphanumeric,
      },
      {
        regex: /(?=.*[a-z])(?=.*[A-Z])^[a-zA-Z]+$/,
        entropy: entropyPerSymbol.caseSensitiveAlphabet,
      },
      {
        regex: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])^[a-zA-Z0-9]+$/,
        entropy: entropyPerSymbol.caseSensitiveAlphanumeric,
      },
      { regex: /^[ -~]+$/, entropy: entropyPerSymbol.asciiPrintable }, // Printable ASCII
      { regex: /^[\x20-\xFF]+$/, entropy: entropyPerSymbol.extendedAscii }, // Extended ASCII
    ];

    // Find the first matching symbol set
    const matchingSet = symbolMatchers.find((set) => set.regex.test(password));
    // Determine the character set size based on the unique characters in the password
    const uniqueChars = new Set(password.split(''));
    const uniqueCharCount = uniqueChars.size;
    // If no match is found, assume binary (ASCII character set) entropy
    const entropyValue = matchingSet
      ? matchingSet.entropy
      : entropyPerSymbol.binary;

    // Calculate the entropy using the formula H = log₂(N) * L, where N is the number of unique characters
    const baseEntropy = Math.log2(uniqueCharCount) * password.length;
    return baseEntropy;
  }
}
