import { useState } from "react";
import { ThemedView } from "./ThemedView";
import { Image as ExpoImage } from "expo-image";
import { ThemedText } from "./ThemedText";
import { Button, StyleSheet } from "react-native";
import { useCart } from "@/BuySDKWrapper";

export function ProductCard({ product }: any) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const { addItemToCart, isCartLoading } = useCart();

  const onPressLearnMore = async (productVariantID: string) => {
    setIsAddingToCart(true);
    const lineItemsToAdd = [
      {
        variantId: productVariantID,
        quantity: 1,
      },
    ];
    await addItemToCart(lineItemsToAdd);
    setIsAddingToCart(false);
  };

  return (
    <ThemedView style={styles.stepContainer}>
      {product?.image?.src && (
        <ExpoImage
          style={styles.image}
          source={product.image.src}
          // placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
      )}
      <ThemedText type="subtitle">{product.title}</ThemedText>
      <ThemedText type="subtitle">
        {product.price.currencyCode} {product.price.amount}
      </ThemedText>
      {isCartLoading && isAddingToCart ? (
        <Button onPress={() => {}} title="Adding to Cart..." color="#841584" />
      ) : (
        <Button
          onPress={() => onPressLearnMore(product.id)}
          title="Add To Cart"
          color="#841584"
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "black",
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  image: {
    width: "100%",
    height: 300,
  },
});
