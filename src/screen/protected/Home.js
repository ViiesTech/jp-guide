import { View, Text, StyleSheet, StatusBar, ScrollView, SafeAreaView, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native'
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
import { A, B, C, F, G, H, K, L, M, N, P, R, S, U, V, X, Y } from '../../arrayindex/Alphabet'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';





const Home = ({ navigation }) => {

  const [Search, setSearch] = useState('')
  console.log("Search", Search)

  const [isModalVisible, setModalVisible] = useState(true);
  const [Purchased, setPurchased] = useState(false)
  const [getData, setGetData] = useState()
  const [card, setCard] = useState(false)

  const [showAlert, setShowAlert] = useState(false)
  const [otherToken, setOtherToken] = useState("")

  const UID = auth()?.currentUser?.uid

  const goToPayment = () => {
    setModalVisible(false);
    navigation.navigate('Payment')

  };

  useEffect(() => {
    console.log("Called")
    SaveToken()
    CallData()

  }, [otherToken])


  const ShowAlert = () => {
    setShowAlert(true)
  }

  // const HideAlert = () => {
  //   setShowAlert(false)
  //   firestore()
  //     .collection('Users')
  //     .doc(UID)
  //     .update({
  //       OtherDevice: ""
  //     })
  // }

  // const AcceptPermission = () => {

  //   console.log("Accept token")

  //   setShowAlert(false)
  //   firestore()
  //     .collection('Users')
  //     .doc(UID)
  //     .onSnapshot((doc) => {
  //       // console.log(doc?.data())
  //       if (doc?.data()?.OtherDevice) {
  //         firestore()
  //           .collection("Users")
  //           .doc(UID)
  //           .update({
  //             DeviceToken: doc?.data()?.OtherDevice
  //           }).then(() => {
  //             auth().signOut()
  //           })
  //       }
  //     })
  // }

  const SaveToken = async () => {
    const DevToken = await AsyncStorage.getItem("FMCToken")

    if (DevToken) {
      firestore()
        .collection('Users')
        .doc(UID)
        .onSnapshot((doc) => {
          if (doc?.data().DeviceToken === DevToken) {
            
          }else{
            auth().signOut()
          }
        })
    }
  }


  const CallData = (Aplha) => {




    setCard(true)
    const Temp = []
    if (Aplha === "A" || Search === "A") {
      A.forEach((item) => {
        console.log(",..............", item)
        Temp.push(item)
        // setCard(true)
      })
    } else if (Aplha === "B" || Search === "B") {
      B.forEach((item) => {
        Temp.push(item)
      })
    } else if (Aplha === "C" || Search === "C") {
      C.forEach((item) => {
        Temp.push(item)
      })
    } else if (Aplha === "F" || Search === "F") {
      F.forEach((item) => {
        Temp.push(item)
      })
    } else if (Aplha === "G" || Search === "G") {
      G.forEach((item) => {
        Temp.push(item)
        // setCard(true)

      })
    } else if (Aplha === "H" || Search === "F") {
      H.forEach((item) => {
        Temp.push(item)
      })
    } else if (Aplha === "K" || Search === "K") {
      K.forEach((item) => {
        Temp.push(item)
      })
    } else if (Aplha === "L" || Search === "L") {
      L.forEach((item) => {
        Temp.push(item)
      })
    } else if (Aplha === "M" || Search === "M") {
      M.forEach((item) => {
        Temp.push(item)
      })
    } else if (Aplha === "N" || Search === "N") {
      N.forEach((item) => {
        Temp.push(item)
      })
    } else if (Aplha === "P" || Search === "P") {
      P.forEach((item) => {
        Temp.push(item)
      })
    } else if (Aplha === "R" || Search === "R") {
      R.forEach((item) => {
        Temp.push(item)
      })
    } else if (Aplha === "S" || Search === "S") {
      S.forEach((item) => {
        Temp.push(item)
      })
    } else if (Aplha === "U" || Search === "U") {
      U.forEach((item) => {
        Temp.push(item)
      })
    } else if (Aplha === "V" || Search === "V") {
      V.forEach((item) => {
        Temp.push(item)
      })
    } else if (Aplha === "X" || Search === "X") {
      X.forEach((item) => {
        Temp.push(item)
      })
    } else if (Aplha === "Y" || Search === "Y") {
      Y.forEach((item) => {
        Temp.push(item)
      })
    } else {
      setCard(false)
      return console.log("Nothing Found")
    }

    setGetData(Temp)
  }

  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(UID)
      .onSnapshot((val) => {
        if (val?.exists) {
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
  const alphabet = ["Home", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  const cardDetail = [
    { title: "Airports \nWorldwide", image: require('../../assets/images/card1.png'), color: 'rgba(252, 252, 252, 0.2)', nav: "Detail" },
    { title: "Emergency \nProtocol", image: require('../../assets/images/emergency.png'), color: 'rgba(252, 252, 252, 0.2)', nav: "Emergency" },
    { title: "Operational \nInformation", image: require('../../assets/images/operational.png'), color: 'rgba(252, 252, 252, 0.2)', nav: "Operational" },
    { title: "Maintenance \nInformation", image: require('../../assets/images/setting.png'), color: 'rgba(252, 252, 252, 0.2)', nav: "Maintenances" },
    { title: "Communications \nInformation", image: require('../../assets/images/communication.png'), color: 'rgba(252, 252, 252, 0.2)', nav: "Communication" },
    { title: "General Notes", image: require('../../assets/images/notes.png'), color: 'rgba(252, 252, 252, 0.2)', nav: "Notes" }
  ]

  const RenderItem = () => {

  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, }}>




        <View style={{ marginTop: 20, alignSelf: 'center' }}>
          <Header Logo={require('../../assets/images/logo1.png')} profile={require('../../assets/images/profile.png')} btnColor={colors.primary} Nav={navigation} onchangeText={(txt) => { setSearch(txt) }} value={Search} />
        </View>



        <View style={{ flexDirection: 'row', backgroundColor: colors.primary, width: wp('90'), height: hp('85%'), alignSelf: 'center', borderRadius: 20, top: 30 }}>
          <View style={{ width: wp('10'), alignItems: 'center' }}>
            <Text style={{ fontSize: 20, color: colors.white, alignSelf: 'center', marginTop: 20 }}>Quick find</Text>
            <ScrollView contentContainerStyle={{ flexGrow: 1, width: wp('10'), alignItems: 'center' }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
              {alphabet.filter((val) => {
                if (Search == "") {
                  return val
                } else if (val.toLowerCase().includes(Search.toLowerCase())) {
                  return val
                }
              }).map((item, key) => {
                return (
                  <TouchableOpacity onPress={() => CallData(item)} key={key} style={{ paddingVertical: 20 }}>

                    <Text style={{ fontSize: 18, color: colors.white }}>{item}</Text>
                  </TouchableOpacity>
                )
              })}
            </ScrollView>
          </View>
          <View style={{ width: wp('80'), flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', justifyContent: 'center' }}>
            <View style={{ width: wp('75'), marginTop: 25, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>


              {card == true ?

                getData.filter((val) => {
                  if (Search == "") {
                    return val
                  } else if (val.name.toLowerCase().includes(Search.toLowerCase())) {
                    return val
                  }
                }).map((item, key) => {
                  console.log(item)

                  return (
                    <TouchableOpacity onPress={() => navigation.navigate('PDFText', { pageUrl: item.Page, isSelected : item.name })} style={{ height: 60, width: wp('70%'), backgroundColor: 'rgba(252, 252, 252, 0.2)', borderRadius: 10, marginTop: 20, justifyContent: 'center', paddingHorizontal: 20 }}>
                      <Text style={{ color: 'white' }}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  )
                })

                :
                cardDetail.map((item, key) => {
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



        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Someone is trying to loggin your account"
          message="Do you want to accept the persmission and logout this account ?"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Cancel"
          confirmText="Accept"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            HideAlert()
          }}
          onConfirmPressed={() => {
            // HideAlert()
            AcceptPermission()
          }}
        />
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