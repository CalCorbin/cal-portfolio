import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import React from 'react';

interface HeaderProps {
  title: string;
  repoLink: string;
  useWhiteIcons?: boolean;
}

const Header = ({ title, repoLink, useWhiteIcons }: HeaderProps) => (
  <div className="spacex-page-header">
    <div>{title}</div>
    <a
      data-testid="project-header"
      target="_blank"
      rel="noopener noreferrer"
      href={repoLink}
    >
      <FontAwesomeIcon
        size="sm"
        icon={faGithub}
        className="social-icon"
        style={{ color: useWhiteIcons ? 'white' : 'black' }}
      />
    </a>
  </div>
);

Header.defaultProps = {
  useWhiteIcons: false,
};

export default Header;
