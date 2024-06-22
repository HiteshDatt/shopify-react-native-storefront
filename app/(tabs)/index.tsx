import { Image, StyleSheet, Button } from "react-native";
import { Image as ExpoImage } from "expo-image";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import { BuySDKClient, useCart } from "@/BuySDKWrapper";

export default function HomeScreen() {
  const [products, setProducts] = useState<any>(null);
  const { addItemToCart } = useCart();

  useEffect(() => {
    (async function () {
      const res = await BuySDKClient.product.fetchAll();
      const productVariantsList = res.map((product) => {
        return {
          id: product.variants[0].id,
          title: `${product.title} - ${product.variants[0].title}`,
          image: {
            url: product?.variants?.[0]?.image?.url,
            src: product?.variants?.[0]?.image?.src,
          },
          price: {
            amount: product?.variants?.[0]?.price?.amount,
            currencyCode: product?.variants?.[0]?.price?.currencyCode,
          },
        };
      });
      setProducts(productVariantsList);
    })();
  }, []);

  const onPressLearnMore = (productVariantID: string) => {
    const lineItemsToAdd = [
      {
        variantId: productVariantID,
        quantity: 1,
      },
    ];
    addItemToCart(lineItemsToAdd);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      {products?.map((product: any, idx: number) => {
        return (
          <ThemedView style={styles.stepContainer} key={idx}>
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
            <Button
              onPress={() => onPressLearnMore(product.id)}
              title="Add To Cart"
              color="#841584"
            />
          </ThemedView>
        );
      })}
    </ParallaxScrollView>
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
