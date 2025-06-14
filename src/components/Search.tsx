import { useState, useEffect, useRef } from "react";

interface SearchComponentProps {
  onSearch: (query: string) => Promise<
    Array<{
      position: [number, number];
      name: string;
    }>
  >;
  onLocationSelect: (location: {
    position: [number, number];
    name: string;
  }) => void;
}

export default function SearchComponent({
  onSearch,
  onLocationSelect,
}: SearchComponentProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<
    Array<{ position: [number, number]; name: string }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  // --- NEW: State to control visibility of the results dropdown ---
  const [isResultsVisible, setIsResultsVisible] = useState(true);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  // This useEffect handles the search logic
  useEffect(() => {
    // Only search if the query is long enough
    if (query.length > 2) {
      const timer = setTimeout(() => {
        setIsLoading(true);
        onSearch(query).then((data) => {
          setResults(data);
          setIsLoading(false);
        });
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [query, onSearch]);

  // --- NEW: useEffect to handle clicks outside the component ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsResultsVisible(false);
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (result: {
    position: [number, number];
    name: string;
  }) => {
    onLocationSelect(result);
    setQuery(result.name);
    setIsResultsVisible(false);
    setResults([]);
  };

  return (
    <div className="relative w-full max-w-md" ref={searchContainerRef}>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          // --- CHANGE: When user types, ensure results can be shown ---
          if (!isResultsVisible) setIsResultsVisible(true);
        }}
        onFocus={() => setIsResultsVisible(true)} // Show results on focus
        placeholder="Search for a location..."
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none bg-white bg-opacity-90 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      {isLoading && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
        </div>
      )}
      {/* --- CHANGE: Check visibility state before rendering --- */}
      {isResultsVisible && results.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {results.map((result, index) => (
            <li
              key={index}
              className="p-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(result)}
            >
              {result.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
