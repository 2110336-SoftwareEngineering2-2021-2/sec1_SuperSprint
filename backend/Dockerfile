FROM node:16-alpine3.14

WORKDIR /usr/src/app
#/app if buum

COPY package*.json ./

#RUN npm install glob rimraf

RUN npm install 
# --only=development

COPY . .

EXPOSE 1112

CMD ["npm","run","start:prod"]

# FROM node:12.19.0-alpine3.9 as production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install 
# #--only=production

# COPY . .

# COPY --from=development /usr/src/app/dist ./dist

# CMD ["node", "dist/main"]

