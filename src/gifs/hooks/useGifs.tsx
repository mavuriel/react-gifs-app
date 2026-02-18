import { useRef, useState } from "react";
import type { Gif } from "../interfaces/gif.interface";
import { getGifsByQuery } from "../actions/getGifsByQuery";

// const gifsCache: Record<string, Gif[]> = {};

export const useGifs = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousSearches, setPreviousSearches] = useState<string[]>([]);
  const gifsCache = useRef<Record<string, Gif[]>>({});

  const handlePreviousSearch = async (search: string) => {
    if (gifsCache.current[search]) {
      setGifs(gifsCache.current[search]);
      return;
    }

    const gifs = await getGifsByQuery(search);
    setGifs(gifs);
  };

  const handleSearch = async (search: string = "") => {
    if (search === "") {
      return;
    }

    const formattedSearch = search.trim().toLowerCase();

    if (previousSearches.includes(formattedSearch)) {
      return;
    }

    const gifs = await getGifsByQuery(search);
    setGifs(gifs);

    gifsCache.current[formattedSearch] = gifs;

    setPreviousSearches((prevState) =>
      [formattedSearch, ...prevState].slice(0, 8),
    );
  };

  return {
    gifs,
    previousSearches,
    handleSearch,
    handlePreviousSearch,
  };
};
