---
slug: cmdi-website
title: "CMDI Website"
date: Nov 11 2021 12:00 AM
author: Joe
description: Website for SAAS CRM platform with blog and HubSpot integration. Built with NextJS using Static Site Generation (SSG) for improved performance and SEO.
stack:
  - NextJS
  - Contentful
  - Cloudinary
  - Netlify
  - Featured
github:
demo: https://cmdi.netlify.app
tags:
  - project
  - featured
  - nextjs
  - react
  - next
  - html
  - css
  - netlify
  - contentful
  - cloudinary
tech:
  - react
  - next
  - html
  - css
image: https://res.cloudinary.com/joecarothers/image/upload/v1652918002/misc/Projects/cmdi-mockup_ojtz71_mwpwg8.png
---

# SAAS Website for CMDI

In early fall of 2021, I noticed that our company website, built on WordPress, was suffering from significant performance issues. Page load times were often exceeding 10 seconds, which not only frustrated users but also hurt our SEO and overall user experience. After a comprehensive review of the site's structure, I identified areas where we could improve performance by migrating away from WordPress to a faster, more streamlined solution.

Being well-versed in **ReactJS** and **NextJS**, I proposed a rebuild of the website using **NextJS** to take advantage of its **Static Site Generation (SSG)** capabilities. This allowed us to dramatically improve load times, simplify content management, and enhance SEO.

## Identified Problems

Here were the major issues with the old WordPress site:

- **Slow Performance**: Page load times were incredibly long, sometimes over 10 seconds.
- **Bloated Libraries and Dependencies**: The WordPress setup had accumulated unnecessary plugins and libraries, causing additional bloat.
- **Content Management Challenges**: Creating and managing content in WordPress was slow and often cumbersome for our marketing team.
- **SEO Issues**: Maintaining the correct directory structure for SEO purposes was difficult with WordPress and its templating system.

## Implemented Solutions

To address these challenges, I implemented several key solutions using modern web technologies:

1. **Static Site Generation (SSG) with NextJS**: By leveraging SSG, we were able to serve static pages, significantly improving load times. This was ideal for content-heavy pages, as they could be pre-rendered and served instantly to users.
   
2. **Image Optimization with Cloudinary**: To speed up image delivery, I integrated **Cloudinary** for image hosting and optimization. This improved the request/response time for images across the site, enhancing overall page performance.

3. **Custom-Built Functionality**: Whenever possible, I avoided adding unnecessary dependencies. I custom-built several features, reducing the overhead and making it easier to maintain in the long run. This approach also limited the amount of dependency management required by other team members.

4. **ContentfulCMS for Simplified Content Management**: To improve content creation and management for our marketing team, I integrated **ContentfulCMS**. It provided an easy-to-use interface for managing blog posts and other site content. Additionally, I structured the CMS to only include what we needed, avoiding unnecessary complexity.

## Performance Comparison

The improvements were immediately noticeable. Here’s a snapshot of the performance metrics before and after the migration to NextJS:

### Before Migration:
- **Page Load Time**: Over 10 seconds
- **Performance Scores**: Low on Lighthouse (as seen below)

![Before](https://res.cloudinary.com/joecarothers/image/upload/v1637338306/misc/Screenshot_2021-11-19_110840_ybmolr.png)

### After Migration:
- **Page Load Time**: Less than 2 seconds
- **Performance Scores**: Significantly higher, with much better scores on Lighthouse.

![After](https://res.cloudinary.com/joecarothers/image/upload/v1651167342/misc/Projects/cmdi/Screenshot_2022-04-28_133416_jnnvhq.jpg)

## Tech Stack

- **NextJS**: Framework of choice for static site generation and improved SEO.
- **Contentful**: Headless CMS used for managing structured content across the site.
- **Cloudinary**: For image optimization and faster delivery.
- **Netlify**: Hosting platform, allowing continuous integration and easy deployment through Git.

## Final Thoughts

The migration from WordPress to NextJS made a huge difference in terms of both performance and user experience. By focusing on performance optimization, I was able to cut load times dramatically, improve SEO, and streamline content management for the marketing team. This project reinforced the value of using modern web technologies like NextJS and SSG to solve real-world problems.

Feel free to check out the [live demo](https://cmdi.netlify.app) to see the website in action!