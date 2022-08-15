import { useThemeContext } from "../contexts/theme";

export const ThemeSwitcher = () => {
  const { toggleTheme, theme } = useThemeContext();

  return (
    <button onClick={toggleTheme} style={{ ...theme }}>
      Change Theme
    </button>
  );
};
