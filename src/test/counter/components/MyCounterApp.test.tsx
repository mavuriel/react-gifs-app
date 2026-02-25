import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { MyCounterApp } from "../../../counter/components/MyCounterApp";

describe("MyCounterApp", () => {
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

  test("should increment counter", () => {
    render(<MyCounterApp />);

    const counter = screen.getByRole("heading", { level: 1 });
    const addButton = screen.getByRole("button", { name: "+1" });

    fireEvent.click(addButton);

    expect(counter.innerHTML).toContain("11");
  });
});
