import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ButtonLink from "../ButtonLink";

describe("ButtonLink", () => {
  let expectedProps;
  
    beforeEach(() => {
    expectedProps = {
      color: "blue",
      href: "www.example.com",
      label: "TEXT",
    };
  });

  test("renders correctly with all props & children", () => {
    const { container, getByText, getByTestId } = render(<ButtonLink {...expectedProps}><p data-testid="child"></p></ButtonLink>);
    expect(getByText("TEXT")).toBeInTheDocument();
    expect(getByTestId("child")).toBeInTheDocument();
    expect(container.firstChild.firstChild).toHaveAttribute("color", "blue")
    expect(container.firstChild.firstChild).toHaveAttribute("href", "www.example.com")
  });

  test("renders grey when no color provided", () => {
    const { container, getByText, getByTestId } = render(<ButtonLink href="www.example.com" label="TEXT"><p data-testid="child"></p></ButtonLink>);
    expect(getByText("TEXT")).toBeInTheDocument();
    expect(getByTestId("child")).toBeInTheDocument();
    expect(container.firstChild.firstChild).toHaveAttribute("color", "gray")
    expect(container.firstChild.firstChild).toHaveAttribute("href", "www.example.com")
  });
  test("renders gray with no animation (disabled) when no link provided", () => {
    const { container, getByText, getByTestId } = render(<ButtonLink color={expectedProps.color} label={expectedProps.label}><p data-testid="child"></p></ButtonLink>);
    expect(getByText("TEXT")).toBeInTheDocument();
    expect(getByTestId("child")).toBeInTheDocument();
    expect(container.firstChild.firstChild).toHaveAttribute("color", "blue")
    expect(container.firstChild.firstChild).toHaveClass("disabled")
  });
  test("renders inverted (colored border) when passed inverted prop", () => {
    const { container, getByText, getByTestId } = render(<ButtonLink {...expectedProps} inverted><p data-testid="child"></p></ButtonLink>);
    expect(getByText("TEXT")).toBeInTheDocument();
    expect(getByTestId("child")).toBeInTheDocument();
    expect(container.firstChild.firstChild).toHaveAttribute("color", "blue")
    expect(container).toHaveStyle("border: 3px solid var(--blue400);");
  })
});
