pipeline {
    agent any

    environment {

        BACKEND_IMAGE = "nikhilabba12/teco-backend"
        FRONTEND_IMAGE = "nikhilabba12/teco-frontend"

    }

    stages {

        stage('Clone Repository') {
            steps {

                git branch: 'main',
                credentialsId: 'dockerhub-creds',
                url: 'https://github.com/MADHU8912/teco.git'

            }
        }

        stage('Docker Login') {
            steps {

                withCredentials([usernamePassword(
                    credentialsId: 'docker-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {

                    bat 'docker login -u %DOCKER_USER% -p %DOCKER_PASS%'

                }
            }
        }

        stage('Build Backend Image') {
            steps {

                bat 'docker build -t %BACKEND_IMAGE% ./backend'

            }
        }

        stage('Build Frontend Image') {
            steps {

                bat 'docker build -t %FRONTEND_IMAGE% ./frontend'

            }
        }

        stage('Push Backend Image') {
            steps {

                bat 'docker push %BACKEND_IMAGE%'

            }
        }

        stage('Push Frontend Image') {
            steps {

                bat 'docker push %FRONTEND_IMAGE%'

            }
        }

        stage('Docker Logs') {
            steps {

                bat 'docker logs teco-backend || exit 0'

                bat 'docker logs teco-frontend || exit 0'

            }
        }

        stage('Check Running Containers') {
            steps {

                bat 'docker ps'

            }
        }

        stage('Render Deployment Info') {
            steps {

                echo 'Render automatically deploys from GitHub'

            }
        }

    }

    post {

        success {

            echo 'TECO Successfully Built and Deployed'

        }

        failure {

            echo 'Pipeline Failed - Check Console Output'

        }

    }
}