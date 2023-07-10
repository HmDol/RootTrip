import { useState, useEffect, useRef, useCallback } from 'react';

const useTimer = (initialTime = 180) => {
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime - 1;

          if (newTime === 0) {
            // setIsActive(false);
            setIsCompleted(true);
            clearInterval(intervalRef.current);
          }

          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive]);

  const startTimer = useCallback(() => {
    setIsActive(true);
  }, []);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setIsCompleted(false);
    setTime(initialTime);
  }, [initialTime]);

  return {
    time,
    isActive,
    isCompleted,
    startTimer,
    resetTimer,
  };
};

export default useTimer;
