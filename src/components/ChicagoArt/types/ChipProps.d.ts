import React from 'react';

export type ChipProps = {
  label: string;
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
};
