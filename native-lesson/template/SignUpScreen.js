import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button } from 'react-native';

const SignUpScreen = (props) => {
    const navigation = useNavigation(); // (2)
    return(
        
    <View
        style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
        }}
    >
        <Text>Home Screen</Text>
        <Button
        title="詳しくはこちら"
        onPress={() => navigation.navigate('Detail')} />{/* (3) */}
    </View>
    )
}
export default SignUpScreen