# Stage 1: Install the dependencies
FROM node:20.10.0 AS dependencies

WORKDIR /frontend

COPY package* ./

RUN npm install

# Stage 2: Build the application
FROM node:20.10.0 AS build

ARG BACKEND_URL

WORKDIR /frontend

COPY --from=dependencies /frontend /frontend

COPY . .

ENV REACT_APP_BACKEND_URL=${BACKEND_URL}

RUN npm run build

# Stage 3: Host the build on nginx and keep checking the health of the application.
FROM nginx:alpine

COPY --from=build /frontend/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
        CMD curl --fail localhost:80 || exit 1