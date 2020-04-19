FROM node:10.16-alpine

ENV OBJ_STORAGE_ADDR=https://ewr1.vultrobjects.com
ENV OBJ_STORAGE_PORT=443
ENV IMG_SRC=https://ewr1.vultrobjects.com
ENV API_WS=https://api.gamingsaves.com

# RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
# RUN npm i

# USER node

# WORKDIR /home/node/app
# COPY . /home/node/app
RUN npm -g config set user $USER
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

USER node

WORKDIR /home/node/app
COPY --chown=node:node . /home/node/app

RUN npm i
RUN npm run build

CMD npm run start