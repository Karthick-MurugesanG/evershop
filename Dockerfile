FROM node:18-alpine

WORKDIR /app

# Install global dependencies
RUN npm install -g npm@9

# Copy package files first
COPY package*.json ./
COPY packages ./packages
COPY babel.config.js ./

# Install dependencies
RUN npm install

# Copy project files
COPY themes ./themes
COPY extensions ./extensions
COPY public ./public
COPY media ./media
COPY config ./config
COPY translations ./translations

# Install PostgreSQL client
RUN apk add --no-cache postgresql-client

# Build
RUN npm run build

EXPOSE 3000


CMD ["npm", "run", "start"]
