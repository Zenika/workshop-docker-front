# FAIRE ATTENTION A L'image de depart
# UTILSER LE CACHE DOCKER ET L'optimiser
# MONTER LE CODE pour tester en live
# ALLEGER L'image de run (lib / outils)

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

FROM nginx:1.12.1-alpine

EXPOSE 80

COPY --from=builder /usr/src/app/dist/ /usr/share/nginx/html/
