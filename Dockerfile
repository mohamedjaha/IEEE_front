#use a lighter version of Node.js to run the application.
FROM node:18-alpine AS myWebImage
#Inside the container, create a folder /app and move into it.
WORKDIR /app          
# Copy package.json and package-lock.json to the working directory.
COPY package*.json ./
#It downloads all dependencies into /app/node_modules.
RUN npm install
# Copy the rest of the application code to the working directory.
COPY . .
#Build the application for production.
RUN npm run myWebImage

#Use a lighter version of Nginx to serve the built application.
FROM nginx:alpine
COPY --from=myWebImage /app/dist /usr/share/nginx/html
EXPOSE 80

#this is only for static sites if i had a backend connect to it i will need to setup a reverse proxy