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
                    sh 'docker compose -p build'
                }
            }
        }

        stage('Run Containers') {
            steps {
                script {
                   sh 'docker compose -p build'
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
