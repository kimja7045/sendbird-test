import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { connectSendbird } from '../sendbirdApi/sendbirdApi';

const LUKE_USER = {
  id: 1,
  nickname: 'luke',
  profileImage:
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
};

const KEVIN_USER = {
  id: 2,
  nickname: 'kevin',
};

const IntroScreen = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const onConnectSendbird = async (user) => {
    try {
      const res = await connectSendbird({
        id: user?.id,
        nickname: user?.nickname,
        profileImage: user?.profileImage || '',
      });
      console.log('res', res);

      setCurrentUser(user);
    } catch (e) {
      console.log('e', e);
      console.log('e.res', e.response);
    }
  };

  return (
    <View style={styles.contentContainer}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => onConnectSendbird(LUKE_USER)}
      >
        <Text>Luke 로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ ...styles.btn, marginTop: 16 }}
        onPress={() => onConnectSendbird(KEVIN_USER)}
      >
        <Text>kevin 로그인</Text>
      </TouchableOpacity>

      {currentUser && (
        <>
          <Text style={{ fontSize: 23, textAlign: 'center', marginTop: 64 }}>
            {`안녕하세요! ${currentUser?.nickname}님,\n센드버드 로그인을 환영합니다!`}
          </Text>
        </>
      )}
    </View>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    justifyContent: 'center',
  },
  btn: {
    borderWidth: 1,
    borderColor: '#a9a9a9',
    borderRadius: 10,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
