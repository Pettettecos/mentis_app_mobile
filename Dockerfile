FROM node:20-bookworm-slim

WORKDIR /frontend

ENV CI=1
ENV EXPO_NO_TELEMETRY=1

RUN corepack enable

COPY frontend/package.json frontend/yarn.lock ./
RUN yarn install --frozen-lockfile

COPY frontend ./

EXPOSE 19006

CMD ["yarn", "expo", "start", "--web", "--host", "localhost", "--port", "19006"]
