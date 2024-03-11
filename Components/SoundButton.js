import { Pressable } from 'react-native'
import styles from "../Styles/styles"
import { Audio } from 'expo-av' 

export const SoundButton = ({ id, callback }) => {
    const num = id;
    return (
        <Pressable
            style={styles.soundButton}
            onPress={() => {callback(num) }}
        />


        
    );
}