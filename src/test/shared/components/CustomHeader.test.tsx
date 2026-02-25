import { describe, expect, test } from "vitest";
import { screen, render } from "@testing-library/react";
import { CustomHeader } from "../../../shared/components/CustomHeader";

const title = "Test Title";
const description = "Test Description";

describe("CustomHeader", () => {
  test("should render the title", () => {
    render(<CustomHeader title={title} />);

    const titleElement = screen.getByRole("heading", { name: title });

    expect(titleElement).toBeTruthy();
  });

  test("should render the description when provided", () => {
    render(<CustomHeader title={title} description={description} />);

    const descriptionElement = screen.getByText(description);

    expect(descriptionElement).toBeTruthy();
  });

  test("should not render description when not provided", () => {
    render(<CustomHeader title={title} />);

    const descriptionElement = screen.queryByText(description);
    expect(descriptionElement).toBeNull();
  });
});
