pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        sh 'docker build -t vikrampatel/syncscript_backend ./backend/Dockerfile'
        sh 'docker tag vikrampatel/syncscript_backend $DOCKER_SYNCSCRIPT_B_IMAGE'
        sh 'docker build -t vikrampatel/syncscript_frontend ./frontend/Dockerfile'
        sh 'docker tag vikrampatel/syncscript_frontend $DOCKER_SYNCSCRIPT_F_IMAGE'
      }
    }
    
    stage('Deploy') {
      steps {
        withCredentials([usernamePassword(credentialsId: "${DOCKER_REGISTRY_CREDS}", passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
          sh "echo \$DOCKER_PASSWORD | docker login -u \$DOCKER_USERNAME --password-stdin docker.io"
          sh 'docker push $DOCKER_SYNCSCRIPT_F_IMAGE'
          sh 'docker push $DOCKER_SYNCSCRIPT_B_IMAGE'
        }
      }
    }
  }
  post {
    always {
      sh 'docker logout'
    }
  }
}