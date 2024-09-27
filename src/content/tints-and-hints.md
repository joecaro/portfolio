---
slug: tints-and-hints
title: "A SolidJS Party Game "
date: Jul 25 2024 12:00 AM
author: Joe
description: An exploration of SolidJS and its merits in managing complex state for a game inspired by Hues and Cues, focusing on local state management and WebSocket communication.
stack:
    - SolidJS
    - NodeJS
    - TailwindCSS
    - WebSocket
github: https://github.com/joecaro/tints-and-hints
demo: https://tintsandhints.vercel.app/
tags:
    - solidjs
    - game
    - websockets
    - tailwindcss
    - featured
tech:
    - solidjs
    - node
    - tailwindcss
    - websockets
image: https://res.cloudinary.com/joecarothers/image/upload/v1727159315/misc/Projects/Tints-And-Hints.png
---

## Tints and Hints: A Hues and Cues Clone Built with SolidJS

**Tints and Hints** is a web-based clone of the popular color-guessing game **Hues and Cues**. The game challenges players to describe colors using only verbal hints, while other players guess the specific shade on a color board. This project was not only an opportunity to recreate the fun of the game but also an exploration of the **SolidJS** framework and its capabilities in managing complex state.

## Why I Built It

The core motivation behind this project was to explore **SolidJS** and its strengths in modern web development. I wanted to see how well it handled complex state management, performance optimization, and rendering in comparison to more established frameworks like React. Given that **Tints and Hints** relies heavily on dynamic updates (players guessing in real-time), this made it the perfect case study.

Additionally, I wanted to experiment with real-time communication using **WebSockets** for a multiplayer experience. While the WebSocket servers are currently offline due to cost constraints, the core game logic and client-side experience remain intact with local state management.

## SolidJS for Complex State Management

### Why SolidJS?

I chose **SolidJS** for its reactive, fine-grained rendering approach. Unlike React, SolidJS only re-renders the components that are directly impacted by a change in state, avoiding the performance overhead of virtual DOM diffing. This made it particularly appealing for a real-time game where UI elements are updated frequently as players make guesses.

### State Management in SolidJS

Managing state in **Tints and Hints** required tracking each player's guesses, game progress, and the real-time updates from other players. SolidJS's reactivity system made it easy to define small, reactive pieces of state that were updated only when necessary, leading to more efficient rendering.

For example, handling state updates for players’ guesses and color selections in real-time:

```javascript
import { createSignal } from "solid-js";

const [guesses, setGuesses] = createSignal([]);

// Add new guess to state
function addGuess(guess) {
    setGuesses([...guesses(), guess]);
}
```

SolidJS’s reactive primitives like createSignal allowed for minimal re-renders, making the game’s UI feel snappy and responsive, especially in scenarios where multiple players are interacting with the interface simultaneously.

Exploring WebSockets (Server-Offline)

The server-side implementation was built with Node.js and Socket.IO for real-time communication between clients. The idea was to allow multiple players to join a game session, guess colors in real-time, and receive instant feedback based on their choices. However, due to costs, the WebSocket server is currently offline.

WebSocket Architecture

The backend was set up using Express and Socket.IO to manage the real-time communication layer. Here’s a quick overview of how it worked:

- Client: Sends guesses to the server and receives updates about other players’ guesses and the current game state.
- Server: Manages all connected clients, broadcasting updates in real-time.

Example of server-side socket handling:

```javascript
const io = require("socket.io")(server);

io.on("connection", socket => {
    console.log("New client connected");

    socket.on("guess", data => {
        // Broadcast the guess to all connected clients
        io.emit("guess-update", data);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});
```

The local version of the game still runs using SolidJS’s local state management, but adding the real-time multiplayer feature was a fun and challenging experience.

The Frontend Stack

The frontend of Tints and Hints was built with SolidJS and a set of complementary tools:

- TailwindCSS: Used for styling, keeping the design consistent and responsive with minimal effort.
- Socket.IO Client: For real-time WebSocket communication with the backend (currently offline).
- SolidJS Router: For managing the game’s routing and navigation, ensuring seamless transitions between different game states.
- Falso and Test-Data-Bot: For generating mock data during testing, allowing me to simulate player interactions without needing a live server.

Challenges and Benefits

Benefits of SolidJS

- Efficient Rendering: SolidJS performed exceptionally well in handling UI updates, even with frequent state changes during gameplay.
- Simple State Management: SolidJS’s reactivity model was easy to work with, and managing complex game state felt natural with its built-in reactive primitives.

Challenges

- WebSocket Costs: Keeping the WebSocket server online became costly, so it’s currently offline, meaning the game operates in a single-player mode locally.
- Learning Curve: Although SolidJS is relatively simple to pick up, its mental model differs from frameworks like React. There was a learning curve in understanding how fine-grained reactivity impacts the application structure.

### Tech Stack

Frontend:

- SolidJS: The core framework used for handling UI and state management.
- TailwindCSS: For styling the app with utility-first CSS.
- Solid Router: For managing navigation between game states.
- Socket.IO Client: For handling real-time WebSocket communication.
- Falso and Test-Data-Bot: For generating mock data during development and testing.

Backend:

- Node.js: For building the server that managed real-time communication.
- Socket.IO: For handling WebSocket connections and broadcasting game updates.
- Express: For setting up the backend server.

### Final Thoughts

Tints and Hints was an excellent opportunity to dive deeper into SolidJS and explore its strengths in managing complex, real-time state. The lightweight nature of SolidJS made it a pleasure to work with, especially in scenarios where pre-rendering wasn’t an issue. While the multiplayer WebSocket features are currently disabled, the local version of the game showcases how SolidJS can handle dynamic, interactive applications with ease.

Check out the GitHub repository to see the code in action, and feel free to fork the project to set up your own WebSocket server if you’d like to see the multiplayer functionality in action!
