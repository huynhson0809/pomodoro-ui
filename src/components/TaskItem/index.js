import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import styles from './TaskItem.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function TaskItem({ active1, id, title, numAct, estPomo, note, project }) {
    return (
        <div className={cx('task-item', { active: { active1 } })}>
            <div className={cx('task-title')}>
                <div className={cx('task-activity')}>
                    <span>
                        <FontAwesomeIcon icon={faCircleCheck} />
                    </span>
                    <span className={cx('title')}>{title}</span>
                </div>
                <div className={cx('task-action')}>
                    <span className={cx('current-task')}>
                        {numAct}
                        <span className={cx('sum-task')}>/ {estPomo}</span>
                    </span>
                    <Button className={cx('three-dots')} verysmall>
                        <img src={images.vertical} alt="three-dots" />
                    </Button>
                </div>
            </div>
            {note && (
                <div className={cx('notes')}>
                    <p>{note}</p>
                </div>
            )}
        </div>
    );
}

export default TaskItem;
