import { describe, expect, test } from "vitest";
import { getGifsByQuery } from "../../../gifs/actions/getGifsByQuery";

describe("getGifsByQuery", () => {
  test("should return a gifs list", async () => {
    const gifs = await getGifsByQuery("goku");

    expect(gifs).toHaveLength(10);

    expect(gifs[0]).toStrictEqual({
      id: expect.any(String),
      title: expect.any(String),
      url: expect.any(String),
      width: expect.any(Number),
      height: expect.any(Number),
    });
  });
});
