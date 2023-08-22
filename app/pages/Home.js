import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Pressable,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import style from '../css/style';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {BASE_URL} from '../common/Const';
import {Button, Dialog, Searchbar} from 'react-native-paper';
import {AuthContext} from '../common/AuthContext';

const Home = props => {
  const {store, setStore} = useContext(AuthContext);
  const navigation = useNavigation();
  const [userList, setUserList] = useState([]);
  const [userList2, setUserList2] = useState([]);

  const toast = msg => {
    return ToastAndroid.show(msg, ToastAndroid.LONG, ToastAndroid.CENTER);
  };
  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      Alert.alert('Wanna Exit?', '', [
        {text: 'No', style: 'cancel', onPress: () => {}},
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            navigation.dispatch(e.data.action);
            setStore({});
          },
        },
      ]);
    });
  }, [navigation]);


  useEffect(() => {
    store?.user && getUser();
  }, []);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const getUser = () => {
    axios
      .get(BASE_URL + 'users')
      .then(res => {
        if (res.data.success) {
          let arr = res.data.users.filter(a => a._id != store?.user._id);
          setUserList(arr);
          setUserList2(arr);
        } else {
          toast(res?.data?.message);
        }
      })
      .catch(err => {
        console.log(err);
        toast('server err for userlist');
      });
  };

  const handleSearch = key => {
    let search = key.toString().toLowerCase();
    const result = userList2.filter(a => {
      return a?.name?.toLowerCase().match(search);
    });
    setUserList(result);
  };

  const getLoggedInUser = () => {
    let url = BASE_URL + 'users/' + store?.user?._id;
    axios
      .get(url)
      .then(res => {
        if (res.data.success) {
          setStore({...store, user: res.data.user});
        }
      })
      .catch(err => {
        console.log(err);
        toast('server err');
      });
  };

  const handleRefresh = () => {
    getLoggedInUser();
    getUser();
  };

  const handleAddFriend = item => {
    let data = {
      userId: store?.user?._id,
      clientId: item?._id,
    };
    if (!data.userId) {
      toast('userId not found');
      return;
    }
    if (!data.clientId) {
      toast('clientId not found');
      return;
    }
    let url = BASE_URL + 'request/send';
    axios
      .post(url, data)
      .then(res => {
        if (res.data.success) {
          toast(res?.data?.message);
          handleRefresh();
        } else {
          toast(res?.data?.message);
        }
      })
      .catch(err => {
        console.log(err);
        toast('server err');
      });
  };

  const handleAccept = item => {
    let data = {
      userId: store?.user?._id,
      clientId: item?._id,
    };
    if (!data.userId) {
      toast('userId not found');
      return;
    }
    if (!data.clientId) {
      toast('clientId not found');
      return;
    }
    let url = BASE_URL + 'request/accept';
    axios
      .post(url, data)
      .then(res => {
        if (res.data.success) {
          toast(res?.data?.message);
          handleRefresh();
        } else {
          toast(res?.data?.message);
        }
      })
      .catch(err => {
        console.log(err);
        toast('server err');
      });
  };

  const handleChat = item => {
    navigation.navigate('chat', {friend: item, path: item.name});
    setStore({...store, path: item.name});
  };

  return (
    <View style={style.container}>
      <View>
        <Searchbar
          style={style.searchBar}
          placeholder="Search"
          onChangeText={e => handleSearch(e)}
        />

        <FlatList
          data={userList}
          renderItem={({item}) => (
            <View style={style.card}>
              <Image
                style={style.logo}
                source={require('../common/img/ninja.jpg')}
                // source={{uri:item.image}} if dynamic
              />
              <Text style={{width: 120}}>{item?.name}</Text>
              {/* {item.isSent ? (
                  <TouchableOpacity style={style.btn}>
                    <Text>Sent</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={style.btn}
                    onPress={() => handleAddFriend(item)}
                  >
                    <Text>Add</Text>
                  </TouchableOpacity>
                )} */}
              <TouchableOpacity
                style={style.btn}
                onPress={() => handleChat(item)}>
                <Text>Chat</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};
export default Home;
