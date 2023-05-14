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

const TimeControllerWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 12px;
`;

function App() {
  const [time, setTime] = useState(515);

  const handleTime = (changeTime: number) => {
    const maxTime = 1440;
    const newTime = time + changeTime;

    if (newTime < 0) {
      setTime(maxTime + newTime);
    } else if (newTime >= maxTime) {
      setTime(newTime - maxTime);
    } else {
      setTime(newTime);
    }
  };

  return (
    <Container>
      <TimeControllerWrapper>
        <TimeController
          viewerTime={Math.floor(time / 60)}
          handleUpButton={() => handleTime(60)}
          handleDownButton={() => handleTime(-60)}
        />
        <span>:</span>
        <TimeController
          viewerTime={time % 60}
          handleUpButton={() => handleTime(5)}
          handleDownButton={() => handleTime(-5)}
        />
      </TimeControllerWrapper>
    </Container>
  );
}

export default App;
