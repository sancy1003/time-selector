import { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';

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

interface PropsType {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}

const CANVAS_WIDTH = 120;
const CANVAS_HEIGHT = 120;

const Clock = ({ time, setTime }: PropsType) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  const setTimeByMousePosition = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const canvasRect = canvas.getBoundingClientRect();
    const posX = event.clientX - canvasRect.left - 60;
    const posY = event.clientY - canvasRect.top - 60;

    const angle = getAngleByPosition(posX, posY);
    const newTime = getTimeByAngle(angle);

    setTime(newTime);
  };

  const getAngleByPosition = (x: number, y: number) => {
    let angle = 0;

    if (x >= 0) {
      angle = 90 + Math.atan(y / x) * (180 / Math.PI);
    } else {
      angle = 270 + Math.atan(y / x) * (180 / Math.PI);
    }

    return angle;
  };

  const getTimeByAngle = (angle: number) => {
    let time = Math.round(angle / 0.25);

    // 시간을 5분 단위로 나타내기 위해 보정합니다.
    const unit = 5;
    if (time % unit <= unit / 2) {
      time = time - (time % unit);
    } else {
      time = time + (unit - (time % unit));
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
