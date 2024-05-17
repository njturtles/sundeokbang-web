type Hue = { hue0: string; hue1: string; hue2: string; hue3: string };
type Palette<T> = Record<string, T>;

const colorPalette: Palette<Partial<Hue>> = {
    black: {
        hue0: "#222222",
        hue1: "#646464",
        hue2: "#BABABA",
    },
    white: {
        hue0: "#FFFFFF",
        hue1: "#FBFBFB",
        hue2: "#F9F9F9",
        hue3: "#F4F4F4",
    },
    primary: {
        hue0: "#E44B0C",
        hue1: "#F67844",
        hue2: "#DA987D",
    },
    gray: {
        hue0: "#EDEDED",
        hue1: "#EAEAEA",
        hue2: "#E4E4E4",
        hue3: "#CCCCCC",
    },
    red: { hue0: "#F03939" },
};

const fontPalette: Palette<Record<string, number>> = {
    Pretendard: {
        thin: 100,
        extralight: 200,
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
    },
};

const palette = {
    color: colorPalette,
    font: fontPalette,
};

export default palette;
