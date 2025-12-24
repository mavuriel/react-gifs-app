import { CustomHeader } from "./shared/components/CustomHeader";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { SearchBar } from "./shared/components/SearchBar";
import { GifsList } from "./gifs/components/GifsList";
import { mockGifs } from "./mocks/gifs.mock";

export const GifsApp = () => {
  return (
    <>
      <CustomHeader
        title="Buscador de gifs"
        description="Descubre y comparte el gif perfecto"
      />

      <SearchBar placeholder="buscador de gifs" />

      <PreviousSearches searches={["goku", "naruto", "gojo"]} />

      <GifsList gifs={mockGifs} />
    </>
  );
};
