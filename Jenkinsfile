def ps(psCmd) {
  psCmd=psCmd.replaceAll("%", "%%")
  bat returnStatus: true, script: "powershell.exe -NonInteractive -ExecutionPolicy Bypass -Command \"\$ErrorActionPreference='Stop';[Console]::OutputEncoding=[System.Text.Encoding]::UTF8;$psCmd;EXIT \$global:LastExitCode\""
}
pipeline {
  agent none
  options {
    timeout(time: 1, unit: 'HOURS')
  }
  environment {
    API_TEST_ADDRESS = credentials('API_DEV_ADDRESS')
    API_DEPLOYMENT_ADDRESS = credentials('API_DEPLOYMENT_ADDRESS')
    API_USER = credentials('API_USER')
    API_PASSWORD = credentials('API_PASSWORD')
    BUCKET_NAME = 'portal'
    API_BASIC_AUTH_ID = credentials('API_BASIC_AUTH_ID')
    API_BASIC_AUTH_PASS = credentials('API_BASIC_AUTH_PASS')
    STORAGE_ACCESS_KEY_ID = credentials('STORAGE_ACCESS_KEY_ID')
    STORAGE_SECRET_ACCESS_KEY = credentials('STORAGE_SECRET_ACCESS_KEY')
    STORAGE_TEST_ADDRESS = credentials('STORAGE_DEV_ADDRESS')
    STORAGE_DEPLOY_ADDRESS = credentials('STORAGE_DEPLOY_ADDRESS')
    ANDROID_KEY_STORE = credentials('ANDROID_KEY_STORE')
  }
  stages {
    stage('Host-tools build'){
      when { 
        expression { params.ENV_TESTS != 'true' } 
      }
      parallel {
        stage('SkinService && HostLib && SkinCMD && DC Linux x86') {
          environment {
            QT_INSTALL_LIBS="${$QTDIR}/lib"
            QT_INSTALL_QML="${$QTDIR}/qml"
            QT_INSTALL_PLUGINS="${$QTDIR}/plugins"
            API = "${API_TEST_ADDRESS}"
            ARCH_FOLDER = 'linux'
            ARCHITECTURE = 'linux-ubuntu-x86'
            STORAGE_ADDRESS = "${STORAGE_TEST_ADDRESS}"
            PRETTY_NAME = 'DisplaxConnect'
            FILE_NAME = 'INSTALLER.installer'
            PROJECT = 'displax-connect'
          }
          agent {
              label 'ubuntu-i386-qt'
          }
          steps {
            script{
                sh 'echo "HELLO WORLD"'
            }
          }
        }
        stage('SkinService && HostLib && SkinCMD && DC Linux x64') {
          environment {
            QT_INSTALL_LIBS="${$QTDIR}/lib"
            QT_INSTALL_QML="${$QTDIR}/qml"
            QT_INSTALL_PLUGINS="${$QTDIR}/plugins"
            API = "${API_TEST_ADDRESS}"
            ARCH_FOLDER = 'linux'
            ARCHITECTURE = 'linux-ubuntu-x86_64'
            STORAGE_ADDRESS = "${STORAGE_TEST_ADDRESS}"
            PRETTY_NAME = 'DisplaxConnect'
            FILE_NAME = 'INSTALLER.installer'
            PROJECT = 'displax-connect'
          }
          agent {
              label 'ubuntu-x64-qt'
          }
          steps {
            sh 'echo "HELLO WORLD"'
          }
        }
        stage('SkinService && HostLib && SkinCMD && DC Windows x86') {
          environment {
            API = "${API_TEST_ADDRESS}"
            SIGN_ADDRESS = credentials('SIGN_ADDRESS')
            SECOND_SIGN_ADDRESS = credentials('SECOND_SIGN_ADDRESS')
            ARCH_FOLDER = 'windows'
            ARCHITECTURE = 'windows-x86'
            STORAGE_ADDRESS = "${STORAGE_TEST_ADDRESS}"
            PRETTY_NAME = 'DisplaxConnect'
            FILE_NAME = 'INSTALLER.exe'
            PROJECT = 'displax-connect'
          }
          agent {
            label "windows-x86-qt"
          }
          steps {
            bat 'git clean -d -f -x'
            bat ''
            cleanWs()
          }
        }
        stage('SkinService && HostLib && SkinCMD && DC Windows x64') {
          environment {
            API = "${API_TEST_ADDRESS}"
            SIGN_ADDRESS = credentials('SIGN_ADDRESS')
            SECOND_SIGN_ADDRESS = credentials('SECOND_SIGN_ADDRESS')
            ARCH_FOLDER = 'windows'
            ARCHITECTURE = 'windows-x86_64'
            STORAGE_ADDRESS = "${STORAGE_TEST_ADDRESS}"
            PRETTY_NAME = 'DisplaxConnect'
            FILE_NAME = 'INSTALLER.exe'
            PROJECT = 'displax-connect'
          }
          agent {
              label 'windows-x64-qt'
          }
          steps {
            bat 'git clean -d -f -x'
            bat ''
            cleanWs()
          }
        }
        stage('SkinService && HostLib && Build Connect MacOS') {
          environment {
            API = "${API_TEST_ADDRESS}"
            ARCH_FOLDER = 'macx'
            ARCHITECTURE = 'macosx'
            STORAGE_ADDRESS = "${STORAGE_TEST_ADDRESS}"
            PRETTY_NAME = 'DisplaxConnect'
            FILE_NAME = 'DisplaxConnect.dmg'
            PROJECT = 'displax-connect'
          }
          agent {
            label "osx"
          }
          steps {
            sh 'echo "HELLO WORLD"'
          }
        }
      }
    }
  }
}
