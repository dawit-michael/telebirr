# Telebirr

[![N|Solid](https://www.ethiotelecom.et/wp-content/uploads/2021/04/TeleBirr-Logo.svg)](https://www.ethiotelecom.et/wp-content/uploads/2021/04/TeleBirr-Logo.svg)


Telebirr is a mobile money service developed and was launched by Ethio telecom, the state owned telecommunication and Internet service provider in Ethiopia.
> Notice
> This is a personal package  created to help developers and not sponsored or created by the official telebirr company.
> Any information regarding your payment credentials such as appId,appKey and publicKey are in no way stored or changed .

This npm package  is an encapsulation of telebirr  api created to ease the development process.

## Features
- payment url generation
- encryption , decryption & signing data

## Installation
Installing Telebirr
Install the dependencies and devDependencies and start the server.
```
npm i @telebirrh5/core
```
## Usage -- (keeping it simple 👌) 

Simple & easy :
1. **Create a request object**
```
  let request: ITelebirrRequest = {
    appId: <YOUR-APP-ID-HERE>,
    appKey: <YOUR-API-KEY-HERE>,
    outTradeNo: <YOUR-TRANSACTION-ORDER-NUMBER>,
    nonce: <YOUR-NONCE-OR-RANDOMLY-GENERATED-UNIQUE-NUMBER>,
    subject: <SUBJECT-OF-TRANSACTION>, // beware of special characters
    shortCode: <SHORT-CODE>, 
    notifyUrl: <YOUR-NOTIFY-URL>, // should be https 
    returnUrl: <YOUR-RETURN-URL, // should be https
    receiveName: <RECEIVER-COMPANY-NAME>,
    timeoutExpress: <TIMEOUT> , // Usually 30(in minutes)
    totalAmount: <AMOUNT-OF-PAYMENT>,
    timestamp: <TIME-STAMP> // example : "`${Date.now()}`
  }
```
2. **Create instance of Telebirr class**
```
  let telebirr = new Telebirr({
    request: request, // the request object from earlier
    paymentUrl:<TELEBIRR-PAYMENT-API-URL>, // [production/test] url 
    publicKey: <YOUR-PUBLIC-KEY>,
  });
```
3. **Generating payment url**
*This function handles all the **encryption** , **sorting** and **signing** of data*
```
  let paymentResult = await telebirr.generatePaymentUrl();
```
## Extra  
1. **Decoding telebirr success callback notification**
```
  let decodingResult =  Telebirr.decryptResult({
    dataToDecrypt: <DATA-TO-BE-DECRYPTED>,
    publicKey:"<YOUR-PUBLIC-KEY>",
  });
```





## License

MIT

**Free package, Hell Yeah!**
