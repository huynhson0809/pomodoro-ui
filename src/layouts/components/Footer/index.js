import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);
function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('sitemap')}>
                <a href="/">HOME</a>
                <a href="/">PRIVATE</a>
                <a href="/">CONTACT</a>
                <a href="/">SIMPLE PAGE</a>
            </div>
            <div className={cx('links')}>
                <a href="https://www.facebook.com/huynhson999" target="_blank">
                    <img src={images.facebook} alt="Facebook" />
                </a>
                <a href="/">
                    <img src={images.twitter} alt="Twitter" />
                </a>
                <a href="/">
                    <img src={images.stripe} alt="Stripe" />
                </a>
            </div>
            <div className={cx('me')}>
                <a href="https://www.facebook.com/huynhson999" target="_blank">
                    Huỳnh Ngọc Sơn - HCMUS
                </a>
            </div>
            <div className={cx('allrights')}>
                <a href="https://www.instagram.com/tapdocsach_/" target="_blank">
                    Ig: tapdocsach_
                </a>
            </div>
        </div>
    );
}

export default Footer;
