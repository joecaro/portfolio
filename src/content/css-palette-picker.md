---
slug: css-palette-picker
title: "CSS Palette Picker"
date: May 17 2022 12:00 AM
kind: "Tools"
author: Joe
description: "Pick a color, preview a range of shades, and copy them into your stylesheet as CSS variables."
stack:
    - ReactJS
    - HTML
    - CSS
github: https://github.com/joecaro/color-palette-tool
demo: https://css-palette-picker.netlify.app/
tags:
    - reactjs
    - css
    - html
tech:
    - react
    - html
    - css
image: https://res.cloudinary.com/joecarothers/image/upload/v1652918002/misc/Projects/palette-mockup_u5fu30_wyu2cc.png
---

## CSS Color Palette Picker

I liked how Tailwind gives each color a range of shades. I built this picker to make similar scales for my own projects.

Pick a hue and set the lightness range. Preview the shades, then copy the CSS variables into your stylesheet.

## Key Features

1. **Custom Palette Creation**: Select a base hue and set the minimum and maximum lightness values to generate its shades.

2. **CSS Variables Export**: Copy the generated CSS variables into your stylesheet.

3. **Preview**: Preview each shade before exporting the CSS.

4. **Responsive Design**: The React app adapts to different screen sizes. The palette controls let users adjust lightness when choosing shades.

## Example Workflow

- **Choose Your Base Hue**: Start by selecting the main hue for your palette (e.g., blue, red, green).
- **Adjust Lightness**: Define the range of lightness values to generate shades ranging from the lightest tint to the darkest tone.
- **Export CSS Variables**: Once you're satisfied with your palette, click to copy the CSS variables and integrate them directly into your project’s stylesheet.

## Tech Stack

- **ReactJS**: The interactive elements and live previews are powered by **ReactJS**, ensuring a fast, responsive user experience.
- **HTML & CSS**: The tool itself is lightweight, using vanilla **HTML** and **CSS** for the core functionality and styles.

See the [source code](https://github.com/joecaro/color-palette-tool) or [try the picker](https://css-palette-picker.netlify.app/).

Happy designing!
