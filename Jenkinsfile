// -*- mode: groovy -*-
// vim:ft=groovy

node {
    try {
      stage('checkout') {
        env.WORKSPACE = pwd()
        sh "echo npm version: `npm -v`"
        sh "echo node version: `node -v`"
        checkout scm
        sh "echo present working dir: `pwd`"
        sh "ls -al"
      }

      def buildEnv = docker.image('node:10.6.0-slim')

      buildEnv.inside {
        stage('install') {
          env.WORKSPACE = pwd()
          sh "echo npm version: `npm -v`"
          sh "echo node version: `node -v`"
          sh "echo yarn version: `yarn --version`"
          sh "echo present working dir: `pwd`"
          sh "ls -al"
          sh "yarn install"
        }

        stage('build') {
          sh "echo present working dir: `pwd`"
          pwd()
          sh "echo present working dir: `pwd`"
          sh "ls -al"
          sh 'yarn build-storybook'
        }

        stage('upload') {
          withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: '1a1cc46b-894d-4331-90aa-14a0fd1c8a47']]) {
            sh "yarn run deploy"
          }
        }
      }

    } catch (Exception ex) {
        echo "ERROR: ${ex.toString()}"
        throw ex
    } finally {
    }
}