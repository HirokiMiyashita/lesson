import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button } from 'react-native';

const HomeScreen = () => {
    const navigation = useNavigation(); // (2)
    return(
        <View
        style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
        }}
    >
        <Text>SignIn</Text>
        <Button
        title="詳しくはこちら"
        onPress={() => navigation.navigate('Detail')} />{/* (3) */}
    </View>
    )
}
export default HomeScreen