import { ImageBackground, View, Text, StyleSheet, StatusBar, ScrollView, SafeAreaView, TouchableOpacity, TextInput, FlatList, Alert, ActivityIndicator, Dimensions, Image, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../../constant/colors';
import Modal from "react-native-modal";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Orientation from 'react-native-orientation-locker';
import { OrientationLocker, PORTRAIT, LANDSCAPE, useDeviceOrientationChange, OrientationType } from "react-native-orientation-locker";
import Entypo from 'react-native-vector-icons/Entypo'
import Icon from 'react-native-vector-icons/AntDesign'
import FastImage from 'react-native-fast-image'
import { useDispatch, useSelector } from 'react-redux';

const Notes = ({ navigation }) => {

  const UID = auth()?.currentUser?.uid

  const [txt, setText] = useState("")
  const [data, setData] = useState()
  const [isModalVisible, setModalVisible] = useState(false);
  const [createNoteLoading, setCreateNoteLoading] = useState(false);


  const [isDeleteModal, setDeleteModal] = useState(false)

  const color = useSelector(state => state.pdf.Dark)


  const COLORS = {
    WHITE: color === true ? "#000000" : "#FFFFFF",
    Text: color === true ? "#FFFFFF" : "#000000"

  }



  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getPDFtoFirebaseDATA()
    });
    return unsubscribe;
  }, [navigation])


  const getPDFtoFirebaseDATA = () => {
    firestore()
      .collection('Notes')
      .doc(UID)
      .collection("myNotes")
      .onSnapshot((doc) => {
        const Temp = [];
        doc?.docs?.forEach((note) => {
          Temp.push({ ...note?.data(), id: note.id });
        });

        // Sort the Temp array in descending order based on createAt property
        Temp?.sort((a, b) => {
          const timeA = a?.createAt.seconds * 1000 + a?.createAt.nanoseconds / 1000000;
          const timeB = b?.createAt.seconds * 1000 + b?.createAt.nanoseconds / 1000000;
          return timeB - timeA;
        });

        setData(Temp);
      });
  };



  const DeletePdf = (code) => {
    setDeleteModal(true)
    const documentRef = firestore().collection('Notes').doc(UID).collection("myNotes").doc(code);

    documentRef.delete().then(() => {
      setDeleteModal(false)
      console.log('Document successfully deleted!');
      getPDFtoFirebaseDATA()
    }).catch((error) => {
      setDeleteModal(false)
      console.error('Error removing document: ', error);
    });
  }


  console.log(txt)
  const CreatePDF = () => {

    setCreateNoteLoading(true)

    if (txt !== "") {
      firestore()
        .collection("Notes")
        .doc(UID)
        .collection("myNotes")
        .add({
          createAt: new Date(),
          NoteMsg: txt
        }).then(() => {
          console.log('successfully created')

          setCreateNoteLoading(false)
          setModalVisible(false)

          firestore()
          .collection('AllAppNotes')
          .add({
            createAt: new Date(),
            NoteMsg: txt
          })



        }).catch((error) => {
          console.log(error)

          setCreateNoteLoading(false)
        })

    } else {

      setCreateNoteLoading(false)
    }
  }



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
    StatusBar.setHidden(true);

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

  return (
    <FastImage source={color === true ? require('../../assets/images/hidark.png') : require('../../assets/images/hi.jpeg')} style={{ flex: 1, padding: 20 }} resizeMode={'cover'}>

      <Image source={color === true ? require('../../assets/images/logodark.png') : require('../../assets/images/profile.png')} style={{ height: 120, width: 120, alignSelf: 'center' }} resizeMode='contain' />
      <View style={{ backgroundColor: color === true ? 'rgba(252, 252, 252, 0.1)' : 'white', width: screenWidth * 0.9, alignSelf: 'center', borderRadius: 20, top: 10, marginBottom: 30, padding: 20, flex: 1, }}>

        <View style={{ width: screenWidth * 0.8, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>

          <TouchableOpacity onPress={() => navigation.navigate("Home")} style={{ alignItems: 'center', justifyContent: 'center' }} >
            <Icon name='back' color={COLORS.Text} size={30} />
            <Text style={{color:COLORS.Text}}>Return to Home</Text>


          </TouchableOpacity>

          <Text style={{ alignSelf: 'center', color: COLORS.Text, fontSize: hp('2.5%'), fontWeight: 'bold', marginBottom: 20, marginTop: 10 }}>Notes</Text>

          <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', width:40 }} >
            {/* <Icon name='back' color={color === true ? 'black' : 'white'} size={30} />
            <Text style={{ color: color === true ? 'black' : 'white'}}>Return to Home</Text> */}


          </TouchableOpacity>
        </View>


        <TouchableOpacity onPress={() => setModalVisible(true)} style={{ backgroundColor: colors.primary, height: 60, width: 60, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <Entypo
            name='plus'
            size={hp('3%')}
            color={colors.white}
          />
        </TouchableOpacity>

        <FlatList
          data={data}
          renderItem={({ item }) => {
            console.log('renderItem', item)



            const milliseconds = item.createAt.seconds * 1000 + Math.floor(item.createAt.nanoseconds / 1000000);

            const date = new Date(milliseconds);
            const year = date.getFullYear();
            const formattedDate = date.toLocaleString('en-US', { dateStyle: 'medium' });
            const formattedTime = date.toLocaleTimeString('en-US', { timeStyle: 'short' });

            console.log(formattedDate); // Output: Jun 23, 2023
            console.log(formattedTime); // Output: 2:45 PM
            console.log(year); // Output: 2023


            return (
              <View style={{ marginTop: 10 }}>
                <TouchableOpacity style={{ minHeight: 60, backgroundColor: colors.primary, borderRadius: 10, justifyContent: 'center', padding: 20 }}>

                  <Text style={{ color: colors.white, alignSelf: 'flex-end', marginBottom: 10 }}>{formattedDate}, {formattedTime}</Text>

                  <Text style={{ fontSize: hp('1.7%'), color: 'white' }}>{item.NoteMsg}</Text>


                </TouchableOpacity>



                <TouchableOpacity onPress={() => DeletePdf(item.id)} style={{ alignSelf: 'flex-end' }} >

                  <AntDesign
                    name='delete'
                    size={35}
                    color={"red"}
                    style={{ alignSelf: 'flex-end', }}
                  />
                </TouchableOpacity>
              </View>
            )
          }}

        />



      </View>



      <Modal isVisible={isModalVisible}>
        <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 20, width: screenWidth * 0.9 }}>

          <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginBottom: 10 }} >
            <AntDesign
              name='closecircle'
              size={hp('2.5%')}
              color={'black'}

            />
          </TouchableOpacity>

          <TextInput
            placeholder='Type Notes'
            placeholderTextColor='gray'
            style={{
              borderWidth: 1,
              borderRadius: 10,
              padding: 10, // Adjust the padding value as needed
              textAlignVertical: 'top', // Align the text to the top
              height: hp('30%')
            }}
            multiline={true} // Enable multiline
            numberOfLines={4} // Adjust the number of lines as needed

            onChangeText={(txts) => {
              setText(txts)
            }}
            value={txt}
          />

          <TouchableOpacity onPress={() => CreatePDF()} style={{ height: 60, backgroundColor: colors.primary, borderRadius: 10, marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: colors.white, fontSize: hp('2.5%'), fontWeight: 'bold' }}>{createNoteLoading ? <ActivityIndicator size={'small'} color={colors.white} /> : "Add Note"}</Text>
          </TouchableOpacity>



        </View>
      </Modal>



      <Modal isVisible={isDeleteModal}>
        <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 20, alignItems: 'center', justifyContent: 'center', height: 150, width: 150, alignSelf: 'center' }}>

          <ActivityIndicator size={'large'} color={'black'} />
          <Text style={{ color: 'black', fontWeight: 'bold' }}>Deleting</Text>



        </View>
      </Modal>


    </FastImage>
  )
}

export default Notes