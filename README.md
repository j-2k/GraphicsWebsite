# GraphicsWebsite
Website that is mainly contained with graphics mainly powered by Typescript &amp; ThreeJS. This is mainly just a fun project to fiddle around with TypeScript &amp; Graphics.

# Building & Running The Project
I worked on this in VSC as my editor and it requires the following installed:
- nodejs / npm 
- vite
- threejs

after having all requirements downloaded to run it on a localhost web do: 
npm run dev (make sure you are in the repo when you do it or just do it in the vsc terminal)

# Boilerplate startup guide for similar project
get npm first: https://nodejs.org/en. 

do "**npm --version**" to see if installed. 

install vite globally: **npm install -g vite**  

then open empty folder & do the following:  
**npm create vite@latest boilerplate-threejsproj**   
(follow the instructions that come on the terminal [I did steps > vanilla > typescript]). 

**cd boilerplate-threejsproj**  
**npm install**  
**npm run dev**  
(by now a web should be running on localhost with port written on ur terminal)
now ctrl+c / stop terminal & continue dling some other stuff

**npm i three gsap**  
**npm i --save-dev @types/three**  (do this if your using typescript)  
**npm run dev**



