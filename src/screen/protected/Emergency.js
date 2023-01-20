import { View, Text, StatusBar, TouchableOpacity,ScrollView } from 'react-native'
import React from 'react'
import Header from '../../component/Header'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../../constant/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'

const Emergency = ({navigation}) => {
  const HEIGHT = StatusBar.currentHeight;
  return (
    <ScrollView>
    <View style={{ marginTop: HEIGHT + hp('5'), alignSelf: 'center' }}>
      <Header Logo={require('../../assets/images/logo1.png')} profile={require('../../assets/images/profile.png')} btnColor={colors.primary} Nav={navigation} />
    </View>
    <View style={{ flexDirection: 'row', backgroundColor: colors.primary, width: wp('90'), height: hp('85'), alignSelf: 'center', borderRadius: 20, top: 30 }}>
      <View style={{padding:30}}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <TouchableOpacity onPress={()=> navigation.goBack()}>

          <Icon name='arrow-back' color={'gray'} size={50}/>
          </TouchableOpacity>
          <Text style={{fontSize:24,color:'white',marginLeft:20}}>Emergency Protocol</Text>
        </View>
      </View>
    </View>
  </ScrollView>
  )
}

export default Emergency