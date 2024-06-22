import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useCart } from "@/BuySDKWrapper";
import { LineItemType } from "@/BuySDKWrapper/types";
import { Link } from "expo-router";

export default function CartScreen() {
  const { cart } = useCart();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Cart</ThemedText>
      </ThemedView>
      <ThemedView>
        {cart?.lineItems?.map((lineItem: LineItemType, idx: number) => {
          return (
            <ThemedView style={styles.cartItem} key={idx}>
              {lineItem?.variant?.image?.src && (
                <Image
                  style={styles.image}
                  source={lineItem?.variant?.image?.src}
                  // placeholder={{ blurhash }}
                  contentFit="cover"
                  transition={1000}
                />
              )}
              <ThemedText type="subtitle">
                {lineItem?.title} - {lineItem?.variant?.title}
              </ThemedText>
              <ThemedText type="subtitle">
                {lineItem?.variant?.price?.currencyCode}{" "}
                {lineItem?.variant?.price?.amount}
              </ThemedText>
              <ThemedText type="subtitle">Qty: {lineItem?.quantity}</ThemedText>
            </ThemedView>
          );
        }) || (
          <>
            <ThemedText type="subtitle">Empty cart</ThemedText>
          </>
        )}
      </ThemedView>
      {cart?.lineItems ? (
        <Link href="/checkout">Proceed To Checkout</Link>
      ) : (
        <></>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  cartItem: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    marginBottom: 30,
  },
  image: {
    width: 100,
    height: 100,
  },
});
