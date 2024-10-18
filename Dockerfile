FROM rust:bookworm

# Arguments for setting up the SDK. Can be overridden in devcontainer.json but shouldn't be required
ARG ANDROID_SDK_TOOLS_VERSION="9477386"
ARG ANDROID_PLATFORM_VERSION="32"
ARG ANDROID_BUILD_TOOLS_VERSION="30.0.3"
ARG NDK_VERSION="25.0.8775105"

# Arguments related to setting up a non-root user for the container
ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Install base utils
RUN apt-get update
RUN apt-get install -y \
  curl \
  psmisc

######################################
# Install node
######################################
RUN curl -fsSL "https://deb.nodesource.com/setup_20.x" | bash -
RUN apt-get install -y nodejs


# Install Tauri v2 dependencies
# https://v2.tauri.app/start/prerequisites/#linux
RUN apt-get install -y libwebkit2gtk-4.1-dev \
  build-essential \
  curl \
  wget \
  file \
  libxdo-dev \
  libssl-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev

######################################
# Install tauri-cli
######################################
RUN cargo install tauri-cli


#######################################
## Install Rust
#######################################
#curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh



######################################
## Android SDK
## Downloading and installing
######################################
#FROM base_image as android_sdk
WORKDIR /android_sdk

# Arguments are consumed by the first FROM they encounter, so we need to just explicitly tell Docker we need to use these again and again
ARG ANDROID_SDK_TOOLS_VERSION
ARG ANDROID_PLATFORM_VERSION
ARG ANDROID_BUILD_TOOLS_VERSION
ARG NDK_VERSION

# Environment variables inside the android_sdk step to ensure the SDK is built properly
ENV ANDROID_HOME="/android_sdk"
ENV ANDROID_SDK_ROOT="$ANDROID_HOME"
ENV NDK_HOME="${ANDROID_HOME}/ndk/${NDK_VERSION}"
ENV PATH=${PATH}:/android_sdk/cmdline-tools/latest/bin
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64

# Install OpenJDK-8
RUN apt-get update && \
    apt-get install -y openjdk-17-jdk && \
    apt-get install -y ant && \
    apt-get clean;

# Fix certificate issues
RUN apt-get update && \
    apt-get install ca-certificates-java && \
    apt-get clean && \
    update-ca-certificates -f;

# Setup JAVA_HOME -- useful for docker commandline
ENV JAVA_HOME /usr/lib/jvm/java-17-openjdk-amd64/
RUN export JAVA_HOME

# Set up the ANDROID SDK
RUN curl -C - --output android-sdk-tools.zip "https://dl.google.com/android/repository/commandlinetools-linux-${ANDROID_SDK_TOOLS_VERSION}_latest.zip" \
    && mkdir -p /android_sdk/cmdline-tools/latest/ \
    && unzip -q android-sdk-tools.zip -d /android_sdk/cmdline-tools/latest/ \
    && mv /android_sdk/cmdline-tools/latest/cmdline-tools/* /android_sdk/cmdline-tools/latest \
    && rm -r /android_sdk/cmdline-tools/latest/cmdline-tools \
    && rm android-sdk-tools.zip \
    && yes | sdkmanager --licenses \
    && touch $HOME/.android/repositories.cfg \
    && sdkmanager "cmdline-tools;latest" \
    && sdkmanager "platform-tools" \
    && sdkmanager "emulator" \
    && sdkmanager "platforms;android-${ANDROID_PLATFORM_VERSION}" "build-tools;$ANDROID_BUILD_TOOLS_VERSION" \
    && sdkmanager "ndk;${NDK_VERSION}" \
    && sdkmanager "system-images;android-${ANDROID_PLATFORM_VERSION};google_apis;x86_64"

# As an added bonus we set up a gradle.properties file that enhances Gradle performance
RUN echo "org.gradle.daemon=true" >> "/gradle.properties" \
    && echo "org.gradle.parallel=true" >> "/gradle.properties"

#export JAVA_HOME=/opt/android-studio/jbr
#export ANDROID_HOME="$HOME/Android/Sdk"
#export NDK_HOME="$ANDROID_HOME/ndk/$(ls -1 $ANDROID_HOME/ndk)"


# Add the Android targets with rustup
#rustup target add aarch64-linux-android armv7-linux-androideabi i686-linux-android x86_64-linux-android
#RUN rustup target add armv7-linux-androideabi

# Copy source code
COPY . .

RUN tauri android init

RUN cargo tauri android build --apk
# cargo tauri android build --aab --target aarch64 --target armv7


CMD ["/bin/bash"]
