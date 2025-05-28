import React from 'react';

export type ChipProps = {
  label: string;
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
};
