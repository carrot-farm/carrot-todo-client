/*
    메뉴에 마우스 오버시 전체 메뉴 보기
*/
import React, { Component , Fragment} from 'react';
import styles from './HoverViewAll.scss';
import classNames from 'classnames/bind';
import {withRouter } from 'react-router-dom';
import AnimatedLink from 'components/common/AnimatedLink';
import ScrollMagic from 'scrollmagic';
import 'scrollmagic/scrollmagic/minified/plugins/animation.gsap.min';
import 'scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min';
import {TimelineMax} from 'gsap/all';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

const cx = classNames.bind(styles);

//============= 더미 데이터
const data = {
    menu: [
        {
            text: 'ABOUT',
            link: '/about',
            bg: '#f7fe00'
        }, {
            text: 'CONTACT',
            link: '/contact',
            bg: '#24c7b1'
        }
    ]
};

//============= 리스트
const Menu = ({ menu , curPath}) => {
    const menus = menu.map(
        item=>(
            <li key={item.link}>
                <AnimatedLink to={item.link} 
                    className={(curPath===item.link?'active':'')}
                    bg={ item.bg}
                >{item.text}</AnimatedLink>
            </li>
        )
    );
    return (
        <ul className={cx('menu-wrapper')}>
            { menus }
        </ul>
    );
};

//============= 헤더 컴포넌트
class Header extends Component {
    controller = new ScrollMagic.Controller();
    iconsTween = new TimelineMax();
    scene = null;

    componentDidMount(){
        this.scene = new ScrollMagic.Scene({
            triggerElement: ".section-start", // 이 것을 기준으로 해당 액션이 일어 난다. 
            duration: 400, //애니메이션이 일어나는 기간
        })
        .setTween('.header-container',0.5,{
            backgroundColor: '#000000', 
            opacity: 0.8, 
            color: '#fff',
        })
        .addTo(this.controller);
    }
    
    componentWillUnmount(){
        this.scene.destroy(); 
    }

    render() {
        const {
            location,
            mobileMenuOpen
        } = this.props;
        const {
            menu
        } = data;
        return (
            <Fragment>
                <header id="header-root" className={cx('header-root')}>
                    <div id="header-trigger"></div>
                    <div className={cx('header-container')}>
                        <div className={cx('logo-container')}>
                            <AnimatedLink to="/" className={'text-link'}>
                                CARROT<br/> FARM&nbsp;
                            </AnimatedLink>
                            <AnimatedLink to="/" className={'img-link'}>
                                <img src="/data/images/logo/logo-white-line.png" alt="logo" />
                            </AnimatedLink>
                        </div>
                        <div className={cx('container menu-container')}>
                            <div className={cx('active-cursor')}></div>
                            <Menu menu={menu} curPath={location.pathname} />
                        </div>
                        <div className={cx('mobile-menu-button')}>
                            <IconButton onClick={mobileMenuOpen} >
                                <Icon>dehaze</Icon>
                            </IconButton>
                        </div>
                    </div>
                </header>
            </Fragment>
        );
    }
};

export default withRouter(Header);