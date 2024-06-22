import { useCart } from "@/BuySDKWrapper";
import { ThemedText } from "@/components/ThemedText";
import { useEffect } from "react";
import WebView from "react-native-webview";

export default function CheckoutScreen() {
  const { cart, fetchLatestCartDetails } = useCart();

  useEffect(() => {
    return () => {
      fetchLatestCartDetails();
    };
  }, []);

  if (cart?.webUrl) {
    return <WebView source={{ uri: cart?.webUrl }} />;
  }

  return (
    <>
      <ThemedText type="subtitle">Loading checkout...</ThemedText>
    </>
  );
}
