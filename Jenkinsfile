pipeline {
    agent any
    environment {
        BRANCH_NAME = "${env.BRANCH_NAME}"
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t fijui ."
                }
            }
        }
        stage('Release') {
            when { branch 'release-*' }
            steps {
                sh 'echo $BRANCH_NAME'
                sh "docker build -t fijui:${BRANCH_NAME} ."
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
  