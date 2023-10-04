FROM node:latest
ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app
COPY package*.json ./

RUN npm ci --only=production
COPY . .

EXPOSE 3000
CMD [ "node", "app.js" ]