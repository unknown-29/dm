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
                    bat 'docker-compose -f docker-compose.yml up --build -d'
                }
            }
        }

        stage('Push to Registry') {
            steps {
                script {
                    withCredentials([usernamePassword(
                        credentialsId: '3e0582a4-db54-4f4e-8a37-4284463b9f0e', // Replace with Jenkins credential ID
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )]) {
                        bat """
                        echo "$DOCKER_PASSWORD" | docker login  -u "$DOCKER_USER" --password-stdin
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