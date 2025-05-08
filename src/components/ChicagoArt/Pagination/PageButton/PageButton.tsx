import React from 'react';
import styles from './PageButton.module.css';

type PageButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  isActive?: boolean;
  ariaLabel?: string;
  ariaCurrent?: 'page' | boolean;
  children: React.ReactNode;
  isArrow?: boolean;
};

const PageButton = ({
  onClick,
  disabled = false,
  isActive = false,
  ariaLabel,
  ariaCurrent,
  children,
  isArrow = false,
}: PageButtonProps) => {
  const buttonClasses = [
    styles.pageButton,
    isActive ? styles.activePage : '',
    isArrow ? styles.pageArrow : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
    >
      {children}
    </button>
  );
};

export default PageButton;
