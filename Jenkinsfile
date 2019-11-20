#!/usr/bin/env groovy

pipeline {
    
	agent any

	environment {
        
    }	
    stages {
		stage('Environment') {
            steps {  
				sh "env | sort"
            }
        }
		stage('Clean') {
			steps {
				cleanWs()
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
            mail to: 'iadams@emoneyadvisor.com',
             subject: "Unstable Pipeline: ${currentBuild.fullDisplayName}",
             body: "Something is wrong with ${env.BUILD_URL}"
        }
        failure {
            mail to: 'iadams@emoneyadvisor.com',
             subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
             body: "Something is wrong with ${env.BUILD_URL}"
        }
        changed {
            echo 'Things were different before...'
        }
    }
}