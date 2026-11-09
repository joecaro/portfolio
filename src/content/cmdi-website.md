---
slug: cmdi-website
title: "CMDI Website"
date: Nov 11 2021 12:00 AM
kind: "Tools"
author: Joe
description: "I rebuilt a slow WordPress site in Next.js. The marketing team could still publish and edit content without changing the code."
stack:
  - NextJS
  - Contentful
github:
demo: https://cmdi.netlify.app
tags:
  - project
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

## SAAS Website for CMDI

In early fall 2021, pages on our WordPress site often took more than 10 seconds to load. I reviewed the site and proposed rebuilding it.

I chose Next.js so we could generate pages at build time. The marketing team could still manage content without editing the site code.

## Identified Problems

Here were the major issues with the old WordPress site:

- **Slow Performance**: Some pages took more than 10 seconds to load.
- **Plugins and Dependencies**: The WordPress site had accumulated plugins and libraries.
- **Content Management Challenges**: The marketing team found content updates slow and cumbersome.
- **SEO Issues**: Maintaining the correct directory structure for SEO purposes was difficult with WordPress and its templating system.

## Implemented Solutions

1. **Static Site Generation (SSG) with NextJS**: SSG pre-rendered pages at build time. Pages took less than two seconds to load after the migration.

2. **Image Optimization with Cloudinary**: I used **Cloudinary** to host and optimize images.

3. **Custom-Built Functionality**: I built several features without adding dependencies.

4. **ContentfulCMS**: I integrated Contentful so the marketing team could manage blog posts and other site content without editing the code.

## Performance Comparison

### Before Migration

- **Page Load Time**: Over 10 seconds
- **Performance Scores**: Low on Lighthouse (as seen below)

![Before](https://res.cloudinary.com/joecarothers/image/upload/v1637338306/misc/Screenshot_2021-11-19_110840_ybmolr.png)

### After Migration

- **Page Load Time**: Less than 2 seconds
- **Performance Scores**: Significantly higher, with much better scores on Lighthouse.

![After](https://res.cloudinary.com/joecarothers/image/upload/v1651167342/misc/Projects/cmdi/Screenshot_2022-04-28_133416_jnnvhq.jpg)

## Tech Stack

- **NextJS**: Framework of choice for static site generation and improved SEO.
- **Contentful**: Headless CMS used for managing structured content across the site.
- **Cloudinary**: For image optimization and faster delivery.
- **Netlify**: Hosting platform, allowing continuous integration and easy deployment through Git.

[See the demo](https://cmdi.netlify.app).
