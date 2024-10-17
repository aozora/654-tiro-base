# Use the official OpenJDK image from Docker Hub
FROM openjdk:11-jdk

# Install necessary packages and dependencies
RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    git \
    && rm -rf /var/lib/apt/lists/* \

# Set environment variables used by the Android SDK
ENV ANDROID_SDK_HOME /opt/android-sdk
ENV ANDROID_SDK_ROOT /opt/android-sdk
ENV ANDROID_HOME /opt/android-sdk
ENV ANDROID_SDK /opt/android-sdk
ENV PATH ${PATH}:${ANDROID_SDK_ROOT}/cmdline-tools/latest/bin:${ANDROID_SDK_ROOT}/platform-tools

# Set Debian to not prompt for user input during package installation
ENV DEBIAN_FRONTEND noninteractive

# Download and install Android SDK command-line tools
RUN mkdir -p ${ANDROID_SDK_ROOT}/cmdline-tools \
    && cd ${ANDROID_SDK_ROOT}/cmdline-tools \
    && wget https://dl.google.com/android/repository/commandlinetools-linux-8512546_latest.zip -O commandlinetools.zip \
    && unzip commandlinetools.zip -d ${ANDROID_SDK_ROOT}/cmdline-tools \
    && mv ${ANDROID_SDK_ROOT}/cmdline-tools/cmdline-tools ${ANDROID_SDK_ROOT}/cmdline-tools/latest \
    && rm commandlinetools.zip

# Install SDK packages
RUN yes | sdkmanager --licenses \
    && sdkmanager "platform-tools" "platforms;android-32" "build-tools;32.0.0"


# Set the system language to US English
ENV LANG en_US.UTF-8

# Create a new group and user with UID 1001
RUN groupadd android && \
    useradd -d /opt/android-sdk -g android -u 1001 android \

# -----

## Clone your Android project into the container
#RUN git clone https://github.com/yourusername/your-android-project.git /usr/src/app
#
## Set working directory
#WORKDIR /usr/src/app
#
## Make the gradlew script executable
#RUN chmod +x ./gradlew
#
## Pre-install project dependencies (Optional, but speeds up first build)
#RUN ./gradlew build --no-daemon || true
#
## Default command to run when starting the container
#CMD ["./gradlew", "assembleDebug"]

# -----


## Update package list and install packages required for Android app development
#RUN apt-get update -yqq && \
#    apt-get install -y \
#      curl \
#      expect \
#      git \
#      make \
#      wget \
#      unzip \
#      vim \
#      openssh-client \
#      locales \
#      libarchive-tools && \
#    apt-get clean && rm -rf /var/lib/apt/lists/* && \
#    localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8
#
## Set the system language to US English
#ENV LANG en_US.UTF-8
#
## Create a new group and user with UID 1001
#RUN groupadd android && \
#    useradd -d /opt/android-sdk -g android -u 1001 android
#
## Copy the tools and licenses directories to the /opt directory in the image
#COPY tools /opt/tools
#COPY licenses /opt/licenses
#
## Set the working directory to /opt/android-sdk and run the entrypoint script
#WORKDIR /opt/android-sdk
#RUN /opt/tools/entrypoint.sh built-in
