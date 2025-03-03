# React-Frontend/Dockerfile
# Use an official node image as the base image
#FROM node:16-alpine as build
FROM node:current-alpine as build
# Set the working directory
WORKDIR /app

# List files to debug
RUN ls -al /app

# Copy package.json and package-lock.json
COPY ./package.json ./
#COPY /package-lock.json /app

# List files to debug
RUN ls -al /app

# Install dependencies
RUN npm install

# List files to debug
RUN ls -al /app

# Copy the rest of the application code
COPY . .

# List files to debug
RUN ls -al /app

# Echo environment variables for debugging
#RUN echo "Environment Variables:"
#RUN cat .env

# Build the application
#RUN npm run build

# Expose port 80
EXPOSE 3001

# Command to run the application
CMD ["node", "index.js"]