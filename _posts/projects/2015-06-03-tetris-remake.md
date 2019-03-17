---
layout: article
title: A Tetris Remake
date: 2015-06-03
category: "projects"
project-category: "Game Development"
repo_link: https://github.com/ShabazBadshah/TetrisRemake
project-blurb: "Tetris is one of the most influential games ever created, and one of my personal favorites (I'm not very good at it). This was the second game I ever made. My objective for this game was to create it in as little time as possible (at most 5 days) with a unique implementation. This game took me 4 days non-stop to create, and was programmed in Java."
---

# A Tetris Remake

June 3, 2015 {#date}
----

[Source Code](https://github.com/ShabazBadshah/TetrisRemake) {#project-links}
----

## Project Synopsis

*Tetris is one of the most influential games ever created, and one of my personal favorites (I'm not very good at it). This was the second game I ever made. My objective for this game was to create it in as little time as possible (at most 5 days) with a unique implementation. This game took me 4 days non-stop to create, and was programmed in Java.*

## Tools, Technologies, and Skills

- Eclipse IDE for development
- Photoshop for graphics and sprites
- Copious amounts of coffee
- Object oriented programming (use of MVC design pattern, I wasn't intentionally aware of this at the time)
- Fast iteration of solutions to a problem (trying to quickly come up with implementations for the logic of Tetris)
- Image editing and processing via Photoshop


## Challenges, Issues, and their Resolutions

Determining an implementation for this game was the most difficult part due to the time constraint I had set on myself. So, I got out a piece of paper and just started writing down possible ways to implement the logic and graphics of the game. Ultimately, I came to the conclusion of the 2 following implementations for the logic:

- Using an nxn grid of booleans to keep track of where each tetromino was located. Draw the shapes wherever the value was True
- A collision based approach where each tetromino would have a position variable, and that variable would be used to calculate where to draw the shapes

Eventually I chose the boolean grid approach due to the fact that keeping track of True/False values made work simpler than keeping track of each tetromino's position. The pieces were also True/False values; as the blocks would move down the grid, the game would update its grid based on the values of each piece. The rotation logic also took a little bit of effort to implement but was relatively simple when compared to implementing the grid.

## What did I Learn

Sometimes iterating through a plethora of solutions very quickly is a good way to determine the best solution. If you think something might not work try to implement it and figure out improvements upon it, or try to attempt a different solution. When working with teams you have to complete projects with very strict deadlines. During this process, if a solution does not work you will have to quickly determine another solution. This project gave me a sense of this urgency.

On a more direct note, I definitely learned a lot about arrays and other general container objects, pertaining to performance. Iterating through different implementations allowed me to begin forming a general workflow for projects or any other type of work, which I will undoubtedly use in the future. Roughly speaking the process goes something like this:

- Write down exactly what your objective for the project is
- Write down the general steps and sections you will have to go through to reach that objective
- Come up with mockups, algorithms, architecture, etc before starting any work on the app. Essentially think through solutions
- Create the product while solving and iterating through solutions if necessary. Also keep track of everything you do (daily logs, backups, design mockups, etc)
- Once project is complete, reflect upon it, and use this opportunity to create more improved products in the future

## YouTube Video Demo

<div id="center-image-container">
  <a href="http://www.youtube.com/watch?feature=player_embedded&v=EOo-WPmIbdY" target="_blank">
    <img class="override-width" id="youtube" src="http://img.youtube.com/vi/EOo-WPmIbdY/0.jpg"/>
  </a>
</div>