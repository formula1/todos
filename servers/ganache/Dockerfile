# node:alpine will be our base image to create this image
FROM node:12.8

# Set the /app directory as working directory
RUN mkdir /app
# Install ganache-cli globally
WORKDIR /app

# Set the default command for the image
RUN npm install -g ganache-cli

CMD ["ganache-cli", "-h", "0.0.0.0"]
