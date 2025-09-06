pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('jenkins_docker') // create this in Jenkins
        DOCKERHUB_REPO = 'nandishm/blog-api'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/NandishM0618/capstone.git',
                    credentialsId: ''
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
    }

    post {
        always {
            echo 'Pipeline completed!'
        }
    }
}
