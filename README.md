1st:
npx react-native run-android
after:
npm run android

@ icon not showing bug 
https://www.youtube.com/watch?v=303rGAVcCA4
ref: https://www.npmjs.com/package/react-native-vector-icons?activeTab=readme
icons: https://oblador.github.io/react-native-vector-icons/

@android > app> build.gradle >paste:
apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")

@android > app> build.gradle> dependecies...paste:
implementation project(':react-native-vector-icons')

@android >setting.gradle >paste:
include ':react-native-vector-icons'
project(':react-native-vector-icons').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-vector-icons/android')
same for ios > refer video


@creating app icon : https://www.appicon.co/
copy paste the respective icons here
> ReactNative\testcli\android\app\src\main\res