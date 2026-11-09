---
slug: bitburner-hacking
title: "Bitburner Hacking Scripts"
date: Sep 25 2024 12:00 AM
kind: "Experiments"
author: Joe
description: Iterations of a Bitburner script for automating server hacking and resource management.
stack:
    - ReactJS
    - Javascript
github: https://github.com/joecaro/bit-burner-scripts
demo: 
tags:
    - reactjs
    - javascript
tech:
    - javascript
image: https://res.cloudinary.com/joecarothers/image/upload/v1727381020/misc/Projects/Device_Shots_2.0_Mockup_o5exzf.png
---

## Evolution of Bitburner Scripts: From hck-1 to Final Version

## Introduction

Bitburner lets players write scripts to hack servers and manage resources. I kept notes on how my script changed from hck-1 through the final version.

## Iteration 1: hck-1

- **Objective**: Automate basic hacking tasks and learn the game's scripting mechanics.
- **Features**:
  - Simple server scanning and hacking functions.
  - Basic logging to track script activity.
- **Challenges**:
  - Limited functionality that handled only basic tasks.
  - Inefficient resource usage, leading to slower execution and high system load.

## Iteration 2: hck-2

- **Objective**: Improve script efficiency and expand functionality.
- **Features**:
  - Enhanced server scanning with filters for better targeting.
  - Basic error handling to prevent crashes.
  - More detailed logging.
- **Changes**:
  - Refactored code to improve readability and modularity.
  - Added utility functions to reduce code duplication.

## Iteration 3: hck-3

- **Objective**: Introduce multi-threading and parallel execution.
- **Features**:
  - Multi-threaded operations for simultaneous hacking.
  - Parallel execution of grow and weaken scripts for balanced resource usage.
- **Changes**:
  - Implemented dynamic thread allocation based on server capacity.

## Iteration 4: hck-4

- **Objective**: Add a user interface (UI) for real-time monitoring.
- **Features**:
  - UI components to display script progress.
  - Real-time updates on hacking status, success rates, and efficiency.
- **Changes**:
  - Integrated React for UI management and real-time state updates.

## Iteration 5: hck-5

- **Objective**: Strengthen error handling and improve security.
- **Features**:
  - Added error handling.
  - Security checks for access permissions before executing operations.
- **Changes**:
  - Introduced validation steps and enhanced logging for better debugging.

## Iteration 6: hck-6

- **Objective**: Optimize performance and resource usage.
- **Features**:
  - Real-time performance monitoring to detect bottlenecks.
  - More efficient resource allocation for better overall performance.
- **Changes**:
  - Refactored code to reduce system load.

## Iteration 7: hck-7

- **Objective**: Finalize and prepare for deployment.
- **Features**:
  - Full hacking automation with a user-friendly interface.
  - Final bug fixes and UI improvements.
- **Changes**:
  - Cleaned up redundant code and improved documentation.

## Final Version

- **Objective**: Deploy the polished script.
- **Features**:
  - Added a live status display to the automation.
  - Added error handling and documentation.
- **Changes**:
  - Final optimizations for smooth execution and easy setup.

## Conclusion

Across the versions, I changed how the script allocates threads and handles errors, and added a live UI.
