import { useQuery, gql } from '@apollo/client';
import Ship from '../../components/Ship/Ship';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';
import { IShip } from '../../components/Ship/ShipInterface';
import styles from './SpaceX.module.css';

export const GET_SHIPS = gql`
  query {
    ships {
      id
      name
      home_port
      image
      active
      weight_lbs
      url
      missions {
        flight
        name
      }
    }
  }
`;

const SpaceX = () => {
  const { loading, error, data } = useQuery(GET_SHIPS);

  if (loading) return <Loading />;
  if (error) return <p data-testid="error-state">Error...</p>;

  return (
    <div data-testid="spacex-page" className={styles['spacex-page']}>
      <Header
        title="SpaceX Marine Transport Ships"
        repoLink="https://github.com/CalCorbin/cal-portfolio/tree/master/src/components/SpaceX/SpaceX.tsx"
      />
      <hr />
      <div className={styles['ship-container']}>
        {data.ships.map((ship: IShip['ship']) => (
          <Ship key={ship.id} ship={ship} />
        ))}
      </div>
    </div>
  );
};

export default SpaceX;
