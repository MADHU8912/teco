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
                credentialsId: 'docker-creds',
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

                    bat '''
                    docker login -u %DOCKER_USER% -p %DOCKER_PASS%
                    '''

                }
            }
        }

        stage('Build Backend Image') {
            steps {

                bat '''
                docker build -t %BACKEND_IMAGE% ./backend
                '''

            }
        }

        stage('Build Frontend Image') {
            steps {

                bat '''
                docker build -t %FRONTEND_IMAGE% ./frontend
                '''

            }
        }

        stage('Push Backend Image') {
            steps {

                bat '''
                docker push %BACKEND_IMAGE%
                '''

            }
        }

        stage('Push Frontend Image') {
            steps {

                bat '''
                docker push %FRONTEND_IMAGE%
                '''

            }
        }

        stage('Pull Latest Images') {
            steps {

                bat '''
                docker pull %BACKEND_IMAGE%
                '''

                bat '''
                docker pull %FRONTEND_IMAGE%
                '''

            }
        }

        stage('Stop Old Containers') {
            steps {

                bat '''
                docker stop teco-backend || exit 0
                '''

                bat '''
                docker rm teco-backend || exit 0
                '''

                bat '''
                docker stop teco-frontend || exit 0
                '''

                bat '''
                docker rm teco-frontend || exit 0
                '''

            }
        }

        stage('Run Backend Container') {
            steps {

                withCredentials([string(
                    credentialsId: 'mongo-uri',
                    variable: 'MONGO_URI'
                )]) {

                    bat """
                    docker run -d -p 5000:5000 ^
                    --name teco-backend ^
                    -e MONGO_URI="%MONGO_URI%" ^
                    %BACKEND_IMAGE%
                    """

                }

            }
        }

        stage('Run Frontend Container') {
            steps {

                bat '''
                docker run -d -p 3000:80 ^
                --name teco-frontend ^
                %FRONTEND_IMAGE%
                '''

            }
        }

        stage('Docker Logs') {
            steps {

                bat '''
                docker logs teco-backend || exit 0
                '''

                bat '''
                docker logs teco-frontend || exit 0
                '''

            }
        }

        stage('Docker Copy Files') {
            steps {

                bat '''
                docker cp teco-backend:/app/server.js . || exit 0
                '''

                bat '''
                docker cp teco-frontend:/usr/share/nginx/html/index.html . || exit 0
                '''

            }
        }

        stage('Check Running Containers') {
            steps {

                bat '''
                docker ps
                '''

            }
        }

        stage('Debug Containers') {
            steps {

                bat '''
                docker ps -a
                '''

                bat '''
                docker logs teco-backend || exit 0
                '''

                bat '''
                docker logs teco-frontend || exit 0
                '''

            }
        }

        stage('Kubernetes Deploy') {
            steps {

                bat '''
                kubectl apply -f k8s/
                '''

            }
        }

        stage('Check Kubernetes Pods') {
            steps {

                bat '''
                kubectl get pods
                '''

            }
        }

        stage('Check Kubernetes Services') {
            steps {

                bat '''
                kubectl get services
                '''

            }
        }

    }

    post {

        success {

            echo 'TECO CI/CD + Kubernetes Deployment Successful'

        }

        failure {

            echo 'Pipeline Failed - Check Console Output'

        }

    }
}