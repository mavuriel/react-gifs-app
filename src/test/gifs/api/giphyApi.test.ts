import { describe, expect, test } from "vitest";
import { giphyApi } from "../../../gifs/api/giphyApi";

describe("giphyApi", () => {
  test("should be setup", () => {
    expect(giphyApi.defaults.baseURL).toBe(import.meta.env.VITE_GIPHY_URL);
    expect(giphyApi.defaults.params).toStrictEqual({
      lang: "es",
      api_key: import.meta.env.VITE_GIPHY_API_KEY,
    });
  });
});
