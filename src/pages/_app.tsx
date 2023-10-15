import { store } from "@/store";
import { AppProps } from "next/app";
import Router from "next/router";
import { useState } from "react";
import { Provider } from "react-redux";
import TopBarProgress from "react-topbar-progress-indicator";
import "../style/global.css";
import { SessionProvider } from "next-auth/react";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [progress, setProgress] = useState(false);

  Router.events.on("routeChangeStart", () => {
    setProgress(true);
    //function will fired when route change started
  });

  Router.events.on("routeChangeComplete", () => {
    setProgress(false);
    //function will fired when route change ended
  });

  return (
    <>
      <SessionProvider>
        <Provider store={store}>
          {progress && <TopBarProgress />}
          <Component {...pageProps} />
        </Provider>
      </SessionProvider>
    </>
  );
}
