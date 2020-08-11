![logo](./src/assets/images/readme-logo.png)

# shabazbadshah.github.io

This is the 4th iteration of my site. All pervious iterations of my site have been built using [Jekyll](http://jekyllrb.com/)) which sufficed for my needs at the time. However this solution was not scalable. With the recent paradigm shift to composing frontends using components, this was a good time as any to switch over to [React](https://reactjs.org/) via [Gatsby](gatsbyjs.org/).

## Site Goals

1. To hook into the vast technological ecosystem of Javascript and React
2. To provide a more modern UX/UI experience to visitors
3. To allow more easier maintainability of the codebase
4. Gain the ability to host more than one "blog" on the same site
5. Introduce a client side "omnibar-like" search

## System Preparation

If for whatever reason you want to run this site , or modify if for your own needs , you're going to need the following:

1. [NodeJS+NPM](http://nodejs.org) - use the installer or CLI.
2. A unix-like shell (MacOS shell, Linux shells, or WSL should work)

### Local Install

1. Open a shell and clone repo via ```git clone https://github.com/ShabazBadshah/shabazbadshah.github.io.git```
2. Change directories to where the repo has been cloned via ```cd /path/to/repo```. This will be your current working directory (CWD)
3. Run ```yarn install```/```npm install``` in the CWD. This will install all project dependencies
4. Run ```yarn start```/```npm start``` in the CWD. This will run the React app