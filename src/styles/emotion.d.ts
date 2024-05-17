import "@emotion/react";
import colorPalette from "./palette";

type paletteType = typeof colorPalette;

declare module "@emotion/react" {
    export interface Theme extends paletteType {}
}
