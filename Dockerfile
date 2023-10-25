FROM node:19
WORKDIR /app
COPY package.json /app/
RUN yarn install
EXPOSE 4040
CMD [ "yarn", "start" ]