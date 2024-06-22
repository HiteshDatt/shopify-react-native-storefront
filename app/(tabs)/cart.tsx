import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useCart } from "@/BuySDKWrapper";
import { useEffect } from "react";
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
      <ThemedText>
        {cart?.lineItems?.map((lineItem: LineItemType, idx: number) => {
          return (
            <ThemedView key={idx}>
              <ThemedText type="subtitle">
                {lineItem?.title} - {lineItem?.variant?.title}
              </ThemedText>
              <ThemedText type="subtitle">
                {lineItem?.variant?.price?.amount}
              </ThemedText>
            </ThemedView>
          );
        })}
      </ThemedText>
      <Link href="/checkout">Proceed To Checkout</Link>
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
});
