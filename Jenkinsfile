pipeline {
  agent none
  options { timeout(time: 1, unit: 'HOURS') }
  stage('Tests') {
    agent {
      label 'linux-tests-machine'
    }  
    steps {
      dir('tests/vagrant') {
        script{
          def aux = "./start_tests.sh 439c7015 admin Dpxis987! branch"
          sh(script: aux)
        }
      }
    }
  }
}
