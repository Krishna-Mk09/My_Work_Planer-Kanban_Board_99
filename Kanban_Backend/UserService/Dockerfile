FROM openjdk
WORKDIR usr/lib
ADD ./target/UserService-0.0.1-SNAPSHOT.jar /usr/lib/UserService-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","UserService-0.0.1-SNAPSHOT.jar"]