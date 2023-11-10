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
import { A, B, C, F, G, H, K, L, M, N, P, R, S, T, U, V, X, Y } from '../../arrayindex/Alphabet'
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
import NetInfo from "@react-native-community/netinfo";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ReactNativeBlobUtil from 'react-native-blob-util'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const Home = ({ navigation }) => {

  //Orientation
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
  const [screenResolution, setScreenResolution] = useState('')

  const [showEulaModal, setShowEULAModal] = useState(true)
  const [ DaysLeft, setDaysLeft] = useState()
  useEffect(() => {
    Orientation.unlockAllOrientations();
  }, [navigation]);

  useEffect(() => {
    checkDarkMode()
    getMyEditFromFirebase()
  }, [])

  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      StatusBar.setHidden(false)
    });
    return unsubscribe

  },[navigation])


  const getMyEditFromFirebase = async () => {


    const Pdf = await AsyncStorage.getItem('OI')


    // console.log("whats in side", Pdf)

    if (Pdf !== null) {

    } else {

      const promise = []
      firestore()
        .collection("Users")
        .doc(UID)
        .collection("pdf")
        .get()
        .then((doc) => {
          console.log("please let me the doc of docs", doc?.docs)


          doc?.docs?.forEach((e) => {
            promise.push(e.data())
          })

        }).then(async () => {

          console.log("please let me know the", promise)

          for (const e of promise) {
            try {
              const response = await ReactNativeBlobUtil
                .config({
                  fileCache: true,
                })
                .fetch('GET', `${e.ImageURL}`, {
                  // Add any necessary headers here
                })

              // Get the downloaded file path
              const filePath = response.path();

              // Assuming 'name' is the property in e that holds the name of the file
              const fileName = e?.name;

              // Save the filePath and fileName pair to AsyncStorage
              await AsyncStorage.setItem(fileName, filePath)


              console.log(`Saved path for file ${fileName}: ${filePath}`);
            } catch (error) {
              console.error('Error downloading file:', error);
            }
          }
        })
        .then(() => {
          const TabsPdf = []
          firestore()
            .collection("TabsPdf")
            .get()
            .then((doc) => {
              doc?.docs?.forEach((e) => {
                TabsPdf.push(e.data())
              })

            }).then(async () => {

              for (const e of TabsPdf) {
                try {
                  const response = await ReactNativeBlobUtil
                    .config({
                      fileCache: true,
                    })
                    .fetch('GET', `${e.PDF}`, {
                      // Add any necessary headers here
                    })

                  // Get the downloaded file path
                  const filePath = response.path();

                  // Assuming 'name' is the property in e that holds the name of the file
                  const fileName = e?.name;

                  // Save the filePath and fileName pair to AsyncStorage
                  await AsyncStorage.setItem(fileName, filePath)


                  console.log(`Saved path for file ${fileName}: ${filePath}`);
                } catch (error) {
                  console.error('Error downloading file:', error);
                }
              }
            })
        })

    }
  }


  const checkDarkMode = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('DarkMode');
      console.log("dark mode ?", jsonValue)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  }

  const checkEulaServiceStatus = () => {
    if (isModalVisible === false) {
      setShowEULAModal(true)

    }

  }

  const color = useSelector(state => state.pdf.Dark)


  const COLORS = {
    WHITE: color === true ? "#000000" : "#FFFFFF",
    Text: color === true ? "#FFFFFF" : "#000000"

  }

  //unccomment after update
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

  const goToPayment = (price) => {
    setModalVisible(false)


    const currentDate = new Date();

    // Add 14 days to the current date
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 14);

    // Format the future date as a string (e.g., "yyyy-mm-dd")
    const formattedFutureDate = futureDate.toISOString().split('T')[0];

    console.log(`Today's date: ${currentDate.toISOString().split('T')[0]}`);
    console.log(`Date 14 days from today: ${formattedFutureDate}`);

    if (price == "free") {


      firestore()
        .collection('Users')
        .doc(UID)
        .update({
          Plan: price,
          Date: new Date(),
          PlanEnded: formattedFutureDate
        }).then(() => {

          setModalVisible(false)

        }).catch((e) => {
          console.log(e)
        })
    } else {

      firestore()
        .collection('Users')
        .doc(UID)
        .update({
          Plan: price

        }).then(() => {

          navigation.navigate('Payment')
        }).catch((e) => {
          console.log(e)
        })

    }

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
        // console.log("allPdf", allPdf);

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
            // auth()?.signOut()
          }
        })
    }
  }


  const CallData = (Aplha) => {
    // console.log("........", Aplha)

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


          if (val.data().Date) {
            const timestamp = new Date(val?.data()?.Date?.seconds * 1000 + val?.data()?.Date?.nanoseconds / 1000000);

            // Use the Date object to format the date
            const formattedDate = timestamp?.toISOString()?.split('T')[0];

            const endDate = new Date(val?.data()?.PlanEnded);

            // Get the current date
            const currentDate = new Date();

            // Calculate the time difference in milliseconds
            const timeDifference = endDate - currentDate;

            // Calculate the number of days left
            const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

            setDaysLeft(daysLeft)
            if (val?.data()?.Plan == "free") {

              if (formattedDate == val?.data().PlanEnded) {

                firestore()
                  .collection('Users')
                  .doc(UID)
                  .update({
                    Expired: true
                  }).then(()=>{
                    setModalVisible(true)
                  })

              } else {
                firestore()
                  .collection('Users')
                  .doc(UID)
                  .update({
                    Expired: false
                  })
                setModalVisible(true)
              }

            }

          }

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
    { name: "INTERNATIONAL SUPPLEMENT", title: "IS", image: require('../../assets/images/emergency.png'), imageBG: require('../../assets/images/sup.png'), nav: "Operational" },
    { name: "COMMUNICATIONS", title: "CM", image: require('../../assets/images/operational.png'), imageBG: require('../../assets/images/com.png'), nav: "Operational" },
    { name: "GENERAL INTERNATIONAL \n INFORMATION", title: "GII", image: require('../../assets/images/genint.png'), imageBG: require('../../assets/images/genint.png'), nav: "Operational" },
    { name: "OPERATIONAL INFORMATION", title: "OI", image: require('../../assets/images/communication.png'), imageBG: require('../../assets/images/Operationals.png'), nav: "Operational" },
    { name: "GENERAL AIRCRAFT NOTES\n AND MAINTENANCE", title: "GANAM", image: require('../../assets/images/notes.png'), imageBG: require('../../assets/images/A:C.png'), nav: "Operational" }
  ]

  const goToTabsPdf = async (item) => {



    await AsyncStorage.getItem(item?.title).then((doc) => {

      if (doc !== null) {
        navigation.navigate(item.nav, { pdfname: doc, title: item?.title })
        console.log("Innnnnn")

      } else {

        console.log("Outtttttt")

        if (item.title === "IS") {


          firestore().collection("Users").doc(UID).collection("pdf").doc(item?.title).get().then((doc) => {

            if (doc.data() !== undefined) {

              navigation.navigate(item.nav, { pdfname: doc?.data()?.ImageURL, title: item?.title })

            } else {
              // getSaveFirestore("IS")
              firestore()
                .collection("TabsPdf")
                .doc('IS')
                .onSnapshot((doc) => {

                  console.log(doc?.data()?.PDF,)
                  navigation.navigate(item.nav, { pdfname: doc?.data()?.PDF, title: 'IS' })

                })
            }

          })





        } else if (item.title === "GANAM") {
          firestore()
            .collection("TabsPdf")
            .doc('GANAM')
            .onSnapshot((doc) => {

              console.log(doc?.data()?.PDF,)
              navigation.navigate(item.nav, { pdfname: doc?.data()?.PDF, title: 'GANAM' })

            })
          // getSaveFirestore("GANAM")


        } else if (item.title === "CM") {
          firestore()
            .collection("TabsPdf")
            .doc('CM')
            .onSnapshot((doc) => {

              console.log(doc?.data()?.PDF,)
              navigation.navigate(item.nav, { pdfname: doc?.data()?.PDF, title: 'CM' })

            })
          // getSaveFirestore("CM")


        } else if (item.title === "GII") {
          firestore()
            .collection("TabsPdf")
            .doc('GII')
            .onSnapshot((doc) => {

              console.log(doc?.data()?.PDF,)
              navigation.navigate(item.nav, { pdfname: doc?.data()?.PDF, title: 'GII' })

            })
          // getSaveFirestore("GII")


        } else if (item.title === "OI") {
          firestore()
            .collection("TabsPdf")
            .doc('OI')
            .onSnapshot((doc) => {

              console.log(doc?.data()?.PDF,)
              navigation.navigate(item.nav, { pdfname: doc?.data()?.PDF, title: 'OI' })

            })
          // getSaveFirestore("OI")
        } else if (item.title === "SEARCH AIRPORTS") {
          navigation.navigate(item.nav)

        } else {

        }


      }

    })


  }

  return (
    <SafeAreaView style={{ flexGrow: 1 }}>

      <OrientationLocker
        orientation={'UNLOCK'}
        onChange={orientation => setScreenResolution(orientation)}
        onDeviceChange={orientation => console.log('onDeviceChange', orientation)}
      />

      <FastImage source={color === true ? require('../../assets/images/hidark.png') : require('../../assets/images/hi.jpeg')} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} resizeMode={'cover'}>
        {/* <ScrollView contentContainerStyle={{ flexGrow: 1 }}> */}

        {/* <View style={{ marginTop: 20, alignSelf: 'center', marginLeft: hp('4%') }}>

            <Image source={require('../../assets/images/profile.png')} style={{ height: 100, width: 100, }} resizeMode='contain' />
          </View> */}

        {/* 
        {
          color === true ? 
          
        <ImageBackground source={require('../../assets/images/boxdarkbg.png')} style={{ flexDirection: 'row',  width: screenWidth * 0.9, alignSelf: 'center', borderRadius: 20, top: 10, marginBottom: 30, height: screenHeight * 0.92,  }} >
          <View style={{ padding: 10, marginLeft: 20, right: screenResolution === "PORTRAIT" ? 0 : -10, }}>

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

            <View style={{ width: screenWidth * 0.76, marginTop: 25, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', }}>


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
                      <Text style={{ color: COLORS.WHITE }}>
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
        </ImageBackground>

        : */}

        <View style={{ flexDirection: 'row', backgroundColor: color === true ? 'rgba(252, 252, 252, 0.1)' : colors.primary, width: screenWidth * 0.9, alignSelf: 'center', borderRadius: 20, top: 10, marginBottom: 30, height: screenHeight * 0.92, borderWidth: 1, borderColor: color === true ? 'white' : colors.primary }}>
          <View style={{ padding: 10, marginLeft: 17, right: screenResolution === "PORTRAIT" ? 0 : -10, }}>

            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} style={{ alignItems: 'center', marginTop: 40 }}>

              <Fontisto
                name={"player-settings"}
                color={'white'}
                size={30}
              />

              <Text style={{ color: 'white', marginTop: 10, fontWeight: 'bold' }}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('SavePdf')} style={{ alignItems: 'center', marginTop: 40, }}>

              {/* <View style={{height:20, width:20, backgroundColor:'red', borderRadius:200, position:'absolute', zIndex:100, right:5, top:-10, alignItems:'center', justifyContent:'center'}}>
                <Text style={{color:'white' , fontWeight:'bold'}}>0</Text>
              </View> */}
              <Fontisto
                name={"plane"}
                color={'white'}
                size={30}
              />

              <Text style={{ color: 'white', marginTop: 10, fontWeight: 'bold', textAlign: 'center' }} >Saved{'\n'}Airports</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => navigation.navigate('Notes')} style={{ alignItems: 'center', marginTop: 40, }}>
              {/* <View style={{height:20, width:20, backgroundColor:'red', borderRadius:200, position:'absolute', zIndex:100, right:5, top:-10, alignItems:'center', justifyContent:'center'}}>
                <Text style={{color:'white' , fontWeight:'bold'}}>0</Text>
              </View> */}
              <SimpleLineIcons
                name={"book-open"}
                color={'white'}
                size={30}
              />

              <Text style={{ color: 'white', marginTop: 10, fontWeight: 'bold', textAlign: 'center' }} >Notes</Text>
            </TouchableOpacity>



          </View>


          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

            <View style={{ width: screenWidth * 0.76, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', }}>


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
                      <Text style={{ color: COLORS.WHITE }}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>

                  )
                })
                :
                cardDetail.map((item, key) => {
                  return (
                    <>
                      <Card screenWidth={screenWidth} screenHeight={screenHeight * 0.27} background_Color={item.color} image={item.image} imageBG={item.imageBG} title={item.name} onPress={() => goToTabsPdf(item)} />
                    </>
                  )
                })}
            </View>
          </View>
        </View>
        {/* }  */}


                {
                  //payment modal  have to uncomment when the thing is done :)
                }
{/* 
        <Modal isVisible={isModalVisible}>
          <View style={{ backgroundColor: COLORS.WHITE, padding: 20, alignSelf: 'center' }}>


            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
              <View style={{ height: 1, width: wp('20%'), backgroundColor: COLORS.Text, marginRight: 10 }} />

              <Text style={{ fontSize: hp('2.5%',), fontWeight: 'bold', }}>Premium</Text>
              <View style={{ height: 1, width: wp('20%'), backgroundColor: COLORS.Text, marginLeft: 10 }} />


            </View>


            <Text style={{alignSelf:'center', fontSize:22, fontWeight:'bold', color:COLORS.Text, marginTop:20}}>{DaysLeft} Days left</Text>

            <View style={{ justifyContent: 'space-around', marginTop: 20, flexDirection: 'row' }}>

              <TouchableOpacity onPress={() => goToPayment("free")} style={{ height: 200, width: 200, backgroundColor: colors.secondery, justifyContent: 'center', borderRadius: 10, alignItems: 'center' }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>Free</Text>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white', marginTop: 5 }}>14 days Trial</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => goToPayment("5.99")} style={{ height: 200, width: 200, backgroundColor: colors.primary, justifyContent: 'center', borderRadius: 10, alignItems: 'center' }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>$5.99</Text>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white', marginTop: 5 }}>(1 Month)</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => goToPayment('70.00')} style={{ height: 200, width: 200, backgroundColor: colors.primary, justifyContent: 'center', borderRadius: 10, alignItems: 'center' }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>$70.00</Text>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white', marginTop: 5 }}>(12 Month)</Text>
              </TouchableOpacity>
            </View>



          </View>
        </Modal> */}





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