import { View, Text, StatusBar, TouchableOpacity, ScrollView, Image, FlatList, MaskedViewIOS } from 'react-native'
import React from 'react'
import Header from '../../component/Header'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../../constant/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'

const Operational = ({navigation}) => {
  const HEIGHT = StatusBar.currentHeight;
  const data = [
    { title: "Climb for Terrain", des: "AOM Home Page: Departure, Procedures, Climb Speed Determination.*Departing from airports when surrounding terrain or obstacle(s) are a factor!", iamge: require('../../assets/images/airplan.png') },
    { title: "Climb for Terrain", des: "AOM Home Page: Adverse Weather, General (next page), Cold Weather Operations." },
    { title: "Climb for Terrain", des: "AOM Home Page: Adverse Weather, General (next page), Cold Weather Operations." },
    { title: "Climb for Terrain", des: "AOM Home Page: Adverse Weather, General (next page), Cold Weather Operations." }
  ]
  const data2 = [
    { title: "Flight Confidence Check", des: "FOM Home Page Post Flight/RON, maintenance,  FCC/FCF/ ETOPS: Flight Confidence Checks.", iamge: require('../../assets/images/airplan.png') },
    { title: "Climb for Terrain", des: "AOM Home Page: Adverse Weather, General (next page), Cold Weather Operations." },
    { title: "Climb for Terrain", des: "AOM Home Page: Adverse Weather, General (next page), Cold Weather Operations." },
    { title: "Climb for Terrain", des: "AOM Home Page: Adverse Weather, General (next page), Cold Weather Operations." }
  ]
  const data3 = [
    { title: "Noise Abatement Takeoff (NADP 2 & NADP 1)", des: "AOM Home Page: Takeoff, Procedures, Normal Noise Abatement Takeoff.", iamge: require('../../assets/images/airplan.png') },
    { title: "Climb for Terrain", des: "AOM Home Page: Adverse Weather, General (next page), Cold Weather Operations." },
    { title: "Climb for Terrain", des: "AOM Home Page: Adverse Weather, General (next page), Cold Weather Operations." },
    { title: "Climb for Terrain", des: "AOM Home Page: Adverse Weather, General (next page), Cold Weather Operations." }
  ]
  return (
    <View>
      <View style={{ marginTop: HEIGHT + hp('5'), alignSelf: 'center' }}>
        <Header Logo={require('../../assets/images/logo1.png')} profile={require('../../assets/images/profile.png')} btnColor={colors.primary} Nav={navigation}/>
      </View>
      <View style={{ flexDirection: 'row', backgroundColor: colors.primary, width: wp('90'), height: hp('85'), alignSelf: 'center', borderRadius: 20, top: 30 }}>
        <View style={{ padding: 30 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name='arrow-back' color={'gray'} size={50} />
            </TouchableOpacity>
            <Text style={{ fontSize: 24, color: 'white', marginLeft: 20 }}>Operational Information</Text>
          </View>
          <ScrollView style={{ height: hp('65'), marginTop: 20, borderRadius: 10 }}>
            <View style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 30, borderRadius: 10 }}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={require('../../assets/images/airplan.png')} style={{ width: 50, height: 20 }} />
                <Text style={{ color: 'red', fontSize: 20, marginLeft: 10 }}>Bleeds Off Takeoff</Text>
              </View>
              <Text style={{ fontSize: 20, lineHeight: 40 }}>AOM Home Page: Fast Reference Links, Engine Bleed Off Takeoff.</Text>
            </View>

            {/* FLALIST CLIMB OF TERRAIN */}
            <FlatList
              horizontal
              keyExtractor={item => item.id}
              data={data}
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 50 }}
              renderItem={({ item, key }) => {
                return (
                  <View style={{ marginRight: 20, justifyContent: 'flex-end' }}>
                    <View style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 30, borderRadius: 10, width: wp('50') }}>
                      <View style={{ flexDirection: 'row' }}>
                        {item.iamge ?
                          <Image source={item.iamge} style={{ width: 50, height: 20 }} /> :
                          null
                        }
                        <Text style={{ color: 'red', fontSize: 20 }}>{item.title}</Text>
                      </View>
                      <Text style={{ fontSize: 20, lineHeight: 40 }}>{item.des}</Text>
                    </View>
                  </View>
                )
              }}
            />
            <FlatList
              horizontal
              keyExtractor={item => item.id}
              data={data2}
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 50 }}
              renderItem={({ item, key }) => {
                return (
                  <View style={{ marginRight: 20, justifyContent: 'flex-end' }}>
                    <View style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 30, borderRadius: 10, width: wp('50') }}>
                      <View style={{ flexDirection: 'row' }}>
                        {item.iamge ?
                          <Image source={item.iamge} style={{ width: 50, height: 20 }} /> :
                          null
                        }
                        <Text style={{ color: 'red', fontSize: 20 }}>{item.title}</Text>
                      </View>
                      <Text style={{ fontSize: 20, lineHeight: 40 }}>{item.des}</Text>
                    </View>
                  </View>
                )
              }}
            />

            <FlatList
              horizontal
              keyExtractor={item => item.id}
              data={data3}
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 50 }}
              renderItem={({ item, key }) => {
                return (
                  <View style={{ marginRight: 20, justifyContent: 'flex-end' }}>
                    <View style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 30, borderRadius: 10, width: wp('50') }}>
                      <View style={{ flexDirection: 'row',width:wp('40') }}>
                        {item.iamge ?
                          <Image source={item.iamge} style={{ width: 50, height: 20 }} /> :
                          null
                        }
                        <Text style={{ color: 'red', fontSize: 20 }}>{item.title}</Text>
                      </View>
                      <Text style={{ fontSize: 20, lineHeight: 40 }}>{item.des}</Text>
                    </View>
                  </View>
                )
              }}
            />
          </ScrollView>
        </View>
      </View>
    </View>
  )
}

export default Operational