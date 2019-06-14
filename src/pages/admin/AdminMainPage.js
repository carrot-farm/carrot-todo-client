import React from "react";
import AdminPageTemplate from "components/pageTemplates/AdminPageTemplate";
import AdminMainContainer from "containers/admin/AdminMainContainer";

const AdminMainPage = ({ match }) => {
  return (
    <AdminPageTemplate>
      <AdminMainContainer />
    </AdminPageTemplate>
  );
};

export default AdminMainPage;
