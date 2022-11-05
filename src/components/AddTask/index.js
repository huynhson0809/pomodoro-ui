import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useRef, useState } from 'react';

import images from '~/assets/images';
import Button from '~/components/Button';
import useStore from '~/hooks/useStore';
import { actions } from '~/store';
import styles from './AddTask.module.scss';

const cx = classNames.bind(styles);

function AddTask() {
    const [showNote, setShowNote] = useState(false);
    const inputRef = useRef();
    const [state, dispatch] = useStore();
    const { todoInput, note } = state;
    console.log(note);

    const handleChangeEst = (value) => {
        dispatch(actions.setEstInput(value));
    };

    const [estPomodo, setEstPomodo] = useState(1);

    const handleChangeInput = (value) => {
        dispatch(actions.setTodoInput(value));
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

    const handleChangeNote = (value) => {
        dispatch(actions.setValueNote(value));
    };

    return (
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
                {showNote ? (
                    <div className={cx('show-note')}>
                        <textarea
                            className={cx('add-note')}
                            placeholder="Some notes..."
                            value={note}
                            onChange={(e) => handleChangeNote(e.target.value)}
                        ></textarea>
                    </div>
                ) : (
                    <Button primary onClick={() => setShowNote(true)}>
                        + Add note
                    </Button>
                )}
                <Button primary rightIcon={<FontAwesomeIcon icon={faLock} />}>
                    + Add project
                </Button>
            </div>
        </div>
    );
}

export default AddTask;
