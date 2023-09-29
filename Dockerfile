FROM node:18-alpine as BUILD
WORKDIR /app/lifting-app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine as PROD
WORKDIR /app/lifting-app
COPY --from=BUILD /app/lifting-app/dist/ /app/lifting-app/dist/
COPY package.json .
COPY vite.config.ts .
RUN npm install typescript
EXPOSE 3000 
CMD ["npm", "run", "preview"]
