import React, { useState, useEffect } from 'react'

import { useNavigation, useRoute } from '@react-navigation/native'

import {
    Container,
    Scroller,
    FakeSwiper,
    PageBody,
    UserInfoArea,
    ServiceArea,
    TestimonialArea,

    SwipDot,
    SwiperDotActive,

    SwiperItem,
    SwipeImage
}
    from './styles'

import Swiper from 'react-native-swiper'

import Api from '../../Api'

export default () => {
    const navigation = useNavigation()
    const route = useRoute()

    const [userInfo, setUserInfo] = useState({})

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getBaberInfo = async () => {
            setLoading(true)
            let json = await Api.getBarbe(route.params.id)
            if (json.error === '') {
                setUserInfo(json.data)
            } else {
                alert('Erro: ' + json.error)
            }

            setLoading(false)
        }
        getBaberInfo()

    }, [])

    return (
        <Container>
            <Scroller>
                {userInfo.photos && userInfo.photos.length > 0 ?
                    <Swiper
                        style={{ height: 240 }}
                        dot={<SwipDot />}
                        activeDot={<SwiperDotActive />}
                        paginationStyle={{ top: 15, right: 15, bottom: null, left: null }}
                        autoplay={true}
                    >
                        {userInfo.photos.map((item, key) => (
                            <SwiperItem key={key}>
                                <SwipeImage source={{ uri: item.url }} reziseMode="cover" />
                            </SwiperItem>
                        ))}
                    </Swiper>
                    :
                    <FakeSwiper></FakeSwiper>
                }

                <PageBody>
                    <UserInfoArea>

                    </UserInfoArea>
                    <ServiceArea>

                    </ServiceArea>
                    <TestimonialArea>

                    </TestimonialArea>
                </PageBody>
            </Scroller>
        </Container>
    )
}