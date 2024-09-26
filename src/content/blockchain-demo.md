---
slug: blockchain-demo
title: "Blockchain Demo"
date: Nov 18 2021 12:00 AM
author: Joe
description: A visual walkthrough of blockchain technologies. Learn about key concepts like hash functions, blocks, blockchains, and distributed ledger technologies.
stack:
    - ReactJS
    - Javascript
    - Featured
github: https://github.com/joecaro/blockchain-demo-reactJS
demo: https://blockchaindemo.netlify.app/
tags:
    - project
    - featured
    - reactjs
    - blockchain
    - javascript
tech:
    - blockchain
image: https://res.cloudinary.com/joecarothers/image/upload/v1652918002/misc/Projects/blockchain-mockup_qosdpg_fl4uwz.png
---

## Blockchain Demo

Welcome to my **Blockchain Demo** project! This educational tool provides a hands-on way to learn the core concepts behind blockchain technologies. Whether you’re new to the blockchain world or brushing up on your knowledge, this demo walks you through the foundational ideas: **hash functions**, **blocks**, and **distributed ledgers**.

I've built this site using ReactJS and created a pseudo-blockchain engine to drive the interactive elements. You can see and interact with blockchain mechanics in real-time, such as **mining blocks**, **validating hashes**, and **adding new blocks**.

## How it Works

At its core, this project implements a simplified version of a blockchain, demonstrating basic methods you'd find in real-world blockchains: validating hashes, mining blocks, and adding new ones to the chain. The goal is to make complex blockchain ideas more tangible and easy to understand.

Here’s a quick breakdown of the blockchain class:

### Key Features of the Blockchain Class

- **Genesis Block Creation**: The first block in the chain, with a predefined hash and data.
- **Hash Calculation**: The project uses `SHA256` to calculate hashes based on block data, index, and the previous block's hash.
- **Block Validation**: It ensures the difficulty level is met by checking that the calculated hash has a sufficient number of leading zeros.
- **Mining Blocks**: This feature involves repeatedly calculating a hash until the desired difficulty is achieved, demonstrating the proof-of-work concept.
- **Dynamic Block Updates**: Users can interact with blocks, modify their data, and see how this affects the blockchain's integrity.

Below is the source code that powers the blockchain functionality:

```javascript
export class Blockchain {
  constructor() {
    this.chain = [this.initGenesisBlock()];
    this.difficulty = 4;
  }

  initGenesisBlock() {
    let prevHash = "0000000000000000000000000000000000000000000000000000000000000000";
    let data = "Initial Block in the Chain";
    let firstBlock = new Block(
      prevHash,
      0,
      data,
      "0000f727854b50bb95c054b39c1fe5c92e5ebcfa4bcb5dc279f56aa96a365e5a"
    );
    firstBlock.nonce = 12424;
    return firstBlock;
  }

  calculateHash(block, testNonce) {
    return SHA256(
      testNonce + block.data + block.index + block.prevHash
    ).toString();
  }

  validateHash = (block) => {
    return (
      this.calculateHash(block, block.nonce).substring(0, this.difficulty) !==
      Array(this.difficulty + 1).join("0")
    );
  };

  updateChain(block) {
    // Updates hash and validates new blocks in the chain
    for (let i = block.index + 1; i < this.chain.length; i++) {
      this.chain[i].prevHash = this.chain[i - 1].hash;
      this.chain[i].hash = this.calculateHash(this.chain[i], this.chain[i].nonce);
      this.chain[i].error = this.validateHash(this.chain);
    }
  }

  latestBlock() {
    return this.chain[this.chain.length - 1];
  }

  mineBlock(block, isChain) {
    if (this.validateHash(block, block.nonce)) {
      let testNonce = 0;
      while (
        this.calculateHash(block, testNonce).substring(0, this.difficulty) !==
        Array(this.difficulty + 1).join("0")
      ) {
        testNonce++;
      }
      this.chain[block.index].nonce = testNonce;
      this.chain[block.index].hash = this.calculateHash(block, testNonce);
      this.chain[block.index].error = this.validateHash(block);

      if (isChain) {
        this.updateChain(block);
      }
      return this.chain;
    } else {
      block.error = false;
      return​⬤
    }
```
