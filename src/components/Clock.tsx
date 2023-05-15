import { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';

interface PropsType {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  unitOfTime: number;
}

const CANVAS_WIDTH = 120;
const CANVAS_HEIGHT = 120;

const Clock = ({ time, setTime, unitOfTime }: PropsType) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // time 값을 기준으로 각도를 구하고 canvas에 시계 침을 그립니다.
  const drawClockHnad = (time: number) => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    const length = 35; // px
    const degree = time * 0.25 - 90;
    const centerX = CANVAS_WIDTH / 2;
    const centerY = CANVAS_HEIGHT / 2;
    const posX = Math.cos(degree * (Math.PI / 180)) * length + centerX;
    const posY = Math.sin(degree * (Math.PI / 180)) * length + centerY;

    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = '#81EAD0';
    context.moveTo(centerX, centerY);
    context.lineTo(posX, posY);
    context.stroke();
    context.closePath();
  };

  // canvas에서 마우스 이벤트가 발생하면 마우스 포인터의 좌표와 각도를 계산해 time 값을 구합니다.
  const setTimeByMousePosition = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const canvasRect = canvas.getBoundingClientRect();
    const posX = event.clientX - canvasRect.left - CANVAS_WIDTH / 2;
    const posY = event.clientY - canvasRect.top - CANVAS_HEIGHT / 2;

    const degree = getDegreeByPosition(posX, posY);
    const newTime = getTimeByAngle(degree);

    setTime(newTime);
  };

  const getDegreeByPosition = (x: number, y: number) => {
    let degree = 0;

    if (x >= 0) {
      degree = 90 + Math.atan(y / x) * (180 / Math.PI);
    } else {
      degree = 270 + Math.atan(y / x) * (180 / Math.PI);
    }

    return degree;
  };

  const getTimeByAngle = (degree: number) => {
    let time = Math.round(degree / 0.25);

    // 시간을 5분 단위로 나타내기 위해 보정합니다.
    if (time % unitOfTime <= unitOfTime / 2) {
      time = time - (time % unitOfTime);
    } else {
      time = time + (unitOfTime - (time % unitOfTime));
    }

    return time;
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setIsMouseDown(true);
    setTimeByMousePosition(event);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!isMouseDown) return;
    setTimeByMousePosition(event);
  };

  useEffect(() => {
    drawClockHnad(time);
  }, [time]);

  return (
    <Container>
      <ClockWrapper>
        <ClockDot />
        <ClockCanvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={() => setIsMouseDown(false)}
          onMouseLeave={() => setIsMouseDown(false)}
        />
        <ClockImage src="images/clock.svg" alt="clock" />
      </ClockWrapper>
    </Container>
  );
};

export default Clock;

// style code

const Container = styled.div``;

const ClockWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #fff;
`;

const ClockCanvas = styled.canvas`
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 50%;
  z-index: 2;
  cursor: pointer;
`;

const ClockImage = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
`;

const ClockDot = styled.span`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #9999a1;
  z-index: 3;
  pointer-events: none;
`;
