import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import "./styles.scss";
import TagsList from "../TagsList";

class ProjectPreview extends React.Component {
  render() {
    let project = this.props.project;

    return (
      <Link className="preview-link" to={`/projects/${project.slug}`}>
        <div className="preview-wrapper">
          <article
            className={`project-post--preview project-post--preview__${project.slug}`}
            style={{ backgroundColor: project.color }}
          >
            {project.heroImage.fluid ? (
              <div className="image">
                <Img fluid={project.heroImage.fluid} />
              </div>
            ) : (
              <div>no image</div>
            )}
          </article>
          <div className="project-post--info">
            <p> {project.client}</p>
            <h3 className="item--title">{project.title}</h3>
            <div className="item--tags">
              <TagsList tagSource={project.categoryTags} />
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default ProjectPreview;
