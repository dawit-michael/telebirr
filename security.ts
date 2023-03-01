import crypto from "crypto";
import NodeRSA from "node-rsa";
import { ITelebirrPaymentResult, ITelebirrRequest } from "./types";

// ENCRYPTION
const encryptPublic = (param: {
  rawData: ITelebirrRequest;
  publicKey: string;
}) => {
  const dataString = JSON.stringify(param.rawData);
  const keyData = `-----BEGIN PUBLIC KEY-----\n${param.publicKey}\n-----END PUBLIC KEY-----`;
  const rsaKey = new NodeRSA(keyData, "public", {
    encryptionScheme: "pkcs1",
  });
  const data = Buffer.from(dataString);
  return rsaKey.encrypt(data, "base64", "utf8");
};

const decryptPublic = (param: { dataToDecrypt: string; publicKey: string }) => {
  const keyData = `-----BEGIN PUBLIC KEY-----\n${param.publicKey}\n-----END PUBLIC KEY-----`;
  const rsaKey = new NodeRSA(keyData, "public", {
    encryptionScheme: "pkcs1",
  });
  const decryptedData = rsaKey.decryptPublic(param.dataToDecrypt, "utf8");
  return JSON.parse(decryptedData) as ITelebirrPaymentResult;
};

const signData = (param: { rawData: ITelebirrRequest; appKey: string }) => {
  param.rawData.appKey = param.appKey;
  const len = Object.keys(param.rawData).length;
  const signString = (
    Object.keys(param.rawData) as Array<keyof typeof param.rawData>
  )
    .sort()
    .reduce((acc, key, index) => {
      const isLast = index === len - 1;
      const value = param.rawData[key];
      return acc + `${key}=${value}${isLast ? "" : "&"}`;
    }, "");

  return crypto.createHash("sha256").update(signString).digest("hex");
};

export const TBSecurity = {
  encryptPublic,
  decryptPublic,
  signData,
};
