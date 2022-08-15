import React from "react";
import { screen, fireEvent } from "@testing-library/react";

import { customRender } from "../../../test-utils";

import { ThemeSwitcher } from "./index";

describe("<ThemeSwitcher />", () => {
  it("should change theme by click", () => {
    customRender(<ThemeSwitcher />);

    const button = screen.getByText("Change Theme");

    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle({
      color: "#282c34",
      background: "#fff",
    });

    fireEvent.click(button);

    expect(button).toHaveStyle({
      color: "#fff",
      background: "#282c34",
    });
  });
});
