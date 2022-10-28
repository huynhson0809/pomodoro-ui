import classNames from 'classnames/bind';
import styles from './Blog.module.scss';

const cx = classNames.bind(styles);
function Blog({ Heading = 'h2', headContent, TagContent = 'p', isOl = false, contentP, contentList = [] }) {
    return (
        <div className={cx('wrapper')}>
            <Heading className={cx('heading')}>{headContent}</Heading>
            {TagContent === 'p' ? (
                <p className={cx('content')}>{contentP}</p>
            ) : (
                <>
                    {isOl === false ? (
                        <ul className={cx('content-list')}>
                            {contentList &&
                                contentList.length > 0 &&
                                contentList.map((item, index) => {
                                    return (
                                        <li key={index} className={cx('content-item')}>
                                            {item}
                                        </li>
                                    );
                                })}
                        </ul>
                    ) : (
                        <ol className={cx('content-list')}>
                            {contentList &&
                                contentList.length > 0 &&
                                contentList.map((item, index) => {
                                    return (
                                        <li key={index} className={cx('content-item')}>
                                            {item}
                                        </li>
                                    );
                                })}
                        </ol>
                    )}
                </>
            )}
        </div>
    );
}

export default Blog;
