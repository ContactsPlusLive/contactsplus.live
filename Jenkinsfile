pipeline {
    agent {
        docker { image 'node:16.19' }
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Deploy') {
            environment {
                COMMIT_MESSAGE = sh(returnStdout: true, script: 'git log -1 --pretty=%B').trim()
            }
            steps {
                sh 'npm install wrangler'
                withCredentials([string(credentialsId: '0fa9464a-cc35-4758-9dcf-d0ddd1cad51c', variable: 'CLOUDFLARE_API_TOKEN')]) {
                    sh 'CLOUDFLARE_ACCOUNT_ID=1b1abd22a01212088510f99e72d9c235 \
                        npx wrangler pages publish dist \
                            --project-name contactsplus-web \
                            --branch ' + env.GIT_BRANCH + ' \
                            --commit-hash ' + env.GIT_COMMIT + ' \
                            --commit-message "' + env.COMMIT_MESSAGE + '"'
                }
            }
        }
    }
}