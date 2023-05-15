import { styled } from 'styled-components';
import TimeController from './components/TimeController';
import { useState } from 'react';
import Clock from './components/Clock';

const UNIT_OF_TIME = 5; // 분 변경 단위

const App = () => {
  // 시간을 분 단위로 관리합니다.
  const [time, setTime] = useState(0);

  const handleTime = (changeTime: number) => {
    const minTime = 0;
    const maxTime = 1440;

    const newTime = time + changeTime;

    if (newTime < minTime) {
      setTime(maxTime + newTime);
    } else if (newTime >= maxTime) {
      setTime(newTime - maxTime);
    } else {
      setTime(newTime);
    }
  };

  return (
    <Layout>
      <Clock time={time} setTime={setTime} unitOfTime={UNIT_OF_TIME} />
      <TimeControllerWrapper>
        <TimeController
          viewerTime={Math.floor(time / 60)}
          handleUpButton={() => handleTime(60)}
          handleDownButton={() => handleTime(-60)}
        />
        <span>:</span>
        <TimeController
          viewerTime={time % 60}
          handleUpButton={() => handleTime(UNIT_OF_TIME)}
          handleDownButton={() => handleTime(-UNIT_OF_TIME)}
        />
      </TimeControllerWrapper>
      <TimePeriodViewer>{time >= 720 ? 'PM' : 'AM'}</TimePeriodViewer>
    </Layout>
  );
};

export default App;

// style code

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
