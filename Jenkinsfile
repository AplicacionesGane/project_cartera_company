pipeline {
    agent any
    
    tools {
        nodejs 'node-v22'
    }

    environment {
        ENV_API_CARTERA = credentials('ENV_API_CARTERA')
        ENV_CLIENT_CARTERA = credentials('ENV_CLIENT_CARTERA')
        ENV_TNS_ORA = credentials('ENV_TNS_ORA_CARTERA')
    }
    
    stages {
        stage('Copy .env files') {
            steps {
                script {
                    def envApiContent = readFile(ENV_API_CARTERA)
                    def envClientContent = readFile(ENV_CLIENT_CARTERA)
                    def envTnsOraContent = readFile(ENV_TNS_ORA)
                    
                    writeFile file: './api/.env', text: envApiContent
                    writeFile file: './api/tnsnames.ora', text: envTnsOraContent
                    writeFile file: './client/.env', text: envClientContent
                }
            }
        }
        stage('Install dependencies') {
            steps {
                script {
                    dir('client') {
                        sh 'pnpm install'
                    }
                }
            }
        }
        stage('Build client') {
        steps {
                script {
                    dir('client') {
                        sh 'pnpm build'
                    }
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
        stage('copy folder instan client to api'){
            steps {
                script {
                  sh 'cp -r /var/lib/jenkins/instantclient_11_2 ./api'
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