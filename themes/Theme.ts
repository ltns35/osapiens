export interface Theme {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    errorColor: string;
}

export type ThemeName = keyof typeof themes;

interface Themes {
    default: Theme;
    alpha: Theme;
    beta: Theme;
}

export const themes: Themes = {
    default: {
        backgroundColor: "#fefefe",
        primaryColor: "#112233",
        secondaryColor: "#2a5682",
        errorColor: "#ff0000",
    },
    alpha: {
        backgroundColor: "#fff",
        primaryColor: "#3344ff",
        secondaryColor: "#33acac",
        errorColor: "#e32323",
    },
    beta: {
        backgroundColor: "#2b2b2b",
        primaryColor: "#0c810e",
        secondaryColor: "#bc8717",
        errorColor: "#59069c",
    },
};
