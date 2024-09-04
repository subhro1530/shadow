import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import Head from "next/head";

// Create a new Emotion cache for Chakra UI to prevent potential conflicts
const emotionCache = createCache({ key: "css" });

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#0d0c1d",
        color: "white",
      },
    },
  },
  colors: {
    purpleDark: {
      100: "#300048",
      200: "#140032",
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <CacheProvider value={emotionCache}>
      <ChakraProvider theme={theme}>
        <Head>
          <title>Shadow - Social Media Investigator</title>
        </Head>
        <Component {...pageProps} />
      </ChakraProvider>
    </CacheProvider>
  );
}

export default MyApp;
