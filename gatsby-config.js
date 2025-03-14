module.exports = {
  siteMetadata: {
    // Site URL for when it goes live
    siteUrl: `https://kylehoehns.com`,
    // Your Name
    name: 'Kyle Hoehns',
    // Main Site Title
    title: `Kyle Hoehns`,
    // Description that goes under your name in main bio
    description: `Staff Software Engineer with a history of high-quality application development.`,
    // Optional: Twitter account handle
    author: `kylehoehns`,
    // Optional: Github account URL
    github: `https://github.com/kylehoehns`,
    // Optional: LinkedIn account URL
    linkedin: `https://www.linkedin.com/in/kylehoehns/`,
    sessionize: 'https://sessionize.com/kyle-hoehns',
    // Content of the About Me section
    about: `Kyle is a Staff Software Engineer with over a decade of experience in the design and implementation of complex software solutions. With a strong foundation in backend technologies like Java and Go, Kyle has consistently delivered high-quality, scalable, and efficient solutions across various industries. He is passionate about solving problems and believes in not taking himself too seriously. `,
    // Optional: List your experience, they must have `name` and `description`. `link` is optional.
    experience: [
      {
        name: 'Source Allies',
        description: 'Staff Software Engineering Consultant, June 2021 - Present',
        link: 'https://www.sourceallies.com',
        children: [
          {
            description: 'Led the design and development of large-scale services to provide rapid access to agricultural data, leveraging AWS (Lambda, API Gateway, ECS), OpenSearch/Elasticsearch, Java, and Golang.'
          },
          {
            description: 'Established comprehensive observability practices (metrics and distributed tracing) to proactively monitor application performance and advocate best practices, improving issue detection and resolution.'
          },
          {
            description: 'Refactored a monolithic application into a new Spring Boot microservice with zero downtime, boosting scalability and deployment flexibility while handling 60M+ daily requests.'
          },
          {
            description: 'Spearheaded a zero-downtime migration of the primary data store from AWS OpenSearch to Elastic.co’s Elasticsearch for 80M+ daily requests, significantly enhancing stability and response times.'
          },
          {
            description: 'Created a robust export pipeline utilizing Amazon SNS/SQS for notifications, Databricks (Python) for data processing, and DeltaLake tables on AWS S3 for storage—enabling efficient data processing and analytics.'
          },
          {
            description: 'Experience in the AgTech industry designing and building highly-scalable reporting features on AWS. Utilized cloud technologies such as CloudFormation, S3, Lambda, DynamoDB, and SQS. Main application technologies included Python and Typescript.'
          },
          {
            description: 'Assisted partner company with a high-level cost analysis of migrating existing on-premises distributed data center work to AWS.'
          },
          {
            description: 'Architected and led major improvements to the company’s hiring pipeline, including spearheading a transition to GitHub Codespaces for a consistent interview environment, building a Slack bot to automate the assignment of HackerRank reviews, integrating AWS Bedrock (Claude 3.5) to parse candidate submissions, and revamping the question bank—significantly enhancing candidate experience, driving interviewer engagement, and increasing overall hiring efficiency.'
          }
        ]
      },
      {
        name: 'Berkley Technology Services',
        description: 'Senior Software Engineer, March 2014 - June 2021',
        link: 'https://berkleytechnologyservices.com/',
        children: [
          {
            description: 'Lead developer of a team working on continual improvements to an in-house policy administration system.'
          },
          {
            description: 'Assisted migrating a legacy JSF application to an AngularJS 1.8 SPA.'
          },
          {
            description: 'Helped create a HATEOAS-driven REST API using Spring Boot with Spring Data. Subsequently led the effort to build documentation using Spring REST Docs to guarantee the API is always accurately documented.'
          },
          {
            description: 'Architected a high-performance AngularJS framework to quickly and accurately create hundreds of business entities by uploading spreadsheets of data, saving clients time and resources when entering an insured\'s information into our system.'
          },
          {
            description: 'Integrated a JavaScript testing framework into our developers\' daily workflow and created documentation for how best to create the tests. Over time, the test suite has risen to over 3,000 tests written by developers of all skill levels on the team.'
          },
          {
            description: 'Served as Scrum Master for a team composed of developers, business analysts, and test analysts. Also worked on a company-wide pilot program to help spread agile across the corporation by defining best practices, sharing successes, and discussing lessons learned.'
          },
          {
            description: 'Participated in organization-wide development standards meetings to help move team and enterprise best practices forward. Also facilitated large group discussions and presented on several technical topics to developers across the company to help drive culture shift toward knowledge sharing between teams.'
          },
          {
            description: 'Served as mentor and technical leader to developers of varying skill levels and experience across multiple teams both on and off-shore.'
          }
        ]
      },
      {
        name: 'Sentry Insurance',
        description: 'Programmer Analyst II, May 2011 - March 2014',
        link: 'https://www.sentry.com/',
        children: [
          {
            description: 'Member of a project tasked to replace a legacy policy administration system with Guidewire PolicyCenter.'
          },
          {
            description: 'Implemented an efficient tool to extract, store, and version ISO XML electronic rating content into SQL Server databases using Hibernate. Subsequently, designed and developed an extensible Java API to update and retrieve the rating content for several consumers.'
          },
          {
            description: 'Constructed an application that interacted with several external vendors to enable real-time ordering, storage, and retrieval of experience rating data.'
          },
          {
            description: 'Developed an enterprise integration that synchronized agent and agency licensing information from an internal web service to a running policy administration system.'
          },
          {
            description: 'Wrote significant logic to automate several manual user workflows that kept data synchronized between key entities, which resulted in a higher level of system data integrity and a superior user experience.'
          },
          {
            description: 'Designed and implemented the refactoring of major entities in a production code base to allow for greater code reuse throughout the project’s lifecycle.'
          },
          {
            description: 'Responsible for performing monthly code base merges from a production system and testing existing functionality.'
          }
        ]
      },
      {
        name: 'University of Iowa Hospitals and Clinics',
        description: 'Student Programmer, February 2010 - May 2011',
        link: 'https://uihc.org/',
        children: [
          {
            description: 'Part of a Revenue Integrity team that tracked payment progress from more than sixty insurance companies sending payments on behalf of over one million patients that visit The University of Iowa Hospitals and Clinics each year.'
          },
          {
            description: 'Developed and supported efficient user-centered software for tracking hospital finances for more than four million patient charges a year.'
          },
          {
            description: 'Developed logic that systematically handled 60% of each analyst’s potential workload, greatly impacting a team of analysts who had identified and collected over $25 million between 2005 and 2010.'
          },
          {
            description: 'Provided hands-on training and technical assistance to a group of analysts who used our software on a daily basis.'
          },
          {
            description: 'Created informative reports using metrics collected from applications showing where analysts could better focus their efforts.'
          }
        ]
      },
      {
        name: 'dsmHack',
        description: 'Charity Hackathon Volunteer, 2017 - Present',
        link: 'https://dsmhack.org/',
        children: [
          {
            description: 'Helped nonprofits build various tools and websites to assist them in helping others across Central Iowa.'
          }
        ]
      }
    ],
    // Optional: List your skills, they must have `name` and `description`.
    skills: [
      {
        name: 'Languages',
        description:
          'Java, Go, Python, JavaScript, Kotlin',
      },
      {
        name: 'Frameworks',
        description: 'Spring, Spring Boot, Spring Data, Serverless',
      },
      {
        name: 'Other',
        description:
          'AWS, Docker, CI / CD, GitHub & GitHub Actions, Unit Testing, Test-Driven Development, Observability, Hypermedia-based API design, Reactive Programming, Infrastructure as Code, Elasticsearch, Agile / Scrum',
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
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: `GTM-TKSDDFV`, // Optional Google Tag Manager
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
