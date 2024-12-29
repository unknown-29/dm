pipeline {
    agent any

    environment {
     
        IMAGE_NAME = 'syncscript'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build and Test') {
            steps {
                script {
                    sh 'docker-compose -f docker-compose.yml up --build -d'
                }
            }
        }

        stage('Push to Registry') {
            steps {
                script {
                    withCredentials([usernamePassword(
                        credentialsId: 'bae1f429-d0f8-49b7-a2cf-21f6eb2c6b37', // Replace with Jenkins credential ID
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )]) {
                        sh """
                        echo "$DOCKER_PASSWORD" | docker login docker.io/vikrampatel -u "$DOCKER_USER" --password-stdin\
                        docker-compose -f docker-compose.yml push
                        """
                    }
                }
            }
        }
    }

    post {
        
        success {
            echo 'Build and push succeeded!'
        }
        failure {
            echo 'Build or push failed!'
        }
    }
}