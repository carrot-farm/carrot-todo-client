import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';

const Head = ({headTitle, headDescription})=>{
   return (
      <Fragment>
         <Helmet>
            <title>{headTitle}</title>
            <meta name="description" content={headDescription} />
         </Helmet>
      </Fragment>
   )
};

export default Head;