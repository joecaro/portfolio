---
    slug: pathfinder
    title: "Pathfinder App"
    date:  Nov 11 2021 12:00 AM
    author: Joe
    description:  Application visually demonstrating various pathfinding algorithms.
    stack: 
      - ReactJS
      - Typescript
    github: https://github.com/joecaro/pathfinder-react-app
    demo: https://pathfinder.josephcarothers.com/
    tags:
      - project
      - reactjs
      - javasacript
      - html
      - css
      - typescript
    tech:
      - javasacript
      - react
      - html
      - css
    image: https://res.cloudinary.com/joecarothers/image/upload/v1652918002/misc/Projects/pathfinder-mockup_wnkcxi_naygcq.png
    position: 7
---

**Pathfinder**

This app demonstrates Dijkstra's pathfinding algorithm to find the shortest path from the start to end node. You can click and drag to create walls that the algoritm must work around.

### Concept of Dijkstra's algorithm

Dijkstra's algorithm calculates the shortest path between two nodes. It consists of keeping track of visited vs. unvisited nodes in a grid and progressing through the grid keeping track the length of different path options until it reaches the end node. Beginning with the starting node, we add our unvisisted neighbors to a stack and run through that stack to calculate the total distance to that node. For each of the newly visited neighbors we will continue this process until we reach the finish node.

![Dijkstra's Example](https://res.cloudinary.com/joecarothers/image/upload/v1653008611/misc/Projects/Dijkstras_progress_animation_uufe9t.gif)
