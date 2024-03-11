import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d5a2f2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    soundButton: {
        backgroundColor: 'lightblue',
        height: 100,
        width: 100,
        borderWidth: 2,
        margin: 10,

    },
    grid: {
        backgroundColor:'#d5a2f2',
        flex: 4,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        borderWidth: 2,
        borderColor: 'black',
        borderStyle: 'solid',
        backgroundColor: 'white',
        padding: 10,
        margin: 4,
    },
    itemText: {
        fontSize: 24,
    },
    scrollArea: {
        backgroundColor: '#d5a2f2',
        flex: 1,
        paddingTop: 50,
        width: '100%',
        
    },
    button:{
            
        backgroundColor: 'lightblue',
        borderRadius: 20,
        border: 20,
        borderWidth: 2,
        padding:5,
        width:250,
        justifyContent:'center',
         alignItems: 'center',
         margin:10,
    
    },
});

export default styles;

