pipeline {
    agent none
    stages {
        stage('build_phase') {
            agent {
                dockerfile true
            }
            steps {
                docker.build "build_image:1.0"
                sh "docker images"
                sh "docker run -d --name build_container -p 8081:8081 build_container:1.0"
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
