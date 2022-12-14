import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import React from 'react';
import './Header.css';

interface HeaderProps {
  title: string;
  repoLink: string;
  useDarkMode?: boolean;
}

const Header = ({ title, repoLink, useDarkMode }: HeaderProps) => {
  const color = useDarkMode ? 'white' : 'black';
  return (
    <div className="header-row">
      <div style={{ color }}>{title}</div>
      <a
        data-testid="project-header"
        target="_blank"
        rel="noopener noreferrer"
        href={repoLink}
      >
        <FontAwesomeIcon size="sm" icon={faGithub} style={{ color }} />
      </a>
    </div>
  );
};

Header.defaultProps = {
  useDarkMode: false,
};

export default Header;
