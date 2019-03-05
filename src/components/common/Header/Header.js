import React, {Component} from 'react';
import { withStyles}  from '@material-ui/core/styles';
import { 
   AppBar, Toolbar, IconButton, Drawer, Button,
   List, ListItem, ListItemText
}  from '@material-ui/core';
import {
   Menu, Person, Add
} from '@material-ui/icons';
import styles from './Header.scss';
import classNames from 'classnames/bind';
import HorizontalContainer from 'containers/list/HorizontalContainer';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const SideMenu = ({handleLogoutClick, isLogged}) => (
   <div className={cx('side-menu')}>
      <div className={cx('top')}></div>
      {
         (isLogged)&&
         <div>
            <div className={cx('list')}>
               <List>
                  <Link to="/">
                     <ListItem button >
                        <ListItemText primary={'할일'} />
                     </ListItem>
                  </Link>
                  <Link to="/categoryList">
                     <ListItem button >
                        <ListItemText primary={'카테고리설정'} />
                     </ListItem>
                  </Link>
               </List>  
            </div>
            <div className={cx('bottom')}>
               <div className={cx('logout-button')} onClick={handleLogoutClick}>
                  <Button size="large" color="secondary">로그아웃</Button>
               </div>
            </div>
         </div>
      }
   </div>
);

class Header extends Component{
   render(){
      const {isSideMenuOpen, 
         handleOpenSideMenu, 
         handleCloseSideMenu, 
         handleLoginClick,
         handleLogoutClick,
         isLogged,
         handleActiveCategoryForm,
      } = this.props;
      return (
         <AppBar color="primary" >
            <Toolbar className={cx('header', 'container')}>
               {/* 사이드메뉴 */}
               <Drawer open={isSideMenuOpen} onClose={handleCloseSideMenu}>
                  <div 
                     tabIndex={0}
                     role="button"
                     onClick={handleCloseSideMenu}
                     onKeyDown={handleCloseSideMenu}
                     className={cx('menu')}
                  >  
                     <SideMenu handleLogoutClick={handleLogoutClick} isLogged={isLogged} />
                  </div>
               </Drawer>
               {/* 사이드 메뉴 오프 아이콘 */}
               <IconButton className={cx('button')} onClick={handleOpenSideMenu}>
                  <Menu  />
               </IconButton>
               {/* 카테고리 리스트  */}
               <div className={cx('center-column')}>
                  <div className={cx('center-column')}>
                     <HorizontalContainer />
                  </div>
               </div>

               {/* 로그인 아이콘과 카테고리 활성화 폼 아이콘 */}
               {
                  (isLogged)
                  ?(
                     <IconButton onClick={handleActiveCategoryForm}>
                        <Add />
                     </IconButton>
                  )
                  :(
                     <IconButton onClick={handleLoginClick}>
                        <Person />
                     </IconButton>
                  )
               }
            </Toolbar>
         </AppBar>
      );
   }
};

export default withStyles({})(Header);