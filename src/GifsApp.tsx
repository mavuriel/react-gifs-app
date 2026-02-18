import { CustomHeader } from "./shared/components/CustomHeader";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { SearchBar } from "./shared/components/SearchBar";
import { GifsList } from "./gifs/components/GifsList";
import { useGifs } from "./gifs/hooks/useGifs";

export const GifsApp = () => {
  const { handleSearch, gifs, previousSearches, handlePreviousSearch } =
    useGifs();

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
