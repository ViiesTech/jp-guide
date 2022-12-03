import { View, Text, StyleSheet, StatusBar, ScrollView, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../component/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import TextInputComp from '../../component/TextInputComp';
import colors from '../../constant/colors';
import Card from '../../component/Card';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { StripeProvider } from '@stripe/stripe-react-native';
import Modal from "react-native-modal";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';




const Home = ({ navigation }) => {


  const [isModalVisible, setModalVisible] = useState(true);
  const [Purchased, setPurchased] = useState(false)
  const [getData, setGetData] = useState('')

  const UID = auth().currentUser.uid

 

  // const CallData = async() => {
  //   const config = {
  //     method: 'get',
  //     url: 'https://jp-guide-api-default-rtdb.firebaseio.com/.json',
  //     headers: {}
  //   };
  //   // console.log(config)
  //   axios(config)
  //     .then(function (response) {
  //       // console.log("Worked",JSON.stringify(response.data));
  //       setGetData(JSON.stringify(response.data))
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }


  const goToPayment = () => {


    setModalVisible(false);
    navigation.navigate('Payment')

  };

  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(UID)
      .onSnapshot((val) => {
        if (val?.exists) {
          // console.log("sdbsadvs......")
          // console.log(val?.data().Buy)
          if (val?.data()?.Buy) {
            console.log("hiiiiii")
            setPurchased(true)
            setModalVisible(false)
            navigation.navigate('Home')
          }
        } else {
          setModalVisible(true);
        }
      })
  }, [])





  const HEIGHT = StatusBar.currentHeight;
  const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  const cardDetail = [
    { title: "Airports \nWorldwide", image: require('../../assets/images/card1.png'), color: 'rgba(252, 252, 252, 0.2)', nav: "Detail" },
    { title: "Emergency \nProtocol", image: require('../../assets/images/emergency.png'), color: 'rgba(252, 252, 252, 0.2)', nav: "Emergency" },
    { title: "Operational \nInformation", image: require('../../assets/images/operational.png'), color: 'rgba(252, 252, 252, 0.2)', nav: "Operational" },
    { title: "Maintenance \nInformation", image: require('../../assets/images/setting.png'), color: 'rgba(252, 252, 252, 0.2)', nav: "Maintenances" },
    { title: "Communications \nInformation", image: require('../../assets/images/communication.png'), color: 'rgba(252, 252, 252, 0.2)', nav: "Communication" },
    { title: "General Notes", image: require('../../assets/images/notes.png'), color: 'rgba(252, 252, 252, 0.2)', nav: "Notes" }
  ]
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, }}>
        {/* {
          console.log("getDaatatatat..................././././././././/././????//,.,.,.,.,mm.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,",getData.PAGES)
        } */}
        
        {/* <TouchableOpacity onPress={() => CallData()} style={{ height: 60, width: wp('30%'), backgroundColor: colors.primary, alignSelf: 'flex-end', marginTop: 10, borderTopLeftRadius: 1000, borderBottomLeftRadius: 1000, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
          <Ionicons name='ios-pricetags' color={"yellow"} size={25} />
          <Text style={{ color: colors.white, fontSize: hp('2%'), fontWeight: 'bold', marginLeft: 10 }}>Premium</Text>
        </TouchableOpacity> */}
        <View style={{ marginTop: 20, alignSelf: 'center' }}>
          <Header Logo={require('../../assets/images/logo1.png')} profile={require('../../assets/images/profile.png')} btnColor={colors.primary} Nav={navigation} />
        </View>
        {/* Body start here */}
        <View style={{ flexDirection: 'row', backgroundColor: colors.primary, width: wp('90'), height: hp('85%'), alignSelf: 'center', borderRadius: 20, top: 30 }}>
          <View style={{ width: wp('10'), alignItems: 'center' }}>
            <Text style={{ fontSize: 20, color: colors.white, alignSelf: 'center', marginTop: 20 }}>Quick find</Text>
            <ScrollView contentContainerStyle={{ flexGrow: 1, width: wp('10'), alignItems: 'center' }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
              {alphabet.map((item, key) => {
                return (
                  <TouchableOpacity onPress={()=>console.log("Pressed",item)}  key={key} style={{ paddingVertical: 20 }}>
                 
                    <Text style={{ fontSize: 18, color: colors.white }}>{item}</Text>
                  </TouchableOpacity>
                )
              })}
            </ScrollView>
          </View>
          <View style={{ width: wp('80'), flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', justifyContent: 'center' }}>
            <View style={{ width: wp('75'), marginTop: 25, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
              {cardDetail.map((item, key) => {
                return (
                  <Card background_Color={item.color} image={item.image} title={item.title} onPress={() => navigation.navigate(item.nav)} />
                )
              })}
            </View>
          </View>
        </View>
        <Modal isVisible={isModalVisible}>
          <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 20, }}>

            <Text style={{ fontSize: hp('2.5%',), fontWeight: 'bold', alignSelf: 'center' }}>Buy Now</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 20 }}>

              <TouchableOpacity onPress={() => goToPayment()} style={{ height: 100, width: wp('39%'), backgroundColor: colors.secondery, alignItems: 'center', justifyContent: 'center', borderRadius: 10, }}>
                <Text style={{ fontSize: hp('2%'), fontWeight: 'bold', color: "white" }}>Monthly</Text>
                <Text style={{ fontSize: hp('2%'), fontWeight: 'bold', color: "white" }}>$9.99</Text>

              </TouchableOpacity>

              <TouchableOpacity onPress={() => goToPayment()} style={{ height: 100, width: wp('39%'), backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                <Text style={{ fontSize: hp('2%'), fontWeight: 'bold', color: "white" }}>Yearly</Text>
                <Text style={{ fontSize: hp('2%'), fontWeight: 'bold', color: "white", marginTop: 10 }}>$99.99</Text>
              </TouchableOpacity>
            </View>



          </View>
        </Modal>

      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
})
export default Home