FROM node:13.12.0-alpine

# set working directory
WORKDIR /var/www/antrian-sehat-frontend

# add app
COPY . /var/www/antrian-sehat-frontend

# add /var/www/antrian-sehat-frontend/node_modules/.bin to $PATH
ENV PATH /var/www/antrian-sehat-frontend/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./var/www/antrian-sehat-frontend
COPY package-lock.json ./var/www/antrian-sehat-frontend
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# start app
CMD ["npm", "start"]