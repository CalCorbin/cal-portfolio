import React from 'react';

const FirebaseContext = React.createContext(null);

/* istanbul ignore next */
export const withFirebase = (Component) => (props) =>
  (
    <FirebaseContext.Consumer>
      {(firebase) => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
  );

export default FirebaseContext;
