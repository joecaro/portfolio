import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import HeroLink from "../HeroLink";

describe("HeroLink", () => {
  let expectedProps;
  
    beforeEach(() => {
    expectedProps = {
      color: "blue",
      href: "www.example.com",
      label: "label",
    };
  });

  test("renders correctly with all props & children", () => {
    const { container, getByText, getByTestId } = render(<HeroLink {...expectedProps}><p data-testid="child"></p></HeroLink>);
    expect(getByText("label")).toBeInTheDocument();
    expect(getByTestId("child")).toBeInTheDocument();
    expect(container.firstChild.firstChild).toHaveAttribute("color", "blue")
    expect(container.firstChild.firstChild).toHaveAttribute("href", "www.example.com")
  });

  test("renders grey when no color provided", () => {
    const { container, getByText, getByTestId } = render(<HeroLink href="www.example.com" label="label"><p data-testid="child"></p></HeroLink>);
    expect(getByText("label")).toBeInTheDocument();
    expect(getByTestId("child")).toBeInTheDocument();
    expect(container.firstChild.firstChild).toHaveAttribute("color", "gray")
    expect(container.firstChild.firstChild).toHaveAttribute("href", "www.example.com")
  });
  test("renders gray with no animation (disabled) when no link provided", () => {
    const { container, getByText, getByTestId } = render(<HeroLink color={expectedProps.color} label={expectedProps.label}><p data-testid="child"></p></HeroLink>);
    expect(getByText("label")).toBeInTheDocument();
    expect(getByTestId("child")).toBeInTheDocument();
    expect(container.firstChild.firstChild).toHaveAttribute("color", "blue")
    expect(container.firstChild.firstChild).toHaveClass("disabled")
  });
});
