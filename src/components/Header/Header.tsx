import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import styles from './Header.module.css';

interface HeaderProps {
  title: string;
  repoLink: string;
  useDarkMode?: boolean;
}

const Header = ({ title, repoLink, useDarkMode = false }: HeaderProps) => {
  const color = useDarkMode ? 'white' : 'black';
  return (
    <header
      className={styles['header-row']}
      data-testid="project-header"
      role="banner"
    >
      <h1 style={{ color }}>{title}</h1>
      <a
        data-testid="code-sample-link"
        target="_blank"
        rel="noopener noreferrer"
        href={repoLink}
        aria-label={`View the code for ${title} on GitHub`}
      >
        <FontAwesomeIcon size="sm" icon={faGithub} style={{ color }} />
      </a>
    </header>
  );
};

export default Header;
