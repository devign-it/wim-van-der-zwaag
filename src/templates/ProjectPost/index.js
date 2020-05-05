import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import get from "lodash/get";
import Img from "gatsby-image";
import Layout from "../../components/Layout";
import TagsList from "../../components/TagsList";
import Footer from "../../components/Footer";
import PostNavigation from "../../components/PostNavigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import ExternalLink from "../../components/ExternalLink";
import MediaItems from "../../components/MediaItems";
import "./styles.scss";

export default class ProjectPostTemplate extends React.Component {
  render() {
    const { next, previous } = this.props.pageContext;
    const post = get(this.props, "data.contentfulProjectPosts");
    const siteTitle = get(this.props, "data.site.siteMetadata.title");

    return (
      <Layout showNav={true} showHome={true} location={this.props.location}>
        <div className="project--wrapper">
          <Helmet title={`${post.client} | ${siteTitle}`} />
          <header
            className="project--hero"
            style={{ backgroundColor: `${post.color}` }}
          >
            <div className="background-image">
              <Img alt={post.title} fluid={post.heroImage.fluid} />
            </div>
          </header>
          <div className="project--metadata">
            <div className="metadata--item">
              <h5>Project</h5>
              <p>{post.client}</p>
            </div>
            <div className="metadata--item">
              <h5>Type</h5>
              <p>{post.type}</p>
            </div>
            <div className="metadata--item">
              <h5>Year</h5>
              <p>{post.year}</p>
            </div>
            <div className="metadata--item">
              <h5>Role</h5>
              <p>{post.role}</p>
            </div>
          </div>

          <div className="project--content">
            <section className="content--head">
              <div className="head--title">
                <h1 className="section-headline">{post.title}</h1>
              </div>
              <div className="head--tags">
                <TagsList tagSource={post.categoryTags} />
              </div>
              <aside className="head--sidebar">
                <div className="sidebar--sticky-content">
                  <ExternalLink
                    URL={post.linkUrl}
                    text={post.linkText}
                    alignRight={true}
                  />
                </div>
              </aside>
              <article className="head--description">
                {post.extensiveDescription &&
                  documentToReactComponents(post.extensiveDescription.json)}
              </article>
            </section>
            <section className="content--body">
              {post.showcaseImages &&
                post.showcaseImages.map(({ node }, i) => (
                  <div
                    className="body--showcase-item"
                    key={post.showcaseImages[i].title}
                  >
                    <Img
                      key={i}
                      className="showcase-item-image"
                      alt={post.showcaseImages.description}
                      fluid={post.showcaseImages[i].fluid}
                    />
                    {post.showcaseImages[i].title &&
                    post.showcaseImages[i].description ? (
                      <div className="showcase-item--description">
                        <h4>{post.showcaseImages[i].title}</h4>
                        <p className="project-item--description small--text">
                          {post.showcaseImages[i].description}
                        </p>
                      </div>
                    ) : null}
                  </div>
                ))}
              {post.showcaseMedia && <MediaItems source={post.showcaseMedia} />}
            </section>
          </div>
        </div>
        <PostNavigation subpath={"projects"} next={next} previous={previous} />
        <Footer mode={"ghost"} showInternalLinks={true} />
      </Layout>
    );
  }
}

export const ProjectPostQuery = graphql`
  query ProjectPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulProjectPosts(slug: { eq: $slug }) {
      title
      client
      color
      type
      role
      year
      linkText
      linkUrl
      heroImage {
        fluid(maxWidth: 1440) {
          ...GatsbyContentfulFluid_noBase64
        }
      }
      extensiveDescription {
        json
      }
      categoryTags {
        category
        slug
      }
      showcaseImages {
        title
        description
        fluid(maxWidth: 1440) {
          ...GatsbyContentfulFluid_noBase64
        }
      }
      showcaseMedia {
        media {
          file {
            contentType
            url
          }
          fluid(maxWidth: 1440) {
            ...GatsbyContentfulFluid_noBase64
          }
        }
        isVideo
        videoURL
        needFrameDesktop
        title
        extensiveDescription {
          extensiveDescription
        }
      }
    }
  }
`;
