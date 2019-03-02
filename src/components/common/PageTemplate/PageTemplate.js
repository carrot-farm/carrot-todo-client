import React from 'react';
import styles from './PageTemplate.scss';
import classNames from 'classnames/bind';
import HeaderContainer from 'containers/common/HeaderContainer';

const cx = classNames.bind(styles);

const PageTemplate = ({children})=>{
   return(
      <div className={cx('page-template-root')}>
         <HeaderContainer />
         <main className={[cx('main')]}>
            {children}
         </main>
         <footer className={cx('footer')}></footer>
      </div>
   );
};

export default PageTemplate;