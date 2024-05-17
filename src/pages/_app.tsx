import GlobalStyles from "@/styles/Global";
import type { AppProps } from "next/app";
import "@/assets/fonts/font.css";
import { ThemeProvider } from "@emotion/react";
import palette from "@/styles/palette";
import { RecoilRoot } from "recoil";

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <RecoilRoot>
                <ThemeProvider theme={palette}>
                    <GlobalStyles />
                    <Component {...pageProps} />
                </ThemeProvider>
            </RecoilRoot>
        </>
    );
};

export default App;
