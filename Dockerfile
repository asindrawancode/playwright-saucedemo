# Dockerfile

# Use the official node image as a base
FROM mcr.microsoft.com/playwright:v1.14.1-focal

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for npm installs
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Add a script to run tests
CMD ["npx", "playwright", "test"]
