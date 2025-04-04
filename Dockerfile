# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all files
COPY . .

# Expose port and run app
EXPOSE 5173
CMD ["npm", "run", "dev"]
