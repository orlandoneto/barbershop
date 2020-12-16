import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import {
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from '../styles/SignAndSingUpStyle'

import SignInput from '../../components/SignInput'

import BarberLogo from '../../assets/barber'
import EmailIcon from '../../assets/email'
import LockIcon from '../../assets/lock'

export default () => {
    const navigation = useNavigation()

    const [emailField, setEmailField] = useState('')
    const [passwordField, setPasswordField] = useState('')

    const handleSignClick = () => {
       
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
