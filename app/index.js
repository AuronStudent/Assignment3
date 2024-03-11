import {Link}from 'expo-router' ;
import {Pressable, Text, View}from 'react-native';
import  styles  from "../Styles/styles";
export default function Page() {
    return(
        
        <View style={styles.container}>
        <Text style={{fontSize:30}}>Soundboard</Text>
           <Link href={{
                pathname: "/main",
                
            }} asChild>
                <Pressable style={styles.button}>
                    <Text style={{fontSize:30} }>Play</Text>
                </Pressable>
            </Link>
           
                   
           <Link href={{
                pathname: "/settings",
                
            }} asChild>
                <Pressable style={styles.button}>
                    <Text style={{fontSize:30} }>Settings</Text>
                </Pressable>
            </Link>
            </View>
    )
}