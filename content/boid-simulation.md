---
    slug: boid-simulation
    title: "Unity Boid Simulation"
    date:  Nov 18 2021 12:00 AM
    author: Joe
    description:  A Boid Simulation using Unity's game engine
    stack: 
      - Unity 
      - C#
    github: https://github.com/joecaro/unity-boid-simulation
    demo: not available
    tags:
      - project
      - unity
      - c#
    tech:
      - c#
      - unity
    image: https://res.cloudinary.com/joecarothers/image/upload/v1652902016/misc/Projects/boid-mockup_hy5n68.png
    position: 9
---

**Unity Boid Simulation**

I've always loved to explore the complex simulations people create in the Unity engine. This was my first dive into creating my own simulation. This takes the basic concept of flocking and implements a standard boid simulation.

### Flocking Behaviors

- Separation
  Avoid crowding neighbours (short range repulsion)
- Alignment
  Steer towards average heading of neighbours
- Cohesion
  Steer towards average position of neighbours (long range attraction)
  With these three simple rules, the flock moves in an extremely realistic way, creating complex motion and interaction that would be extremely hard to create otherwise.

These flocking behaviours drive the "decisions" of each flock agent, or boid. I included weight variables to tune each behavior to alter the behavior of the flock. This simulation also includes a rudimentary predator which steers another avoidance protocol.
