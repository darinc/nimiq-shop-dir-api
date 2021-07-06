FROM node:14.17-alpine

WORKDIR /api
ADD . /api
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
