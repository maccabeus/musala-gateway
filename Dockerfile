
# We are using the LTS node version
FROM node:16 as musala

# Set environment to production
ENV NODE_ENV=production

# Create our app working directory
WORKDIR /usr/src/app

# expose port 4000 for binding`
EXPOSE 4001

# copy the packages files
COPY package*.json ./

# Install typescript for 
RUN npm install -g typescript 
RUN npm install -g ts-node

# Test configurations
FROM musala as test
RUN npm install --production=false
# Copy all installations to the image
COPY . .
# Run typescript build
RUN npx tsc
CMD ["npm", "run", "test"]

# Prod configurations
FROM musala as prod
# Run installation
# RUN npm ci --only=production
RUN npm install --production=false
# Copy all installations to the image
COPY . .
# Run typescript build
RUN npx tsc
#  run application test
CMD ["node",  "./build/server.js"]