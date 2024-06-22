import { useCart } from "@/BuySDKWrapper";
import WebView from "react-native-webview";

export default function CheckoutScreen() {
  const { cart } = useCart();

  if (cart?.webUrl) {
    return <WebView source={{ uri: cart?.webUrl }} />;
  }

  return <>Loading checkout</>;
}
