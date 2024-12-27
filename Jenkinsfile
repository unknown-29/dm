pipeline {
    environment {
        frontend_registry = "vikrampatel/syncscript_frontend"      
        backend_registry = "vikrampatel/syncscript_backend"      
        registryCredential = '3e0582a4-db54-4f4e-8a37-4284463b9f0e'
        dockerImageFrontend = ''
        dockerImageBackend = ''
    }
    agent any
    stages {
        stage('Cloning our Git') { 
            steps { 
                checkout scm
            }
        } 
        stage('Building our image') { 
            steps { 
                script { 
                    bat 'cd ./frontend'
                    dockerImageFrontend = docker.build frontend_registry
                    bat 'cd ../backend'
                    dockerImageBackend = docker.build backend_registry                     
                }
            } 
        }

        stage('Deploy our image') { 
            steps {              
                 script { 
                    docker.withRegistry( '', registryCredential ) { 
                        dockerImageBackend.push() 
                    }
                     docker.withRegistry( '', registryCredential ) { 
                        dockerImageFrontend.push() 
                    }
                } 
            }
        }       
        
    }
}

