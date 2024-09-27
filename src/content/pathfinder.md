---
slug: pathfinder
title: "Pathfinder App"
date: Nov 11 2021 12:00 AM
author: Joe
description: An application visually demonstrating various pathfinding algorithms, including Dijkstra's algorithm.
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

The **Pathfinder App** is an interactive visualization of **Dijkstra’s Algorithm**, demonstrating how it finds the shortest path between two nodes. Built with **ReactJS** and **TypeScript**, this project allows users to create their own grids, place obstacles, and watch the algorithm work around them to find the optimal path from start to finish.

## Why I Built It

Pathfinding algorithms are foundational to computer science, often used in scenarios like GPS navigation, game development, and AI decision-making. I built this app to deepen my understanding of these algorithms, particularly how they work in practice and how they can be visually represented. It also provides a great way for others to explore the inner workings of pathfinding algorithms interactively.

## Key Features

- **Interactive Grid**: Users can click and drag to place walls, which the algorithm must navigate around. This adds a dynamic element to the visual demonstration.
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
- **TypeScript**: The project leverages **TypeScript** for type safety, ensuring cleaner and more maintainable code.
- **HTML & CSS**: The visual grid and interaction elements are styled with vanilla **HTML** and **CSS**, providing a responsive and easy-to-use interface.

## What I Learned

This project gave me a deeper understanding of both pathfinding algorithms and the challenges of building interactive visualizations. By working through the implementation of **Dijkstra’s Algorithm**, I gained practical insights into how graph traversal algorithms operate, and I also learned how to efficiently update the DOM to reflect real-time changes in React.

Feel free to explore the [GitHub repository](https://github.com/joecaro/pathfinder-react-app) or check out the [live demo](https://pathfinder.josephcarothers.com/) to try the Pathfinder App yourself!
