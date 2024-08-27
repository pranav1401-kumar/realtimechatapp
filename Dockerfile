# Use the official Node.js image
FROM node:14

# Create and set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that your app will run on
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]
