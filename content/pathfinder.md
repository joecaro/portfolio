---
    slug: pathfinder
    title: "Pathfinder App"
    date:  Nov 11 2021 12:00 AM
    author: Joe
    description:  Application visually demonstrating various pathfinding algorithms.
    stack: 
      - ReactJS
    github: https://github.com/joecaro/pathfinder-react-app
    demo: https://pathfinder.josephcarothers.com/
    tags:
      - project
      - reactjs
      - javasacript
      - html
      - css
    tech:
      - javasacript
      - react
      - html
      - css
    image: https://res.cloudinary.com/joecarothers/image/upload/v1652918002/misc/Projects/pathfinder-mockup_wnkcxi_naygcq.png
    position: 7
---

**Pathfinder**

This app demonstrates the A\* pathfinding algorithm to find the shortest path from the start to end node. You can click and drag to create walls that the algoritm must work around.

### Concept of A-star algorithm

The A-star algorithm calculates the cost to all its neighboring nodes and chooses the minimum cost node. This process is repeated until no new nodes can be selected and all the paths are traversed. Then, we consider the best path. Let f(n) represents the final cost, which is denoted as: f(n) = g(n) + h(n), where:

- g(n) = cost of traversing from one node to another.
- h(n) = heuristic approximation of the node’s value.
