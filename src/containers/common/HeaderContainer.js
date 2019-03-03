import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'; 
import {withRouter} from 'react-router-dom'; //history 객체에 연결하기 위해
import * as baseActions from 'store/modules/base';
import * as categoryActions from 'store/modules/category';
import * as toDoActions from 'store/modules/toDo';
import CategoryFormContainer from 'containers/modal/CategoryFormContainer';
import Header from 'components/common/Header';

class HeaderContainer extends Component{
   //로그인 확인
   checkLogin = ()=>{
      const {BaseActions} = this.props;
      return BaseActions.checkLogin();
   };
   //사이트 메뉴
   handleOpenSideMenu = (sw)=>{
      const {BaseActions} = this.props;
      BaseActions.openSideMenu();
   }
   //사이드 메뉴 on/off
   handleCloseSideMenu = (sw)=>{
      const {BaseActions} = this.props;
      BaseActions.closeSideMenu();
   }
   //로그인 모달
   handleLoginClick = ()=>{
      const {BaseActions} = this.props;
      BaseActions.showModal('login');
   };
   //로그아웃
   handleLogoutClick = async (e)=>{
      const {BaseActions} = this.props;
      await BaseActions.logout();
      window.location.replace('/');
   };
   //카테고리 입력 폼 활성화
   handleActiveCategoryForm = async ()=>{
      const {CategoryActions, BaseActions} = this.props;
      CategoryActions.clearItem();
      BaseActions.showModal('categoryForm');
   };
   componentDidMount = async ()=>{
      const {BaseActions, CategoryActions, ToDoActions} = this.props;
      const res = await BaseActions.getInitialData();
      const {data} = res;
      if(data.logged){
         CategoryActions.getList({page:1});
         if(data._selectedCategory){
            CategoryActions.setSelectedCategory(data._selectedCategory);
            ToDoActions.getList({page:1, categoryId: data._selectedCategory});
         }
      }
   }
   render(){
      const {isSideMenuOpen, isLogged} = this.props;
      return(
         <div>
            <Header 
               isLogged={isLogged}
               isSideMenuOpen={isSideMenuOpen}
               handleOpenSideMenu={this.handleOpenSideMenu}
               handleCloseSideMenu={this.handleCloseSideMenu}
               handleLoginClick={this.handleLoginClick}
               handleLogoutClick={this.handleLogoutClick}
               handleActiveCategoryForm={this.handleActiveCategoryForm}
            />
            <CategoryFormContainer />
         </div>
      )
   }
}

export default connect(
   state=>({
      isSideMenuOpen: state.base.get('isSideMenuOpen'),
      isLogged: state.base.get('isLogged'),
      category_id: state.category.get('_id'),
   }),
   dispatch=>({
      BaseActions: bindActionCreators(baseActions, dispatch),
      CategoryActions: bindActionCreators(categoryActions, dispatch),
      ToDoActions: bindActionCreators(toDoActions, dispatch),
   })
)(withRouter(HeaderContainer));