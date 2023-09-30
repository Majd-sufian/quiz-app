"use client";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store";
import { QueryClientProviderWrapper } from "../utils/queryClient";
import { SessionProvider } from "next-auth/react";
import { Navbar } from "../components";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <QueryClientProviderWrapper>
          <Navbar />
          <Component {...pageProps} />
        </QueryClientProviderWrapper>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
