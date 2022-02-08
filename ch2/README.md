Kubernetes UP & Ruuning
Examples: https://github.com/kubernetes-up-and-running/examples
Chapter 2: Creating and Running Contaniers
Creating an Application [npm/Node/Epress] Apps
package.json &server.js

#package.json
{
  "name": "simple-node",
  "version": "1.0.0",
  "description": "A sample simple application for Kubernetes Up & Running",
  "main": "server.js",
  "scripts": {
    "scripts": "node server.js"
        },
  "author": "Sedrick White"
 }

 
#server.js
var express = require('express');

var app = express();
app.get('/', function (req, res) {
   res.send('Hello World!');
   });
app.listen(6000, function() {
   console.log('listening on port !6000!')
   console.log('http://localhost:6000');
  });
  
#.dockerignore
node_modules

#Dockerfile

#Start from a Node.js 10 (LTS Image
FROM node:10

#Specify the directory inside the image in which all command will running/examples
WORKDIR /usr/src/app

#Copy Package files and install dependencies
COPY package*.json ./
RUN npm install express
RUN npm install

#Copy all of the app files into the images
COPY . .

#The default command to run when starting the conatiner
CMD [ "npm", "start" ]

#build image
docker build -t simple-node .

#Rum image as a container daemon
docker run --rm -itd -p 6000:6000 simple-node

#check for running success
curl <localhost or ip>:6000

#Stop container
docker stop <container id>
