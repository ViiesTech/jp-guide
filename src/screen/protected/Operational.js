import { View, Text, StatusBar, TouchableOpacity, ScrollView, Image, FlatList, StyleSheet, ActivityIndicator, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from '../../component/Header'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../../constant/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Comment from '../../component/Comment'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import ShowingComments from '../../component/ShowingComments'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { DocumentView, RNPdftron, PDFViewCtrl } from "react-native-pdftron";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Orientation from 'react-native-orientation-locker';

const Operational = ({ route, navigation }) => {
  const HEIGHT = StatusBar.currentHeight;

  const [getImage, setGetImage] = useState("")

  const { pdfname } = route.params

  console.log(pdfname)
 //Orientation
 const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
 const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);

 const [screenResolution, setScreenResolution] = useState('')

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

  // const data = [
  //   { title: "Climb for Terrain", des: "Location Diagram: AOM Home Page: Aircraft General, Emergency Equipment: Location Diagrams.", iamge: require('../../assets/images/airplan.png') },
  //   { title: "Cold Weather Operations", des: "AOM Home Page: Adverse Weather, General (next page), Cold Weather Operations." },
  //   // { title: "Climb for Terrain", des: "AOM Home Page: Adverse Weather, General (next page), Cold Weather Operations." },
  //   // { title: "Climb for Terrain", des: "AOM Home Page: Adverse Weather, General (next page), Cold Weather Operations." }
  // ]
  // const data2 = [
  //   { title: "Emergency Equipment", des: "Location Diagram: AOM Home Page: Aircraft General, Emergency Equipment: Location Diagrams.", iamge: require('../../assets/images/airplan.png') },
  //   { title: "Threat Levels", des: "FOM Home Page: Fast Reference Links, Threat Levels", iamge: require('../../assets/images/airplan.png') },
  //   // { title: "Climb for Terrain", des: "AOM Home Page: Adverse Weather, General (next page), Cold Weather Operations." },
  //   // { title: "Climb for Terrain", des: "AOM Home Page: Adverse Weather, General (next page), Cold Weather Operations." }
  // ]
  // const data3 = [
  //   { title: "Flight Confidence Check", des: "FOM Home Page: Post Flight/RON, Maintenance, FCC/FCF/ ETOPS: Flight Confidence Checks.", iamge: require('../../assets/images/airplan.png') },
  //   { title: "FO’s with less than 100 hours", des: "FOM Home Page: Qualifications/Limitations (next page), First Officer With Less Than 100 Hours." },
  //   { title: "Revised Mandatory Face Mask PA", des: "Comply365: My Publications, COVID-19 Guidance and Info., Company Guidance & Information, Revised Mandatory Face Mask PA." },
  //   // { title: "Climb for Terrain", des: "AOM Home Page: Adverse Weather, General (next page), Cold Weather Operations." }
  // ]

  // const data4 = [
  //   { title: "Noise Abatement Takeoff (NADP 2 & NADP 1)", des: "AOM Home Page: Takeoff, Procedures, Normal/Noise Abatement Takeoff.", iamge: require('../../assets/images/airplan.png') },
  //   { title: "Pay and Credit", des: "FOM Home Page: Preflight, General, Delays (next page), Ready for Departure (RFD)." },
  //   { title: "Required Reports", des: "FOM Home Page: Fast Reference Links, Required Reports" },
  //   { title: "Sabre/DECS entries", des: "FOM Home Page: Additional Chapters, Sabre/DECS" }
  // ]

  // const [commentText, onCommentText] = useState("")
  // const [Comments, getComment] = useState("")

  // useEffect(() => {
  //   FetchComment()
  // }, [])

  // const sendComment = () => {

  //   if (commentText !== "") {
  //     firestore()
  //       .collection('Users')
  //       .doc(UID)
  //       .get()
  //       .then((info) => {
  //         firestore()
  //           .collection('Comments')
  //           .doc("Operation")
  //           .collection("Comments")
  //           .add({
  //             name: info?.data()?.username,
  //             Comment: commentText,
  //             UID: UID,
  //             CreatedAt: Math.floor(Date.now() / 1000)
  //           }, {
  //             merge: true
  //           })
  //       }).then(() => {
  //         onCommentText("")
  //       })


  //   }

  // }


  // const FetchComment = () => {

  //   firestore()
  //     .collection('Comments')
  //     .doc("Operation")
  //     .collection("Comments")
  //     .orderBy('CreatedAt', 'desc')
  //     .onSnapshot((doc) => {
  //       const Temp = []
  //       doc?.docs?.map((tnt) => {
  //         Temp.push(tnt)
  //       })
  //       getComment(Temp)
  //     })
  // }

  // const onDeleteComment = (chatID) => {

  //   firestore()
  //     .collection('Comments')
  //     .doc("Operation")
  //     .collection("Comments")
  //     .doc(chatID)
  //     .delete()
  // }


  useEffect(() => {

    if (pdfname === "INTERNATIONAL SUPPLEMENT") {

      getSaveFirestore("IS")
    } else if (pdfname === "GENERAL AIRCRAFT NOTES AND MAINTENANCE") {

      getSaveFirestore("GANAM")
    } else if (pdfname === "COMMUNICATIONS") {

      getSaveFirestore("CM")
    } else if (pdfname === "GENERAL INTERNATIONAL INFORMATION") {

      getSaveFirestore("GII")
    } else if (pdfname === "OPERATIONAL INFORMATION") {

      getSaveFirestore("OI")
    } else {

    }



  }, [])



  const getSaveFirestore = (nick) => {



    firestore()
      .collection("TabsPdf")
      .doc(nick)
      .onSnapshot((doc) => {

        setGetImage(doc?.data()?.PDF)
      })
  }


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ alignSelf: 'center', flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between', width: screenWidth * 0.9, marginTop:10  }}>

        <TouchableOpacity onPress={()=> navigation.goBack()} style={{ alignItems: 'center', justifyContent:'center' }}>

          <AntDesign
            name='back'
            size={35}
            color={'black'}
          />
          <Text style={{ color: 'black' }}>Return to Home</Text>
        </TouchableOpacity>
        <Image source={require('../../assets/images/profile.png')} style={{ height: 100, width: 100 }} resizeMode='contain' />

        <View style={{ height: 10, width: 10 }} />
      </View>

      {
        getImage ?
          <DocumentView
            source={getImage}

            style={{ 
              height: hp('100%'),
              alignSelf:'center',
            width: screenWidth}} />
          :
          <ActivityIndicator size={'large'} color={'black'} />
      }


    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {

    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  pdf: {

    height: hp('100%'),
    width: wp('100%')
  }
});


export default Operational