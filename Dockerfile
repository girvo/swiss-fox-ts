FROM node:6.9.1

# Default our build to production
ARG env=production

# System environment vars
ENV DEBIAN_FRONTEND noninteractive
ENV TERM xterm-256color

# Install our base dependencies
RUN apt-get update && \
    apt-get install -y \
        supervisor \
        vim-tiny

# Add our app, install all dependencies
RUN mkdir -p /app
ADD package.json /app/package.json
RUN cd /app && npm install && cd /
ADD . /app
ENV NODE_ENV=$env
RUN mkdir -p /var/tmp/ts /tmp/ts-server
WORKDIR /app
RUN npm run build

# Add our service configs
ADD docker/supervisor.$env.conf /etc/supervisor.conf

# Port
EXPOSE 3000

# Supervisord as our front-end process
CMD ["supervisord", "-c", "/etc/supervisor.conf", "-n"]
