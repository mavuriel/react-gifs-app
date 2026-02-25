import { describe, expect, test } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useCounter } from "../../../counter/hooks/useCounter";

describe("useCounter", () => {
  test("should initialize with default value", () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.counter).toBe(10);
  });

  test("should initialize with value 20", () => {
    const { result } = renderHook(() => useCounter(20));

    expect(result.current.counter).toBe(20);
  });

  test("should increment counter", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.handleAdd();
    });

    expect(result.current.counter).toBe(11);
  });

  test("should decrement counter", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.handleSubtract();
    });

    expect(result.current.counter).toBe(9);
  });

  test("should reset counter to initial value", () => {
    const initialValue = 20;
    const { result } = renderHook(() => useCounter(initialValue));

    act(() => {
      result.current.handleAdd();
    });

    expect(result.current.counter).toBe(initialValue + 1);

    act(() => {
      result.current.handleReset();
    });

    expect(result.current.counter).toBe(initialValue);
  });
});
