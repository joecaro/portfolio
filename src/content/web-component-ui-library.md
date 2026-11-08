---
slug: web-component-ui-library
title: "Web Component UI Library"
date: Sep 25 2024 12:00 AM
kind: "Experiments"
author: Joe
description: An experiment with native Web Components, custom elements, and Shadow DOM for reusable interface pieces.
role: Component library author
focus: Custom element APIs, encapsulated styles, and framework integration.
stack:
    - Web Components
    - JavaScript
github: https://github.com/joecaro/custom-web-component-library
demo:
tags:
    - web components
    - javascript
    - experiment
tech:
    - javascript
    - web components
image: https://res.cloudinary.com/joecarothers/image/upload/v1727210498/misc/Projects/Web_Components_Crop_1080x650_oezpes.png
position: 7
---

## Web Component UI Library Experiment

I built a small set of native custom elements to explore whether reusable UI pieces could be shared between framework-based and plain-browser pages. The components use the browser's Custom Elements and Shadow DOM APIs. This was an experiment; I have no evidence that this library was adopted in production or became the Action Network promotion library.

The main tradeoff I explored was style and behavior encapsulation versus integration work at the host application boundary. Web Components keep internal markup and styles within each element, but consumers still need a clear way to pass data, listen for events, and coordinate with their framework.

The [source code](https://github.com/joecaro/custom-web-component-library) is available on GitHub. For the platform APIs, see [MDN's Web Components guide](https://developer.mozilla.org/en-US/docs/Web/Web_Components).
