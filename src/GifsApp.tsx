import { CustomHeader } from "./shared/components/CustomHeader";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { SearchBar } from "./shared/components/SearchBar";
import { GifsList } from "./gifs/components/GifsList";
import { useState } from "react";
import { getGifsByQuery } from "./gifs/actions/getGifsByQuery";
import type { Gif } from "./gifs/interfaces/gif.interface";

export const GifsApp = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousSearches, setPreviousSearches] = useState(["DBZ"]);

  const handlePreviousSearch = (search: string) => {
    console.log({ search });
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

    setPreviousSearches((prevState) =>
      [formattedSearch, ...prevState].slice(0, 8),
    );
  };

  return (
    <>
      <CustomHeader
        title="Buscador de gifs"
        description="Descubre y comparte el gif perfecto"
      />

      <SearchBar placeholder="buscador de gifs" onQuery={handleSearch} />

      <PreviousSearches
        searches={previousSearches}
        onSearchClick={handlePreviousSearch}
      />

      <GifsList gifs={gifs} />
    </>
  );
};
