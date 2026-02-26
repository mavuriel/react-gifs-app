import { beforeEach, describe, expect, test, vi } from "vitest";
import { getGifsByQuery } from "../../../gifs/actions/getGifsByQuery";
import AxiosMockAdapter from "axios-mock-adapter";
import { giphyApi } from "../../../gifs/api/giphyApi";
import { giphySearchResponseMock } from "../mocks/giphySearchResponseMock";

describe("getGifsByQuery", () => {
  let mock = new AxiosMockAdapter(giphyApi);

  beforeEach(() => {
    // elimina los handlers agregados mock.onGet/onPost/etc - no elimina el mock
    mock = new AxiosMockAdapter(giphyApi);
  });
  // test("should return a gifs list", async () => {
  //   const gifs = await getGifsByQuery("goku");

  //   expect(gifs).toHaveLength(10);

  //   expect(gifs[0]).toStrictEqual({
  //     id: expect.any(String),
  //     title: expect.any(String),
  //     url: expect.any(String),
  //     width: expect.any(Number),
  //     height: expect.any(Number),
  //   });
  // });

  test("should return a gifs list", async () => {
    mock.onGet("/search").reply(200, giphySearchResponseMock);

    const gifs = await getGifsByQuery("gojo");

    expect(gifs).toHaveLength(10);

    gifs.forEach((gif) => {
      expect(typeof gif.id).toBe("string");
      expect(typeof gif.title).toBe("string");
      expect(typeof gif.url).toBe("string");
      expect(typeof gif.height).toBe("number");
      expect(typeof gif.width).toBe("number");
    });
  });

  test("should return an empty list of gifs if query is not provided", async () => {
    // elimina el mock
    mock.restore();

    const gifs = await getGifsByQuery("");

    expect(gifs).toHaveLength(0);
  });

  test("should handle error when the API returns an error", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    mock.onGet("/search").reply(400, { message: "error" });

    const gifs = await getGifsByQuery("gojo");

    expect(gifs).toHaveLength(0);
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.anything());
  });
});
