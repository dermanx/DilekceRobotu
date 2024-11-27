import Iyzipay from 'iyzipay';

export const iyzipay = new Iyzipay({
  apiKey: 'your_api_key',
  secretKey: 'your_secret_key',
  uri: 'https://sandbox-api.iyzipay.com'
});