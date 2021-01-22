import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Setting from './Setting';

const App = () => {
  const [dday, setDday] = useState(new Date());
  const [ddayTitle, setDdayTitle] = useState('new Title');
  const [chatLog, setChatLog] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [settingModal, setSettingModal] = useState(false);
 
  const modalHandler = () => {
    setSettingModal((prev) => !prev);
  };
  const settingHandler = async (title, date) => {
    setDdayTitle(title);
    setDday(date);
    try {
      const dday = {
        title: title,
        date: date,
      };
      const ddayString = JSON.stringify(dday);
      await AsyncStorage.setItem('@dday', ddayString);
    } catch (e) {
      console.log(e);
    }
    modalHandler();
  };
  const makeDateString = () => {
    return (
      dday.getFullYear() +
      '년 ' +
      (dday.getMonth() + 1) +
      '월 ' +
      dday.getDate() +
      '일'
    );
  };
  const makeRemainString = () => {
    const distance = new Date().getTime() - dday.getTime();
    console.log(new Date(), dday, distance / (1000 * 60 * 60 * 24));
    const remain = Math.floor(distance / (1000 * 60 * 60 * 24));
    if (remain < 0) {
      return 'D' + remain;
    } else if (remain > 0) {
      return 'D+' + remain;
    } else if (remain === 0) {
      return 'D-day';
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const ddayString = await AsyncStorage.getItem('@dday');
        const chatLogString = await AsyncStorage.getItem('@chat');
        if (chatLogString == null) {
          setChatLog([]);
        } else {
          const chatLog = JSON.parse(chatLogString);
          setChatLog(chatLog);
        }
        if (ddayString === null) {
          this.setState({
            dday: new Date(),
            ddayTitle: '',
          });
        } else {
          const dday = JSON.parse(ddayString);
          setDday(new Date(dday.date));
          setDdayTitle(dday.title);
          console.log(dday, ddayTitle);
        }
      } catch (e) {
        console.log('ERR');
      }
    })();
  }, []);
  const chatHandler = () => {
    setChatLog([
      ...chatLog,
      makeDateString() + ' : ' +chatInput,
    ]);
    setChatInput('');
    async () => {
      const chatLogString = JSON.stringify(chatLog);
      await AsyncStorage.setItem('@chat', chatLogString);
    };
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={require('./icon/background.png')}>
        <View style={styles.settingView}>
          <TouchableOpacity onPress={() => modalHandler()}>
            <Image source={require('./icon/setting.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.ddayView}>
          <Text style={styles.titleText}>{ddayTitle}까지</Text>
          <Text style={styles.ddayText}>{makeRemainString()}</Text>
          <Text style={styles.dateText}>{makeDateString()}</Text>
        </View>
        <View style={styles.chatView}>
          <ScrollView style={styles.chatScrollView}>
            {chatLog.map((chat, id) => (
              <Text style={styles.chat} id={id}>{chat}</Text>
            ))}
          </ScrollView>
          <View style={styles.chatControl}>
            <TextInput
              style={styles.chatInput}
              value={chatInput}
              onChangeText={(changedText) => setChatInput(changedText)}
            />
           <TouchableOpacity
              style={styles.sendButton}
              onPress={()=>chatHandler()}
            >
              <Text>전송</Text>
            </TouchableOpacity>
          </View>
        </View>
        {settingModal ? (
          <Setting
            modalHandler={modalHandler}
            settingHandler={settingHandler}
          />
        ) : (
          <></>
        )}
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: '1%',
  },
  ddayView: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatView: {
    flex: 6,
  },
  titleText: {
    alignSelf: 'flex-end',
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginRight: '15%',
  },
  ddayText: {
    fontSize: 100,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  dateText: {
    alignSelf: 'flex-start',
    fontSize: 21,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginLeft: '15%',
  },
  sendButton: {
    backgroundColor: 'rgb(97,99,250)',
    height: 40,
    width: 50,
    borderRadius: 20,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  chatInput: {
    backgroundColor: 'white',
    width: '75%',
    height: 40,
    borderWidth: 1,
    borderColor: '#a5a5a5',
    borderRadius: 20,
  },
  chatControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  chatScrollView: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'rgba(201,201,201,0.7)',
    borderRadius: 5,
    margin: 10,
    borderWidth: 1,
    borderColor: '#a5a5a5',
  },
  chat: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A4A4A',
    margin: 2,
  },
});
export default App;
