import { View, Text, ImageBackground, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import colors from '../../constant/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Entypo from 'react-native-vector-icons/Entypo'
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
import { COLORS } from '../../utils/COLORS'


const AdminHome = ({ navigation }) => {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Domestic', value: 'Domestic' },
    { label: 'WorldWide', value: 'WorldWide' }
  ]);
  const [ImageUrl, setImageUrl] = useState("")
  const [ImageName, setImageName] = useState("")
  const [Loading, setLoading] = useState(false)

  const [data, setData] = useState({
    Code: "",
    CodeDetail: "",
  })


  async function pickDocument() {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      })

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


  // auth().signOut()

  console.log(value)

  const firstLatter = data.Code.charAt(0).toUpperCase()

  console.log("latter", firstLatter)

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


        if (data.Code === "") {
          Toast.show({
            type: 'error',
            text1: 'Please enter your code',
          });
          setLoading(false)
        } else if (data.CodeDetail === "") {
          Toast.show({
            type: 'error',
            text1: 'Please enter your code detail',
          });
          setLoading(false)
        } else {

          firestore()
            .collection("Alphabet")
            .doc(`${firstLatter}`)
            .collection(`${firstLatter}`)
            .doc(data.Code)
            .get()
            .then((doc) => {
              console.log(doc.exists)

              if (doc.exists === true) {

                firestore()
                  .collection("Alphabet")
                  .doc(`${firstLatter}`)
                  .collection(`${firstLatter}`)
                  .doc(data.Code)
                  .set({
                    Airport: data.Code + data.CodeDetail,
                    Page: pdfDownloadedUrl,
                    name: data.Code,
                  }, {
                    merge: true
                  }).then(() => {
                    Toast.show({
                      type: 'error',
                      text1: 'This airport is already exists',
                    });
                    setLoading(false)
                  })

              } else {
                firestore()
                  .collection("PDF")
                  .add({
                    Airport: data.Code + data.CodeDetail,
                    Page: pdfDownloadedUrl,
                    name: data.Code,
                  }, {
                    merge: true
                  }).then(() => {
                    setLoading(false)
                    firestore()
                      .collection("Alphabet")
                      .doc(`${firstLatter}`)
                      .collection(`${firstLatter}`)
                      .doc(data.Code)
                      .set({
                        Airport: data.Code + data.CodeDetail,
                        Page: pdfDownloadedUrl,
                        name: data.Code,
                      }, {
                        merge: true
                      })


                  }).then(() => {
                    Toast.show({
                      type: 'success',
                      text1: 'Pdf Succesfully Uploaded',
                    });
                    setLoading(false)
                  })
              }

            })

          // return

          //getting data first


        }
      })
        .catch((err) => {
          console.log("Error: " + err)
        })

    }
  }



  return (
    <>
      <ImageBackground source={require('../../assets/images/hi.jpeg')} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} resizeMode={'cover'}>

        <TouchableOpacity onPress={() => navigation.navigate('AllPdf')} style={{ height: 50, width: wp('30%'), backgroundColor: colors.primary, alignSelf: 'flex-end', borderRadius: 200, marginRight: 50, alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <Text style={{ color: COLORS.WHITE, fontWeight: 'bold', fontSize: hp('2%') }}>Customize PDF</Text>
        </TouchableOpacity>
        <View style={{ backgroundColor: colors.primary, width: wp('90'), alignSelf: 'center', borderRadius: 20, top: 10, marginBottom: 30, alignItems: 'center', justifyContent: 'center' }}>

          <Text style={{ color: 'white', alignSelf: 'center', fontSize: hp('2.5%'), fontWeight: 'bold', marginTop: 20 }}>Upload pdf</Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', width: wp('80%'), justifyContent: 'space-between', marginTop: 20, marginBottom: 20 }}>

            <TextInput
              placeholder='Code AUA / etc'
              placeholderTextColor={"gray"}
              style={{ height: 60, backgroundColor: 'white', borderRadius: 10, paddingHorizontal: 10, width: wp('25%') }}
              onChangeText={(txt) => {
                setData({ ...data, Code: txt });

              }}
              value={data.Code}
            />

            <TextInput
              placeholder='(St. Johns, Antigua)'
              placeholderTextColor={"gray"}
              style={{ height: 60, backgroundColor: 'white', borderRadius: 10, paddingHorizontal: 10, width: wp('50%') }}
              onChangeText={(txt) => {
                setData({ ...data, CodeDetail: txt });
              }}
              value={data.CodeDetail}
            />

          </View>


          <TouchableOpacity onPress={() => pickDocument()} style={{ height: hp('10%'), width: wp('30%'), backgroundColor: colors.white, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
            {
              ImageUrl !== "" ?

                <Text>
                  {ImageName}
                </Text>

                :
                <>
                  <Entypo
                    name='plus'
                    size={hp('5%')}
                    color={'black'}
                  />

                  <Text style={{ fontSize: hp('2%') }}>upload pdf</Text>
                </>

            }


          </TouchableOpacity>

          {/* <DropDownPicker
            style={{ width: wp('80%'), alignSelf: 'center', marginTop: 20, marginBottom: 100 }}
            placeholder='Airport Type'
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          /> */}


          <TouchableOpacity onPress={() => saveImage()} style={{ height: 60, width: wp("80%"), backgroundColor: colors.secondery, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 20, marginTop: 20 }}>
            <Text style={{ color: colors.white, fontWeight: 'bold', fontSize: hp('2%') }}>{Loading === true ? <ActivityIndicator size={'small'} color={"white"} /> : "Upload"}</Text>
          </TouchableOpacity>

        </View>


        <TouchableOpacity onPress={() => auth().signOut()} style={{ height: 60, width: wp("80%"), backgroundColor: colors.primary, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <Text style={{ color: colors.white, fontWeight: 'bold', fontSize: hp('2%') }}>{"Logout"}</Text>
        </TouchableOpacity>

      </ImageBackground>




      <Toast />
    </>

  )
}

export default AdminHome