FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install

RUN if [ ! -d "/.npm" ]; then mkdir /.npm; fi
RUN if [ ! -d "/app/.angular" ]; then mkdir /app/.angular; fi

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]