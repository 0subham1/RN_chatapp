import {View, Text, ToastAndroid, TouchableOpacity, Alert} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, Button, TextInput} from 'react-native-paper';
import style from '../css/style';
import {BASE_URL} from '../common/Const';
import axios from 'axios';
import {AuthContext} from '../common/AuthContext';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';

const Profile = () => {
  const [type, setType] = useState('Sign In');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {store, setStore} = useContext(AuthContext);
  const navigation = useNavigation();

  const toast = msg => {
    return ToastAndroid.show(msg, ToastAndroid.LONG, ToastAndroid.CENTER);
  };

  useEffect(() => {
    if (store.user) {
      setName(store.user?.name);
    } else {
      setName('');
      setPassword('');
    }
  }, []);

  const handleSignIn = data => {
    let url = BASE_URL + 'signIn';
    axios
      .post(url, data)
      .then(res => {
        if (res.data.success) {
          setStore({
            ...store,
            user: res.data.user,
            auth: res.data.auth,
            path: 'SocialWocial',
          });

          toast(res?.data?.message);
          navigation.navigate('home');
          setLoading(false);
        } else {
          toast(res?.data?.message);
          setLoading(false);
        }
      })
      .catch(err => {
        toast('Incorrect Details');
        console.log(err, 'err');
        setLoading(false);
      });
  };
  const handleSave = () => {
    setLoading(true);
    let data = {
      name: name.trim().toLowerCase(),
      password: password.trim().toLowerCase(),
    };
    if (!name) {
      toast('Please enter name');
      setLoading(false);
      return;
    }
    if (!password) {
      toast('Please enter password');
      setLoading(false);
      return;
    }
    if (!store.user) {
      if (type == 'Sign In') {
        handleSignIn(data);
      } else {
        let url = BASE_URL + 'signUp';
        axios
          .post(url, data)
          .then(res => {
            if (res.data?.success) {
              toast(res?.data?.message);
              handleSignIn(data);

              setLoading(false);
            } else {
              toast(res?.data?.message);
              setLoading(false);
            }
          })
          .catch(err => {
            toast('Incorrect Details');
            console.log(err, 'err');
            setLoading(false);
          });
      }
    }
  };

  const handleFlickType = () => {
    if (type == 'Sign In') {
      setType('Sign Up');
    } else {
      setType('Sign In');
    }
  };

  return (
    <View style={style.container}>
      <TextInput
        textColor="#000000"
        style={style.inputField}
        mode="outlined"
        label="Username"
        value={name}
        onChangeText={e => setName(e)}
      />

      <TextInput
        style={style.inputField}
        mode="outlined"
        label="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={e => setPassword(e)}
      />

      {!store.user && !loading && (
        <Button onPress={() => handleSave()} mode="contained-tonal">
          {type}
        </Button>
      )}
      {!store.user && (
        <Text style={style.msg} onPress={handleFlickType}>
          {type == 'Sign In'
            ? 'New Here? Sign Up'
            : 'Already have account? Sign In'}
        </Text>
      )}
      {loading && <ActivityIndicator animating={true} />}
    </View>
  );
};

export default Profile;
