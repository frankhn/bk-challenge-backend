FROM node:14

LABEL maintainer="Frankhn harfrank2@gmail.com"

RUN mkdir app


WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

RUN npm run build

COPY ./build .

# RUN npm ci --only=production

RUN ls

# WORKDIR /
EXPOSE 8000
CMD ./scripts/start.sh