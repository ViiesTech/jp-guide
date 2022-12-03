import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

const Card = ({
    container,
    background_Color,
    image,
    title,
    onPress
}) => {
    return (
        <TouchableOpacity activeOpacity={0.3}
            style={{
                ...styles.container,
                backgroundColor: background_Color || '#ffff',
            }}
            onPress={onPress}
        >
            <View style={{height:hp('22'),justifyContent:'space-between'}}>
                <Text style={{fontSize:18,color:'white',fontWeight:'bold'}}>{title}</Text>
                <Image source={image} style={{alignSelf:'flex-end',width:wp('17'),height:hp('9')}} resizeMode='contain'/>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container:{
        width:wp('35%'),
        padding:20,
        margin:10,
        height:hp('25%'),
        borderRadius:10
    }
})
export default Card