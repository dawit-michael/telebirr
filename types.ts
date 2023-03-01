export interface ITelebirrRequest {
  appId: string;
  appKey: string;
  shortCode: string;
  timestamp: string;
  nonce: string;
  notifyUrl: string;
  returnUrl: string;
  subject: string;
  outTradeNo: string;
  timeoutExpress: string;
  totalAmount: string;
  receiveName: string;
}

export interface ITelebirrResponse {
  code: number;
  newCode: number;
  channel: null | string;
  data: null | { toPayUrl: string } | any;
  message: string;
  dateTime: string;
  path: null | string;
  errorDetails: any;
  extraData: any;
  extData: null | any;
}
export interface ITelebirrPaymentResult {
  msisdn: string;
  outTradeNo: string;
  totalAmount: number;
  tradeDate: number;
  tradeNo: string;
  tradeStatus: number;
  transactionNo: string;
}
