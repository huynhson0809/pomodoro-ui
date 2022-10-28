/* eslint-disable jsx-a11y/img-redundant-alt */
import { faLock, faRightFromBracket, faRocket, faTrashCan, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import Countdown from 'react-countdown';

import images from '~/assets/images';
import Button from '~/components/Button';
import TaskItem from '~/components/TaskItem';
import useStore from '~/hooks/useStore';
import { actions } from '~/store';
import styles from './Header.module.scss';

import Menu from '~/components/Popper/Menu';

const cx = classNames.bind(styles);

const userMenu = [
    { icon: <FontAwesomeIcon icon={faUser} />, title: 'Profile', small: true },
    { icon: <FontAwesomeIcon icon={faRocket} />, title: 'Get coins', small: true },
    { icon: <FontAwesomeIcon icon={faTrashCan} />, title: 'Delete Account', small: true },
    { icon: <FontAwesomeIcon icon={faRightFromBracket} />, title: 'Log out', separate: true, small: true },
];

const actionMenu = [
    { icon: <FontAwesomeIcon icon={faUser} />, title: 'Clear finished tasks', small: true },
    { icon: <FontAwesomeIcon icon={faRocket} />, title: 'Clear act pomodoros', small: true },
    { icon: <FontAwesomeIcon icon={faTrashCan} />, title: 'Save as template', small: true },
    { icon: <FontAwesomeIcon icon={faRightFromBracket} />, title: 'Clear all tasks', separate: true, small: true },
];

function Header() {
    const [showReport, setShowReport] = useState(false);
    const [showSetting, setShowSetting] = useState(false);
    const [start, setStart] = useState(false);
    const [isRun, setIsRun] = useState(false);
    const [showAddTodo, setShowAddTodo] = useState(false);
    const [estPomodo, setEstPomodo] = useState(1);

    const handleCloseReport = () => setShowReport(false);
    const handleCloseSetting = () => setShowSetting(false);

    const handleShowReport = () => setShowReport(true);
    const handleShowSetting = () => setShowSetting(true);
    const currentUser = true;
    const inputRef = useRef();

    const [state, dispatch] = useStore();
    const {
        todos,
        todoInput,
        estPomo,
        note,
        project,
        themes,
        currentTheme,
        pomodoro,
        shorBreak,
        longBreak,
        currentTime,
    } = state;

    const classes = cx('wrapper', {
        [currentTheme]: currentTheme,
    });

    const handleChangeThemePomo = () => {
        dispatch(actions.setTheme('pomo'));
        dispatch(actions.setCurrentTime(25));
    };
    const handleChangeThemeShort = () => {
        dispatch(actions.setTheme('short'));
        dispatch(actions.setCurrentTime(5));
    };
    const handleChangeThemeLong = () => {
        dispatch(actions.setTheme('long'));
        dispatch(actions.setCurrentTime(15));
    };

    const handleChangeInput = (value) => {
        dispatch(actions.setTodoInput(value));
    };

    const handleChangeEst = (value) => {
        dispatch(actions.setEstInput(value));
    };

    const handleSaveTodo = () => {
        if (!todoInput) {
            return;
        }
        dispatch(actions.saveAddTodo({ todoInput, estPomodo }));
        dispatch(actions.setTodoInput(''));
        setEstPomodo(1);
        dispatch(actions.setEstInput(1));
        inputRef.current.focus();
    };

    const handleUpEst = () => {
        if (estPomodo >= 1) {
            setEstPomodo(estPomodo + 1);
        } else if (estPomodo < 1) {
            setEstPomodo(estPomodo + 0.1);
        }
        handleChangeEst(estPomodo);
    };

    const handleDownEst = () => {
        if (estPomodo > 1) {
            setEstPomodo(estPomodo - 1);
        } else if (estPomodo <= 1 && estPomodo >= 0.1) setEstPomodo(estPomodo - 0.1);
        if (estPomodo > 0 && estPomodo < 0.2) setEstPomodo(0);
        handleChangeEst(estPomodo);
    };

    const Completionist = () => <span>You are good to go!</span>;
    // Renderer callback with condition
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <Completionist />;
        } else {
            // Render a countdown
            return (
                <span>
                    {minutes > 9 ? minutes : '0' + minutes}:{seconds > 9 ? seconds : '0' + seconds}
                </span>
            );
        }
    };

    useEffect(() => {
        console.log(todoInput);
        console.log(estPomo);
    });

    //timer
    // let endTime = new Date().getTime();
    // if (start) {
    //     endTime = +60000 * 25; // 2 minutes
    // }
    // const [timeLeft, setEndTime] = useCountdown(endTime);

    // const minutes = Math.floor(timeLeft / 60000) % 60;
    // const seconds = Math.floor(timeLeft / 1000) % 60;

    //add todo
    const handleClickAddTodo = () => {
        setShowAddTodo(true);
    };

    return (
        <header className={classes}>
            <div className={cx('inner')}>
                <div className={cx('header')}>
                    <h1 className={cx('logo')}>
                        <a href="/">
                            <img className={cx('logo-icon')} src={images.iconLogo} alt="logo-pomodoro" />
                            Pomofocus
                        </a>
                    </h1>
                    <span className={cx('actions')}>
                        <Button className={cx('btn')} small onClick={handleShowReport}>
                            <img className={cx('actions-icon')} src={images.graph} alt="report"></img>
                            <div>Report</div>
                        </Button>

                        <Button className={cx('btn')} small onClick={handleShowSetting}>
                            <img className={cx('actions-icon')} src={images.config} alt="setting"></img>
                            <div>Setting</div>
                        </Button>

                        {/* modal report */}
                        {/* <Modal show={showReport} onHide={handleCloseReport}>
                            <Modal.Body>
                                <Report handleCloseReport={handleCloseReport} />
                            </Modal.Body>
                        </Modal>

                        <Modal show={showSetting} onHide={handleCloseSetting}>
                            <Modal.Body>
                                <Setting handleCloseReport={handleCloseSetting} />
                            </Modal.Body>
                            <div className="close-timer">
                                <Button verysmall className="btn-close1" onClick={handleCloseSetting}>
                                    OK
                                </Button>
                            </div>
                        </Modal> */}

                        {currentUser ? (
                            <>
                                <Menu items={userMenu}>
                                    <div className={cx('user')}>
                                        <img src={images.userAvatar} alt="user picture" />
                                    </div>
                                </Menu>
                            </>
                        ) : (
                            <Button className={cx('btn')} small>
                                <img className={cx('actions-icon')} src={images.user} alt="login"></img>
                                <div>Login</div>
                            </Button>
                        )}
                    </span>
                </div>
                <div className={cx('content')}>
                    <div className={cx('pomodoro')}>
                        <div className={cx('pomo-main')}>
                            <div className={cx('status')}>
                                <Button className={cx('active1')} primary onClick={handleChangeThemePomo}>
                                    Pomodoro
                                </Button>
                                <Button className={cx('active2')} primary onClick={handleChangeThemeShort}>
                                    Short break
                                </Button>
                                <Button className={cx('active3')} primary onClick={handleChangeThemeLong}>
                                    Long break
                                </Button>
                            </div>
                            <div className={cx('timer')}>
                                {/* {start === false && isRun === false ? (
                                    '25:00'
                                ) : (
                                    <span>
                                        {minutes > 9 ? minutes : '0' + minutes}:{seconds > 9 ? seconds : '0' + seconds}
                                    </span>
                                )} */}
                                <Countdown date={Date.now() + 60000 * currentTime} renderer={renderer} autoStart={true}>
                                    <Completionist />
                                </Countdown>
                            </div>
                            <div className={cx('start')}>
                                {start === false ? (
                                    <Button
                                        className={cx('btn-start')}
                                        large
                                        onClick={() => {
                                            setStart(true);
                                            setIsRun(true);
                                        }}
                                    >
                                        START
                                    </Button>
                                ) : (
                                    <>
                                        <Button className={cx('btn-stop')} large onClick={() => setStart(false)}>
                                            STOP
                                        </Button>
                                        <div class={cx('btn-next')}>
                                            <button class={cx('btn-icon-next')}>
                                                <img src={images.next} />
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className={cx('num-task')}>#0</div>
                        <div className={cx('name-task')}>Listen to music</div>
                    </div>
                    <div className={cx('add-task')}>
                        <div className={cx('heading')}>
                            <span className={cx('heading-task')}>Tasks</span>
                            <div className={cx('heading-actions')}>
                                <Menu items={actionMenu}>
                                    <div>
                                        <Button className={cx('three-dots')} verysmall>
                                            <img src={images.threeDots} alt="three-dots" />
                                        </Button>
                                    </div>
                                </Menu>
                            </div>
                        </div>
                        <div className={cx('show-tasks')}>
                            {todos &&
                                todos.length > 0 &&
                                todos.map((item) => {
                                    return (
                                        <TaskItem
                                            key={item.id}
                                            active={item.active1}
                                            title={item.title}
                                            numAct={item.numAct}
                                            estPomo={item.estPomo}
                                            note={item.note}
                                            project={item.project}
                                        />
                                    );
                                })}
                        </div>
                        {!showAddTodo ? (
                            <div className={cx('add-task-btn')}>
                                <Button onClick={handleClickAddTodo}>
                                    <img src={images.plusCircle} alt="plus-circle" />
                                    <span>Add Task</span>
                                </Button>
                            </div>
                        ) : (
                            <div className={cx('add-todo-input')}>
                                <div className={cx('add-todo-heading')}>
                                    <div className={cx('input')}>
                                        <input
                                            ref={inputRef}
                                            value={todoInput}
                                            placeholder="What are you working on?"
                                            onChange={(e) => handleChangeInput(e.target.value)}
                                        />
                                    </div>
                                    <div className={cx('est-pomo')}>
                                        <div className={cx('est-title')}>Est pomodoros</div>
                                        <div className={cx('est-input')}>
                                            <input
                                                id="input_est_pomodoro"
                                                type="number"
                                                min="0"
                                                step="1"
                                                value={estPomodo < 10 ? estPomodo.toPrecision(1) : estPomodo}
                                            />
                                            <Button verysmall onClick={handleUpEst}>
                                                <img src={images.caretUp} alt="caretUp" />
                                            </Button>
                                            <Button verysmall onClick={handleDownEst}>
                                                <img src={images.caretDown} alt="caretDown" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className={cx('action-note-project')}>
                                        <Button primary>+ Add note</Button>
                                        <Button primary rightIcon={<FontAwesomeIcon icon={faLock} />}>
                                            + Add project
                                        </Button>
                                    </div>
                                </div>
                                <div className={cx('action-save-close')}>
                                    <Button
                                        primary
                                        className={cx('action-close')}
                                        onClick={() => setShowAddTodo(false)}
                                    >
                                        Cancle
                                    </Button>
                                    <Button primary className={cx('action-save')} onClick={handleSaveTodo}>
                                        Save
                                    </Button>
                                </div>
                            </div>
                        )}
                        <div className={cx('infor-task')}>
                            <div className={cx('infor-container')}>
                                <div className={cx('infor')}>
                                    Est:
                                    <span className={cx('inf-num')}>2</span>
                                </div>
                                <div className={cx('infor')}>
                                    Act:
                                    <span className={cx('inf-num')}>0</span>
                                </div>
                                <div className={cx('infor')}>
                                    Finish at:
                                    <span className={cx('inf-num')}>16:19</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
