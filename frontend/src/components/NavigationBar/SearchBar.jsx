import { Search } from "lucide-react";

const SearchBar = () => {
    return (
      <div className="flex-1 max-w-xl mx-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full p-2 pl-10 border rounded-md" 
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
    );
  };
  
  export default SearchBar;
  