FROM heroku/cedar:14
FROM node:latest

# update and add all the steps for running with xvfb
# RUN apt-get update &&\
#     apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
#     libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
#     libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
#     libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
#     ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget \
#     xvfb x11vnc x11-xkb-utils xfonts-100dpi xfonts-75dpi xfonts-scalable xfonts-cyrillic x11-apps
# add the required dependencies

WORKDIR /app
COPY . /app
RUN ["chmod", "+x", "buildpacks/chromedriver.sh"] \ 
    ["chmod", "+x", "buildpacks/xvfb-chrome.sh"]
RUN ["./buildpacks/chromedriver.sh"] ["./buildpacks/xvfb-chrome.sh"]
RUN npm i

# make sure we can run without a UI
ENV CLIENT_ID john.macquoid
ENV SECRET_KEY @$dfghjk!Instagram123@
# ENV DISPLAY :99
# CMD Xvfb :99 -screen 0 1024x768x16 & npm start
CMD npm start