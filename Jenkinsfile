pipeline{
    agent any
    stages{
        stage('Git-pull'){
            steps{
                git branch: 'Devops', url: 'https://github.com/Skchauhan07/TravelloCom-SPEMajor.git' 
            }
        }

        stage('Build and push frontend image'){

            environment{
                ImageName='';
            }
           steps{
            dir('frontend'){
                script{
                  ImageName=docker.build "skchauhan07/travelocom"
                  docker.withRegistry('','docker-jenkins'){
                    ImageName.push()
                  }
                }
            }
           }
        }

        stage('Build and push backend image'){
            environment{
                ImageName='';
            }
            steps{
            dir('backend'){
                script{
                    ImageName=docker.build "skchauhan07/travellocom-backend"
                    docker.withRegistry('','docker-jenkins'){
                        ImageName.push()
                    }
                }
            }
            }
        }

        stage('Ansible Deploy'){
            steps{
                // sh "ansible-playbook -i /home/sudhanshu/TravelloCom-SPEMajor/ansible/inventory /home/sudhanshu/TravelloCom-SPEMajor/ansible/deploy.yaml"
                ansiblePlaybook becomeUser: null, colorized: true, disableHostKeyChecking: true, installation: 'Ansible', inventory: 'ansible/inventory',
                 playbook: 'ansible/deploy.yml', sudoUser: null
            }
        }
    }
}