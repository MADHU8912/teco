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

        stage('Git Push Latest Code') {
            steps {

                bat 'git add .'

                bat 'git commit -m "Auto deploy from Jenkins" || exit 0'

                bat 'git push origin main'

            }
        }

        stage('Render Auto Deployment') {
            steps {

                echo 'Render will auto deploy from GitHub'

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

    }

    post {

        success {

            echo 'TECO Successfully Deployed to Render'

        }

        failure {

            echo 'Deployment Failed - Check Jenkins Console Output'

        }

    }
}