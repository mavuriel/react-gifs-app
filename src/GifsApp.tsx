import { CustomHeader } from "./shared/components/CustomHeader";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { SearchBar } from "./shared/components/SearchBar";
import { GifsList } from "./gifs/components/GifsList";
import { mockGifs } from "./mocks/gifs.mock";
import { useState } from "react";

export const GifsApp = () => {
  const [previousSearches, setPreviousSearches] = useState(["DBZ"]);

  const handlePreviousSearch = (search: string) => {
    console.log({ search });
  };

  const handleSearch = (search: string) => {
    console.log({ search });
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

      <GifsList gifs={mockGifs} />
    </>
  );
};
