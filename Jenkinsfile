properties([pipelineTriggers([githubPush()])])
pipeline {
    environment {
        REGISTRY = "edgarandresflores/build_image"

        BUILD_CONTAINER = "build_container"
        TEST_CONTAINER = "test_container"
        DEPLOY_CONTAINER = "deploy_container"

        //Dockerhub Auth
        HUB_USERNAME = edgarandresflores
        HUB_PASSWORD = cloudops-academy
        
        
    }
    agent any
    stages {
        stage("clean old stuff") {
            steps {
                script {
                    def output = sh(returnStdout: true, script: 'docker ps -q -f name=${DEPLOY_CONTAINER}').trim()
                    if (output != ''){
                        sh 'docker stop ${DEPLOY_CONTAINER}'
                    }
                }
            }
        }
        

        stage('build_phase') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: 'master']], doGenerateSubmoduleConfigurations: false, extensions: [[$class: 'GitLFSPull']], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/Eddiebrush/cloudops-academy-webserver']]])
                script { 
                    sh 'sudo cp -r . /build/'
                    def image = docker.build("build_image/latest", "/build_phase")
                    sh 'docker tag build_image/latest ${REGISTRY}'
                    sh 'docker run --rm --name ${BUILD_CONTAINER} -v build:/build/ build_image/latest').trim()
                    sh 'docker login -u ${HUB_USERNAME} -p ${HUB_PASSWORD}'
                    sh 'docker push edgarandresflores/build_image'
                    archiveArtifacts artifacts: '*', fingerprint: true
                }
            }
        }   
        stage('test_phase') {
            steps {
                script {
                    def image = docker.build("test_image/latest", "/test_phase")
                    def output = sh(returnStdout: true, script: 'docker run --rm --name ${TEST_CONTAINER} -v build:/build/ test_image/latest').trim()
                }
            }
        }
        stage('deploy_phase') {
            steps {
                script {
                    def image = docker.build("deploy_image/latest", "/deploy_phase")
                    sh 'docker run -d -p 80:80 --rm --name ${DEPLOY_CONTAINER} -v build:/build/  deploy_image/latest'
                }
            }
        }
    }
}