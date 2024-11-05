pipeline {
    agent any
    
    tools {
        nodejs 'node-v22'
    }

    environment {
        ENV_API_CARTERA = credentials('ENV_API_CARTERA')
        ENV_CLIENT_CARTERA = credentials('ENV_CLIENT_CARTERA')
    }
    
    stages {
        stage('Copy .env files') {
            steps {
                script {
                    def envApiContent = readFile(ENV_API_CARTERA)
                    def envClientContent = readFile(ENV_CLIENT_CARTERA)
                    
                    writeFile file: './api/.env', text: envApiContent
                    writeFile file: './client/.env', text: envClientContent
                }
            }
        }
        stage('install dependencies') {
            steps {
                script {
                    sh 'cd ./client && yarn'
                    sh 'cd ./client && yarn build'
                }
            }
        }

        stage('down docker compose'){
            steps {
                script {
                    sh 'docker compose down'
                }
            }
        }
        stage('delete images'){
            steps{
                script {
                    def images = 'api-cartera:v1.1'
                    if (sh(script: "docker images -q ${images}", returnStdout: true).trim()) {
                        sh "docker rmi ${images}"
                    } else {
                        echo "Image ${images} does not exist."
                        echo "continuing..."
                    }
                }
            }
        }
        stage('run docker compose'){
            steps {
                script {
                    sh 'docker compose up -d'
                }
            }
        }
    }
}