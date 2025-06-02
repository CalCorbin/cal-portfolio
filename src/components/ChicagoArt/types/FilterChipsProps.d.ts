import React from 'react';

export type FilterChipsProps = {
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
};
