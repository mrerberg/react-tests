import { Button } from "./index";
import { screen, render, fireEvent } from "@testing-library/react";

const dataTestId = "test-id";

describe("<Button />", () => {
  describe("Snapshots tests", () => {
    it("should render successfully and match snapshot", () => {
      const { container } = render(<Button>Click me</Button>);

      expect(container).toMatchSnapshot();
    });
  });

  describe("Attributes tests", () => {
    it('should set type="button" by default', () => {
      render(<Button />);

      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

     it("should set type attribute", () => {
       const type = "submit";
       render(<Button type={type} />);

       expect(screen.getByRole("button")).toHaveAttribute("type", type);
     });
  });

  describe("Callbacks tests", () => {
     it("should call `onClick` prop", () => {
       const cb = jest.fn();

       render(
         <Button onClick={cb} dataTestId={dataTestId} />
       );

       fireEvent.click(screen.getByTestId(dataTestId));

       expect(cb).toBeCalledTimes(1);
     });
  });
});
