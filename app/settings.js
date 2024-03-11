import * as SQLite from 'expo-sqlite';
import { useEffect,useState } from 'react'
import styles from '../Styles/styles';
import { Button,Platform,View,Text,Pressable } from 'react-native';

export default function Page() {
    const [db, setDb] = useState(null);


    const deleteRecordings = async () => {
        console.log("it does")
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "drop table recordings",
                    
                    () => console.log("deleted"),
                    (_, error) => console.log(error)
                )
            },
            () => console.log('Deletion failed'),
            
        )
    }
        useEffect(() => {
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

    }, []);

    return (
        <View style={styles.container }>

            <Pressable style={styles.button} onPress={()=>{deleteRecordings()}}><Text style={{fontSize:24}}>Delete Recordings</Text></Pressable>
            

        </View>
    )
}
