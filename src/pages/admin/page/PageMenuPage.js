import React from "react";
import AdminPageTemplate from "components/pageTemplates/AdminPageTemplate";
import PageMenuContainer from "containers/admin/page/PageMenuContainer";

const PageMenuPage = () => {
  return (
    <AdminPageTemplate>
      <PageMenuContainer />
    </AdminPageTemplate>
  );
};

export default PageMenuPage;
