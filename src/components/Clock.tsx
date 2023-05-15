import { useEffect, useRef } from 'react';
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
`;

interface PropsType {
  time: number;
}

const CANVAS_WIDTH = 120;
const CANVAS_HEIGHT = 120;

const Clock = ({ time }: PropsType) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawClockHnad = (time: number) => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    const length = 3.5; // px
    const degree = time * 0.25 - 90;
    const centerX = CANVAS_WIDTH / 2;
    const centerY = CANVAS_HEIGHT / 2;
    const posX = Math.cos(degree * (Math.PI / 180)) * (length * 10) + centerX;
    const posY = Math.sin(degree * (Math.PI / 180)) * (length * 10) + centerY;

    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = '#81EAD0';
    context.moveTo(centerX, centerY);
    context.lineTo(posX, posY);
    context.stroke();
    context.closePath();
  };

  useEffect(() => {
    drawClockHnad(time);
  }, [time]);

  return (
    <Container>
      <ClockWrapper>
        <ClockDot />
        <ClockCanvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
        <ClockImage src="images/clock.svg" alt="clock" />
      </ClockWrapper>
    </Container>
  );
};

export default Clock;
