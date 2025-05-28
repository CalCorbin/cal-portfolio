import React from 'react';

export type FilterChipsProps = {
  filterOptions: string[] | undefined;
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
};
