module.exports = {
  siteMetadata: {
    // Site URL for when it goes live
    siteUrl: `https://elastic-meninsky-aa7c74.netlify.app/`,
    // Your Name
    name: 'Kyle Hoehns',
    // Main Site Title
    title: `Kyle Hoehns | Full-Stack Developer`,
    // Description that goes under your name in main bio
    description: `Senior Software Engineer with a history of high-quality application development.`,
    // Optional: Twitter account handle
    author: `kylehoehns`,
    // Optional: Github account URL
    github: `https://github.com/kylehoehns`,
    // Optional: LinkedIn account URL
    linkedin: `https://www.linkedin.com/in/kylehoehns/`,
    // Content of the About Me section
    about: `I am an accomplished Software Engineer with over 10 years of experience writing full-stack applications for the insurance industry. I have experience with modern backend Java development utilizing many components of the Spring Framework. I also have 4+ years of experience writing a performant frontend in JavaScript utilizing AngularJS.`,
    // Optional: List your experience, they must have `name` and `description`. `link` is optional.
    experience: [
      {
        name: 'Berkley Technology Services',
        description: 'Senior Software Engineer, March 2014 - Present',
        link: 'https://berkleytechnologyservices.com/'
      },
      {
        name: 'Sentry Insurance',
        description: 'Programmer Analyst II, May 2011 - March 2014',
        link: 'https://www.sentry.com/'
      },
      {
        name: 'University of Iowa Hospitals and Clinics',
        description: 'Student Programmer, February 2010 - May 2011',
        link: 'https://uihc.org/'
      },
      {
        name: 'dsmHack',
        description: 'Charity Hackathon Volunteer, 2017 - Present',
        link: 'https://dsmhack.org/'
      }
    ],
    // Optional: List your skills, they must have `name` and `description`.
    skills: [
      {
        name: 'Languages',
        description:
          'Java, JavaScript, Kotlin',
      },
      {
        name: 'Frameworks',
        description: 'Spring, Spring Boot, Spring Data, AngularJS',
      },
      {
        name: 'Other',
        description:
          'Docker, CI / CD, Unit Testing, Hypermedia-based API design, Reactive Programming, Agile / Scrum',
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              wrapperStyle: `margin: 0 0 30px;`,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-20537868-1`, // Optional Google Analytics
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `devfolio`,
        short_name: `devfolio`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#333f99`, // This color appears on mobile
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
  ],
};
