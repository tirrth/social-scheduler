# FROM heroku/cedar:14
# FROM node:latest
# FROM thompsnm/nodejs-chrome:latest


# # update and add all the steps for running with xvfb
# RUN apt-get update &&\
#     apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
#     libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
#     libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
#     libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
#     ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget \
#     xvfb x11vnc x11-xkb-utils xfonts-100dpi xfonts-75dpi xfonts-scalable xfonts-cyrillic x11-apps
# # add the required dependencies

# WORKDIR /app
# COPY . /app
# # RUN ["chmod", "+x", "buildpacks/chromedriver.sh"]
# # RUN ["./buildpacks/chromedriver.sh"]
# # RUN ["chmod", "+x", "buildpacks/xvfb-chrome.sh"]
# # RUN ["./buildpacks/xvfb-chrome.sh"]
# RUN npm i

# # make sure we can run without a UI
# ENV CLIENT_ID john.macquoid
# ENV SECRET_KEY @$dfghjk!Instagram123@
# ENV DISPLAY :99
# CMD Xvfb :99 -screen 0 1024x768x16 & npm start
# # CMD npm start


# FROM ubuntu:trusty

# RUN apt-get update; apt-get clean

# # Add a user for running applications.
# RUN useradd apps
# RUN mkdir -p /home/apps && chown apps:apps /home/apps

# # Install x11vnc.
# RUN apt-get install -y x11vnc

# # Install xvfb.
# RUN apt-get install -y xvfb

# # Install fluxbox.
# RUN apt-get install -y fluxbox

# # Install wget.
# RUN apt-get install -y wget

# # Install wmctrl.
# RUN apt-get install -y wmctrl

# # Set the Chrome repo.
# RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
#     && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list

# # Install Chrome.
# RUN apt-get update && apt-get -y install google-chrome-stable

# COPY bootstrap.sh /

# RUN ["chmod", "+x", "bootstrap.sh"]
# CMD '/bootstrap.sh'


# First, we need to make sure all dependencies are there. If you are using docker, then the important dependencies are already present on most node images. 
# FROM ubuntu:trusty
FROM debian:stable
# FROM node:latest

# To run Headful mode, you will need to have a display, which is not present in a server. 
# To avoid this, we will use Xvfb, and create a fake display, so the chrome will think there is a display and run properly. 
# So we just need to install Xvfb and Puppeteer related dependencies.
RUN apt-get update && apt-get install -yq curl libgbm-dev gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget x11vnc x11-xkb-utils xfonts-100dpi xfonts-75dpi xfonts-scalable xfonts-cyrillic x11-apps xvfb && curl -fsSL https://deb.nodesource.com/setup_14.x | bash - && apt-get install -y nodejs

# I am going to ignore dumb-init or such for now since it will add complexities to understand what is actually needed here. 

# Assuming we are working on /app folder, cd into /app
WORKDIR /app

# Copy package.json into app folder
COPY package.json /app

# Install dependencies
RUN npm install 

COPY . /app

# Start server on port 3000
EXPOSE 3000

# I'll also assume you are going to use root user, 
# and your script has `--no-sandbox` and `--disable-setuid-sandbox` arguments.
# We run a fake display and run our script.
# Start script on Xvfb
CMD xvfb-run --server-args="-screen 0 1024x768x24" npm start