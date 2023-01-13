import Loading from '../Loading';
import './MatchScreen.css';

const MatchScreen = () => (
  <div className="tictactoe-background">
    <div className="match-screen" data-testid="match-screen">
      <div>Finding an opponent...</div>
      <Loading />
    </div>
  </div>
);

export default MatchScreen;
