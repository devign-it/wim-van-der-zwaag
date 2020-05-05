import React from "react";
import "./styles.scss";
import Swiper from "swiper";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
// import "swiper/css/swiper.min.css";

class ExperienceScroll extends React.Component {
    componentDidMount() {
        new Swiper(".swiper-container.horizontal", {
            spaceBetween: 30,
            slideActiveClass: "slideIsActive",
            slidesPerView: "auto",
            centeredSlides: true,
            slidesOffsetBefore: -40,

            pagination: {
                el: ".swiper-pagination",
                type: "progressbar",
            },

            breakpoints: {
                // when window width is >= 320px
                768: {
                    slidesPerView: "auto",
                    grabCursor: true,
                    centeredSlides: true,
                    spaceBetween: 60,
                    slidesOffsetBefore: -60,
                },
            },
        });
    }
    render() {
        return (
            <div className={`scroll--container__horizontal ${this.props.name.toLowerCase()}`}>
                <h3>{this.props.name}</h3>

                <div className="swiper-container horizontal">
                    <div className="list--capabilities swiper-wrapper horizontal">
                        {this.props.dataSource.map(({ node }, i) => {
                            return (
                                <article className="experience--container swiper-slide horizontal" key={i}>
                                    <div>
                                        <p className="year">{node.period}</p>
                                        <h4 className="title">
                                            {node.title} {node.companyName && ` - ${node.companyName}`}
                                        </h4>
                                        <div className="description">
                                            {documentToReactComponents(node.description.json)}
                                        </div>
                                    </div>
                                    {node.location && <p className="location"> {node.location}</p>}
                                </article>
                            );
                        })}
                    </div>
                    <div
                        className="swiper-pagination"
                        style={{ display: this.props.dataSource.length < 3 && "none" }}
                    />
                </div>
            </div>
        );
    }
}

export default ExperienceScroll;
