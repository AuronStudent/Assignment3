import { Stack } from 'expo-router';
import { Button, Text, Image } from 'react-native';
import { Link } from 'expo-router';

export default function Layout() {
    return (
        <Stack screenOptions={{
            headerTitle: "Assignment 3",
            headerStyle: { backgroundColor: 'lightblue', },
            headerTintColor: 'black',
            headerBackVisible: false,
        }}>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="settings"
                options={{
                    
                    headerShown: true,
                    headerTitle: "",
                                        headerLeft: () => <Link
                        style={{ fontSize: 20 }}
                        href="/">Back</Link>
                    
                }}
            />
            <Stack.Screen
                name="main"
                options={{
                    headerTitle: "",
                    headerShown: true,
                                        headerLeft: () => <Link
                        style={{ fontSize: 20 }}
                        href="/">Back</Link>
                }}
            />


        </Stack>
    );
}