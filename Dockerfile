FROM node:18.7.0
WORKDIR /app
# RUN npm run dev

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

# CMD [ "./node_modules/bin/vite", "--host" ]
CMD [ "npm", "run", "dev", "--", "--host" ]