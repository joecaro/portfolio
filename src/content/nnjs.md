---
slug: nnjs
title: "NNJS: A JS Neural Network Library"
date: Jun 17 2022 12:00 AM
kind: "AI & platform"
author: Joe
description: A JavaScript library for building and training neural networks in the browser.
stack:
    - Javascript
github: https://github.com/joecaro/nnjs
demo:
tags:
    - project
    - javascript
    - neural networks
    - ml
tech:
    - javascript
    - machine learning
image: ""
---

## NNJS: A Neural Network Training Library in JavaScript

I wrote NNJS in JavaScript to experiment with training neural networks in the browser.

NNJS lets users build, train, and visualize neural networks in the browser.

## Key Features

### 1. Lightweight and Flexible

**NNJS** implements forward and backward propagation in JavaScript.

### 2. Customizable Architectures

You can set the number of layers, neurons per layer, and activation functions.

```javascript
const nn = new NeuralNetwork([3, 5, 2], "relu");
```

### 3. Browser-Based Training

NNJS runs in the browser, where users can view training progress and change parameters.

### 4. Forward and Backpropagation

NNJS includes forward propagation and backpropagation, which adjusts weights using gradient descent based on the loss function.

### 5. Visual Training Insights

Training results can be logged or displayed as the network runs.

### Tech Stack

- JavaScript: NNJS is written in vanilla JavaScript for browsers and Node.js.
- Machine Learning: The library implements core concepts of neural networks, including forward propagation, backpropagation, and gradient descent.

Example Usage

Create and train a network with NNJS:

```javascript
const nn = new NeuralNetwork([2, 4, 1], "sigmoid");

// Training data
const inputs = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
];
const targets = [[0], [1], [1], [0]]; // XOR problem

// Train the network
nn.train(inputs, targets, 10000, 0.1);

// Test the network
const result = nn.predict([1, 0]);
console.log(result);
```

This example trains a 2-4-1 network on the XOR problem using the sigmoid activation function.

### What I Learned

Building NNJS helped me understand forward propagation, backpropagation, and gradient descent by implementing each one.

Keeping the library small also made it easier to experiment with these ideas.

### Future Enhancements

Moving forward, I plan to add more advanced features, including:

- Support for Convolutional Neural Networks (CNNs): Expanding the library to handle image-based data and CNN architectures.
- Interactive Demos: Creating in-browser demos where users can tweak neural network parameters and see real-time results.
- Add pretrained models for common tasks.

### Final Thoughts

See the repository for source code, examples, and documentation.
