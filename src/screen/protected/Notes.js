import { View, Text, StatusBar, TouchableOpacity, FlatList, Image } from 'react-native'
import React from 'react'
import Header from '../../component/Header'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../../constant/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'
const Notes = ({ navigation }) => {
  const HEIGHT = StatusBar.currentHeight;
  const data = [
    { title: "To Fly a Radial Outbound" },
    { title: "To see current Lat/Long Position" },
    { title: "To enter an exact Lat/Long Fix" },
    { title: "To cross a fix at a given time" },
    { title: "To determine when you can achieve a given altitude" },
    { title: "For Drift Down info" },
    { title: "To slow in level flight" }
  ]
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
          <View style={{ padding: 30, top: 20 }}>
            <FlatList
              data={data}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, key }) => {
                return (
                  <TouchableOpacity onPress={() => navigation.navigate('NoteDetail',{detail:item})} activeOpacity={0.5} style={{ backgroundColor: '#303071', height: hp('5'), justifyContent: 'center', paddingLeft: 20, marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ width: wp('55') }}>
                      <Text style={{ color: 'white', fontSize: 22 }}>{item.title}</Text>
                    </View>
                    <Image source={require('../../assets/images/airplan.png')} style={{ width: wp(9), height: hp('2'), marginRight: 10 }} />
                  </TouchableOpacity>
                )
              }}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default Notes