---
slug: pathfinder
title: "Pathfinder App"
date: Nov 11 2021 12:00 AM
kind: "Experiments"
author: Joe
description: "Draw a grid, add obstacles, and watch Dijkstra’s algorithm find the shortest route."
stack:
    - ReactJS
    - Typescript
github: https://github.com/joecaro/pathfinder-react-app
demo: https://pathfinder.josephcarothers.com/
tags:
    - project
    - reactjs
    - javascript
    - html
    - css
    - typescript
tech:
    - javascript
    - react
    - html
    - css
image: https://res.cloudinary.com/joecarothers/image/upload/v1652918002/misc/Projects/pathfinder-mockup_wnkcxi_naygcq.png
---

## Pathfinder App

Draw a grid, place obstacles, and watch Dijkstra's algorithm find the shortest route. I built the visualizer with React and TypeScript.

## Why I Built It

I built it to learn how Dijkstra's algorithm works by watching it update a grid one step at a time.

## Key Features

- **Interactive Grid**: Users can click and drag to place walls for the algorithm to route around.
- **Real-Time Visualization**: The app provides a step-by-step visual of the algorithm as it progresses through the grid, updating with each step to show which nodes are visited and how the shortest path is calculated.
- **Dijkstra's Algorithm**: The core algorithm demonstrated in this app is Dijkstra’s, a well-known algorithm for finding the shortest path between two points in a weighted graph.

## How Dijkstra’s Algorithm Works

Dijkstra’s algorithm is designed to find the shortest path between a start and an end node. Here’s how it works:

1. **Initialization**: The algorithm begins by marking the starting node as visited and setting its initial distance to zero. All other nodes are marked as unvisited, with their distances set to infinity.
2. **Visiting Neighbors**: From the starting node, the algorithm visits all of its unvisited neighbors and calculates the total distance from the start node to each neighbor. These neighbors are added to a priority queue based on their distance.

3. **Progressing Through the Grid**: The algorithm continues by visiting the node with the smallest total distance from the priority queue. It repeats the process of visiting neighbors and updating distances until it reaches the end node.

4. **Shortest Path Calculation**: Once the end node is reached, the algorithm retraces the path from the end to the start, yielding the shortest path. The result is displayed visually, allowing users to see how the algorithm navigates through the grid and around obstacles.

![Dijkstra's Example](https://res.cloudinary.com/joecarothers/image/upload/v1653008611/misc/Projects/Dijkstras_progress_animation_uufe9t.gif)

## Tech Stack

- **ReactJS**: The app is built using **ReactJS** for its interactive components and real-time updates.
- **TypeScript** defines the grid and node types.
- **HTML & CSS**: The visual grid and interaction elements are styled with vanilla **HTML** and **CSS**, providing a responsive and easy-to-use interface.

## What I Learned

The React view updates as the algorithm visits nodes so you can follow the search before seeing the final route.

See the [source code](https://github.com/joecaro/pathfinder-react-app) or [try the visualizer](https://pathfinder.josephcarothers.com/).
