pipeline {
    agent any

    environment {
        GIT_REPO='https://github.com/Karthick-MurugesanG/evershop.git'
        IMAGE_NAME = 'karthickmurugesang/evershop'
        IMAGE_TAG='latest'
        K8S_DEPLOYMENT = 'kuberdep.yaml'
        DOCKER_CREDENTIALS_ID='docker'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git url: "${env.GIT_REPO}", branch: 'main'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${IMAGE_NAME}:${IMAGE_TAG}") 
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID){
                        dockerImage.push()
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh "kubectl apply -f ${K8S_DEPLOYMENT}"
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Deployment Failed!'
        }
    }
}
