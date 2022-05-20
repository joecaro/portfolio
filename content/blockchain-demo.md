---
    slug: blockchain-demo
    title: "Visual Blockchain Demo"
    date:  Nov 18 2021 12:00 AM
    author: Joe
    description:  A visual walkthrough of blockchain technologies. Learn ideas like hash functions, blocks, blockchains, and distributed ledger technologies.
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
    position: 6
---

**Blockchain Demo**

This is an educational tool to learn that basics of blockchain technologies. It covers the basics of hashing, blocks, and distributed ledgers. The site uses a pseudo-blockchain I coded to drive the interactive examples on each page.

Below is the source code to the blockchain, which consists of the basic methods you'd find for a blockchain - validating hashes, mining blocks, adding new blocks, etc.

    export class Blockchain {
    constructor() {
    this.chain = [this.initGenesisBlock()];
    this.difficulty = 4;
    }

    initGenesisBlock() {
      let prevHash =
        "0000000000000000000000000000000000000000000000000000000000000000";
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
      // update hash for each block starting at this block and looping through the rest of the chain + validate new hashes
      for (let i = block.index + 1; i < this.chain.length; i++) {
        this.chain[i].prevHash = this.chain[i - 1].hash;
        this.chain[i].hash = this.calculateHash(
          this.chain[i],
          this.chain[i].nonce
        );
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
        return this.chain;
      }
    }

    addNewBlock(data) {
      // calculate initial values for new block and instantiate it
      let prevHash = this.chain[this.chain.length - 1].hash;
      let index = this.chain.length;
      let newBlock = new Block(prevHash, index, data);
      // push block to chain
      this.chain.push(newBlock);

      this.mineBlock(this.chain[index], false);
      this.chain[index].hash = this.calculateHash(newBlock, newBlock.nonce);

      return this.chain;
    }

    updateBlockData(blockIndex, data) {
      this.chain[blockIndex].data = data;
      this.chain[blockIndex].hash = this.calculateHash(
        this.chain[blockIndex],
        this.chain[blockIndex].nonce
      );
      this.chain[blockIndex].error = this.validateHash(this.chain[blockIndex]);
      this.updateChain(this.chain[blockIndex]);

      return this.chain;
    }

    updateBlockNonce(blockIndex, nonce) {
      this.chain[blockIndex].nonce = nonce;
      this.chain[blockIndex].hash = this.calculateHash(
        this.chain[blockIndex],
        nonce
      );
      this.chain[blockIndex].error = this.validateHash(this.chain[blockIndex]);
      this.updateChain(this.chain[blockIndex]);

      return this.chain;
    }

    }
