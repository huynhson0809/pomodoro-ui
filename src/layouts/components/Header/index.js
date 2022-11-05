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
import AddTask from '~/components/AddTask';
import Pomodoro from '~/components/Pomodoro';

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

    const [showAddTodo, setShowAddTodo] = useState(false);
    const [estPomodo, setEstPomodo] = useState(1);

    const handleCloseReport = () => setShowReport(false);
    const handleCloseSetting = () => setShowSetting(false);

    const handleShowReport = () => setShowReport(true);
    const handleShowSetting = () => setShowSetting(true);

    const currentUser = true;
    const inputRef = useRef();

    const [state, dispatch] = useStore();
    const { todos, todoInput, estPomo, note, project, currentTheme, pomodoro, shorBreak, longBreak } = state;

    const classes = cx('wrapper', {
        [currentTheme]: currentTheme,
    });

    const handleSaveTodo = () => {
        if (!todoInput) {
            return;
        }
        dispatch(actions.saveAddTodo({ todoInput, estPomodo, note }));
        dispatch(actions.setTodoInput(''));
        dispatch(actions.setValueNote(''));
        setEstPomodo(1);
        dispatch(actions.setEstInput(1));
        inputRef.current.focus();
    };

    useEffect(() => {
        console.log(todoInput);
        console.log(estPomo);
    });

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
                    {/* pomodoro */}
                    {currentTheme === 'pomo' ? (
                        <Pomodoro time={pomodoro} />
                    ) : (
                        <Pomodoro time={currentTheme === 'short' ? shorBreak : longBreak} />
                    )}
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
                                <AddTask />
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
