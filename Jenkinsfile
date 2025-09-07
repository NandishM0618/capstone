pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('jenkins_docker') 
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
                    sh 'docker compose -p jenkins_blogapi build'
                }
            }
        }

        stage('Run Containers') {
            steps {
                script {
                   sh 'docker compose -p jenkins_blogapi build'
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
