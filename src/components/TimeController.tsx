import { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';

interface PropsType {
  viewerTime: number;
  handleUpButton: () => void;
  handleDownButton: () => void;
}

type PressedButtonType = 'UP' | 'DOWN' | 'NONE';

const DEFAULT_INTERVAL_CYCLE = 200;

const TimeController = ({ viewerTime, handleUpButton, handleDownButton }: PropsType) => {
  const [pressedButton, setPressedButton] = useState<PressedButtonType>('NONE');
  const pressedTime = useRef(0);
  const intervalCycle = useRef(DEFAULT_INTERVAL_CYCLE);

  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : `${time}`;
  };

  const executeButtonEvent = (pressedButton: PressedButtonType) => {
    if (pressedButton === 'UP') handleUpButton();
    if (pressedButton === 'DOWN') handleDownButton();
  };

  const initControllerState = () => {
    setPressedButton('NONE');
    pressedTime.current = 0;
    intervalCycle.current = DEFAULT_INTERVAL_CYCLE;
  };

  const handleMouseDown = (pressedButton: PressedButtonType) => {
    executeButtonEvent(pressedButton);
    setPressedButton(pressedButton);
  };

  // 사용자가 버튼을 길게 누르면 이벤트가 반복 실행되며 누르고 있는 시간이 길어질수록 이벤트 실행 주기가 빨라집니다.
  const handleInterval = () => {
    if (pressedTime.current > 300) {
      executeButtonEvent(pressedButton);
    }

    pressedTime.current += intervalCycle.current;
    if (pressedTime.current > 1000 && intervalCycle.current > 100) intervalCycle.current -= 10;
  };

  useEffect(() => {
    if (pressedButton !== 'NONE') {
      const interval = setInterval(handleInterval, intervalCycle.current);
      return () => clearInterval(interval);
    }
  }, [pressedButton, viewerTime]);

  return (
    <Container>
      <ControlButton
        onMouseDown={() => handleMouseDown('UP')}
        onMouseUp={initControllerState}
        onMouseLeave={initControllerState}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.2929 7.29289C11.6834 6.90237 12.3166 6.90237 12.7071 7.29289L18.7071 13.2929C19.0976 13.6834 19.0976 14.3166 18.7071 14.7071C18.3166 15.0976 17.6834 15.0976 17.2929 14.7071L12 9.41421L6.70711 14.7071C6.31658 15.0976 5.68342 15.0976 5.29289 14.7071C4.90237 14.3166 4.90237 13.6834 5.29289 13.2929L11.2929 7.29289Z"
            fill="#7E818A"
          />
        </svg>
      </ControlButton>
      <TimeViewer>{formatTime(viewerTime)}</TimeViewer>
      <ControlButton
        onMouseDown={() => handleMouseDown('DOWN')}
        onMouseUp={initControllerState}
        onMouseLeave={initControllerState}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z"
            fill="#7E818A"
          />
        </svg>
      </ControlButton>
    </Container>
  );
};

export default TimeController;

// style code

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
`;

const ControlButton = styled.button`
  width: fit-content;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    path {
      fill: #ffffff;
    }
  }
`;

const TimeViewer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 42px;
  color: #ffffff;
  background: #262c33;
  border-radius: 8px;
`;
