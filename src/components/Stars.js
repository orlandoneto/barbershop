import React from 'react'
import styled from 'styled-components/native'

import StartFullIcon from '../assets/star.svg'
import StartHalfIcon from '../assets/star_half.svg'
import StartEmptyIcon from '../assets/star_empty.svg'

const StarArea = styled.TouchableOpacity`  
  flex-direction: row;
`

const StarView = styled.View``

const StarText = styled.Text`
 font-size: 12px;
 font-weight: bold;
 margin-left: 5px;
 color: #737373;
`

export default ({ stars, showNumber }) => {
    // 0 start empty
    // 1 start half
    // 2 start full
    let s = [0, 0, 0, 0, 0]
    let floor = Math.floor(stars)
    let left = stars - floor

    for (var i = 0; i < floor; i++) {
        s[i] = 2
    }

    if (left > 0) {
        s[i] = 1
    }

    return (
        <StarArea>
            {s.map((item, key) => (
                <StarView key={key}>
                    { item === 0 && <StartEmptyIcon width="18" height="18" fill="#FF9200" />}
                    { item === 1 && <StartHalfIcon width="18" height="18" fill="#FF9200" />}
                    { item === 2 && <StartFullIcon width="18" height="18" fill="#FF9200" />}
                </StarView>
            ))}

            {showNumber && <StarText>{stars}</StarText>}
        </StarArea>
    )
}