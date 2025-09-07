pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('jenkins_docker')
        DOCKERHUB_REPO = 'nandishm/blog-api'
        MONGO_URI = credentials('jenkins_mongo_uri')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/NandishM0618/capstone.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh 'docker compose build'
                }
            }
        }

        stage('Run Containers') {
            steps {
                script {
                   sh 'docker compose up -d'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    sh """
                    docker login -u $DOCKERHUB_CREDENTIALS_USR -p $DOCKERHUB_CREDENTIALS_PSW
                    docker tag backend $DOCKERHUB_REPO:backend
                    docker tag frontend $DOCKERHUB_REPO:frontend
                    docker push $DOCKERHUB_REPO:backend
                    docker push $DOCKERHUB_REPO:frontend
                    """
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed!'
        }
    }
}
