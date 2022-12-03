import { View, Text, StatusBar, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import Header from '../../component/Header'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../../constant/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'
const Maintenances = ({ navigation }) => {
  const HEIGHT = StatusBar.currentHeight;
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const data = [
    { title: "Assistance to \nMaintenance",isActive:true }, { title: "Fluid Leak \n(Fuel)" ,isActive:false}, { title: "Frequent ARMS \nCodes",isActive:false }, { title: "737-NG & MAX \nINFO",isActive:false }
  ]
  return (
    <View>
      <View style={{ marginTop: HEIGHT + hp('5'), alignSelf: 'center' }}>
        <Header Logo={require('../../assets/images/logo1.png')} profile={require('../../assets/images/profile.png')} btnColor={colors.primary} Nav={navigation} />
      </View>
      <View style={{ flexDirection: 'row', backgroundColor: colors.primary, width: wp('90'), height: hp('85'), alignSelf: 'center', borderRadius: 20, top: 30 }}>
        <View style={{ padding: 30 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name='arrow-back' color={'gray'} size={50} />
            </TouchableOpacity>
            <Text style={{ fontSize: 24, color: 'white', marginLeft: 20 }}>Maintenance Information</Text>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 20,justifyContent:'center' }}>
            {data.map((item, key) => {
              return (
                <View style={{margin:10,borderRadius:20,borderColor:'white',borderWidth:1,backgroundColor:item.isActive?'#8383AA':null}}>
                  <TouchableOpacity style={{ width: wp('35'), height: hp('20'),justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:24,color:'white'}}>{item.title}</Text>
                  </TouchableOpacity>
                </View>
              )
            })}
          </View>
          <View style={{height:hp('30'),padding:20,backgroundColor:'white',alignSelf:'center',borderRadius:10,width:wp('73')}}>
            <Text style={{fontSize:22,lineHeight:50}}>FOM Home Page: Preflight, Maintenance, Special Circumstances, Assistance to Maintenance & Pay and Credit.</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Maintenances