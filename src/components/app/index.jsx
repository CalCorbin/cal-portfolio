import React from 'react';
import NavigationRoutes from '../navigation';
import { withFirebase } from '../Firebase';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavigationRoutes />
      </div>
    );
  }
}

export default withFirebase(App);
