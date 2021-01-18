FROM node:13.12.0-alpine as build

# set working directory
WORKDIR /var/www/antrian-sehat-frontend

# add /var/www/antrian-sehat-frontend/node_modules/.bin to $PATH
ENV PATH /var/www/antrian-sehat-frontend/node_modules/.bin:$PATH

# setting base URL
ARG BASE_URL
ENV REACT_APP_BASE_URL $BASE_URL

# configure JSON
COPY ./package.json ./package-lock.json /var/www/antrian-sehat-frontend

# install app dependencies
RUN npm ci --silent
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
RUN npm uninstall react-bootstrap --silent
RUN npm uninstall reactstrap --silent
RUN npm uninstall react-bootstrap bootstrap --silent
RUN npm install react-bootstrap --save --silent
RUN npm install reactstrap --save --silent
RUN npm install react-bootstrap bootstrap --save --silent

# add app
COPY . /var/www/antrian-sehat-frontend

# run APP
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /var/www/antrian-sehat-frontend/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]