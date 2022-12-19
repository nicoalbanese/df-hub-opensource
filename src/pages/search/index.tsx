import React, { useState } from "react";
import UniversalSearch from "../../components/universalSearch";

const PipelineSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div>
      <h1>Search Pipeline</h1>
      <UniversalSearch />
      <div>
        results...
      </div>
    </div>
  );
};

export default PipelineSearch;


