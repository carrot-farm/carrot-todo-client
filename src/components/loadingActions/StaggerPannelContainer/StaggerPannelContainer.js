import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'; 
import {withRouter} from 'react-router-dom'; //history 객체에 연결하기 위해
import * as baseActions from 'store/modules/base';
import StaggerPannel from 'components/loadingActions/StaggerPannel';



class StaggerPannelContainer extends Component{

   // 애니메이션중 화면이 다가려 졌을 때. 페이지 이동을 위해 사용한다.
   handleHideComplete =()=>{
      const {link, history} = this.props;
      history.push(link);
   }

   //애니메이션이 다 끝났을 때
   handleAniComplete = ()=>{
      const {BaseActions} = this.props;
      BaseActions.hideLoadingAction('staggerPannel');
      BaseActions.setLink(null);
   }
   
	render(){
      const {
         visible, 
         link,
         backgroundColor
      } = this.props;
      const {
         handleHideComplete, 
         handleAniComplete
      } = this;
		return(
         <StaggerPannel 
            visible={visible}
            link={link}
            backgroundColor={backgroundColor}
            handleHideComplete={handleHideComplete}
            handleAniComplete={handleAniComplete}
         />
		)
	}
}

export default connect(
	state=>({
      visible: state.base.getIn(['loadingAction','staggerPannel']),
      link: state.base.get('link'),
      backgroundColor: state.base.get('staggerPannelBg'),
	}),
	dispatch=>({
		BaseActions: bindActionCreators(baseActions, dispatch)
	})
)(withRouter(StaggerPannelContainer));

