import React from "react";

import PageTemplate from "components/pageTemplates/PageTemplate";
import MainContainer from "containers/main/MainContainer";
import CmsHeaderContainer from "containers/headers/CmsHeaderContainer";

const MainPage = () => {
  return (
    <PageTemplate Header={CmsHeaderContainer} MainContent={MainContainer} />
  );
};

export default MainPage;
