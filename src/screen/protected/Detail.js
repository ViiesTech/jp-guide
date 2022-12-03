import { View, Text, StatusBar, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../../component/Header'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../../constant/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'

const Detail = ({navigation}) => {
  const HEIGHT = StatusBar.currentHeight;
  const data = [
    { title: "ABQ", state: "Albuquerque,NM" },
    { title: "AUS", state: "Bradley Windsor Locks, CT" },
    { title: "ATL", state: "Albuquerque,NM" },
    { title: "BDL", state: "Albuquerque,NM" },
    { title: "BNA", state: "Albuquerque,NM" },
    { title: "BOS", state: "Albuquerque,NM" },
    { title: "BWi", state: "Albuquerque,NM" },
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
            <Text style={{ fontSize: 24, color: 'white', marginLeft: 20 }}>Airports Worldwide</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <FlatList
              data={data}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, key }) => {
                return (
                  <View style={{ margin: 15 }} key={key}>
                    <TouchableOpacity style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 10, padding: 20 }}>
                      <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>{item.title}</Text>
                      <Text style={{ fontSize: 18, color: 'white' }}>{item.state}</Text>
                    </TouchableOpacity>
                  </View>
                )
              }}
            />
          </View>
          <View style={{ backgroundColor: 'white', height: hp('65'), marginTop: 20, borderRadius: 10, }}>
            <View style={{ padding: 30 }}>
              <Text style={[styles.text]}>ABQ - Albuqerque</Text>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#000000',marginVertical:10 }}>(Elev. 5355’) EO’s Variable</Text>
              <Text style={{lineHeight:35}}>
                <Text style={[{color:'red'},styles.text]}>Engine Failure:</Text> <Text style={styles.text}>procedures for takeoff & missed app., Rwys. 08, 26 & 03. Consider climb
                to 8000’ based on MA altitude.</Text>
              </Text>
            </View>
          </View>
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
export default Detail