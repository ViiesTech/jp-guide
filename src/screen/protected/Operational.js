import { View, Text, StatusBar, TouchableOpacity, ScrollView, Image, FlatList, StyleSheet, ActivityIndicator, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import Header from '../../component/Header'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../../constant/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Comment from '../../component/Comment'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import ShowingComments from '../../component/ShowingComments'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { DocumentView, RNPdftron, PDFViewCtrl, Config } from "react-native-pdftron";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Orientation from 'react-native-orientation-locker';
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Operational = ({ route, navigation }) => {
  const [Loader, setLoader] = useState(true)


  const _viewer = useRef()

  const HEIGHT = StatusBar.currentHeight;

  // const [getImage, setGetImage] = useState("")

  const { pdfname, title } = route.params


  const color = useSelector(state => state.pdf.Dark)


  const COLORS = {
    WHITE: color === true ? "#000000" : "#FFFFFF",
    Text: color === true ? "#FFFFFF" : "#000000"

  }


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


  // useEffect(() => {

  //   // if (pdfname !== null) {
  //   //   console.log("We have the saved pdf!")
  //   // } else {



  //     if (pdfname === "INTERNATIONAL SUPPLEMENT") {

  //       getSaveFirestore("IS")
  //     } else if (pdfname === "GENERAL AIRCRAFT NOTES AND MAINTENANCE") {

  //       getSaveFirestore("GANAM")
  //     } else if (pdfname === "COMMUNICATIONS") {

  //       getSaveFirestore("CM")
  //     } else if (pdfname === "GENERAL INTERNATIONAL INFORMATION") {

  //       getSaveFirestore("GII")
  //     } else if (pdfname === "OPERATIONAL INFORMATION") {

  //       getSaveFirestore("OI")
  //     } else {

  //     }

  //   // }



  // }, [])



  // const getSaveFirestore = (nick) => {



  //   firestore()
  //     .collection("TabsPdf")
  //     .doc(nick)
  //     .onSnapshot((doc) => {

  //       setGetImage(doc?.data()?.PDF)
  //     })
  // }


  const saveDoc = () => {

    // console.log( "this.view",  _viewer)


    _viewer.current.saveDocument().then(async (filePath) => {


      await AsyncStorage.setItem(`${title}`, filePath).then(() => {
        navigation.goBack()
      })
    });

  }

  const SetMode = () => {

    console.log(COLORS.Text)


    if (color === true) {

      _viewer.current.setColorPostProcessMode(Config.ColorPostProcessMode.NightMode);
    } else {
      _viewer.current.setColorPostProcessMode(Config.ColorPostProcessMode.None);

    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: COLORS.WHITE }}>
      <View style={{ alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: screenWidth * 0.9, marginTop: 10, backgroundColor: COLORS.WHITE }}>

        {
          Loader === true ?

            <View>
              <ActivityIndicator size={25} color={COLORS.Text} />
              <Text style={{color:COLORS.Text}}>Saving</Text>
            </View>
            :
            <TouchableOpacity onPress={() => saveDoc()} style={{ alignItems: 'center', justifyContent: 'center' , }}>

              <AntDesign
                name='back'
                size={35}
                color={COLORS.Text}
              />
              <Text style={{ color: COLORS.Text }}>Return to Home</Text>
            </TouchableOpacity>
        }



        <Image source={color === true ? require('../../assets/images/logodark.png') : require('../../assets/images/profile.png')} style={{ height: 100, width: 100 }} resizeMode='contain' />

        <View style={{ height: 40, width: wp('10%'), }} />
      </View>


      <DocumentView

        document={pdfname}
        ref={_viewer}
        onLoadComplete={(path) => {
          console.log('The document has finished loading:', path);
          SetMode()
          setLoader(false)
        }}
        //
        onDocumentError={(error) => {
          console.log('Error occured during document opening:', error);
          setLoader(false)
        }}

        onError={(error) => {
          console.log('Error occured during document opening:', error);
          setLoader(false)
        }}

        bottomToolbarEnabled={false}

        showLeadingNavButton={true}
        //
        followSystemDarkMode={false}
        forceAppTheme={color === true ? Config.ThemeOptions.ThemeDark : Config.ThemeOptions.ThemeLight}
        autoSaveEnabled={true}
        hideTopAppNavBar={true}
        style={{ height: hp('100%'), width: screenWidth }}

      />



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