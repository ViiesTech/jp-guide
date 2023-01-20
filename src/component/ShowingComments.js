import { View, Text, StatusBar, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

const ShowingComments = (props) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <Image source={require('../assets/images/profile.png')} style={{ height: 60, width: 60, }} />
            <View style={{ marginLeft: 15 }}>
                <Text style={{ fontSize: hp('2%'), fontWeight: 'bold' }}>{props.name}</Text>
                <Text style={{ fontSize: hp('1.5%'), width: wp('60%'), }}>{props.comment}</Text>
            </View>
        </View>
    )
}

export default ShowingComments