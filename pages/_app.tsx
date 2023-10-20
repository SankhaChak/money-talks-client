import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import merge from "lodash.merge";
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
  type Theme,
} from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  arbitrum,
  goerli,
  mainnet,
  optimism,
  polygon,
  base,
  zora,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { clientEnv } from "../lib/validators/clientEnv";
import { ThemeProvider } from "../context/Theme";
import UserProvider from "../context/User";
import { Toaster } from "react-hot-toast";

// const customTheme = merge(darkTheme(), {
//   colors: {
//     connectButtonBackground: "#818cf8",
//     connectButtonInnerBackground: "#818cf8",
//   },
// }) as Theme;

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    // ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : []),
    goerli,
  ],
  [alchemyProvider({ apiKey: clientEnv.ALCHEMY_API_KEY }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: clientEnv.RAINBOWKIT_APP_NAME,
  projectId: clientEnv.WALLET_CONNECT_PROJECT_ID,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <UserProvider>
            <Toaster position="top-right" />
            <Component {...pageProps} />
          </UserProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
}

export default MyApp;
