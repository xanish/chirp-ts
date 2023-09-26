FROM node:18-alpine3.17

RUN npm install -g @angular/cli

USER node

CMD ['node']
