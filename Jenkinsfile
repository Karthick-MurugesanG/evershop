pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "karthickmurugesang/evershop"
        K8S_DEPLOYMENT = "evershop-deployment"
        K8S_NAMESPACE = "default"
        CONTAINER_NAME = "evershop" // Ensure this matches the actual container name
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', credentialsId: '8dba1cbd-f6e3-4939-920a-31c9ded5184f', url: 'https://github.com/karthick-murugesang/evershop.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker pull node:18-alpine"
                sh "docker build -t $DOCKER_IMAGE:latest ."
            }
        }

        stage('Push Docker Image') {
            steps {
                withDockerRegistry([credentialsId: 'a053b7e4-06a0-4c49-935e-e38545937695', url: 'https://index.docker.io/v1/']) {
                    sh "docker push karthickmurugesang/evershop:latest --quiet"
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh "kubectl set image deployment/$K8S_DEPLOYMENT $CONTAINER_NAME=$DOCKER_IMAGE:latest -n $K8S_NAMESPACE"
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
