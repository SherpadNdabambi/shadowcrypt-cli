import blf from "blowfish-js";
import { encryptWithBlowfish } from "../assets/ts/encrypt";

describe("encryptWithBlowfish", () => {
  const keyBuffer = Buffer.from("secretkey", "utf8");
  const context = blf.key(keyBuffer);

  test("encrypts data without padding (multiple of block size)", () => {
    const plaintext = Buffer.from("abcdefgh"); // 8 bytes
    const encrypted = encryptWithBlowfish(keyBuffer, false, plaintext);
    expect(encrypted.length).toBe(8);
    // Verify by decrypting
    const decrypted = blf.ecb(context, encrypted, true);
    expect(decrypted).toEqual(plaintext);
  });

  test("encrypts data with padding", () => {
    const plaintext = Buffer.from("hi"); // 2 bytes
    const mockLog = jest.spyOn(console, "log").mockImplementation();
    const encrypted = encryptWithBlowfish(keyBuffer, true, plaintext);
    expect(encrypted.length).toBe(8);
    expect(mockLog).toHaveBeenCalledWith("Padded 6 bytes.");
    mockLog.mockRestore();
    // Verify by decrypting and unpaddding manually
    const decrypted = blf.ecb(context, encrypted, true);
    // Check last byte for pad len
    const padLen = decrypted[decrypted.length - 1];
    expect(padLen).toBe(6);
    const unpadded = decrypted.slice(0, -padLen);
    expect(unpadded).toEqual(plaintext);
  });

  test("throws RangeError if input not multiple of block size without padding", () => {
    const plaintext = Buffer.from("hi");
    expect(() => encryptWithBlowfish(keyBuffer, false, plaintext)).toThrow(
      RangeError
    );
  });
});
