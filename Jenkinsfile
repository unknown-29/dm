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
                    sh '''
                    
                    docker-compose -f docker-compose.yml up --build -d
                    '''
                }
            }
        }

        stage('Push to Registry') {
            steps {
                script {
                    withCredentials([usernamePassword(
                        credentialsId: '67fb6fd6-0bfa-4e2d-ac2a-776bec6fe332', // Replace with Jenkins credential ID
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )]) {
                        sh """
                        
                        echo "$DOCKER_PASSWORD" | docker login  -u "$DOCKER_USER" --password-stdin
                        docker push vikrampatel/syncscript_backend
                        docker push vikrampatel/syncscript_frontend
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