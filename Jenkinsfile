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

        stage('Run Containers') {
            steps {

                bat 'docker stop teco-backend || exit 0'
                bat 'docker rm teco-backend || exit 0'

                bat 'docker stop teco-frontend || exit 0'
                bat 'docker rm teco-frontend || exit 0'

                bat '''
                docker run -d -p 5000:5000 ^
                --name teco-backend ^
                %BACKEND_IMAGE%
                '''

                bat '''
                docker run -d -p 3000:80 ^
                --name teco-frontend ^
                %FRONTEND_IMAGE%
                '''
            }
        }

        stage('Check Running Containers') {
            steps {
                bat 'docker ps'
            }
        }
    }
}
