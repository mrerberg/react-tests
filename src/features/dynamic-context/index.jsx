import { useState } from "react";

import { Page } from "./page";
import { ThemeSwitcher } from "./theme-switcher";

import { ThemeContext, themes } from "./contexts/theme";

export const DynamicContext2App = () => {
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  const toggleTheme = () => {
    if (currentTheme === themes.dark) {
      setCurrentTheme(themes.light);
      return;
    }

    setCurrentTheme(themes.dark);
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
        <ThemeSwitcher />
        <Page />
    </ThemeContext.Provider>
  );
};
