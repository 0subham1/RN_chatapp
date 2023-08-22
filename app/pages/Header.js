import {View, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Appbar, Dialog, Portal, Button} from 'react-native-paper';
import style from '../css/style';
import {AuthContext} from '../common/AuthContext';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Header = props => {
  const {store, setStore} = useContext(AuthContext);
  const {internet, setInternet} = useContext(AuthContext);
  const navigation = useNavigation();

  const [visible, setVisible] = React.useState(false);
  const [info, setInfo] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const handleProfile = () => {
    if (store.user) {
      showDialog();
    } else {
      navigation.navigate('profile');
    }
  };
  const handleLogout = () => {
    setStore({});
    hideDialog();
    navigation.navigate('profile');
  };
  // useEffect(() => {
  //   console.log(store, "store");
  // }, [store]);

  const handleHeading = () => {
    store.user && navigation.navigate('home');
    setStore({...store, path: 'SocialWocial'});
  };
  return (
    <>

      <Appbar.Header style={style.white}>
        {store.path != 'SocialWocial' && (
          <AntDesign
            onPress={() => handleHeading()}
            name="arrowleft"
            style={style.icon}
          />
        )}
        <Appbar.Content
          onPress={() => handleHeading()}
          title={store?.path ? store.path : 'SocialWocial'}
        />
        {!internet ? (
          <Text>No internet</Text>
        ) : (
          <>
            <AntDesign
              onPress={() => setInfo(true)}
              name="infocirlce"
              style={style.icon}
            />

            <Button onPress={() => handleProfile()}>
              {store.user ? store?.user?.name : 'login'}
            </Button>
          </>
        )}
      </Appbar.Header>

      <Portal>
        <Dialog
          style={style.white}
          visible={info}
          onDismiss={() => setInfo(false)}>
          <Dialog.Title>Hi There!</Dialog.Title>
          <Dialog.Content>
            <Text> Welcome to my ReactNative Chat app,</Text>
            <Text></Text>
            <Text> TechStack:</Text>
            <Text> RN CLI, MongoDB, NodeJs</Text>
            <Text> (For best experience,avoid dark mode)</Text>
          </Dialog.Content>
        </Dialog>
        <Dialog style={style.white} visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Logout ?</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={hideDialog}>No</Button>
            <Button onPress={handleLogout}>Yes</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

export default Header;
