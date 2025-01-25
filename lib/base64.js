import { Buffer } from 'buffer';

export const fromBase64 = (value) => {
  const buff = Buffer.from(value, "base64");
  return buff.toString("ascii");
};