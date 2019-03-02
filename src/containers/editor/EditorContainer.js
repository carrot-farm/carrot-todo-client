import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'; 
import * as baseActions from 'store/modules/base';
import Editor from 'components/editor/Editor';

class EditorContainer extends Component{
   componentDidMount(){
   }
   componentDidUpdate(){
   }
   render(){
      const {isLogged} = this.props;
      
      return(
         <Editor />
      )
   }
}

export default connect(
   state=>({
      isLogged: state.base.get('isLogged'),
   }),
   dispatch=>({
      BaseActions: bindActionCreators(baseActions, dispatch)
   })
)(EditorContainer);