---
slug: boid-simulation
title: "Unity Boid Simulation"
date: Nov 18 2021 12:00 AM
author: Joe
description: A Boid Simulation using Unity's game engine to model realistic flocking behaviors.
stack:
    - Unity
    - C#
github: https://github.com/joecaro/unity-boid-simulation
demo:
tags:
    - project
    - unity
    - c#
tech:
    - c#
    - unity
image: https://res.cloudinary.com/joecarothers/image/upload/v1652918001/misc/Projects/boid-mockup_hy5n68_aahfv7.png
---

## Unity Boid Simulation

Simulations have always fascinated me, particularly the complexity that can emerge from simple rules. In this project, I took the opportunity to dive into Unity and C# to create my own boid simulation—a model of flocking behavior commonly seen in birds or fish.

This project uses Unity's powerful game engine to simulate flocking behaviors based on Craig Reynolds' Boids algorithm. The boids (agents in the simulation) follow a set of three simple rules, yet the resulting movements are surprisingly complex and natural.

## Flocking Behaviors

1. **Separation**  
   Each boid avoids crowding its neighbors by applying short-range repulsion. This ensures that they don’t collide, maintaining a comfortable distance between individuals.
2. **Alignment**  
   Boids align themselves by steering towards the average heading of their nearby flockmates, allowing them to move as a cohesive group.

3. **Cohesion**  
   Boids are drawn towards the average position of their neighbors, applying a long-range attraction that keeps the flock together.

With these three rules, the boids exhibit surprisingly realistic flocking behavior, creating dynamic motion and interaction. These behaviors are adjustable through weight variables, allowing you to fine-tune the flocking dynamics and create different movement styles.

### Predator Simulation

In addition to the core flocking mechanics, I also introduced a rudimentary predator. This predator forces the boids to enact an avoidance behavior, adding another layer of complexity to the simulation. It’s a simple but effective way to see how boids react to external threats while maintaining flock cohesion.

## Visual Representation

To provide a visual example of the flocking behaviors in action, here’s a preview of the simulation:

![Boid Sim](https://res.cloudinary.com/joecarothers/image/upload/v1653009299/misc/Projects/Sim_Gif_smal_bxnv5q.gif)

This gif demonstrates how the boids interact and move as a flock, avoiding obstacles and reacting to the predator in real-time.

## What I Learned

Working on this simulation helped me refine my skills in Unity and C#. It also deepened my understanding of how simple rules can lead to complex, emergent behavior. I enjoyed the challenge of balancing the flocking rules and tuning the weights to achieve a natural-looking simulation.

It was also rewarding to apply my programming knowledge to a real-world system where math, physics, and behavior intertwine. This project gave me a solid foundation in working with Unity for future simulations and game development.

## Project Links

- **Source Code**: [GitHub Repository](https://github.com/joecaro/unity-boid-simulation)

Feel free to check out the code, tweak the parameters, and experiment with the flocking behavior yourself!
