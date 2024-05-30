FROM maven:3-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17.0.1-jdk-slim
COPY --from=build /target/assn1-0.0.1-SNAPSHOT.jar assn1.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","assn1.jar"]