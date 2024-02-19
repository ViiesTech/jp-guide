import { View, Text, StatusBar, TouchableOpacity, ScrollView, Image, FlatList, StyleSheet, ActivityIndicator, Dimensions , Linking} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import Header from '../../component/Header'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../../constant/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Comment from '../../component/Comment'
import auth from '@react-native-firebase/auth'
import firestore, { firebase } from '@react-native-firebase/firestore';
import ShowingComments from '../../component/ShowingComments'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { DocumentView, RNPdftron, PDFViewCtrl, Config } from "react-native-pdftron";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Orientation from 'react-native-orientation-locker';
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
import storage from '@react-native-firebase/storage';
import NetInfo from "@react-native-community/netinfo";
import ReactNativeBlobUtil from 'react-native-blob-util'

const Operational = ({ route, navigation }) => {
  const [Loader, setLoader] = useState(true)

  //PDf Edited.......
  const [isEditPdf, setEditPdf] = useState(false);
  const [ShowAlert, setShowAlert] = useState(false);
  const [isPdfUpdated, setPdfUpdated] = useState(false);

  const [NewUpdatedPdf, setNewUpdatedPdf] = useState("")
  const [isPdfUpdateLoading, setPdfUpdateLoading] = useState(false)
  const [PdfUpdateAlert, setShowPdfUpdateAlert] = useState(false)

  const UID = auth()?.currentUser?.uid
  const _viewer = useRef()

  const HEIGHT = StatusBar.currentHeight;

  // const [getImage, setGetImage] = useState("")

  const { pdfname, title } = route.params


  console.log("title", title, pdfname, "sdasjdnsajdnaskjnjk")


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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      AnyUpdate()
    });

    return unsubscribe
  }, [navigation])

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


  // const saveDoc = () => {

  //   // console.log( "this.view",  _viewer)


  //   _viewer.current.saveDocument().then(async (filePath) => {


  //     await AsyncStorage.setItem(`${title}`, filePath).then(() => {
  //       navigation.goBack()
  //     })
  //   });

  // }


  const AnyUpdate = () => {

    // console.warn(title)

    firestore()
      .collection("TabsPdf")
      .doc(`${title}`)
      .get()
      .then((querySnapshot) => {
        // console.log("Document ID:", querySnapshot?.data().UpdateDownloaded)
        const QueryExist = querySnapshot?.data()?.UpdateDownloaded?.includes(UID)
        console.log("AnyUpdate", QueryExist)

        if (QueryExist == true) {
          setPdfUpdated(true)
        } else {
          setPdfUpdated(false)
        }
      })
      .catch((error) => {
        console.error("Error querying Firestore: ", error);
      });
  }

  const UpdatePdf = () => {
    setPdfUpdateLoading(true)

    firestore()
      .collection("TabsPdf")
      .doc(`${title}`)
      .update({
        UpdateDownloaded: firestore?.FieldValue?.arrayUnion(UID),

      }).then((doc) => {
        DownloadNewUpdatedPDF()

        console.log("Success")
      }).catch((error) => {
        console.log(error)
      })

  }

  const DownloadNewUpdatedPDF = () => {

    firestore()
      .collection("TabsPdf")
      .doc(title)
      .get()
      .then(async (doc) => {
        const pdfUrl = doc?.data()?.PDF
        const name = doc?.data()?.name

        try {
          const response = await ReactNativeBlobUtil
            .config({
              fileCache: true,
            })
            .fetch('GET', `${pdfUrl}`, {
              // Add any necessary headers here
            })

          // Get the downloaded file path
          const filePath = response.path();

          // Assuming 'name' is the property in e that holds the name of the file
          const fileName = name;

          // Save the filePath and fileName pair to AsyncStorage
          await AsyncStorage.setItem(fileName, filePath);

          setNewUpdatedPdf(filePath)

          console.log(`Saved path for file ${fileName}: ${filePath}`);
        } catch (error) {
          console.error('Error downloading file:', error);
          setPdfUpdateLoading(false)

        }
      }).then(() => {
        AnyUpdate()
        setPdfUpdateLoading(false)
        setShowPdfUpdateAlert(false)

      })
  }


  const SetMode = () => {

    console.log(COLORS.Text)
    if (color === true) {

      _viewer.current.setColorPostProcessMode(Config.ColorPostProcessMode.NightMode);
    } else {
      _viewer.current.setColorPostProcessMode(Config.ColorPostProcessMode.None);

    }
  }


  const GoingBack = () => {

    if (isEditPdf === true) {
      setShowAlert(true)
    } else {
      navigation.navigate('Home')
    }

  }

  //this function called on save pdf
  const savePdfToFirestoreInUserCollection = () => {

    console.warn("...........iniininiiininiininiininininiiin.,.,.,.,.")
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        _viewer.current.saveDocument().then(async (filePath) => {
          // console.log("file path", filePath)

          await AsyncStorage.setItem(`${title}`, filePath).then(async () => {



            const rand = Math.floor(Math.random() * 1000000000);
            await storage().ref(`${rand}`).putFile(filePath);
            await storage().ref(`${rand}`).getDownloadURL().then((pdfDownloadedUrl) => {

              firestore()
                .collection("Users")
                .doc(UID)
                .collection("pdf")
                .doc(title)
                .set({
                  "ImageURL": pdfDownloadedUrl,
                  "name": title
                }).then(() => {
                  navigation.navigate("Home")
                  setLoader(false)
                  setShowAlert(false)
                })
            })


          })
        })

      } else {
        _viewer.current.saveDocument().then(async (filePath) => {
          // console.log("file path", filePath)

          await AsyncStorage.setItem(`${title}`, filePath).then(async () => {
            navigation.navigate("Home")
          })
        })
      }

    })
    setLoader(true)

  }







  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: COLORS.WHITE }}>
      <View style={{ alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: screenWidth * 0.9, marginTop: 10, backgroundColor: COLORS.WHITE }}>


        <TouchableOpacity onPress={() => GoingBack()} style={{ alignItems: 'center', justifyContent: 'center', }}>

          <AntDesign
            name='back'
            size={35}
            color={COLORS.Text}
          />
          <Text style={{ color: COLORS.Text }}>Return to Home</Text>
        </TouchableOpacity>




        <Image source={color === true ? require('../../assets/images/logodark.png') : require('../../assets/images/profile.png')} style={{ height: 100, width: 100 }} resizeMode='contain' />


        {
          isPdfUpdated === false ?

            <View style={{marginTop:20, flexDirection:'row'}}>

              <TouchableOpacity onPress={() => {
                const websiteURL = 'https://demoserver.digital/JP-Guide/feedback/';
                Linking.openURL(websiteURL).catch((err) => console.error('An error occurred', err));
              }} style={{ height: 50, backgroundColor: colors.primary, borderRadius: 10, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5 }}>
                <Text style={{ color: "#FFFFFF", textAlign: 'center', fontWeight: 'bold' }}>Submit Feedback</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => UpdatePdf()} style={{ backgroundColor: COLORS?.Text, borderRadius: 10, paddingHorizontal: 5, marginLeft:10, alignItems:'center', justifyContent:'center' }}>
                <Text style={{ color: COLORS?.WHITE }}>{isPdfUpdateLoading == true ? <ActivityIndicator size={'small'} color={COLORS.WHITE} /> : "Update"}</Text>
              </TouchableOpacity>
            </View>
            :
            <View style={{ height: 40, width: wp('10%'), }} />
        }
      </View>


      <DocumentView

        document={NewUpdatedPdf ? NewUpdatedPdf : pdfname}
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


        onExportAnnotationCommand={({ action, xfdfCommand, annotations }) => {
          console.log('Annotation edit action is', action);

          setEditPdf(true)
          // console.log('The exported xfdfCommand is', xfdfCommand);

        }}



        bottomToolbarEnabled={false}

        showLeadingNavButton={true}
        //
        followSystemDarkMode={false}
        forceAppTheme={color === true ? Config.ThemeOptions.ThemeDark : Config.ThemeOptions.ThemeLight}
        autoSaveEnabled={true}

        initialToolbar={Config.DefaultToolbars.Annotate}

        hideDefaultAnnotationToolbars={[
          Config.DefaultToolbars.FillAndSign,
          Config.DefaultToolbars.PrepareForm,
          Config.DefaultToolbars.Insert,
          Config.DefaultToolbars.Favorite,
          Config.DefaultToolbars.Measure,
          Config.DefaultToolbars.Redaction,
        ]}

        disabledElements={[
          Config.Buttons.searchButton,
          Config.Buttons.listsButton,
          Config.Buttons.moreItemsButton,
          Config.Buttons.addPageButton,
          Config.Buttons.InsertBlankPage,
        ]}

        hideThumbnailsViewItems={[
          Config.ThumbnailsViewItem.DeletePages,
          Config.ThumbnailsViewItem.ExportPages,
          Config.ThumbnailsViewItem.RotatePages,
          Config.ThumbnailsViewItem.InsertBlankPage,
          Config.ThumbnailsViewItem.InsertFromPhoto,
          Config.ThumbnailsViewItem.InsertFromDocument,
          Config.ThumbnailsViewItem.InsertFromScanner,
          Config.ThumbnailsViewItem.InsertFromImage,
          Config.ThumbnailsViewItem.DuplicatePages,
        ]}

        // hideTopAppNavBar={true}
        style={{ height: hp('100%'), width: screenWidth }}

      />



      <AwesomeAlert
        show={ShowAlert}
        showProgress={false}
        title={"Save Edits"}
        message={Loader === true ? <ActivityIndicator size={'large'} color={COLORS.Text} style={{ alignSelf: 'center', marginTop: 10 }} /> : "Do you want to save the change?"}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Don't Save"
        confirmText="Save"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          setShowAlert(false)
          navigation.navigate('Home')
        }}
        onConfirmPressed={() => {
          savePdfToFirestoreInUserCollection()
        }}

        onDismiss={() => {
          setShowAlert(false)

        }}
        titleStyle={{ color: COLORS.Text, fontWeight: 'bold', fontSize: 24 }}
        messageStyle={{ color: COLORS.Text, width: Loader === true ? null : wp('50%'), textAlign: 'center', fontSize: 18 }}
        confirmButtonStyle={{ height: 60, width: wp('15%'), alignItems: 'center', justifyContent: 'center' }}
        confirmButtonTextStyle={{ fontSize: 18 }}
        cancelButtonStyle={{ height: 60, width: wp('15%'), alignItems: 'center', justifyContent: 'center', }}
        cancelButtonTextStyle={{ color: 'black', fontSize: 18 }}
        contentContainerStyle={{ backgroundColor: COLORS.WHITE, alignItems: 'center', justifyContent: 'center' }}
      />


      {
        // new alert after the update pdf press
      }
      <AwesomeAlert
        show={PdfUpdateAlert}
        showProgress={false}
        title={"Update Pdf"}
        message={isPdfUpdateLoading === true ? <ActivityIndicator size={'large'} color={COLORS.Text} style={{ alignSelf: 'center', marginTop: 20 }} /> : "When you update the PDF, all your annotations will be removed."}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Cancel"
        confirmText="Update"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          setShowPdfUpdateAlert(false)
        }}
        onConfirmPressed={() => {
          UpdatePdf()
        }}
        onDismiss={() => {
          setShowPdfUpdateAlert(false)

        }}

        titleStyle={{ color: COLORS.Text, fontWeight: 'bold', fontSize: 24 }}
        messageStyle={{ color: COLORS.Text, width: Loader === true ? null : wp('50%'), textAlign: 'center', fontSize: 18, alignSelf: 'center' }}
        confirmButtonStyle={{ height: 60, width: wp('15%'), alignItems: 'center', justifyContent: 'center' }}
        confirmButtonTextStyle={{ fontSize: 18 }}
        cancelButtonStyle={{ height: 60, width: wp('15%'), alignItems: 'center', justifyContent: 'center', }}
        cancelButtonTextStyle={{ color: 'black', fontSize: 18 }}
        contentContainerStyle={{ backgroundColor: COLORS.WHITE, alignItems: 'center', justifyContent: 'center' }}

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