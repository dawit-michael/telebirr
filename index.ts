import axios from "axios";
import { TBSecurity } from "./security";
import { ITelebirrPaymentResult, ITelebirrRequest, ITelebirrResponse } from "./types";

export class Telebirr {
  private request: ITelebirrRequest;
  private publicKey: string;
  private paymentUrl: string;
  constructor(arg: {
    request: ITelebirrRequest;
    publicKey: string;
    paymentUrl: string;
  }) {
    this.request = arg.request;
    this.publicKey = arg.publicKey;
    this.paymentUrl = arg.paymentUrl;
  }

  async generatePaymentUrl(): Promise<ITelebirrResponse> {
    const sign = TBSecurity.signData({
      rawData: this.request,
      appKey: this.request.appKey,
    });
    const ussd = TBSecurity.encryptPublic({
      rawData: this.request,
      publicKey: this.publicKey,
    });
    const data = JSON.stringify({ appid: this.request.appId, sign, ussd });
    const response = await axios.post<any>(`${this.paymentUrl}`, data, {
      headers: { "Content-Type": "application/json" },
    });
    const result: ITelebirrResponse = {
      code: response.data["code"],
      newCode: response.data["newCode"],
      channel: response.data["channel"],
      data: response.data["data"],
      dateTime: response.data["dateTime"],
      message: response.data["message"],
      path: response.data["path"],
      errorDetails: response.data["errorDetails"],
      extData: response.data["extData"],
      extraData: response.data["extraData"],
    };
    return result;
  }

  public static decryptResult(param: { dataToDecrypt: string; publicKey: string }):ITelebirrPaymentResult {
    return TBSecurity.decryptPublic({
      dataToDecrypt: param.dataToDecrypt,
      publicKey: param.publicKey,
    });
  }
}