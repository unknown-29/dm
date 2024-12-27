pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'your-docker-registry-url' // e.g., 'docker.io/username'
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
                        credentialsId: '${DOCKER_REGISTRY_CREDS}', // Replace with Jenkins credential ID
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )]) {
                        sh """
                        echo "$DOCKER_PASSWORD" | docker login  -u "$DOCKER_USER" --password-stdin
                        docker-compose -f docker-compose.yml push
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            sh 'docker-compose -f docker-compose.yml down'
        }
        success {
            echo 'Build and push succeeded!'
        }
        failure {
            echo 'Build or push failed!'
        }
    }
}