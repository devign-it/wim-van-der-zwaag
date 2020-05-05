import React from "react";
import get from "lodash/get";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import Layout from "../components/Layout";

import "../styles/pages/index.scss";

class RootIndex extends React.Component {
  render() {
    const posts = get(this, "props.data.allContentfulProjectPosts.edges");
    const services = get(this, "props.data.allContentfulServices.edges");
    const aboutContent = get(this, "props.data.contentfulAbout");

    return (
      <Layout>
        <h1>Wim van der Zwaag</h1>

        <div className="introduction--text">
          {documentToReactComponents(aboutContent.shortDescription.json)}
        </div>
      </Layout>
    );
  }
}

export default RootIndex;

export const HomepageQuery = graphql`
  query HomepageQuery {
    site {
      siteMetadata {
        title
      }
    }
    contentfulAbout {
      shortDescription {
        json
      }
      topImage {
        fluid {
          ...GatsbyContentfulFluid_noBase64
        }
      }
      bottomImage {
        fluid {
          ...GatsbyContentfulFluid_noBase64
        }
      }
    }
    allContentfulProjectPosts(sort: { fields: order, order: ASC }) {
      edges {
        node {
          client
          color
          heroImage {
            fluid {
              ...GatsbyContentfulFluid_noBase64
            }
          }
          slug
          title
          categoryTags {
            category
            slug
          }
        }
      }
    }
    allContentfulServices(sort: { fields: order, order: ASC }) {
      edges {
        node {
          title
          text {
            text
          }
          icon {
            file {
              url
            }
          }
        }
      }
    }
  }
`;
