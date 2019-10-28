# +++++++++++++++++++++++++++++++++++++++++++++++
# Image for COMPILATION AND TESTS  
# +++++++++++++++++++++++++++++++++++++++++++++++
FROM node:10.15.0-alpine as builder

WORKDIR /usr/src/app

COPY babel.config.js .
COPY package.json .
COPY yarn.lock .

# COPY DEPENDENCIES
RUN yarn

# Compiles and hot-reloads for development
COPY public ./public/
COPY src ./src

# Lints and fixes files
RUN yarn lint

# Run your tests
# RUN yarn test

# Compiles and minifies for production
RUN yarn build

# +++++++++++++++++++++++++++++++++++++++++++++++
# Image for RUNTIME 
# +++++++++++++++++++++++++++++++++++++++++++++++
#
# Volume inherited from nginx image
# VOLUME /usr/share/nginx/html
# VOLUME /etc/nginx

FROM nginx:1.12.1-alpine

EXPOSE 80

COPY --from=builder /usr/src/app/dist/ /usr/share/nginx/html/
