---
slug: bitburner-ui
title: "Bitburner Custom UI"
date: Sep 26 2024 12:00 AM
kind: "Libraries"
author: Joe
description: A game HUD for Bitburner built with React-style components and a small custom DOM renderer.
role: Developer
focus: Game stats, target and node displays, and DOM updates.
stack:
    - ReactJS
    - JavaScript
github: https://github.com/joecaro/bit-burner-scripts
demo:
tags:
    - react
    - javascript
    - game
tech:
    - react
    - javascript
image: https://res.cloudinary.com/joecarothers/image/upload/v1727381020/misc/Projects/Device_Shots_2.0_Mockup_o5exzf.png
---

## Bitburner Custom UI

I built a custom HUD for Bitburner that displays player stats, server targets, and hack, grow, and weaken activity. The game environment led me to experiment with a small renderer instead of using React DOM.

The renderer turns component-like objects into DOM nodes and supports text, attributes, styles, and event handlers. A diff helper updates text and attributes and replaces nodes when their type changes. This is a project experiment rather than a general-purpose React renderer.

The attribute-removal check in the example is:

```javascript
oldAttrs.forEach((attr) => {
  if (!newNode.hasAttribute(attr.name)) {
    oldNode.removeAttribute(attr.name);
  }
});
```

See the [Bitburner scripts repository](https://github.com/joecaro/bit-burner-scripts).
