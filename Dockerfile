FROM amd64/openjdk:16.0-jdk
ENV JAVA_APP_JAR mainserver.jar
RUN mkdir /opt/app
COPY application/build/libs/$JAVA_APP_JAR /opt/app
ENV JAVA_OPTIONS="$JAVA_OPTIONS -Dfile.encoding=utf-8 -Duser.timezone=Asia/Shanghai"
CMD java -jar $JAVA_OPTIONS /opt/app/$JAVA_APP_JAR
