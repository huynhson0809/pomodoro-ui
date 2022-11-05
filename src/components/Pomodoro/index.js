import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';

import images from '~/assets/images';
import Button from '~/components/Button';
import useStore from '~/hooks/useStore';
import { actions } from '~/store';
import styles from './Pomodoro.module.scss';

const cx = classNames.bind(styles);

function Pomodoro({ time }) {
    const [start, setStart] = useState(false);
    const [isNext, setIsNext] = useState(false);

    const [second, setSecond] = useState(0);
    const [minutes, setMinutes] = useState(time);

    const [state, dispatch] = useStore();
    const { currentTheme } = state;

    const handleChangeThemePomo = () => {
        dispatch(actions.setTheme('pomo'));
        setSecond(0);
        if (start === true) {
            // eslint-disable-next-line no-restricted-globals
            if (confirm('The timer is still running, are you sure you want to switch?') === true) {
                setSecond(0);
                clearInterval(timer.current);
                setStart(false);
            }
        }
    };
    const handleChangeThemeShort = () => {
        dispatch(actions.setTheme('short'));
        setSecond(0);
        if (start === true) {
            // eslint-disable-next-line no-restricted-globals
            if (confirm('The timer is still running, are you sure you want to switch?') === true) {
                setSecond(0);
                clearInterval(timer.current);
                setStart(false);
            }
        }
    };
    const handleChangeThemeLong = () => {
        dispatch(actions.setTheme('long'));
        setSecond(0);
        if (start === true) {
            // eslint-disable-next-line no-restricted-globals
            if (confirm('The timer is still running, are you sure you want to switch?') === true) {
                setSecond(0);
                clearInterval(timer.current);
                setStart(false);
            }
        }
    };

    const timer = useRef();

    const handleClickStartTimer = () => {
        setStart(true);
        timer.current = setInterval(() => {
            setSecond((pre) => pre - 1);
        }, 1000);
    };

    const handleClickStop = () => {
        clearInterval(timer.current);
        setStart(false);
    };

    const handleClickNext = () => {
        clearInterval(timer.current);
        setStart(false);
        setIsNext(true);
        if (
            // eslint-disable-next-line no-restricted-globals
            confirm(
                'Are you sure you want to finish the round early? (The remaining time will not be counted in the report.)',
            ) === true
        ) {
            clearInterval(timer.current);
            setStart(false);
            if (currentTheme === 'pomo') {
                dispatch(actions.setTheme('short'));
            } else if (currentTheme === 'short') {
                dispatch(actions.setTheme('long'));
            } else if (currentTheme === 'long') {
                dispatch(actions.setTheme('pomo'));
            }
            setSecond(0);
        }
    };

    useEffect(() => {
        if (start === true) {
            if (second === 0) {
                setMinutes((pre) => pre - 1);
                setSecond(59);
            }
        }
        if (minutes === 0 && second === 0) {
            clearInterval(timer.current);
            setSecond(0);
            setMinutes(time);
            console.log(isNext);
            if (isNext === false) {
                if (currentTheme === 'pomo') {
                    dispatch(actions.setTheme('short'));
                } else if (currentTheme === 'short') {
                    dispatch(actions.setTheme('long'));
                } else if (currentTheme === 'long') {
                    dispatch(actions.setTheme('pomo'));
                }
            }
            setStart(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [second, start, minutes]);

    useEffect(() => {
        setMinutes(time);
    }, [time]);

    return (
        <div className={cx('pomodoro')}>
            <div className={cx('pomo-main')}>
                <div className={cx('status')}>
                    <Button
                        primary
                        className={cx(currentTheme === 'pomo' ? currentTheme : '')}
                        onClick={handleChangeThemePomo}
                    >
                        Pomodoro
                    </Button>
                    <Button
                        primary
                        className={cx(currentTheme === 'short' ? currentTheme : '')}
                        onClick={handleChangeThemeShort}
                    >
                        Short break
                    </Button>
                    <Button
                        primary
                        className={cx(currentTheme === 'long' ? currentTheme : '')}
                        onClick={handleChangeThemeLong}
                    >
                        Long break
                    </Button>
                </div>
                <div className={cx('timer')}>
                    <div className={cx('timer-string')}>
                        {minutes < 10 ? `0${minutes}` : minutes}:{second < 10 ? `0${second}` : second}
                    </div>
                </div>

                <div className={cx('start')}>
                    {start === false ? (
                        <Button className={cx('btn-start')} large onClick={handleClickStartTimer}>
                            START
                        </Button>
                    ) : (
                        <>
                            <Button className={cx('btn-stop')} large onClick={handleClickStop}>
                                STOP
                            </Button>
                            <div className={cx('btn-next')}>
                                <button className={cx('btn-icon-next')} onClick={handleClickNext}>
                                    <img src={images.next} alt="Next" />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className={cx('num-task')}>#0</div>
            <div className={cx('name-task')}>Listen to music</div>
        </div>
    );
}

export default Pomodoro;
