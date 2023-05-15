import { styled } from 'styled-components';
import TimeController from './components/TimeController';
import { useState } from 'react';
import Clock from './components/Clock';

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 40px;
`;

const TimeControllerWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 12px;
`;

const TimePeriodViewer = styled.div`
  width: 32px;
  font-size: 18px;
  text-align: center;
  font-weight: bold;
`;

function App() {
  const [time, setTime] = useState(0);

  const handleTime = (changeTime: number) => {
    const MIN_TIME = 0;
    const MAX_TIME = 1440;
    const newTime = time + changeTime;

    if (newTime < MIN_TIME) setTime(MAX_TIME + newTime);
    else if (newTime >= MAX_TIME) setTime(newTime - MAX_TIME);
    else setTime(newTime);
  };

  return (
    <Layout>
      <Clock time={time} />
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
      <TimePeriodViewer>{time >= 720 ? 'PM' : 'AM'}</TimePeriodViewer>
    </Layout>
  );
}

export default App;
