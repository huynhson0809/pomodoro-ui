import { useEffect, useState, useRef } from 'react';

const calcTimeLeft = (t) => {
    if (!t) return 0;

    const left = t - new Date().getTime();

    if (left < 0) return 0;

    return left;
};

function useCountdown(endTime) {
    const timerId = useRef();

    const [end, setEndTime] = useState(endTime);
    const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft(end));

    const handleStart = () => {
        clearInterval(timerId.current);
        timerId.current = setInterval(() => {
            setTimeLeft(calcTimeLeft(end));
        }, 1000);
    };

    const handleStop = () => {
        clearInterval(timerId.current);
    };

    useEffect(() => {
        setTimeLeft(calcTimeLeft(end));

        timerId.current = setInterval(() => {
            const targetLeft = calcTimeLeft(end);
            setTimeLeft(targetLeft);

            if (targetLeft === 0) {
                clearInterval(timerId.current);
            }
        }, 1000);

        return () => clearInterval(timerId.current);
    }, [end]);

    return [timeLeft, setEndTime];
}

export default useCountdown;
