# # base image
# FROM node:16-alpine3.14

# # set working directory
# RUN mkdir /usr/src/app
# WORKDIR /usr/src/app

# # add `/usr/src/app/node_modules/.bin` to $PATH
# # ENV PATH /usr/src/app/node_modules/.bin:$PATH

# # install and cache app dependencies
# COPY package.json /usr/src/app/package.json
# RUN npm install
# RUN npm install react-scripts -g

# EXPOSE 3000

# # start app
# CMD ["npm", "run" , "dev"]


FROM node:16-alpine3.14

# ARG NEXT_PUBLIC_API_URL
# ARG NEXTAUTH_SECRET

# ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
# ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
# Create app directory
WORKDIR /usr/app
# Install app dependencies
COPY package*.json ./

RUN npm install

# Copy app source code
COPY . .

#Expose port and start application
EXPOSE 3000
CMD ["npm", "run" , "production"]