pipeline {
    agent any
    environment {
        ImageName="puzzlers-website"
        ContainerName="puzzlers-website1"
        }
    stages{
        stage("checkout"){
            steps{
                sh "connecting to repo.."
                checkout scm
            }
        }
        stage("build"){
            steps{
                sh "building the docker image.."
                def appImage = docker.build("${ImageName}")
                }
            }
        stage("remove old container"){
            steps{
                try {
                    def oldContainer = docker.container("${ContainerName}")
                    oldContainer.stop()
                    oldContainer.remove()
                    echo "Old container ${ContainerName} removed."
                } catch (err) {
                    echo "No existing container named ${ContainerName} found."
                }
        }
    }

        stage("deploy"){
            steps{
                sh "deploying the docker image.."
                appImage.run("--restart=unless-stopped -d -p 80:80 --name ${ContainerName}")

                }
        
        }
    }

}