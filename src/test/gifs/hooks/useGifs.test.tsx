import { renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { PREVIOUS_LIMIT, useGifs } from "../../../gifs/hooks/useGifs";
import { act } from "react";
import * as gifActions from "../../../gifs/actions/getGifsByQuery";

describe("useGifs", () => {
  test("should return default values and methods", () => {
    const { result } = renderHook(() => useGifs());
    const { gifs, handlePreviousSearch, handleSearch, previousSearches } =
      result.current;

    expect(gifs).toStrictEqual([]);
    expect(previousSearches).toStrictEqual([]);
    expect(handlePreviousSearch).toBeInstanceOf(Function);
    expect(handleSearch).toBeInstanceOf(Function);
  });

  test("should return a list of gifs", async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleSearch("gojo");
    });

    // console.log({ gifs: result.current.gifs });

    expect(result.current.gifs).toHaveLength(10);
  });

  test("should return a list of gifs when handlePreviousSearch is called", async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handlePreviousSearch("gojo");
    });

    expect(result.current.gifs).toHaveLength(10);
  });

  test("should return a list of gifs from cache", async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleSearch("gojo");
    });

    expect(result.current.gifs).toHaveLength(10);

    vi.spyOn(gifActions, "getGifsByQuery").mockRejectedValue(
      new Error("API call"),
    );

    await act(async () => {
      await result.current.handlePreviousSearch("gojo");
    });

    expect(result.current.gifs).toHaveLength(10);
  });

  test(`should return no more than ${PREVIOUS_LIMIT} previous terms`, async () => {
    const { result } = renderHook(() => useGifs());

    vi.spyOn(gifActions, "getGifsByQuery").mockResolvedValue([]);

    await act(async () => {
      await result.current.handleSearch("search#1");
    });
    await act(async () => {
      await result.current.handleSearch("search#2");
    });
    await act(async () => {
      await result.current.handleSearch("search#3");
    });
    await act(async () => {
      await result.current.handleSearch("search#4");
    });
    await act(async () => {
      await result.current.handleSearch("search#5");
    });
    await act(async () => {
      await result.current.handleSearch("search#6");
    });
    await act(async () => {
      await result.current.handleSearch("search#7");
    });
    await act(async () => {
      await result.current.handleSearch("search#8");
    });
    await act(async () => {
      await result.current.handleSearch("search#9");
    });

    console.log({ previous: result.current.previousSearches });
    expect(result.current.previousSearches).toHaveLength(PREVIOUS_LIMIT);
    expect(result.current.previousSearches[0]).toBe("search#9");
  });
});
