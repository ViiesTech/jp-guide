import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { COLORS } from '../../utils/COLORS';
import AntDesign from 'react-native-vector-icons/AntDesign'
import DocumentPicker from 'react-native-document-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../../constant/colors';
import Toast from 'react-native-toast-message';
import storage from '@react-native-firebase/storage';
import { DocumentView, RNPdftron, PDFViewCtrl } from "react-native-pdftron";

const EditMainPdf = ({ route, navigation }) => {

  const [nickPDf, setNickPDf] = useState("")
  const [ImageUrl, setImageUrl] = useState("")
  const [ImageName, setImageName] = useState("")
  const [Loading, setLoading] = useState(false)


  const [pdfImage, setImagePdf] = useState("")

  const { pdfname } = route.params

  useEffect(() => {
    if (pdfname === "International Supplement") {
      setNickPDf("IS")
      getPdf("IS")
    } else if (pdfname === "General Aircraft Notes And Maintenance") {
      setNickPDf("GANAM")
      getPdf("GANAM")
    } else if (pdfname === "Communications") {
      setNickPDf("CM")
      getPdf("CM")
    } else if (pdfname === "General International information") {
      setNickPDf("GII")
      getPdf("GII")
    } else if (pdfname === "Operational information") {
      setNickPDf("OI")
      getPdf("OI")
    } else {
      setNickPDf("")
    }


  }, [])



  const getPdf = (nick) => {
    firestore()
      .collection("TabsPdf")
      .doc(nick)
      .onSnapshot((doc) => {

        setImagePdf(doc?.data()?.PDF)
      })
  }


  async function pickDocument() {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      })

      // console.log(result)


      setImageUrl(result[0].uri)
      setImageName(result[0].name)

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        // Error!
      }
    }
  }

  const saveImage = async () => {

    setLoading(true)

    if (ImageUrl === "") {
      Toast.show({
        type: 'error',
        text1: 'Please select your pdf',
      });


      setLoading(false)

    } else {

      const rand = Math.floor(Math.random() * 1000000000);
      await storage().ref(`${rand}`).putFile(ImageUrl);
      await storage().ref(`${rand}`).getDownloadURL().then((pdfDownloadedUrl) => {

        firestore()
          .collection("TabsPdf")
          .doc(nickPDf)
          .set({
            PDF: pdfDownloadedUrl
          }).then(() => {


            console.log("saved")
            setLoading(false)

          }).catch((err) => {

            setLoading(false)
            console.log(err)

          })

      })
    }
  }





  return (
    <View style={{ flex: 1, backgroundColor: COLORS.WHITE, padding: 20 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>

        <AntDesign
          name='back'
          size={30}
          color={'black'}
        />
      </TouchableOpacity>
      <Text style={{ alignSelf: 'center', marginTop: 20, fontSize: hp('2.5%'), fontWeight: 'bold' }}>{pdfname}</Text>


      <TouchableOpacity onPress={() => pickDocument()} style={{ height: 60, width: wp('50%'), backgroundColor: colors.primary, alignSelf: 'center', borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
        <Text style={{ color: COLORS.WHITE, fontSize: hp('2%') }}>{ImageName ? ImageName : "Add And Delete"} </Text>
      </TouchableOpacity>

      {
        ImageName ?
          <TouchableOpacity onPress={() => saveImage()} style={{ padding: 20, backgroundColor: colors.primary, alignSelf: 'center', borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 20, }}>
            <Text style={{ color: COLORS.WHITE, fontSize: hp('2%'), fontWeight: 'bold' }}>{Loading ? <ActivityIndicator size={'large'} /> : "Save"}</Text>
          </TouchableOpacity>
          :
          null
      }

      {
        pdfImage ?

          <DocumentView
            document={pdfImage}
            showLeadingNavButton={true}
            // disabledTools={[Config.Tools.annotationCreateLine, Config.Tools.annotationCreateRectangle]}


            leadingNavButtonIcon={
              Platform.OS === "ios"
                ? "ic_close_black_24px.png"
                : "ic_arrow_back_white_24dp"
            }
          // onLeadingNavButtonPressed={onLeadingNavButtonPressed}
          />
          :
          <ActivityIndicator size={'large'} color={'black'}  style={{marginTop:50}}/>
      }






      <Toast />
    </View>
  )
}

export default EditMainPdf