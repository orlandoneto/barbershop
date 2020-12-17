import React from 'react'
import styled from 'styled-components/native'

import Stars from '../components/Stars'

const Area = styled.TouchableOpacity`
  background: #FFFFFF;
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 15px;
  flex-direction: row;
`

const Avatar = styled.Image`
  width: 88px;
  height: 88px;
  border-radius: 20px;
`

const InfoArea = styled.View`
  margin-left: 20px;
  justify-content: space-between;  
`

const Username = styled.Text`
  font-size: 17px;
  font-weight: bold;
`

const SeeProfileButtom = styled.View`
  width: 85px;
  height: 26px;
  border: 1px solid #4EADBE;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`

const SeeProfileButtomText = styled.Text`
  font-size: 13px;
  color: #268596;
`

export default ({ data }) => {
    return (
        <Area>
            <Avatar source={{ uri: data.avatar }} />
            <InfoArea>
                <Username>{data.name}</Username>

                <Stars stars={data.stars} showNumber={true} />

                <SeeProfileButtom>
                    <SeeProfileButtomText>Ver Perfil</SeeProfileButtomText>
                </SeeProfileButtom>
            </InfoArea>
        </Area>
    )
}