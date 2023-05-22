import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

const Card = ({
    container,
    background_Color,
    image,
    title,
    onPress,
    imageBG
}) => {
    return (
        <View>
            <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold', opacity: 1, marginTop:30, position:'absolute', zIndex:200, alignSelf:'center', textAlign:'center' }}>{title}</Text>
            <TouchableOpacity onPress={onPress} style={{ opacity: 0.6 }}>
                <ImageBackground source={imageBG}
                    style={{
                        ...styles.container,

                        overflow: 'hidden'
                        // backgroundColor: background_Color || '#ffff',
                    }}
                    onPress={onPress}
                >
                    {/* <View style={{ height: hp('22'), justifyContent: 'space-between' }}> */}
                    {/* <View style={{ backgroundColor: 'blue', borderRadius: 200, padding: 15,alignItems:'center', justifyContent:'center' }}> */}

                    {/* </View> */}
                    {/* <Image source={image} style={{ alignSelf: 'flex-end', width: wp('17'), height: hp('9') }} resizeMode='contain' /> */}
                    {/* </View> */}
                </ImageBackground>

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