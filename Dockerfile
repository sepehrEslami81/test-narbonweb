FROM node:latest
ENV NODE_ENV=production
ENV PORT=8080

WORKDIR /app
COPY package*.json ./

RUN npm ci --only=production
COPY . .

EXPOSE 8080
CMD [ "node", "app.js" ]