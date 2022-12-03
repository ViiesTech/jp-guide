import { View, Text, StatusBar, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../../component/Header'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../../constant/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'

const Communication = ({navigation}) => {
  const HEIGHT = StatusBar.currentHeight;
  const data = [
    { title: "ACARS", state: "Albuquerque,NM" },
    { title: "Re-establishing \nACARS", state: "Bradley Windsor Locks, CT" },
    { title: "Coded Departure\n Routes (Domestic)", state: "Albuquerque,NM" },
    { title: "Dispatch Frequencies \non the ground", state: "Albuquerque,NM" },
  ]
  return (
    <View>
      <View style={{ marginTop: HEIGHT + hp('5'), alignSelf: 'center' }}>
        <Header Logo={require('../../assets/images/logo1.png')} profile={require('../../assets/images/profile.png')} btnColor={colors.primary} Nav={navigation}/>
      </View>
      <View style={{ flexDirection: 'row', backgroundColor: colors.primary, width: wp('90'), height: hp('85'), alignSelf: 'center', borderRadius: 20, top: 30 }}>
        <View style={{ padding: 30 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Icon name='arrow-back' color={'gray'} size={50} />
            </TouchableOpacity>
            <Text style={{ fontSize: 24, color: 'white', marginLeft: 20 }}>CommunicationsACARS</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <FlatList
              data={data}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, key }) => {
                return (
                  <View style={{ margin: 15}} key={key}>
                    <TouchableOpacity style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 10, padding: 20,height:hp('7'),justifyContent:'center'}}>
                      <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold',textAlign:'center'}}>{item.title}</Text>
                    </TouchableOpacity>
                  </View>
                )
              }}
            />
          </View>
          <View style={{ backgroundColor: 'white', height: hp('65'), marginTop: 20, borderRadius: 10, }}>
            <View style={{ padding: 30}}>
              <Text style={[styles.text]}>• “No Comm Light” ensure the correct frequency is tuned</Text>
              <Text style={[styles.text]}>•   Primary ARINC - 131.55</Text>
              <Text style={[styles.text]}>•   SITA AIRCOM - 131.725</Text>
              <Text style={[styles.text]}>•   If “Voice Only” displayed on CDU, check VHF Comm #3, “DATA” needs to be in active window.</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    lineHeight:50,
    color:'black'
  }
})
export default Communication
