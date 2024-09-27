---
slug: nnjs
title: "NNJS: A JS Neural Network Library"
date: Jun 17 2022 12:00 AM
author: Joe
description: A lightweight JavaScript library for training neural networks, built from the ground up for flexibility and simplicity.
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
image: https://res.cloudinary.com/joecarothers/image/upload/v1652918002/misc/Projects/nnjs-mockup_vocglf.png
---

## NNJS: A Neural Network Training Library in JavaScript

**NNJS** is a lightweight, easy-to-use JavaScript library for building and training neural networks. Whether you’re looking to get a better understanding of how neural networks work under the hood or want a simple way to experiment with machine learning in the browser, NNJS provides a flexible solution.

## Why I Built NNJS

I created **NNJS** to address a specific gap: while there are powerful machine learning libraries like TensorFlow and PyTorch for large-scale applications, I wanted something more accessible and lightweight for smaller projects and educational purposes. **NNJS** is built from scratch in JavaScript, making it ideal for those who want to learn how neural networks work without the complexity of larger libraries.

By providing a simple, transparent API, NNJS allows users to build, train, and visualize neural networks directly in the browser, making it a useful tool for anyone learning or teaching machine learning concepts.

## Key Features

### 1. Lightweight and Flexible

**NNJS** is designed to be lightweight, without the overhead of larger machine learning libraries. It focuses on core neural network operations, including forward and backward propagation, allowing you to build and train neural networks with just a few lines of JavaScript.

### 2. Customizable Architectures

The library supports customizable neural network architectures, meaning you can define the number of layers, the number of neurons per layer, and the activation functions used. This flexibility allows for experimenting with different models and understanding the impact of architectural choices.

```javascript
const nn = new NeuralNetwork([3, 5, 2], "relu");
```

### 3. Browser-Based Training

Since NNJS runs in JavaScript, it can be used directly in the browser. This makes it an excellent tool for educational purposes, allowing users to experiment with neural networks without needing to set up a complex environment. You can visualize training progress in real-time and modify parameters on the fly.

### 4. Forward and Backpropagation

NNJS includes the essential features of a neural network, including forward propagation (calculating outputs from inputs) and backpropagation (adjusting weights using gradient descent based on the loss function). This gives users a hands-on understanding of how these processes work in practice.

### 5. Visual Training Insights

You can easily track the performance of your neural network with visual feedback, making it easier to understand how your network is learning over time. Training results can be logged or displayed in real-time, giving you insight into model performance across iterations.

### Tech Stack

- JavaScript: NNJS is built entirely in vanilla JavaScript, ensuring that it runs in any modern browser environment or Node.js.
- Machine Learning: The library implements core concepts of neural networks, including forward propagation, backpropagation, and gradient descent.

Example Usage

Here’s a quick example of how to create and train a neural network with NNJS:

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

In this example, we train the network on the XOR problem (a common test for neural networks) using a simple 2-4-1 architecture and the sigmoid activation function. After training, the network should be able to predict the XOR results with high accuracy.

### What I Learned

Building NNJS from the ground up gave me a much deeper understanding of neural networks, particularly how they work under the hood. By implementing forward propagation, backpropagation, and gradient descent myself, I was able to see how each part of the process contributes to the overall learning of the network.

It also reinforced the importance of simplicity and flexibility in libraries meant for educational purposes. By keeping NNJS lightweight, it’s not only easier to use but also an excellent learning tool for those new to machine learning.

### Future Enhancements

Moving forward, I plan to add more advanced features, including:

- Support for Convolutional Neural Networks (CNNs): Expanding the library to handle image-based data and CNN architectures.
- Interactive Demos: Creating in-browser demos where users can tweak neural network parameters and see real-time results.
- Pre-built Models: Providing pre-trained models for common tasks to showcase the power of neural networks right out of the box.

### Final Thoughts

NNJS is a tool for anyone curious about neural networks or looking for a lightweight solution to build and train models in JavaScript. Whether you’re a student, a teacher, or a developer experimenting with machine learning, this library provides a simple, accessible entry point into the world of neural networks.

Check out the GitHub repository for the source code, examples, and documentation. Feel free to contribute or suggest enhancements as well!
