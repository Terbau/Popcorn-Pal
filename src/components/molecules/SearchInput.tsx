import { ChangeEvent, useState } from "react";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  onSearch: (query: string) => void;
}

export const SearchInput = ({
  placeholder = "Search...",
  className,
  onSearch,
}: SearchInputProps) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className={className}>
      <input
        className="font-bold text-lg py-1 px-3 bg-white rounded-lg"
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      {/* <button onClick={handleSearch}>Search</button> */}
    </div>
  );
};
