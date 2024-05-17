import { Global, css } from "@emotion/react";
import { Reset } from "./utils/reset";

const styles = css`
    ${Reset}; /* Resets Browser's default css settings  */

    * {
        box-sizing: border-box;
        font-family: "Pretendard", sans-serif;
    }

    html,
    body {
        margin: 0;
        width: 100%;
        height: auto;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #fbfbfb;
    }

    &:link,
    &:visited {
        text-decoration: none;
    }

    button {
        cursor: pointer;
    }

    b {
        font-size: inherit;
        font-weight: 700;
    }
`;

const GlobalStyles = () => <Global styles={styles} />;

export default GlobalStyles;
