#FAIRE ATTENTION A L'image de depart
# UTILSER LE CACHE DOCKER ET L'optimiser
# MONTER LE CODE pour tester en live
# ALLEGER L'image de run (lib / outils)

From node:10

WORKDIR /usr/src/app

ADD babel.config.js .
ADD package.json . 
ADD package-lock.json . 
ADD yarn.lock	.

#COPY DEPENDENCIES 
RUN yarn install

# Compiles and hot-reloads for development
ADD public .
ADD src	.
RUN yarn run serve

# Compiles and minifies for production
RUN yarn run build

# Run your tests
RUN yarn run test

# Lints and fixes files
RUN yarn run lint

