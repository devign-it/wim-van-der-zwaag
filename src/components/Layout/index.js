import React from "react";
import get from "lodash/get";
import { Helmet } from "react-helmet";

const siteTitle = get(this, "props.data.site.siteMetadata.title");

const PageContent = ({ children, pageName }) => (
  <main className={`main-container ${pageName}`}>{children}</main>
);

class Layout extends React.Component {
  render() {
    return (
      <>
        <Helmet title={siteTitle} />
        <PageContent pageName={this.props.pageName}>
          {this.props.children}
        </PageContent>
      </>
    );
  }
}

export default Layout;
