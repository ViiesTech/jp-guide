import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import FastImage from 'react-native-fast-image'
import { COLORS } from '../utils/COLORS'

const Card = ({
    container,
    background_Color,
    image,
    title,
    onPress,
    imageBG,
    screenWidth,
    screenHeight
}) => {
    return (
        <View>
            <Text style={{ fontSize: 22.78, color: COLORS.WHITE, fontWeight: '500', opacity: 1, marginTop:30, position:'absolute', zIndex:200, alignSelf:'center', textAlign:'center' }}>{title}</Text>
            <TouchableOpacity onPress={onPress} style={{ opacity: 0.6 }}>
                <FastImage source={imageBG}
                    style={{
                        width: screenWidth * 0.35 ,
                        padding: 20,
                        margin: 10,
                        height: screenHeight,
                        borderRadius: 10,
                        overflow: 'hidden',
                        
                    }}
                    onPress={onPress}
                >
           
                </FastImage>

            </TouchableOpacity>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: wp('35%'),
        padding: 20,
        margin: 10,
        height: hp('25%'),
        borderRadius: 10,

    }
})
export default Card