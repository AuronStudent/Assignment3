import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av';
import { useState, useEffect } from 'react';
import { ScrollView, Text, View, Platform,Button,Pressable } from 'react-native';
import * as SQLite from 'expo-sqlite';
import Constants from 'expo-constants';
import styles from "../Styles/styles";
import { SoundButton } from "../Components/SoundButton";
import Item from "../Components/item";
export default function Page() {
    const localuri = require('../assets/sfx/sound1.mp3');
    const localuri2 = require('../assets/sfx/sound2.mp3');
    const localuri3 = require('../assets/sfx/sound3.mp3');
    const localuri4 = require('../assets/sfx/sound4.mp3');
    const localuri5 = require('../assets/sfx/sound5.mp3');
    
    const [myPBO, setMyPBO] = useState(null);
    const [recordings, setRecordings] = useState([]);
    const [updateRecordings, forceUpdate] = useState(0);
    const [db, setDb] = useState(null);
    const [permissionsResponse, requestPermission] = Audio.usePermissions();
    const [recording, setRecording] = useState(null);
    const [recordingUri, setRecordingUri] = useState(null);

    const startRecording = async () => {
        try {
            // request permission to use the mic
            if (permissionsResponse.status !== 'granted') {
                console.log('Requesting permissions.');
                await requestPermission();
            }
            console.log('Permission is ', permissionsResponse.status);

            // set some device specific values
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            console.log('Starting recording...');
            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(recording);
            console.log('...recording');
        }
        catch (errorEvent) {
            console.error('Failed to startRecording(): ', errorEvent);
        }
    }

    const stopRecording = async () => {
        try {
            // stop the actual recording
            await recording.stopAndUnloadAsync();

            // save the recorded object location
            const uri = recording.getURI();
            console.log("uri = "+uri);
            setRecordingUri(uri);
            
            addRecord(uri);
            

            // forget the recording object
           setRecording(undefined);

            // log the result
            console.log('Recording stopped and stored at ', uri);
        }
        catch (errorEvent) {
            console.error('Failed to stopRecording(): ', errorEvent);
        }
    }

    const playRecording = async (id) => {
        try{
            
        
            const { sound } = await Audio.Sound.createAsync({
                uri: recordings[id].uri,
            });

            await sound.replayAsync();
            console.log('Playing recorded sound from ', recordings[id]);
        }catch (error) {
            console.log(error)
        }
        
    }

    const loadSound = async (uri) => {
        
        const { sound } = await Audio.Sound.createAsync(uri);
        setMyPBO(sound);
        
    }
    const playSound = async () => {
        try {
            await myPBO.playAsync();

        } catch (e) {
            console.log(e);
        }
    }
    const unloadSound = async () => {
        await myPBO.unloadAsync();
    }
    const buttonPressedSound = async (sound) => {
        loadSound(sound)
        playSound();
    }
    const addRecord = (uri) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "insert into recordings (uri) values (?)",
                    [recordingUri],
                    () => console.log("added ", uri),
                    (_, error) => console.log(error)
                )
            },
            () => console.log('addRecord() failed'),
            forceUpdate(f => f + 1)
        )
    }
    useEffect(() => {
        
        loadSound(localuri)
        loadSound(localuri2)
        loadSound(localuri3)
        
        let db = null;


        if (Platform.OS === 'web') {
            db = {
                transaction: () => {
                    return {
                        executeSql: () => { }
                    }
                }
            }
        } else {
            db = SQLite.openDatabase('recordings3.db');
        }
        setDb(db);
        
        //create table if it doesnt exist
        db.transaction((tx) => {
            
            tx.executeSql(
                "CREATE TABLE if not exists recordings (id integer primary key not null, uri blob);"
            ),
                (_, error) => console.log(error),
                () => console.log("Table exists or was created")

        })
        return () => db ? db.closeasync : undefined
        return myPBO
            ? () => {
                unloadSound();
            }
            : undefined;
        
        

    }, []);

    //when db change do this
    useEffect(() => {
        if (db) {
            db.transaction(
                (tx) => {
                    tx.executeSql(
                        "select * from recordings",
                        [],
                        (_, { rows }) => setRecordings(rows._array),
                        (_, error) => console.log(error)
                    ),
                        (_, error) => console.log(error),
                        () => console.log("recordings was reloaded")
                }
            )
        }
        
    }, [db, updateRecordings]);
  return (
      <View style={styles.container}>
      <ScrollView style={styles.scrollArea}>
          <View style={styles.container}>
              <Text style={{fontSize:24}}>Soundboard</Text>
              <Pressable
                  
                  onPress={recording ? stopRecording : startRecording}
                  style={styles.button}
                  ><Text>{recording ? 'Stop Recording' : 'Start Recording' }</Text></Pressable>
          </View>
          
          <View style={styles.grid}>
              <SoundButton id={localuri} callback={buttonPressedSound} />
              <SoundButton id={localuri2} callback={buttonPressedSound} />
              <SoundButton id={localuri3} callback={buttonPressedSound} />
              <SoundButton id={localuri4} callback={buttonPressedSound} />
              <SoundButton id={localuri5} callback={buttonPressedSound} />
              {recordings.map(
                  ({ id}) => {
                      return (
                          <SoundButton id={id}
                              callback={playRecording}
                              
                          />
                      )
                  })
              }
          </View>
          </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}


