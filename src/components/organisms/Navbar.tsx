import { Link } from "react-router-dom";
import { SearchInput } from "../molecules/SearchInput";

export const Navbar = () => {
  return (
    <nav className="fixed bg-brand-3 w-full h-20 flex flex-row px-5 py-2 items-center gap-12">
      <Link to="/" className="text-lg font-bold text-white">
        Home
      </Link>
      <ul className="text-lg font-bold text-white">
        <li>
          <Link to="/mylist">My List</Link>
        </li>
      </ul>
      <SearchInput
        className="ml-auto"
        onSearch={() => console.log("Search input change")}
      />
    </nav>
  );
};
