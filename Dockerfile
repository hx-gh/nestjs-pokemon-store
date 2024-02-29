# Use Node.js as the base image
FROM node:20-slim

RUN apt-get update

RUN apt-get install -y build-essential cmake zlib1g-dev libcppunit-dev git subversion wget && rm -rf /var/lib/apt/lists/*

RUN wget https://www.openssl.org/source/openssl-1.0.2g.tar.gz -O - | tar -xz

WORKDIR /openssl-1.0.2g

RUN ./config --prefix=/usr/local/openssl --openssldir=/usr/local/openssl && make && make install

WORKDIR /home/node/app

CMD [ "TAIL", "-f", "/dev/null"]