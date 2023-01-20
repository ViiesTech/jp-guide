import { View, Text, StatusBar, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../component/Header'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../../constant/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'

const Notes = ({ navigation }) => {
  const HEIGHT = StatusBar.currentHeight;
  const data = [
    { title: "To Fly a Radial Outbound" , Note :  "1) Anchor the desired FIX into 1L \n2) Line select that FIX to scratch pad & insert radial to fly + 99: ex. FIX025/99 \n3) Select that to L2\n4) Select L2 to the scratch pad and then back to L1\n5) Select the radial displayed on 6R (great circle route)\n6) *As a check, enter the original fix into the FIX page and enter the desired radial on first line. A green dashed line will overlay the new proposed route.\n7) Execute" },
    { title: "To see current Lat&Long Position", Note : "1) SelecttheINIT/REFINDEXpage \n2) Select2L(POS)andcurrentpositionwillbedisplayed" },
    { title: "To enter an exact Lat&Long Fix", Note : "1) Enterthefollowingformat:N1234.5W06512.3(NoSpaces)intothescratchpad. \n2) LineselectthatpointintotheLegspage. \n3) Selectthatpointagaintothescratchpad. \n4) ThenselectthepointintotheFIXpage"},
    { title: "To cross a fix at a given time", Note : "1) InsertdesiredfixintoRTApage.RTAwilldisplayanachievable“windowoftime”you can cross that fix. \n2) Select a time within that window and insert in 1R. FMC will display a Speed/Mach for VNAV to maintain in order to reach the fix at the desired time." },
    { title: "To determine when you can achieve a given altitude", Note : "• Once level, in VNAV CRZ page, insert the altitude you want into 1R (STEP). A time and distance will display when you are able to make that altitude." },
    { title: "For Drift Down info", Note : "• Engine Out function of FMC, when selected, will display the max drift down altitude and best speed." },
    { title: "To slow in level flight", Note : "• At idle power, requires one mile to lose 10 Kts. of airspeed." }
  ]

  return (
    <ScrollView contentContainerStyle={{flexGrow:1}}>
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
                  <TouchableOpacity onPress={() => navigation.navigate('NoteDetail',{detail:item, Title: item.title})} activeOpacity={0.5} style={{ backgroundColor: '#303071', height: hp('5'), justifyContent: 'center', paddingLeft: 20, marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
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
    </ScrollView>
  )
}

export default Notes