# imagen base de node
FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]

#Comandos :
# Para crear: docker build -t <nombreimagen> .
# Para ver: docker images
# Para correr la iamgen: docker run -p 8080:8080 <nombre imagen>