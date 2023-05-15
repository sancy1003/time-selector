import { styled } from 'styled-components';
import TimeController from './components/TimeController';
import { useState } from 'react';
import Clock from './components/Clock';

const UNIT_OF_TIME = 5; // 분 변경 단위

const App = () => {
  // 시간을 분 단위로 관리합니다. (0 ~ 1439)
  const [time, setTime] = useState(0);

  return (
    <Layout>
      <Clock time={time} setTime={setTime} unitOfTime={UNIT_OF_TIME} />
      <TimeControllerWrapper>
        <TimeController type="HOUR" time={time} setTime={setTime} unitOfTimeChange={60} />
        <span>:</span>
        <TimeController type="MINUTES" time={time} setTime={setTime} unitOfTimeChange={UNIT_OF_TIME} />
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
