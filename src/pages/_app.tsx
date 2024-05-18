import GlobalStyles from "@/styles/Global";
import type { AppProps } from "next/app";
import "@/assets/fonts/font.css";
import { ThemeProvider } from "@emotion/react";
import palette from "@/styles/palette";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const qClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
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
