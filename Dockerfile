FROM node:21
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
EXPOSE 3001

CMD ["npm", "start"]