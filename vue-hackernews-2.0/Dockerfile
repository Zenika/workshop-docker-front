#FAIRE ATTENTION A L'image de depart
# UTILSER LE CACHE DOCKER ET L'optimiser
# MONTER LE CODE pour tester en live
# ALLEGER L'image de run (lib / outils)

From node:10

WORKDIR /usr/src/app

ADD manifest.json .
ADD package.json . 
ADD package-lock.json . 

#COPY DEPENDENCIES 
RUN npm install

# Compiles and hot-reloads for development
ADD server.js .
ADD public .
ADD src	.
RUN npm build

