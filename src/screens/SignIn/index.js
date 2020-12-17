import React, { useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'

import {
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from '../styles/SignAndSingUpStyle'

import { UserContext } from '../../contexts/UserContext'
import Api from '../../Api'

import SignInput from '../../components/SignInput'

import BarberLogo from '../../assets/barber'
import EmailIcon from '../../assets/email'
import LockIcon from '../../assets/lock'

export default () => {
    const { dispatch: userDispatch } = useContext(UserContext)

    const navigation = useNavigation()

    const [emailField, setEmailField] = useState('')
    const [passwordField, setPasswordField] = useState('')

    const handleSignClick = async () => {
        if (emailField !== '' && passwordField !== '') {
            let res = await Api.signIn(emailField, passwordField)
            if (res.token) {
                await AsyncStorage.setItem('token', res.token)

                userDispatch({
                    type: 'setAvatar',
                    payload: {
                        avatar: res.data.avatar
                    }
                })

                navigation.reset({
                    routes: [{ name: 'MainTab' }]
                })
            } else {
                alert('E-mail e/o senha errados!')
            }
        } else {
            alert('Preencha os campos!')
        }
    }

    const handleMassageButtonClick = () => {
        navigation.reset({
            routes: [{ name: 'SignUp' }]
        })
    }

    return (
        <Container>
            <BarberLogo width="100%" height="160" />

            <InputArea>
                <SignInput
                    autoFocus={true}
                    IconSvg={EmailIcon}
                    placeholder="Digite o seu email"
                    value={emailField}
                    onChangeText={text => setEmailField(text)}
                />
                <SignInput
                    IconSvg={LockIcon}
                    placeholder="Digite a sua senha"
                    value={passwordField}
                    onChangeText={text => setPasswordField(text)}
                    password={true}
                />

                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>LOGIN</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMassageButtonClick}>
                <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    )
}
