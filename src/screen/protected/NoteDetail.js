import { View, Text, StatusBar, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import Header from '../../component/Header'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../../constant/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'

const NoteDetail = ({ route, navigation }) => {
    const HEIGHT = StatusBar.currentHeight;
    const { detail } = route.params
    const text = "1) Anchor the desired FIX into 1L \n2) Line select that FIX to scratch pad & insert radial to fly + 99: ex. FIX025/99 \n3) Select that to L2\n4) Select L2 to the scratch pad and then back to L1\n5) Select the radial displayed on 6R (great circle route)\n6) *As a check, enter the original fix into the FIX page and enter the desired radial on first line. A green dashed line will overlay the new proposed route.\n7) Execute"
    return (
        <View>
            <View style={{ marginTop: HEIGHT + hp('5'), alignSelf: 'center' }}>
                <Header Logo={require('../../assets/images/logo1.png')} profile={require('../../assets/images/profile.png')} btnColor={colors.primary} Nav={navigation} />
            </View>
            <View style={{ backgroundColor: colors.primary, width: wp('90'), height: hp('85'), alignSelf: 'center', borderRadius: 20, top: 30 }}>
                <View style={{ padding: 30 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name='arrow-back' color={'gray'} size={50} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 24, color: 'white', marginLeft: 20 }}>General Aircraft Notes</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: '#303071', paddingVertical: 10, borderRadius: 10, justifyContent: 'center', paddingLeft: 20, marginVertical: 10, width: wp('80'), alignSelf: "center" }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ width: wp('55') }}>
                            <Text style={{ color: 'white', fontSize: 22 }}>{detail.title}</Text>
                        </View>
                        <Image source={require('../../assets/images/airplan.png')} style={{ width: wp(9), height: hp('2'), marginRight: 10 }} />
                    </View>
                </View>
                <View style={{ backgroundColor: '#FFFF', paddingVertical: 10, borderRadius: 10, paddingLeft: 20, marginVertical: 10, width: wp('80'), height: hp(65), alignSelf: "center", top: 30 }}>
                    <Text style={{lineHeight:50,fontSize:22,color:'black',paddingRight:20}}>
                        {text}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 22
    }
})
export default NoteDetail