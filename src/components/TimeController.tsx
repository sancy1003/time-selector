import { styled } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const ControlButton = styled.button`
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

interface PropsType {
  viewerTime: number;
  handleUpButton: () => void;
  handleDownButton: () => void;
}

const TimeController = ({ viewerTime, handleUpButton, handleDownButton }: PropsType) => {
  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : `${time}`;
  };

  return (
    <Container>
      <ControlButton onClick={handleUpButton}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.2929 7.29289C11.6834 6.90237 12.3166 6.90237 12.7071 7.29289L18.7071 13.2929C19.0976 13.6834 19.0976 14.3166 18.7071 14.7071C18.3166 15.0976 17.6834 15.0976 17.2929 14.7071L12 9.41421L6.70711 14.7071C6.31658 15.0976 5.68342 15.0976 5.29289 14.7071C4.90237 14.3166 4.90237 13.6834 5.29289 13.2929L11.2929 7.29289Z"
            fill="#7E818A"
          />
        </svg>
      </ControlButton>
      <TimeViewer>{formatTime(viewerTime)}</TimeViewer>
      <ControlButton onClick={handleDownButton}>
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
