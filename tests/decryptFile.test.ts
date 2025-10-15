import blf from "blowfish-js";
import { decryptFile } from "../assets/ts/decrypt";
import fs from "fs";
import { NonSharedBuffer } from "node:buffer";
import { padPKCS7 } from "../assets/ts/encrypt";

jest.mock("fs");

describe("decryptFile", () => {
  const mockFs = fs as jest.Mocked<typeof fs>;
  const mockReadFileSync = mockFs.readFileSync;
  const mockWriteFileSync = mockFs.writeFileSync;
  const mockExistsSync = mockFs.existsSync;
  const mockStatSync = mockFs.statSync;
  const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {
    throw new Error("process.exit called");
  });
  const mockConsoleError = jest.spyOn(console, "error").mockImplementation();
  const mockConsoleLog = jest.spyOn(console, "log").mockImplementation();
  const mockConsoleWarn = jest.spyOn(console, "warn").mockImplementation();

  const defaultOptions = {
    input: "/path/to/input.enc",
    key: "secretkey",
    algo: "blowfish",
    unpad: true,
  };

  beforeEach(() => {
    mockReadFileSync.mockImplementation(() => Buffer.alloc(8));
    mockWriteFileSync.mockImplementation();
    mockExistsSync.mockReturnValue(true);
    mockStatSync.mockReturnValue({ isFile: () => true } as unknown as fs.Stats);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("decrypts file successfully with unpadding", () => {
    // Prepare a valid Blowfish-encrypted buffer
    const keyBuffer = Buffer.from("secretkey", "utf8"),
      context = blf.key(keyBuffer),
      innerPlain = Buffer.from("hi"),
      padded = padPKCS7(innerPlain, 8),
      ciphertext = blf.ecb(context, padded, false);

    // Mock the file read to return the ciphertext
    mockReadFileSync.mockImplementation(() => ciphertext as NonSharedBuffer);

    // Run decryption
    const options = { ...defaultOptions, output: "/path/to/output.txt" };

    expect(() => decryptFile(options)).not.toThrow();

    expect(mockWriteFileSync).toHaveBeenCalledWith(
      "/path/to/output.txt",
      expect.any(Buffer)
    );

    expect(mockConsoleLog).lastCalledWith(
      "Decrypted file: /path/to/output.txt (2 bytes)"
    ); // adjust based on unpad
  });

  test("uses default output path", () => {
    const options = { ...defaultOptions };
    expect(() => decryptFile(options)).not.toThrow();
    expect(mockWriteFileSync).toHaveBeenCalledWith(
      "/path/to/input.enc.decrypted",
      expect.any(Buffer)
    );
  });

  test("handles file not found", () => {
    mockExistsSync.mockReturnValue(false);
    expect(() => decryptFile(defaultOptions)).toThrow("process.exit called");
    expect(mockConsoleError).toHaveBeenCalledWith(
      "Error: Input file '/path/to/input.enc' not found."
    );
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  test("handles non-file input", () => {
    mockExistsSync.mockReturnValue(true);
    mockStatSync.mockReturnValue({
      isFile: jest.fn(() => false),
    } as unknown as fs.Stats);
    expect(() => decryptFile(defaultOptions)).toThrow("process.exit called");
    expect(mockConsoleError).toHaveBeenCalledWith(
      "Error: Input file '/path/to/input.enc' not found."
    );
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  test("validates input length", () => {
    mockReadFileSync.mockImplementation(() => Buffer.from("short")); // 5 bytes
    expect(() => decryptFile(defaultOptions)).toThrow("process.exit called");
    expect(mockConsoleError).toHaveBeenCalledWith(
      "Error: Input must be a multiple of 8 bytes (for blowfish). Got 5."
    );
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  test("handles unsupported algorithm", () => {
    const options = { ...defaultOptions, algo: "aes" };
    expect(() => decryptFile(options)).toThrow("process.exit called");
    expect(mockConsoleError).toHaveBeenCalledWith(
      "Error: Unsupported algorithm 'aes'. Only 'blowfish' is available."
    );
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
