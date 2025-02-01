import { useState } from "react";
import { SearchCard } from "@/components/SearchCard";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { SearchResult } from "@/services/searchService";

const Index = () => {
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="space-y-8">
        <SearchCard
          onResultFound={setSearchResult}
          onSearchStart={() => {
            setIsLoading(true);
            setSearchResult(null);
          }}
        />
        <ResultsDisplay result={searchResult} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Index;