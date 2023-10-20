import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, FlatList, Button, TextInput, Linking, _View, ActivityIndicator, Platform } from 'react-native'
import React, { useRef } from 'react'
import axios from 'axios';
import RenderHtml from 'react-native-render-html';
import { useEffect } from 'react';
import { useState } from 'react';
import Pdf from 'react-native-pdf';
import Icon from 'react-native-vector-icons/AntDesign'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { DocumentView, RNPdftron, PDFViewCtrl, } from "react-native-pdftron";
import { openComposer } from "react-native-email-link";
import AsyncStorage from '@react-native-async-storage/async-storage';

import NetInfo from "@react-native-community/netinfo";
import ReactNativeBlobUtil from 'react-native-blob-util'

import Comment from '../../component/Comment'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import ShowingComments from '../../component/ShowingComments'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import Modal from "react-native-modal";
import Entypo from 'react-native-vector-icons/Entypo'
import colors from '../../constant/colors';
import Fontisto from 'react-native-vector-icons/Fontisto'
import { Config } from 'react-native-pdftron';
import { A, T, V } from '../../arrayindex/Alphabet';
import { COLORS } from '../../utils/COLORS';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-toast-message';
import Orientation from 'react-native-orientation-locker';
import { OrientationLocker, PORTRAIT, LANDSCAPE, useDeviceOrientationChange, OrientationType } from "react-native-orientation-locker";
import { useSelector, useDispatch } from 'react-redux'
import AwesomeAlert from 'react-native-awesome-alerts';
import storage from '@react-native-firebase/storage';

const PDFText = ({ navigation, route }) => {


  const [Loader, setLoader] = useState(true)




  const _viewer = useRef()

  //PDf Edited.......
  const [isEditPdf, setEditPdf] = useState(false);
  const [ShowAlert, setShowAlert] = useState(false);


  const [showSavedAlert, setShowSavedAlert] = useState(false);


  const [LikedModel, setLikedModel] = useState(false);
  const [DislikedModal, setDislikeModal] = useState(false);

  const [EmailMsg, setEmailMsg] = useState("");

  const UID = auth()?.currentUser?.uid
  const { pageUrl, isSelected, Airport } = route.params;

  console.log('pageUrl', pageUrl, isSelected)

  const source = { uri: pageUrl, caches: true };

  const [commentText, onCommentText] = useState("")
  const [Comments, getComment] = useState("")
  const [Like, disLike] = useState("")

  const [TotalLike, setTotalLike] = useState([])
  const [isModalVisible, setModalVisible] = useState(false);

  const [isPdfUpdated, setPdfUpdated] = useState(false);

  const [NewUpdatedPdf, setNewUpdatedPdf] = useState("")
  const [isPdfUpdateLoading, setPdfUpdateLoading] = useState(false)
  const [PdfUpdateAlert, setShowPdfUpdateAlert] = useState(false)

  const color = useSelector(state => state.pdf.Dark)

  const COLORS = {
    WHITE: color === true ? "#000000" : "#FFFFFF",
    Text: color === true ? "#FFFFFF" : "#000000"

  }

  useEffect(() => {
    FetchComment()
    AnyUpdate()
  }, [])

  //Set Dark mode in pdf 


  const SetMode = () => {
    if (color === true) {
      // _viewer.current.setColorPostProcessMode(Config.ColorPostProcessMode.None)
      _viewer.current.setColorPostProcessMode(Config.ColorPostProcessMode.NightMode);
    } else {
      // _viewer.current.setColorPostProcessMode(Config.ColorPostProcessMode.GradientMap);
      _viewer.current.setColorPostProcessMode(Config.ColorPostProcessMode.None)
    }
  }

  //Set Dark mode in pdf 


  const AnyUpdate = () => {
    console.log("my alphabet is", isSelected[0],)

    firestore()
      .collection("Alphabet")
      .doc(`${isSelected[0]}`)
      .collection(`${isSelected[0]}`)
      .doc(`${isSelected}`)
      .get()
      .then((querySnapshot) => {
        // console.log("Document ID:", querySnapshot.data()?.UpdateDownloaded?.includes(UID))
        const QueryExist = querySnapshot.data()?.UpdateDownloaded?.includes(UID)
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
      .collection("Alphabet")
      .doc(`${isSelected[0]}`)
      .collection(`${isSelected[0]}`)
      .doc(`${isSelected}`)
      .update({
        UpdateDownloaded: firestore.FieldValue.arrayUnion(UID),

      }).then((doc) => {
        DownloadNewUpdatedPDF()

      }).catch((e) => {
        setPdfUpdateLoading(false)
      })

  }

  const DownloadNewUpdatedPDF = () => {
    firestore()
      .collection("Alphabet")
      .doc(`${isSelected[0]}`)
      .collection(`${isSelected[0]}`)
      .doc(`${isSelected}`)
      .get()
      .then(async (doc) => {
        const pdfUrl = doc?.data()?.Page
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


  const sendComment = () => {

    if (commentText !== "") {
      firestore()
        .collection('Users')
        .doc(UID)
        .get()
        .then((info) => {
          firestore()
            .collection('Comments')
            .doc(isSelected)
            .collection("Comments")
            .add({
              name: info?.data()?.username,
              Comment: commentText,
              UID: UID,
              CreatedAt: Math.floor(Date.now() / 1000)
            }, {
              merge: true
            })
        }).then(() => {
          onCommentText("")
        })


    }

  }

  const FetchComment = () => {


    firestore()
      .collection('Comments')
      .doc(isSelected)
      .collection("Like&Dislike")
      .where('status', '==', 'Like')
      .onSnapshot((doc) => {

        const Temp = []

        doc?.docs?.map((doc) => {
          if (doc?.data()?.status === "Like") {
            Temp.push(doc?.data())
          }


          if (doc?.data()?.UID === UID) {
            disLike(doc?.data()?.status)
          }

        })


        setTotalLike(Temp)
        //   console.log("docer",)

        //   if (doc.data().Comment === "Dislike") {
        //     disLike("Dislike")
        //   }


        //   Temp.push(doc.data())
      })





    firestore()
      .collection('Comments')
      .doc(isSelected)
      .collection("Comments")
      .orderBy('CreatedAt', 'desc')
      .onSnapshot((doc) => {
        const Temp = []
        doc?.docs?.map((tnt) => {
          Temp.push(tnt)
        })
        getComment(Temp)
      })
  }

  const onDeleteComment = (chatID) => {

    firestore()
      .collection('Comments')
      .doc(isSelected)
      .collection("Comments")
      .doc(chatID)
      .delete()
  }


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const LikePdf = () => {

    disLike("Like")

    firestore()
      .collection('Users')
      .doc(UID)
      .get()
      .then((info) => {
        // console.log("infoooooooooooooooo", info)
        firestore()
          .collection("Comments")
          .doc(isSelected)
          .collection("Like&Dislike")
          .doc(UID)
          .set({
            // name: info?.data()?.username,
            status: "Like",
            UID: UID,
          })

      }).then(() => {
        setLikedModel(true)

      }).then(() => {
        setTimeout(() => {
          setLikedModel(false)
        }, 2000)
      })
  }

  const DisLikePdf = () => {
    disLike("Dislike")

    firestore()
      .collection('Users')
      .doc(UID)
      .get()
      .then((info) => {
        // console.log("infoooooooooooooooo", info)
        firestore()
          .collection("Comments")
          .doc(isSelected)
          .collection("Like&Dislike")
          .doc(UID)
          .set({
            // name: info?.data()?.username,
            status: "Dislike",
            UID: UID,
          })

      }).then(() => {
        setDislikeModal(true)
      })
  }

  const savePDFtoFirebase = () => {

    setLoader(true)

    _viewer.current.saveDocument().then(async (filePath) => {
      await AsyncStorage.setItem(`${isSelected}`, filePath).then(() => {

        firestore()
          .collection("SavedPDF")
          .doc(isSelected)
          .set({
            pdfURL: pageUrl,
            code: isSelected,
            AirportName: Airport
          }, {
            merge: true,
          }).then(() => {
            setLoader(false)
            setShowSavedAlert(false)
            Toast.show({
              type: 'success',
              text1: 'Saved',
            });

          }).catch((e) => {
            setLoader(false)
            setShowSavedAlert(false)
          })
      })
    })


  }


  const sendEmail = () => {
    if (EmailMsg === "") {
      Toast.show({
        type: 'error',
        text1: 'Text Field is empty',
      });
    } else {

      openComposer({
        to: "thejpguide@gmail.com",
        subject: "Jp-Guide",
        body: `${EmailMsg}`,
      }).then((res) => {

        console.log("response: " + res.app)
        setDislikeModal(false)
      }).catch((err) => {
        console.log("Error: " + err)

      })

    }



  };


  //Orientation
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);

  const [screenResolution, setScreenResolution] = useState('')


  //Have to uncomment this
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



  const GoingBack = () => {

    if (isEditPdf === true) {
      setShowAlert(true)
    } else {
      navigation.navigate('Home')
    }

  }

  //this function called on save pdf
  const savePdfToFirestoreInUserCollection = () => {
    setLoader(true)
    NetInfo.fetch().then(state => {
      console.log('Device connected to the internet.');

      if (state.isConnected) {
        _viewer.current.saveDocument().then(async (filePath) => {

          // console.log("file path", filePath)

          await AsyncStorage.setItem(`${isSelected}`, filePath).then(async () => {

            const rand = Math.floor(Math.random() * 1000000000);
            await storage().ref(`${rand}`).putFile(filePath);
            await storage().ref(`${rand}`).getDownloadURL().then((pdfDownloadedUrl) => {

              firestore()
                .collection("Users")
                .doc(UID)
                .collection("pdf")
                .doc(isSelected)
                .set({
                  "ImageURL": pdfDownloadedUrl,
                  "name": isSelected
                }).then(() => {
                  navigation.navigate("Home")
                  setLoader(false)
                  setShowAlert(false)
                })
            })



          })
        })
      } else {
        console.log('Device is not connected to the internet.');

        _viewer.current.saveDocument().then(async (filePath) => {

          // console.log("file path", filePath)
          await AsyncStorage.setItem(`${isSelected}`, filePath).then(async () => {


            navigation.navigate("Home")


          })
        })
      }
    });

  }

  

  return (
    <View style={{ backgroundColor: COLORS.WHITE, }}>

      <View style={{ height: 60, borderRadius: 500, alignItems: 'center', justifyContent: 'center', marginTop: 20, flexDirection: 'row', width: screenWidth * 0.9, justifyContent: 'space-between', alignSelf: 'center' }}>


        <TouchableOpacity onPress={() => GoingBack()} style={{ alignItems: 'center', justifyContent: 'center' }} >
          <Icon name='back' color={COLORS.Text} size={30} />
          <Text style={{ color: COLORS.Text, fontWeight: 'bold' }}>Return to Home</Text>
        </TouchableOpacity>



        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

          <Text style={{ color: color === true ? 'white' : colors.primary, fontWeight: 'bold', fontSize: hp('2%') }}>Is this airport information correct?</Text>


          <View style={{ flexDirection: 'row', marginLeft: 20 }}>

            <TouchableOpacity onPress={() => LikePdf()} style={{ backgroundColor: colors.primary, height: 50, width: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
              <MaterialCommunityIcons name='thumb-up' size={30} color={Like === "Like" ? "blue" : "white"} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => DisLikePdf()} style={{ marginLeft: 20, backgroundColor: colors.primary, height: 50, width: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 8 }} >
              <MaterialCommunityIcons name='thumb-down' size={30} color={Like === "DisLike" ? "blue" : "white"} />
            </TouchableOpacity>

          </View>
        </View>



        <TouchableOpacity onPress={() => setShowSavedAlert(true)} style={{ alignItems: 'center', justifyContent: 'center' }} >
          <Ionicons
            name='airplane'
            color={COLORS.Text}
            size={35}
          />
          <Text style={{ fontWeight: 'bold', color: COLORS.Text }}>Save This Airport</Text>
        </TouchableOpacity>
      </View>



      <View style={{ flexDirection: 'row', paddingHorizontal: 70, justifyContent: 'space-between', marginTop: 10, marginBottom: 10 }}>
        <Text style={{ alignSelf: 'center', fontSize: hp('1.2%'), fontWeight: 'bold', marginTop: 10 }}></Text>

        <Text style={{ alignSelf: 'center', fontSize: hp('1.2%'), fontWeight: 'bold', marginTop: 10 }}>Likes {TotalLike.length}</Text>
        {
          isPdfUpdated === true ?
            <View />
            :

            <TouchableOpacity onPress={() => setShowPdfUpdateAlert(true)} style={{ borderRadius: 200, backgroundColor: COLORS.Text, alignItems: 'center', justifyContent: 'center', padding: 10, alignSelf: 'center' }}>
              <Text style={{ color: COLORS.WHITE, }}>{isPdfUpdateLoading === true ? <ActivityIndicator size={'small'} color={COLORS?.WHITE} /> : "Update Pdf"}</Text>
            </TouchableOpacity>
        }
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}>
        <View style={{ alignSelf: 'center' }} >

          {
            pageUrl !== null ?

              <DocumentView

                document={NewUpdatedPdf ? NewUpdatedPdf : pageUrl}
                ref={_viewer}

                onLoadComplete={(path) => {
                  console.log('The document has finished loading:', path);
                  SetMode()
                  setLoader(false)
                }}

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
                //
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

                topAppNavBarRightBar={[Config.Buttons.reflowButton, Config.Buttons.searchButton]}



                

                onCurrentToolbarChanged = {({toolbar}) => {
                  console.log('toolbar changed to: ' + toolbar);
                }}

                onAnnotationToolbarItemPress = {({id}) => {
                  console.log('toolbar item press: ' + id);
                }}


                // hideTopAppNavBar={true}
                style={{ height: hp('100%'), width: screenWidth }}

              />

              :
              <ActivityIndicator size={25} />
          }






        </View>




        <Modal isVisible={isModalVisible}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white', padding: 20, borderRadius: 10 }}>

            <TouchableOpacity onPress={() => toggleModal()}>
              <Entypo name={'circle-with-cross'} size={40} color={'black'} />
            </TouchableOpacity>


            {/* <Button title="Hide modal" onPress={toggleModal} /> */}

            <View style={{ width: wp('80%'), alignSelf: 'center', padding: 20, backgroundColor: 'white', borderRadius: 20, paddingBottom: 70, bottom: 0 }}>

              <Comment onSendComment={sendComment} onState={onCommentText} val={commentText} />

              <FlatList
                data={Comments}
                renderItem={(cmt) => {

                  const comment = cmt?.item.data().Comment
                  const name = cmt?.item.data().name
                  const uid = cmt?.item.data().UID

                  return (
                    <>
                      {
                        comment !== "" ?
                          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 35, width: wp('70%'), justifyContent: 'space-between' }}>
                            <ShowingComments name={name} comment={comment} />
                            {
                              UID === uid ?
                                <TouchableOpacity onPress={() => onDeleteComment(cmt.item.id)}>

                                  <MaterialCommunityIcons
                                    name='delete'
                                    size={25}

                                  />
                                </TouchableOpacity>
                                :
                                null
                            }

                          </View>

                          :

                          <Text>No Comment here</Text>

                      }


                    </>
                  )
                }}
              />
            </View>
          </ScrollView>
        </Modal>

      </ScrollView>


      {
        //LIKED MODAL
      }
      <Modal
        isVisible={LikedModel}

        animationOut={'fadeOut'}
        animationIn={'fadeIn'}
      >
        <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 30, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
          <Text style={{ fontSize: hp('2.5%'), fontWeight: 'bold' }}>Thank you for confirming 🎉 </Text>
        </View>
      </Modal>




      {
        //Dislike MODAL
      }
      <Modal
        isVisible={DislikedModal}

        animationOut={'fadeOut'}
        animationIn={'fadeIn'}
      >
        <View style={{ backgroundColor: COLORS.WHITE, borderRadius: 10, padding: 30, alignSelf: 'center', borderWidth: 1, borderColor: 'white' }}>
          <TouchableOpacity onPress={() => setDislikeModal(false)} style={{}}>
            <Entypo
              name='cross'
              size={30}
              color={COLORS.Text}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: hp('2%'), fontWeight: 'bold', alignSelf: 'center', color: COLORS.Text }}>What information has changed?</Text>

          <TextInput
            placeholder='Type here'
            placeholderTextColor={'gray'}
            style={{ height: 100, width: wp('90%'), borderWidth: 1, borderColor: COLORS.Text, borderRadius: 10, padding: 10, paddingTop: 10, marginTop: 15, color: COLORS.Text }}
            numberOfLines={3}
            multiline={true}
            onChangeText={(txt) => {
              setEmailMsg(txt)
            }}
            value={EmailMsg}
          />


          <TouchableOpacity onPress={() => { sendEmail() }} style={{ height: 80, width: wp('90%'), backgroundColor: colors.primary, borderRadius: 10, marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: hp('2%') }}>Submit</Text>
          </TouchableOpacity>
        </View>
        <Toast />
      </Modal>





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
          navigation.navigate('Home')
          setShowAlert(false)
        }}
        onConfirmPressed={() => {
          savePdfToFirestoreInUserCollection()
        }}

        onDismiss={() => {
          setShowSavedAlert(false)

        }}
        titleStyle={{ color: COLORS.Text, fontWeight: 'bold', fontSize: 24 }}
        messageStyle={{ color: COLORS.Text, width: Loader === true ? null : wp('50%'), textAlign: 'center', fontSize: 18 }}
        confirmButtonStyle={{ height: 60, width: wp('15%'), alignItems: 'center', justifyContent: 'center' }}
        confirmButtonTextStyle={{ fontSize: 18 }}
        cancelButtonStyle={{ height: 60, width: wp('15%'), alignItems: 'center', justifyContent: 'center', }}
        cancelButtonTextStyle={{ color: 'black', fontSize: 18 }}
        contentContainerStyle={{ backgroundColor: COLORS.WHITE, alignItems: 'center', justifyContent: 'center' }}
      />


      {/* <AwesomeAlert
        show={showSavedAlert}
        showProgress={false}
        title={"Save"}
        message={Loader === true ? <ActivityIndicator size={'large'} color={COLORS.Text} style={{ alignSelf: 'center', marginTop: 20 }} /> : "You can access the PDF even when you are offline after it has been saved."}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Don't Save"
        confirmText="Save"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          setShowSavedAlert(false)
        }}
        onConfirmPressed={() => {
          savePDFtoFirebase()
        }}
        onDismiss={() => {
          setShowSavedAlert(false)

        }}

        titleStyle={{ color: COLORS.Text, fontWeight: 'bold', fontSize: 24 }}
        messageStyle={{ color: COLORS.Text, width: Loader === true ? null : wp('50%'), textAlign: 'center', fontSize: 18, alignSelf: 'center' }}
        confirmButtonStyle={{ height: 60, width: wp('15%'), alignItems: 'center', justifyContent: 'center' }}
        confirmButtonTextStyle={{ fontSize: 18 }}
        cancelButtonStyle={{ height: 60, width: wp('15%'), alignItems: 'center', justifyContent: 'center', }}
        cancelButtonTextStyle={{ color: 'black', fontSize: 18 }}
        contentContainerStyle={{ backgroundColor: COLORS.WHITE, alignItems: 'center', justifyContent: 'center' }}

      />
 */}

      <AwesomeAlert
        show={showSavedAlert}
        showProgress={false}
        title={"Save"}
        message={Loader === true ? <ActivityIndicator size={'large'} color={COLORS.Text} style={{ alignSelf: 'center', marginTop: 20 }} /> : "You can access the PDF even when you are offline after it has been saved."}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Don't Save"
        confirmText="Save"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          setShowSavedAlert(false)
        }}
        onConfirmPressed={() => {
          savePDFtoFirebase()
        }}
        onDismiss={() => {
          setShowSavedAlert(false)

        }}

        titleStyle={{ color: COLORS.Text, fontWeight: 'bold', fontSize: 24 }}
        messageStyle={{ color: COLORS.Text, width: Loader === true ? null : wp('50%'), textAlign: 'center', fontSize: 18, alignSelf: 'center' }}
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

      <Toast />
    </View>
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

export default PDFText