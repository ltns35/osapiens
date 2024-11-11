export interface Theme {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
}

export type ThemeName = keyof typeof themes;

export const themes = {
    default: {
        backgroundColor: "#fefefe",
        primaryColor: "#112233",
        secondaryColor: "#2a5682"
    },
    alpha: {
        backgroundColor: "#fff",
        primaryColor: "#3344ff",
        secondaryColor: "#33acac"
    },
    beta: {
        backgroundColor: "#2b2b2b",
        primaryColor: "#0c810e",
        secondaryColor: "#bc8717"
    },
};
