import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

import AuthReducer from "../Redux/AuthReducer";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import Socket from "../Components/Socket/Socket";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import React from "react";

const PersistConfig = { key: "root", storage, version: 1 };
const PersistReducer = persistReducer(PersistConfig, AuthReducer);
const Store = configureStore({
  reducer: PersistReducer,

  middleware: (GetDefaultMiddleware) =>
    GetDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <link
          rel="shortcut icon"
          href="/Favicon/Favicon.png"
          type="image/x-icon"
        />
      </Head>

      <Provider store={Store}>
        <PersistGate loading={null} persistor={persistStore(Store)}>
            <Component {...pageProps} UserSocket={Socket} />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default MyApp;
