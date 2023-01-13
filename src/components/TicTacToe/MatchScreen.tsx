import Loading from '../Loading';
import './MatchScreen.css';

const MatchScreen = () => (
  <div className="tictactoe-background">
    <div className="match-screen" data-testid="match-screen">
      <div>Waiting to find your opponent...</div>
      <Loading />
      <div className="player-selection">
        <div>
          <span>X</span>
        </div>
        <div>
          <span>O</span>
        </div>
      </div>
    </div>
  </div>
);

export default MatchScreen;
