import { createContext, useState, type Dispatch, type SetStateAction, type ReactNode } from "react";

export const ThemContext = createContext<[string, Dispatch<SetStateAction<string>>] | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {

    const getInitialTheme = (): string => {
        const saved = localStorage.getItem('theme');
        return saved === 'light' || saved === 'dark' ? saved : 'dark';
    };

    const [theme, setTheme] = useState<string>(getInitialTheme);

    const updateTheme: Dispatch<SetStateAction<string>> = (newTheme) => {
        const resolved = typeof newTheme === 'function' ? newTheme(theme) : newTheme;
        setTheme(resolved);
        localStorage.setItem('theme', resolved);
    }

    return (
        <ThemContext.Provider value={[theme, updateTheme]}>
            {children}
        </ThemContext.Provider>
    )
}