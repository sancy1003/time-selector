import { styled } from 'styled-components';
import TimeController from './components/TimeController';
import { useState } from 'react';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const [time] = useState(150);
  const handleTime = () => {
    return true;
  };

  return (
    <Container>
      <TimeController viewerTime={Math.floor(time / 60)} handleUpButton={handleTime} handleDownButton={handleTime} />
    </Container>
  );
}

export default App;
