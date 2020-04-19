import React from "react";
import { PageHeader, Breadcrumb } from "antd";

const Header = ({ href, previousItem, currentItem, children }) => {
  return (
    <PageHeader
      className="site-page-header mainHeader"
      style={{ paddingTop: 0 }}
    >
      <Breadcrumb>
        <Breadcrumb.Item href={href}>
          <span>{previousItem}</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{currentItem}</Breadcrumb.Item>
      </Breadcrumb>
      <h1 style={{ marginTop: 8, fontWeight: "bold" }}>{currentItem}</h1>
      {children}
    </PageHeader>
  );
};

export default Header;
