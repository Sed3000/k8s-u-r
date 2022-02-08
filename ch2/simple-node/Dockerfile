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
