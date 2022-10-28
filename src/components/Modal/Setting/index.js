import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Setting.module.scss';
import classNames from 'classnames/bind';

import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Setting({ handleCloseReport }) {
    const [alarmSound, setAlarmSound] = useState('Kitchen');
    const [alarmValue, setAlarmValue] = useState(60);
    const [tickingSound, setTickingSound] = useState('None');
    const [tickingValue, setTickingValue] = useState(52);

    const [pomodoro, setPomodoro] = useState(25);
    const [shortBreak, setShortBreak] = useState(5);
    const [longBreak, setLongBreak] = useState(50);
    return (
        <div className={cx('modal-report')}>
            <div className="modal-heading">
                <span>TIMER SETTING</span>
                <Button
                    verysmall
                    leftIcon={<FontAwesomeIcon icon={faXmark} />}
                    className={cx('btn-close-custom')}
                    onClick={handleCloseReport}
                />
            </div>
            <div className={cx('timer')}>
                <div className="set-timer">
                    <div className="set">
                        <span>Time (minutes)</span>
                        <div className="set-time">
                            <div className="set-pomo">
                                <label className="pomo">Pomodoro</label>
                                <input type="number" min="0" step="1" className="pomo-input" value={pomodoro}></input>
                            </div>
                            <div className="set-pomo">
                                <label className="pomo">Short Break</label>
                                <input type="number" min="0" step="1" className="pomo-input" value={shortBreak}></input>
                            </div>
                            <div className="set-pomo">
                                <label className="pomo">Long Break</label>
                                <input type="number" min="0" step="1" className="pomo-input" value={longBreak}></input>
                            </div>
                        </div>
                    </div>
                    <div className="auto-start-break set">
                        <span>Auto start Breaks?</span>
                        <div className="set-auto-start">
                            <div className="circle"></div>
                        </div>
                    </div>
                    <div className="auto-start-break set">
                        <span>Auto start Pomodoros?</span>
                        <div className="set-auto-start">
                            <div className="circle"></div>
                        </div>
                    </div>
                    <div className="auto-start-break set">
                        <span>Long Break Interval</span>
                        <input type="number" min="1" step="1" width="70" className="long-break" value="4" />
                    </div>

                    <div className="set alarm-sound">
                        <div className="auto-start-break">
                            <span>Alarm Sound</span>
                            <div className="choose-alarm">{alarmSound}</div>
                        </div>
                        <div className="alarm-range">
                            <div className="alarm-wrapper">
                                <span>{alarmValue}</span>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    class="alarm-input-range"
                                    id="myRange"
                                    value="60"
                                ></input>
                            </div>
                        </div>
                        <div className="alarm-repeat">
                            Repeat
                            <input type="number" min="1" step="1" class="alarm-input-repeat" value="1" />
                        </div>
                    </div>
                    <div className="set alarm-sound">
                        <div className="auto-start-break">
                            <span>Ticking Sound</span>
                            <div className="choose-alarm">{tickingSound}</div>
                        </div>
                        <div className="alarm-range">
                            <div className="alarm-wrapper">
                                <span>{tickingValue}</span>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    class="alarm-input-range"
                                    id="myRange"
                                    value="60"
                                ></input>
                            </div>
                        </div>
                    </div>
                    <div className="set alarm-sound">
                        <div className="auto-start-break">
                            <span>Hour Format</span>
                            <div className="choose-alarm">{tickingSound}</div>
                        </div>
                    </div>
                    <div className="set auto-start-break">
                        <span>Dark Mode when running</span>
                        <div className="set-auto-start">
                            <div className="circle"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Setting;
