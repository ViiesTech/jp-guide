import { View, Text, StyleSheet, StatusBar, ScrollView, SafeAreaView, TouchableOpacity, TextInput, FlatList, Alert, Image, Dimensions } from 'react-native'
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
import DarkMode from '../../component/DarkMode';
import { ImageBackground } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { setAllPdf } from '../../redux/PDFSlice';
import Fontisto from 'react-native-vector-icons/Fontisto'
import Orientation from 'react-native-orientation-locker';
import { OrientationLocker, PORTRAIT, LANDSCAPE, useDeviceOrientationChange, OrientationType } from "react-native-orientation-locker";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FastImage from 'react-native-fast-image'

const Home = ({ navigation }) => {

  //Orientation
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);

  const [screenResolution, setScreenResolution] = useState('')


  console.log('Orientation', screenResolution)

  useEffect(() => {
    const updateDimensions = () => {
      const { width, height } = Dimensions.get('window');
      setScreenWidth(width);
      setScreenHeight(height);
    };

    Orientation.addOrientationListener(updateDimensions);

    return () => {
      Orientation.removeOrientationListener(updateDimensions);
    };
  }, []);

  useEffect(() => {

    const updateDimensions = () => {
      const { width, height } = Dimensions.get('window');
      setScreenWidth(width);
      setScreenHeight(height);
    };

    Dimensions.addEventListener('change', updateDimensions);

    return () => {
      Dimensions.removeEventListener('change', updateDimensions);
    };
  }, []);

  //sadjansjkdnaskjndjsakndjksankdnaskjndjnsajdnaskjndjsankjdnasjndkasjndksandnasjndjkasndjasnda____________

  useEffect(() => {
    getCurrentOrientation()
  }, [])

  const getCurrentOrientation = () => {
    const currentOrientation = Orientation.getOrientation((err, orientation) => {
      if (err) {
        console.log('Error getting current orientation:', setScreenResolution(err));
      } else {
        console.log('Current orientation:', setScreenResolution(orientation));
      }
    });

    console.log("current org", currentOrientation)
  };




  //************************* getting current orientation */

  const [Search, setSearch] = useState('')

  const dispatch = useDispatch()

  const [isModalVisible, setModalVisible] = useState(true);
  const [Purchased, setPurchased] = useState(false)
  const [getData, setGetData] = useState()
  const [card, setCard] = useState(false)

  const [showAlert, setShowAlert] = useState(false)
  const [otherToken, setOtherToken] = useState("")
  const [ImageUrl, setImageUrl] = useState("")

  const UID = auth()?.currentUser?.uid

  const goToPayment = () => {
    setModalVisible(false);
    navigation.navigate('Payment')

  };

  useEffect(() => {
    console.log("Called")
    getFirebasePDF()
    SaveToken()
    CallData()
    pleaseGetData()

  }, [otherToken])


  const getFirebasePDF = () => {
    const Temp = []
    firestore()
      .collection("PDF")
      .get()
      .then((querySnapshot) => {
        const allPdf = querySnapshot.docs.map((doc) => doc.data());
        console.log("allPdf", allPdf);

        const sort = allPdf.sort((a, b) => a.name.localeCompare(b.name));


        dispatch(setAllPdf(sort));

      })

  }


  const ShowAlert = () => {
    setShowAlert(true)
  }

  const pleaseGetData = () => {
    firestore()
      .collection("Users")
      .doc(UID)
      .onSnapshot((doc) => {
        // console.log(doc.data().Image)
        setImageUrl(doc?.data()?.Image)
      })
  }

  const SaveToken = async () => {
    const DevToken = await AsyncStorage.getItem("FMCToken")

    if (DevToken) {
      firestore()
        .collection('Users')
        .doc(UID)
        .onSnapshot((doc) => {
          if (doc?.data()?.DeviceToken === DevToken) {

          } else {
            auth().signOut()
          }
        })
    }
  }


  const CallData = (Aplha) => {


    console.log("........", Aplha)

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
    { name: "SEARCH AIRPORTS", title: "SEARCH AIRPORTS", image: require('../../assets/images/card1.png'), imageBG: require('../../assets/images/searchair.png'), nav: "Detail" },
    { name: "INTERNATIONAL SUPPLEMENT", title: "INTERNATIONAL SUPPLEMENT", image: require('../../assets/images/emergency.png'), imageBG: require('../../assets/images/sup.png'), nav: "Operational" },
    { name: "COMMUNICATIONS", title: "COMMUNICATIONS", image: require('../../assets/images/operational.png'), imageBG: require('../../assets/images/com.png'), nav: "Operational" },
    { name: "GENERAL INTERNATIONAL \n INFORMATION", title: "GENERAL INTERNATIONAL INFORMATION", image: require('../../assets/images/genint.png'), imageBG: require('../../assets/images/genint.png'), nav: "Operational" },
    { name: "OPERATIONAL INFORMATION", title: "OPERATIONAL INFORMATION", image: require('../../assets/images/communication.png'), imageBG: require('../../assets/images/Operationals.png'), nav: "Operational" },
    { name: "GENERAL AIRCRAFT NOTES\n AND MAINTENANCE", title: "GENERAL AIRCRAFT NOTES AND MAINTENANCE", image: require('../../assets/images/notes.png'), imageBG: require('../../assets/images/A:C.png'), nav: "Operational" }
  ]


  return (
    <SafeAreaView style={{ flexGrow: 1 }}>

      <OrientationLocker
        orientation={'ALL_ORIENTATIONS_BUT_UPSIDE_DOWN'}
        onChange={orientation => setScreenResolution(orientation)}
        onDeviceChange={orientation => console.log('onDeviceChange', orientation)}
      />

      <FastImage source={require('../../assets/images/hi.jpeg')} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} resizeMode={'cover'}>
        {/* <ScrollView contentContainerStyle={{ flexGrow: 1 }}> */}

        {/* <View style={{ marginTop: 20, alignSelf: 'center', marginLeft: hp('4%') }}>

            <Image source={require('../../assets/images/profile.png')} style={{ height: 100, width: 100, }} resizeMode='contain' />
          </View> */}

        <View style={{ flexDirection: 'row', backgroundColor: colors.primary, width: screenWidth * 0.9, alignSelf: 'center', borderRadius: 20, top: 10, marginBottom: 30, height: screenHeight * 0.92 }}>
          <View style={{ padding: 10, marginLeft: 20, right: screenResolution === "PORTRAIT" ? 0 : -10 ,}}>

            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} style={{ alignItems: 'center', marginTop: 40 }}>

              <Fontisto
                name={"player-settings"}
                color={'white'}
                size={30}
              />

              <Text style={{ color: 'white', marginTop: 10, fontWeight: 'bold' }}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('SavePdf')} style={{ alignItems: 'center', marginTop: 40, }}>

              <Fontisto
                name={"plane"}
                color={'white'}
                size={30}
              />

              <Text style={{ color: 'white', marginTop: 10, fontWeight: 'bold', textAlign: 'center' }} >Saved{'\n'}Airports</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => navigation.navigate('Notes')} style={{ alignItems: 'center', marginTop: 40, }}>

              <SimpleLineIcons
                name={"book-open"}
                color={'white'}
                size={30}
              />

              <Text style={{ color: 'white', marginTop: 10, fontWeight: 'bold', textAlign: 'center' }} >Notes</Text>
            </TouchableOpacity>



          </View>


          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', justifyContent: 'center', }}>

            <View style={{ width: screenWidth * 0.76, marginTop: 25, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',}}>


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
                    <TouchableOpacity onPress={() => navigation.navigate('PDFText', { pageUrl: item.Page, isSelected: item.name, pdfname: item.name })} style={{ height: 60, width: wp('70%'), backgroundColor: 'rgba(252, 252, 252, 0.2)', borderRadius: 10, marginTop: 20, justifyContent: 'center', paddingHorizontal: 20 }}>
                      <Text style={{ color: 'white' }}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>

                  )
                })

                :
                cardDetail.map((item, key) => {
                  return (
                    <>
                      <Card screenWidth={screenWidth} screenHeight={screenHeight * 0.27} background_Color={item.color} image={item.image} imageBG={item.imageBG} title={item.name} onPress={() => navigation.navigate(item.nav, { pdfname: item.title })} />
                    </>
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
        {/* </ScrollView> */}
      </FastImage>
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