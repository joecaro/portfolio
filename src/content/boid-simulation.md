---
slug: boid-simulation
title: "Unity Boid Simulation"
date: Nov 18 2021 12:00 AM
kind: "Experiments"
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

I wanted to see how much flocking behavior I could get out of a few rules. I built this in Unity and C#.

I used Craig Reynolds' Boids algorithm. Each boid adjusts its movement using the three rules below.

## Flocking Behaviors

1. **Separation**  
   Each boid steers away from nearby flockmates to avoid crowding.
2. **Alignment**  
   Each boid steers toward the average heading of nearby flockmates.

3. **Cohesion**  
   Each boid steers toward the average position of its neighbors.

The weights for these rules are adjustable, changing how the flock moves.

### Predator Simulation

I added a basic predator that the boids avoid while continuing to flock.

## Visual Representation

To provide a visual example of the flocking behaviors in action, here’s a preview of the simulation:

![Boid Sim](https://res.cloudinary.com/joecarothers/image/upload/v1653009299/misc/Projects/Sim_Gif_smal_bxnv5q.gif)

The animation shows the boids avoiding obstacles and reacting to the predator.

## What I Learned

I spent time tuning the weights of those rules to get the flock to move naturally.

## Project Links

- **Source Code**: [GitHub Repository](https://github.com/joecaro/unity-boid-simulation)
