import blf from "blowfish-js";
import { encryptFile } from "../assets/ts/encrypt";
import fs from "fs";

jest.mock("fs");

describe("encryptFile", () => {
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

  const defaultOptions = {
    input: "/path/to/input.txt",
    key: "secretkey",
    algo: "blowfish",
    pad: true,
  };

  beforeEach(() => {
    mockReadFileSync.mockReturnValue(Buffer.from("test data"));
    mockWriteFileSync.mockImplementation();
    mockExistsSync.mockReturnValue(true);
    mockStatSync.mockReturnValue({ isFile: () => true } as unknown as fs.Stats);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("encrypts file successfully with padding", () => {
    // Prepare a valid Blowfish-encrypted buffer? Wait, no, for encrypt, mock plaintext
    const keyBuffer = Buffer.from("secretkey", "utf8");
    const context = blf.key(keyBuffer);
    const plaintext = Buffer.from("test data"); // 9 bytes
    // But since mock, but to verify length after encrypt with pad
    // But since we mock fs, but the function calls encryptWithBlowfish which uses blf
    // Wait, but to test the output length, but since blf is real, it will encrypt the mock plaintext
    mockReadFileSync.mockReturnValue(plaintext);
    const options = { ...defaultOptions, output: "/path/to/output.enc" };
    expect(() => encryptFile(options)).not.toThrow();
    expect(mockWriteFileSync).toHaveBeenCalledWith(
      "/path/to/output.enc",
      expect.any(Buffer)
    );
    expect(mockConsoleLog).toHaveBeenCalledWith(
      "Encrypted file: /path/to/output.enc (16 bytes)"
    ); // 9 bytes input pads to 16
  });

  test("uses default output path", () => {
    const options = { ...defaultOptions };
    expect(() => encryptFile(options)).not.toThrow();
    expect(mockWriteFileSync).toHaveBeenCalledWith(
      "/path/to/input.txt.encrypted",
      expect.any(Buffer)
    );
  });

  test("handles file not found", () => {
    mockExistsSync.mockReturnValue(false);
    expect(() => encryptFile(defaultOptions)).toThrow("process.exit called");
    expect(mockConsoleError).toHaveBeenCalledWith(
      "Error: Input file '/path/to/input.txt' not found."
    );
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  test("handles non-file input", () => {
    mockExistsSync.mockReturnValue(true);
    mockStatSync.mockReturnValue({
      isFile: () => false,
    } as unknown as fs.Stats);
    expect(() => encryptFile(defaultOptions)).toThrow("process.exit called");
    expect(mockConsoleError).toHaveBeenCalledWith(
      "Error: Input file '/path/to/input.txt' not found."
    );
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  test("validates input length without padding", () => {
    const options = { ...defaultOptions, pad: false };
    mockReadFileSync.mockReturnValue(Buffer.from("test")); // 4 bytes, not multiple
    expect(() => encryptFile(options)).toThrow("process.exit called");
    expect(mockConsoleError).toHaveBeenCalledWith(
      "Error: Input must be a multiple of 8 bytes (for blowfish) when no padding is applied. Got 4."
    );
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  test("handles unsupported algorithm", () => {
    const options = { ...defaultOptions, algo: "aes" };
    expect(() => encryptFile(options)).toThrow("process.exit called");
    expect(mockConsoleError).toHaveBeenCalledWith(
      "Error: Unsupported algorithm 'aes'. Only 'blowfish' is available."
    );
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
