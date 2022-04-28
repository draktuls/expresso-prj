FROM node:10-alpine

# Setup env
RUN apk update && apk upgrade
RUN apk add gcompat
RUN apk add sqlite~=3

# Setup app
RUN mkdir -p /app

# Add application
WORKDIR /app
COPY expresso .

# Install dependencies
RUN npm install

# Expose the port node-js is reachable on
EXPOSE 8000

# Populate db
RUN sqlite3 expresso.db < sql_commands.txt

# Generate token 
RUN echo "TOKEN_SECRET=`tr -dc 'A-F0-9' < /dev/urandom | dd bs=1 count=128 2>/dev/null`" > .env

# Start the node-js application
CMD ["npm", "start"]