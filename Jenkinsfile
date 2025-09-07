pipeline {
    agent any

    environment {
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
                withCredentials([usernamePassword(credentialsId: 'jenkins_docker', 
                                          usernameVariable: 'DOCKERHUB_USER', 
                                          passwordVariable: 'DOCKERHUB_PASS')]) {
                    sh """
                        echo "$DOCKERHUB_PASS" | docker login -u "$DOCKERHUB_USER" --password-stdin
                        docker tag vagrant-backend $DOCKERHUB_REPO:backend
                        docker tag vagrant-frontend $DOCKERHUB_REPO:frontend
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
