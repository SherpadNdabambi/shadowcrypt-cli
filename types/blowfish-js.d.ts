declare module "blowfish-js" {
  // The default export (the blf object)
  const blf: {
    // key(key: Buffer): Context (opaque type for the cipher state)
    key: (key: Buffer) => BlowfishContext;
    // ecb(context: Context, data: Buffer, decrypt: boolean): Buffer
    ecb: (context: BlowfishContext, data: Buffer, decrypt: boolean) => Buffer;
  };

  // Opaque type for the internal context (you don't interact with its shape)
  type BlowfishContext = object;

  export default blf;
}
