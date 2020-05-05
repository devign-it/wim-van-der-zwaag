require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  host: process.env.CONTENTFUL_HOST,
};

const { spaceId, accessToken } = contentfulConfig;

if (!spaceId || !accessToken) {
  throw new Error(
    "Contentful spaceId and the access token need to be provided."
  );
}

module.exports = {
  siteMetadata: {
    title: "Wim van der Zwaag",
  },
  plugins: [
    "gatsby-transformer-remark",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-plugin-sass",
    "gatsby-plugin-offline",

    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-59635505-X",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Wim van der Zwaag`,
        short_name: `Wim van der Zwaag`,
        start_url: `/`,
        background_color: `#000`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/images/favicons/favicon.png`,
      },
    },
    {
      resolve: "gatsby-source-contentful",
      options: contentfulConfig,
    },
  ],
};
