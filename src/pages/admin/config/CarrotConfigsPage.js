import React from "react";
import AdminPageTemplate from "components/pageTemplates/AdminPageTemplate";
import CarrotConfigsContainer from "containers/admin/config/CarrotConfigsContainer";

const CarrotConfigsPage = () => {
  return (
    <AdminPageTemplate>
      <CarrotConfigsContainer />
    </AdminPageTemplate>
  );
};

export default CarrotConfigsPage;
