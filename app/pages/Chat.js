import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  ToastAndroid,
  Pressable,
} from 'react-native';
import React, {useContext, useState, useEffect, useRef} from 'react';
import {Button, TextInput} from 'react-native-paper';
import style from '../css/style';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../common/AuthContext';
import {BASE_URL} from '../common/Const';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import * as ImagePicker from "expo-image-picker";

const Chat = props => {
  let client = props?.route?.params.friend;
  const {store, setStore} = useContext(AuthContext);
  const navigation = useNavigation();
  const scrollRef = useRef(null);

  const [msg, setMsg] = useState('');
  const [img, setImg] = useState('');
  const [conversation, setConversation] = useState([]);

  const toast = msg => {
    return ToastAndroid.show(msg, ToastAndroid.LONG, ToastAndroid.CENTER);
  };

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      setStore({...store, path: 'SocialWocial'});
    });
  }, [navigation]);

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollToEnd({animated: false});
    }
  };

  const handleContentSizeChange = () => {
    scrollToBottom();
  };

  const handleSend = (type, imgUri) => {
    if (!store.user._id) {
      toast('userId not found');
      return;
    }
    if (!client._id) {
      toast('clientId not found');
      return;
    }

    let formData = new FormData();
    formData.append('userId', store.user._id);
    formData.append('clientId', client?._id);
    if (type == 'image') {
      if (!imgUri) {
        toast('imgUri not found');
        return;
      }
      formData.append('msgType', 'image');
      formData.append('imageFile', {
        uri: imgUri,
        name: 'image.jpg',
        type: 'image/jpeg',
      });
    } else {
      if (!msg) {
        toast('msg not found');
        return;
      }
      formData.append('msgType', 'text');
      formData.append('msg', msg);
    }
    let url = BASE_URL + 'msg/';

    axios({
      method: 'post',
      url,
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'},
    })
      .then(res => {
        if (res.data.success) {
          setMsg('');
          setImg('');
          getConversation();
        }
      })
      .catch(err => {
        console.log(err);
        toast('Bad request');
      });
  };

  const getConversation = () => {
    let url = BASE_URL + 'msg/' + store.user._id + '/' + client?._id;
    axios
      .get(url)
      .then(res => {
        if (res.data.success) {
          let arr = [...res.data.messages];

          arr.map(a => {
            if (a.userId == store.user._id) {
              a.userTxt = true;
            } else {
              a.userTxt = false;
            }
          });
          setConversation(res.data.messages);
        } else {
          toast('no conversations');
        }
      })
      .catch(err => {
        console.log(err);
        toast('error in fetching conversation');
      });
  };

  useEffect(() => {
    getConversation();
  }, []);

  const formatTime = time => {
    const options = {hour: 'numeric', minute: 'numeric'};
    return new Date(time).toLocaleString('en-US', options);
  };

  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });
  //   if (!result.canceled) {
  //     handleSend("image", result?.assets[0]?.uri);
  //   }
  // };

  setTimeout(() => {
    getConversation();
  }, 1000);
  return (
    <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#000000'}}>
      <ScrollView
        style={{margin: 2}}
        ref={scrollRef}
        contentContainerStyle={{flexGrow: 1}}
        onContentSizeChange={handleContentSizeChange}>
        {conversation.length > 0 ? (
          conversation?.map((item, index) => {
            if (item.msgType == 'text') {
              return (
                <Pressable
                  key={index}
                  style={[
                    item.userTxt
                      ? {
                          alignSelf: 'flex-end',
                          backgroundColor: '#DCF8C6',
                          padding: 4,
                          maxWidth: '60%',
                          borderRadius: 7,
                          margin: 3,
                        }
                      : {
                          alignSelf: 'flex-start',
                          backgroundColor: '#F0F8FF',
                          padding: 4,
                          maxWidth: '60%',
                          borderRadius: 7,
                          margin: 3,
                        },
                  ]}>
                  <Text>{item.msg}</Text>
                  <Text style={style.timeStamp}>
                    {formatTime(item.timeStamp)}
                  </Text>
                </Pressable>
              );
            }
          })
        ) : (
          <Text>Say Hello to {client.name}</Text>
        )}
      </ScrollView>
      <View style={style.row0}>
        <TextInput
          mode="outlined"
          placeholder="Message"
          style={style.chatInput}
          value={msg}
          onChangeText={e => setMsg(e)}
        />
        {msg ? (
          <Ionicons
            onPress={() => handleSend('text')}
            name="send"
            style={style.icon}
          />
        ) : (
          <Ionicons
            onPress={() => getConversation()}
            name="refresh"
            style={style.icon}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chat;
