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

import Api from '../../Api'

import SignInput from '../../components/SignInput'

import BarberLogo from '../../assets/barber'
import PersonIcon from '../../assets/person'
import EmailIcon from '../../assets/email'
import LockIcon from '../../assets/lock'

export default () => {
    const navigation = useNavigation()

    const [nameField, setNameField] = useState('')
    const [emailField, setEmailField] = useState('')
    const [passwordField, setPasswordField] = useState('')

    const handleSignClick = async () => {
        if (nameField !== '' && emailField !== '' && passwordField !== '') {
            let resJson = await Api.signUp(nameField, emailField, passwordField)

            if (resJson.token) {
                alert('DEU CERTO')
            } else {
                alert('E-mail e/o senha errados!')

            }
        } else {
            alert('Preencha os campos!')
        }
    }

    const handleMassageButtonClick = () => {
        navigation.reset({
            routes: [{ name: 'SignIn' }]
        })
    }

    return (
        <Container>
            <BarberLogo width="100%" height="160" />

            <InputArea>
                <SignInput
                    IconSvg={PersonIcon}
                    placeholder="Digite o seu nome"
                    value={nameField}
                    onChangeText={text => setNameField(text)}
                />
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
                    <CustomButtonText>CADASTRAR</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMassageButtonClick}>
                <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    )
}
