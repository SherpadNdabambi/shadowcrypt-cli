import { padPKCS7 } from "../assets/ts/encrypt";

describe("padPKCS7", () => {
  const blockSize = 8;

  test("pads empty buffer with full block of 8 bytes", () => {
    const input = Buffer.alloc(0);
    const padded = padPKCS7(input, blockSize);
    expect(padded.length).toBe(8);
    for (let i = 0; i < 8; i++) {
      expect(padded[i]).toBe(8);
    }
  });

  test("pads multiple of block size with full block", () => {
    const input = Buffer.from("abcdefgh"); // 8 bytes
    const padded = padPKCS7(input, blockSize);
    expect(padded.length).toBe(16);
    expect(padded.slice(0, 8)).toEqual(input);
    for (let i = 8; i < 16; i++) {
      expect(padded[i]).toBe(8);
    }
  });

  test("pads with 1 byte", () => {
    const input = Buffer.from("abcdefg"); // 7 bytes
    const padded = padPKCS7(input, blockSize);
    expect(padded.length).toBe(8);
    expect(padded.slice(0, 7)).toEqual(input);
    expect(padded[7]).toBe(1);
  });

  test("pads with 4 bytes", () => {
    const input = Buffer.from("abcd"); // 4 bytes
    const padded = padPKCS7(input, blockSize);
    expect(padded.length).toBe(8);
    expect(padded.slice(0, 4)).toEqual(input);
    for (let i = 4; i < 8; i++) {
      expect(padded[i]).toBe(4);
    }
  });
});
