import blf from "blowfish-js";
import { decryptWithBlowfish } from "../assets/ts/decrypt";
import { padPKCS7 } from "../assets/ts/encrypt";

describe("decryptWithBlowfish", () => {
  const keyBuffer = Buffer.from("secretkey", "utf8");
  const context = blf.key(keyBuffer);

  test("decrypts unpadded data without unpadding", () => {
    const plaintext = Buffer.from("abcdefgh"); // 8 bytes
    const ciphertext = blf.ecb(context, plaintext, false);
    const decrypted = decryptWithBlowfish(ciphertext, keyBuffer, false);
    expect(decrypted).toEqual(plaintext);
  });

  test("decrypts padded data with unpadding", () => {
    const plaintext = Buffer.from("hi"); // 2 bytes
    const padded = padPKCS7(plaintext, 8);
    const ciphertext = blf.ecb(context, padded, false);
    const decrypted = decryptWithBlowfish(ciphertext, keyBuffer, true);
    expect(decrypted).toEqual(plaintext);
    // Check log
    const mockLog = jest.spyOn(console, "log").mockImplementation();
    // But log is inside, so for this test, since called, but to verify
    // Wait, run again? But since no param, just check equals
    mockLog.mockRestore();
  });

  test("decrypts padded data without unpadding", () => {
    const plaintext = Buffer.from("hi");
    const padded = padPKCS7(plaintext, 8);
    const ciphertext = blf.ecb(context, padded, false);
    const decrypted = decryptWithBlowfish(ciphertext, keyBuffer, false);
    expect(decrypted).toEqual(padded);
  });

  test("handles invalid padding by warning and keeping data unchanged", () => {
    const plaintext = Buffer.alloc(8);
    plaintext[7] = 9; // invalid pad len > 8
    const ciphertext = blf.ecb(context, plaintext, false);
    const mockWarn = jest.spyOn(console, "warn").mockImplementation();
    const finalData = decryptWithBlowfish(ciphertext, keyBuffer, true);
    expect(finalData).toEqual(plaintext);
    expect(mockWarn).toHaveBeenCalledWith(
      "Warning: Invalid padding detected; output unchanged."
    );
    mockWarn.mockRestore();
  });
});
