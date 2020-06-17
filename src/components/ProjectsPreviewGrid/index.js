import React from "react";
import ProjectPreview from "../ProjectPreview";
import "./styles.scss";

export const ProjectsPreviewGrid = ({ projects }) => (
  <div className="projects-preview-grid--wrapper">
    {projects.slice(0, 6).map(({ node }) => {
      return <ProjectPreview project={node} />;
    })}
  </div>
);

// class ProjectsPreviewGrid extends React.Component {
//   render() {
//     let orginalProjects = this.props.projects;
//     let limitedProjects = orginalProjects.slice(0, 6);
//     let mappedProjects = orginalProjects;

//     if (this.props.showButton) {
//       mappedProjects = limitedProjects;
//     }

//     return (
//       <div className="projects-preview-grid--wrapper">
//         {mappedProjects.map(({ node }) => {
//           return <ProjectPreview project={node} />;
//         })}
//       </div>
//     );
//   }
// }

// export default ProjectsPreviewGrid;
