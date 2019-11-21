#!/usr/bin/env groovy

pipeline {
    
	agent any

	environment {
        DOCKER_REGISTRY = "https://registry.hub.docker.com"
        DOCKER_IMAGE = "isaacadams/gulp:latest"
    }	
    stages {
		stage('Environment') {
            steps {  
				sh """
                    env | sort
                    echo ${MESSAGE}
                """
            }
        }
        stage('Setup') {
			steps {
				script {
                    docker.withRegistry("${DOCKER_REGISTRY}") {
                        def gulp_image = docker.image "${DOCKER_IMAGE}"
                        gulp_image.pull()
                    }
				}
			}
		}
        stage('Build') {
            steps {  
                script {
                    gulp_image.inside {
                        gulp build
                    }
                }
            }
        }
        stage('Test') {
            steps {  
                script {
                    gulp_image.inside {
                        npm run test
                    }
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
        success {
            echo 'success'
        }
        unstable {
            mail to: 'isaac.d.adams@gmail.com',
             subject: "Unstable Pipeline: ${currentBuild.fullDisplayName}",
             body: "Something is wrong with ${env.BUILD_URL}"
        }
        failure {
            mail to: 'isaac.d.adams@gmail.com',
             subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
             body: "Something is wrong with ${env.BUILD_URL}"
        }
        changed {
            echo 'Things were different before...'
        }
    }
}