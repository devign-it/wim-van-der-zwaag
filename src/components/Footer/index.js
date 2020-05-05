import React from "react";
import SiteMeta from "../SiteMeta";
import SocialLinks from "../SocialLinks";

import "./styles.scss";

const Footer = ({ showInternalLinks }) => {
  return (
    <footer className="page--footer">
      <div className="col__left">
        <SiteMeta direction="column" />
      </div>
      <div className="col__right">
        <SocialLinks enableInternal={showInternalLinks} />
      </div>
    </footer>
  );
};

export default Footer;
