import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { SearchBar } from "../../../shared/components/SearchBar";

describe("SearchBar", () => {
  test("should render component", () => {
    const { container } = render(<SearchBar onQuery={() => {}} />);

    expect(container).toMatchSnapshot();
  });

  test("should call onQuery after 700ms", async () => {
    const onQueryMock = vi.fn();
    render(<SearchBar onQuery={onQueryMock} />);

    const value = "test query";

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value } });

    await waitFor(() => {
      expect(onQueryMock).toHaveBeenCalled();
      expect(onQueryMock).toHaveBeenCalledWith(value);
    });
  });

  test("should call once with last value (debounce)", async () => {
    const onQueryMock = vi.fn();
    render(<SearchBar onQuery={onQueryMock} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "t" } });
    fireEvent.change(input, { target: { value: "te" } });
    fireEvent.change(input, { target: { value: "tes" } });
    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(() => {
      expect(onQueryMock).toHaveBeenCalledTimes(1);
      expect(onQueryMock).toHaveBeenCalledWith("test");
    });
  });

  test("should call onQuery when button clicked", () => {
    const onQueryMock = vi.fn();
    render(<SearchBar onQuery={onQueryMock} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(onQueryMock).toHaveBeenCalledTimes(1);
    expect(onQueryMock).toHaveBeenCalledWith("test");
  });

  test("should render placeholder", () => {
    render(<SearchBar onQuery={() => {}} placeholder="placeholder test" />);

    expect(screen.getByPlaceholderText("placeholder test")).toBeDefined();
  });
});
