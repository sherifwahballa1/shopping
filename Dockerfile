FROM node:alpine

RUN npm install -g pm2

WORKDIR /app

# Copy the packakage.json to workdir (/app)
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

# Copy app source
COPY . .

#Default command
CMD ["pm2-runtime", "server.js"]
