import React from "react";
import get from "lodash/get";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { initScroll } from "../components/ScrollWrapper/function";
import { ProjectsPreviewGrid } from "../components/ProjectsPreviewGrid/index";

// CSS styles
import "../styles/pages/index-new.scss";
import "../styles/objects/typography.scss";

const ScrollWrapper = ({ children }) => (
  <div id="scroll-wrapper">
    <div className="scroll" data-scroll>
      {children}
    </div>
  </div>
);

const VerticalSlide = ({ children, num }) => (
  <section className={`slide slide--${num}`}>
    <div className="slide__inner">{children}</div>
  </section>
);
const ScrollBar = () => (
  <div className="scrollbar" data-scrollbar>
    <div className="scrollbar__handle js-scrollbar__handle"></div>
  </div>
);

const FocusList = () => (
  <div className="focus-list--wrapper">
    <ul>
      <li>Procesmanagement</li>
      <li>Projectmanagement</li>
      <li>Marketing communicatie</li>
      <li>Eventmanagement</li>
      <li>Branding</li>
    </ul>
  </div>
);
const ProjectPreview = ({ client, title }) => (
  <article className="project--preview">
    <h4 className="project--client">{client}</h4>
    <h3 className="project--title">{title}</h3>
    <div className="project--tags">
      <div className="tag">
        <h5>Branding</h5>
      </div>
      <div className="tag">
        <h5>Project</h5>
      </div>
      <div className="tag">
        <h5>Event</h5>
      </div>
    </div>
  </article>
);

const BackgroundText = ({ textSrc }) => (
  <div className="background-text--wrapper">
    {documentToReactComponents(textSrc)}
  </div>
);
class RootIndex extends React.Component {
  componentDidMount() {
    initScroll();
  }

  render() {
    const projects = get(this, "props.data.allContentfulProjectPosts.edges");
    const services = get(this, "props.data.allContentfulServices.edges");
    const aboutContent = get(this, "props.data.contentfulAbout");
    return (
      <Layout>
        <ScrollWrapper>
          <div className="scroll-content" data-scroll-content>
            <VerticalSlide num={1}>
              <h1>Wim van der Zwaag</h1>

              {documentToReactComponents(aboutContent.shortDescription.json)}
            </VerticalSlide>
            <VerticalSlide num={2}>
              <FocusList />
            </VerticalSlide>
            <VerticalSlide num={3}>
              <ProjectsPreviewGrid projects={projects} showButton={true} />
            </VerticalSlide>
            <VerticalSlide num={4}>
              <BackgroundText
                textSrc={aboutContent.extensiveDescription.json}
              />
            </VerticalSlide>
            <VerticalSlide num={5}>
              <h4>Opdrachtgevers</h4>
              <ul>
                <li>
                  <a href="">Gemeente Den Haag</a>
                </li>
                <li>
                  <a href="">Judobond Nederland</a>
                </li>
                <li>
                  <a href="">Amsterdam UMC</a>
                </li>
                <li>
                  <a href="">KNSB</a>
                </li>
                <li>
                  <a href="">Heavy Water</a>
                </li>
                <li>
                  <a href="">GGD Kennemerland</a>
                </li>
                <li>
                  <a href="">AFC Ajax</a>
                </li>
                <li>
                  <a href="">Kenamju</a>
                </li>
                <li>
                  <a href="">Madurodam</a>
                </li>
                <li>
                  <a href="">Emma at Work</a>
                </li>
              </ul>
            </VerticalSlide>
            <VerticalSlide num={6}>
              <div className="contact--wrapper">
                <div className="contact--detail linkedin">
                  <p>LinkedIn</p>
                  <a href="">wimvanderzwaag</a>
                </div>
                <div className="contact--detail email">
                  <p>Email</p>
                  <a href="">wimvanderzwaag@sprtz.nl</a>
                </div>
                <div className="contact--detail phone">
                  <p>Telefoon</p>
                  <a href="">+31625022394</a>
                </div>
              </div>
            </VerticalSlide>
          </div>
          <ScrollBar />
        </ScrollWrapper>
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
      extensiveDescription {
        json
      }
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
