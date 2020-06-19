import React from 'react';
import ConstructionSign from '../components/construction-sign';
import Background from '../assets/sean-foley-3-unsplash.jpg';
import NavButton from '../components/nav-button';

function LandingPage() {
  return (
    process.env.REACT_APP_NODE_ENV === 'production'
      ? <ConstructionSign />
      : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'gray',
          height: '100vh',
          overflow: 'hidden',
        }}
        >
          <div id="landing-image-header">
            <div
              alt="hongkong"
              style={{
                background: `url(${Background})`,
                backgroundSize: 'cover',
                width: '100%',
                opacity: '0.5',
                height: '79vh',
                display: 'inline-block',
              }}
            />
            <div style={{
              position: 'absolute',
              color: 'white',
              fontSize: '2.1em',
              textTransform: 'uppercase',
              top: '10%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontFamily: 'monospace',
              letterSpacing: '6px',
              whiteSpace: 'nowrap',
              textAlign: 'center',
            }}
            >
              cal corbin
              <br />
              <br />
              coder | creator
            </div>
          </div>
          <div id="landing-navigation" style={{ position: 'relative', bottom: '0' }}>
            <NavButton buttonText="About" />
            <NavButton buttonText="Work" />
          </div>
        </div>

      )
  );
}

export default LandingPage;
