FROM node:16

# Create a new dir
RUN mkdir -p /server_app

# Running dir
WORKDIR /server_app

# Copy all files in the current dir
COPY . .

# Download Packages
RUN npm install

# Set Env as Production
ENV NODE_ENV=production

# PORT MAPPING
EXPOSE 3000

# Start the server
CMD ["npm", "run", "start"]