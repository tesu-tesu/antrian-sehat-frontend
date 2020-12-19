FROM node:alpine

# set working directory
WORKDIR /var/www/antrian-sehat-frontend


# install app dependencies
COPY package.json ./var/www/antrian-sehat-frontend
COPY package-lock.json ./var/www/antrian-sehat-frontend
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . /var/www/antrian-sehat-frontend

# start app
CMD ["npm", "start"]