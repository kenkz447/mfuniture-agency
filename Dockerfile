FROM node:10 as build
WORKDIR /source
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM node:10
WORKDIR /app
COPY --from=build /source/dist ./
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]