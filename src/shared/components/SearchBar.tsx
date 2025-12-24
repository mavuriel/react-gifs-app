import {
  useEffect,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";

interface Props {
  placeholder?: string;
  onQuery: (query: string) => void;
}

export const SearchBar = ({ placeholder, onQuery }: Props) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onQuery(search);
    }, 700);

    return () => clearTimeout(timeoutId);
  }, [search, onQuery]);

  const handleSearch = () => {
    onQuery(search);
  };

  const handleSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={handleSearchValue}
        onKeyDown={handleEnterKey}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};
