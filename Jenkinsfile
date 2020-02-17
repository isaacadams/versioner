#!/usr/bin/env groovy

pipeline {
    
	agent {
	    docker {
	        image 'isaacadams/gulp:latest'
	    }
	}

	environment {
        DOCKER_REGISTRY = "https://registry.hub.docker.com"
        DOCKER_IMAGE = "isaacadams/gulp:latest"
    }	
    stages {
		stage('Environment') {
            steps {  
				sh """
                    env | sort
                    ls
                    cat package.json
                """
                sh "npm ci"
            }
        }
        stage('Build') {
            steps {  
                sh "gulp build"
            }
        }
        stage('Test') {
            steps {  
                sh "npm run test"
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