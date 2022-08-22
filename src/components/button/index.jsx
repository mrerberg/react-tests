import cn from "classnames";

import styles from "./index.module.css";

export const Button = ({
  className,
  children,
  type = "button",
  dataTestId,
  onClick,
}) => {
  return (
    <button
      className={cn(styles.button, className)}
      type={type}
      onClick={() => onClick({ name: "Mikka" })}
      data-testid={dataTestId}
    >
      {children}
    </button>
  );
};
