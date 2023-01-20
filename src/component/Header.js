import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from 'react-native-responsive-screen'
import CustomButton from './CustomButton'

const Header = ({
    placeHolder,
    onPress,
    Logo,
    ImageUR,
    inputProps,
    onPressButton,
    btnColor,
    profile,
    Nav,
    onchangeText,
    value
}) => {
    return (
        <View style={{ width: wp('90%'), flexDirection: 'row',justifyContent:'space-between'}}>
            
            <Image source={Logo} style={styles.Logo} resizeMode='contain' />
            <TextInput  {...inputProps} style={styles.input} placeholder="search here" onChangeText={onchangeText} value={value}/>
            <CustomButton
                buttonColor={btnColor}
                title="Search"
                buttonStyle={{ width: '20%', alignSelf: 'center',borderRadius: 10,height:hp(5) }}
                textStyle={{ fontSize: 20 }}
                onPress= {onPressButton}
            />
            <TouchableOpacity onPress={()=> Nav.navigate('EditProfile')}>

                <Image source={profile} style={styles.profile}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    Logo: {
        width: wp('15'),
        height: hp('5'),
    },
    input: {
        height: hp('5'),
        width: hp(25),
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 20
    },
    profile:{
       width:70, 
       height:70,
       borderRadius:200
    }
})
export default Header