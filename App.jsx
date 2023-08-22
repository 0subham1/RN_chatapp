import {useEffect, useState} from 'react';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthContext} from './app/common/AuthContext';
import Routes from './app/navigation/routes';
import {Text, ToastAndroid} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const App = () => {
  const [store, setStore] = useState({});
  const [internet, setInternet] = useState(true);
  const toast = msg => {
    return ToastAndroid.show(msg, ToastAndroid.LONG, ToastAndroid.CENTER);
  };
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      // console.log('Connection type', state.type);
      // console.log('Is connected?', state.isConnected);
      setInternet(state.isConnected)
      !state.isConnected && toast('no internet');
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{store, setStore,internet,setInternet}}>
      <SafeAreaProvider>
        <PaperProvider>
          <Routes />
        </PaperProvider>
      </SafeAreaProvider>
    </AuthContext.Provider>
  );
};

export default App;
