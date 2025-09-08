import { createContext, useContext } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme,
    contrastTheme: Theme,
    toggleTheme: () => void,
    setTheme?: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    contrastTheme: 'dark',
    toggleTheme: () => {} // a no-operation function
});

const useTheme = () => {
    return useContext(ThemeContext);
};

export {
    ThemeContext as default,
    useTheme
}

export type {
    ThemeContextType,
    Theme
};
