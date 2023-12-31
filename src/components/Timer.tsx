import Button from 'react-bootstrap/Button';
import useScreenSize from 'hooks/useScreenSize';
import timerIcon from '../../public/timer-svgrepo-com.svg';
import btnSound from '../sounds/button-sound.mp3';
import breakSound from '../sounds/break.mp3';
import { useEffect, useState } from 'react';

type TimerProps = {
  timeInSeconds: number;
};

export default function Timer({ timeInSeconds }: TimerProps) {
  const [time, setTime] = useState(timeInSeconds);
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [intervalId, setIntervalId] = useState(0);
  const [screenSize, _setScreenSize] = useScreenSize();
  const btnAudio = new Audio(btnSound);
  const breakAudio = new Audio(breakSound);

  useEffect(() => {
    if (time <= 0) {
      stopTimer();
      breakAudio.play();
    }
  });

  function startTimer() {
    btnAudio.play();
    setIsTimerStarted(!isTimerStarted);

    const intervalId = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    setIntervalId(intervalId);
  }

  function stopTimer() {
    btnAudio.play();
    setIsTimerStarted(!isTimerStarted);
    clearInterval(intervalId);
    resetTimer();
  }

  function resetTimer() {
    setTime(timeInSeconds);
  }

  function formatTime() {
    const minutes = Number.parseInt(((time / 60) % 60).toString(), 10);
    const seconds = Number.parseInt((time % 60).toString(), 10);

    return {
      minutes,
      seconds,
    };
  }

  return (
    <>
      {isTimerStarted ? (
        <Button variant="danger" onClick={stopTimer}>
          {screenSize.width < 800 ? (
            <img width={24} src={timerIcon} />
          ) : (
            'Stop Timer'
          )}
        </Button>
      ) : (
        <Button onClick={startTimer}>
          {screenSize.width < 800 ? (
            <img width={24} src={timerIcon} />
          ) : (
            'Start Timer'
          )}
        </Button>
      )}
      <h5 className="my-auto">
        {`${formatTime().minutes.toString().padStart(2, '0')}:${formatTime()
          .seconds.toString()
          .padStart(2, '0')}`}
      </h5>
    </>
  );
}
