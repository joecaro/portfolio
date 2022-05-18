---
    slug: cmdi-website
    title: "CMDI Website"
    date:  Nov 11 2021 12:00 AM
    author: Joe
    description:  Website for SAAS CRM Platform with blog and hubspot integration.
    stack: 
      - Next.js
      - Contentful
      - Cloudinary
      - Netlify
    github: not available
    demo: https://cmdi.netlify.app
    tags:
      - project 
      - featured
      - nextjs
    tech:
      - react
      - next
      - html
      - css
    image: https://res.cloudinary.com/joecarothers/image/upload/v1652902017/misc/Projects/cmdi-mockup_ojtz71.png
    position: 1
---

## **SAAS Website**

In early fall 2021, I noticed the company's site was built with wordpress and experienced poor performance quantified by long load times (sometimes over 10 seconds for page load) and low scores on Chrome's lighthouse.

I suggested to migrate the site to a faster and simpler option. I am experienced in ReactJS and NextJS, I chose to build the site on the NextJS framework to provide solutions for some of the problems listed below:

### Problems:

- Slow Perforamce
- Bloated Libraries and Dependencies
- Slow For Content Creation and Management
- Need to Maintain Directory Structure for SEO

### Solutions:

- NextJS allows static site generation (SSG) that will dramatically improve load times for content.
- NextJS image optimization paired with moving image delivery to a faster provider improving request response times will improve page load times.
- I custom created functionality when possible to limit dependencies and extra requests. As well as limit the need to dependency management for others.
- Implemented NetlifyCMS to give a simpler experience for content management for our marketing team. Created organization structure of CMS to contain what we needed and no more.

Performance before & after:

![Before](https://res.cloudinary.com/joecarothers/image/upload/v1637338306/misc/Screenshot_2021-11-19_110840_ybmolr.png)![After](https://res.cloudinary.com/joecarothers/image/upload/v1651167342/misc/Projects/cmdi/Screenshot_2022-04-28_133416_jnnvhq.jpg)
