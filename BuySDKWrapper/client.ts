import Client from "shopify-buy";

const BuySDKClient = Client.buildClient({
  domain: "hitesh-testing.myshopify.com",
  storefrontAccessToken: "f21a87178a6a0278977b6d4a3f674f11",
  apiVersion: "2023-10"
});

export default BuySDKClient;