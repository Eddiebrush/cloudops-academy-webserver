properties([pipelineTriggers([githubPush()])])
pipeline {
    environment {
        REGISTRY = "edgarandresflores/build_image"

        BUILD_CONTAINER = "build_container"
        TEST_CONTAINER = "test_container"
        DEPLOY_CONTAINER = "deploy_container"
        
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
                    sh 'sudo cp package* /build_phase/'
                    def image = docker.build("build_image/latest", "/build_phase")
                    sh 'docker tag build_image/latest ${REGISTRY}'
                    sh 'docker run --rm --name ${BUILD_CONTAINER} -v build:/usr/src/app/ -v jenkins_home:/var/jenkins_home build_image/latest'
                    sh 'docker login -u edgarandresflores -p cloudops-academy'
                    sh 'docker push edgarandresflores/build_image'
                    archiveArtifacts artifacts: '*', fingerprint: true
                }
            }
        }   
        stage('test_phase') {
            steps {
                script {
                    //post install remove these containers
                    sh 'sudo cp -r /build/node_modules/ /test_phase/node_modules'
                    sh 'sudo cp -r test/ /test_phase/'
                    sh 'sudo cp package* /test_phase/'
                    sh 'sudo cp server.js /test_phase/'
                    def image = docker.build("test_image/latest", "/test_phase")
                }
            }
        }
        stage('deploy_phase') {
            steps {
                script {
                    sh 'sudo cp -r /build/node_modules/ /deploy_phase/node_modules'
                    sh 'sudo cp -r test/ /deploy_phase/'
                    sh 'sudo cp package* /deploy_phase/'
                    sh 'sudo cp server.js /deploy_phase/'
                    def image = docker.build("deploy_image/latest", "/deploy_phase")
                    sh 'docker run -d -p 80:80 --rm --name deploy_container deploy_image/latest'
                }
            }
        }
    }
}