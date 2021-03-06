import React, { useState, useEffect } from 'react'
import { Platform, RefreshControl } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { request, PERMISSIONS } from 'react-native-permissions'
import Geolocation from '@react-native-community/geolocation'

import Api from '../../Api'

import {
    Container,
    Scroller,

    HeaderArea,
    HeaderTitle,
    SearchButton,

    LocationArea,
    LocationInput,
    LocationFinder,

    LoadingIcon,
    ListArea,
} from './styles'

import SearchIcon from '../../assets/search.svg'
import MyLocationIcon from '../../assets/my_location.svg'
import BarberItem from '../../components/BarberItem'

export default () => {
    const navigation = useNavigation()

    const [locationText, setLocationText] = useState('')
    const [coords, setCoords] = useState(null)
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    // Fazendo busca coordenadas para achar a cidade
    const handleLocationFinder = async () => {
        setCoords(null)

        let result = await request(
            Platform.OS === 'ios' ?
                PERMISSIONS.IOS.LOCATION_WHEN_IN_USE :
                PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        )

        if (result === 'granted') {
            setLoading(true)
            setLocationText('')
            setList([])

            Geolocation.getCurrentPosition(
                (position) => {
                    setCoords(position.coords)
                    getBarbes()
                },
                (error) => {
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            )
        }
    }

    const getBarbes = async () => {
        setList([])

        let lat = null
        let lng = null

        if (coords) {
            lat = coords.latitude
            lng = coords.longitude
        }

        let res = await Api.getBarbes(lat, lng, locationText)
        if (res.error === '') {
            if (res.loc) {
                setLocationText(res.loc)
            }

            setList(res.data)
        } else {
            console.log('Error: ', res.error)
        }

        setLoading(false)
    }

    useEffect(() => {
        getBarbes()
    }, [])

    const onRefresh = () => {
        setRefreshing(false)
        getBarbes()
    }

    // Fazendo busca via campo de pesquisa pelo o nome da cidade
    const handleLocationSearch = () => {
        setCoords({})
        getBarbes()
    }

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>Encontre o seu barbeiro favorito</HeaderTitle>
                    <SearchButton onPress={() => navigation.navigate('Search')}>
                        <SearchIcon width="26" height="26" fill="#FFF" />
                    </SearchButton>
                </HeaderArea>

                <LocationArea>
                    <LocationInput
                        placeholder="Onde você esta?"
                        placeholderTextColor="#FFF"
                        value={locationText}
                        onChangeText={text => setLocationText(text)}
                        onEndEditing={handleLocationSearch}
                    />
                    <LocationFinder onPress={handleLocationFinder}>
                        <MyLocationIcon width="24" height="24" fill="#FFF" />
                    </LocationFinder>
                </LocationArea>

                {loading &&
                    <LoadingIcon size="large" color="#FFFFFF" />
                }

                <ListArea>
                    {list.map((item, key) => (
                        <BarberItem key={key} data={item} />
                    ))}
                </ListArea>
            </Scroller>
        </Container>
    )
}