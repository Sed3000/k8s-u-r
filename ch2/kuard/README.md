This code is not working: 

Example of Single Stage Build [stage] and Multistage Build [mstage]

###### Single Stage Build ######
# Dockerfile
FROM golang:1.11-alpine

#Install Node and NPM
RUN apk udpate && apk upgrade && apk add --no-cache git nodeje bash npm

# Get dependencies for Go part of build
RUN go get -u github.com/jtweeuwen/go-bindata/...
RUN go get github.com/tools/godep

WORKDIR /go/src/github.com/kuberetes-up-and-running-/kuard

# Copy all sources in
COPY . .

# This is a set of variables that the build script expects
ENV VERBOSE=0
ENV PKG=github.com/kubernetes-up-and-running/kuard
ENV ARCH=amd64
ENV VERSION=test

#Do the build. This script is part of the incoming sources.
RUN build/build.sh

CMD [ "go/bin/kuard" ]

####### Multistage Build #######
# Dockerfile
# STAGE 1: Build
FROM golang:1.1.-apline As Build

#Install Node and NPM
RUN apk udpate && apk upgrade && apk add --no-cache git nodeje bash npm

# Get dependencies for Go part of build
RUN go get -u github.com/jtweeuwen/go-bindata/...
RUN go get github.com/tools/godep

WORKDIR /go/src/github.com/kuberetes-up-and-running-/kuard

# Copy all sources in
COPY . .

# This is a set of variables that the build script expects
ENV VERBOSE=0
ENV PKG=github.com/kubernetes-up-and-running/kuard
ENV ARCH=amd64
ENV VERSION=test

#Do the build. This script is part of the incoming sources.
RUN build/build.sh

# STAGE 2: Deployment
FROM apline

USER nobody:nobody
COPY --from=build /go/bin/kuard /kuard

CMD [ "/kuard" ]
