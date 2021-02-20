import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button } from 'react-native';
import { Container, Header, Icon, Left ,Body ,Item ,Title,Content,Form,Label,Input} from 'native-base'
const SignInScreen = () => {
    const navigation = useNavigation(); // (2)
    return(
        <Container>
    <Header>
        <Left>
        <Button>
            <Icon name="arrow-back" />
        </Button>
        </Left>
        <Body>
        <Title>Authentication</Title>
        </Body>
    </Header>
    <Content padder>
        {/* Sign Up Form */}
        <Form>
        <Item floatingLabel>
            <Label>Email Address</Label>
            <Input
            keyboardType="email-address"
            value=""
            onChangeText=""
            />
        </Item>
        <Item floatingLabel>
            <Label>Password</Label>
            <Input
            secureTextEntry
            value=""
            onChangeText=""
            />
        </Item>
        <Button>
            <Text>Sign Up</Text>
        </Button>
        </Form>
    </Content>
    </Container>
    )
}
export default SignInScreen