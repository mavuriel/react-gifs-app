import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { MyCounterApp } from "../../../counter/components/MyCounterApp";

const handleAddMock = vi.fn();
const handleSubtrackMock = vi.fn();
const handleResetMock = vi.fn();

vi.mock("../../../counter/hooks/useCounter", () => ({
  useCounter: () => ({
    counter: 40,
    handleAdd: handleAddMock,
    handleSubtract: handleSubtrackMock,
    handleReset: handleResetMock,
  }),
}));

describe("MyCounterAppMock", () => {
  test("should render component", () => {
    render(<MyCounterApp />);

    const counter = screen.getByRole("heading", { level: 1 });
    const addButton = screen.getByRole("button", { name: "+1" });
    const subButton = screen.getByRole("button", { name: "-1" });
    const resetButton = screen.getByRole("button", { name: "Reset" });

    expect(counter).toBeDefined();
    expect(addButton).toBeDefined();
    expect(subButton).toBeDefined();
    expect(resetButton).toBeDefined();
  });

  test("should call handleAdd if button is clicked", () => {
    render(<MyCounterApp />);

    const addButton = screen.getByRole("button", { name: "+1" });

    fireEvent.click(addButton);

    expect(handleAddMock).toHaveBeenCalled();
    expect(handleSubtrackMock).not.toHaveBeenCalled();
    expect(handleResetMock).not.toHaveBeenCalled();
  });
});
