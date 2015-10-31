Steps to setup Butler UI Development Env. on Linux / Win
    Clone the repository from bitbucket to your working directory.
### Steps to follow : 
1. sudo nmp init
2. npm install gulp browserify reactify vinyl-source-stream react
3. npm install history react-router@latest
4. touch gulpfile.js
5. mkdir src
6. cd src
7. touch index.html
8. mkdir js
9. touch main.js
10. mkdir actions components constants dispatchers stores
11. cd ..
12. mkdir assets
13. npm install --save react react-dom
14. npm install flux

Do make sure Gulp is installed globally 
   npm install -g gulp

If you want to install react add ons :
npm install react-addons-linked-state-mixin etc

For reference :[React-Add-ons](https://facebook.github.io/react/docs/addons.html)

## How to start gulp ##

1. Go to you directory 
2. gulp