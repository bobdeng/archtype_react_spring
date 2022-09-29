def gitTag = null
pipeline {
    agent any

    stages {
        stage('Test&Check&DeployTest') {
         tools {
                jdk "jdk18"
            }
            steps{
                 sh 'java -version'
                 sh './gradlew -Dwebdriver=docker deployTest -i'
            }
        }
     }

}
