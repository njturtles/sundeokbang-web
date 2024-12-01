import GlobalStyles from "@/styles/Global";
import type { AppProps } from "next/app";
import "@/assets/fonts/font.css";
import { ThemeProvider } from "@emotion/react";
import palette from "@/styles/palette";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";

const qClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>
                <title>순덕방</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, user-scalable=0"
                />
                <meta charSet="utf-8" />
            </Head>
            <QueryClientProvider client={qClient}>
                <RecoilRoot>
                    <ThemeProvider theme={palette}>
                        <GlobalStyles />
                        <Component {...pageProps} />
                    </ThemeProvider>
                </RecoilRoot>
            </QueryClientProvider>
        </>
    );
};

export default App;
