FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install --registry=https://registry.npmmirror.com

RUN npx prisma generate

RUN chmod +x /app/startup.sh

EXPOSE 3000

ENTRYPOINT ["/app/startup.sh"]