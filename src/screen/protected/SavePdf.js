import { ImageBackground, View, Text, StyleSheet, StatusBar, ScrollView, SafeAreaView, TouchableOpacity, TextInput, FlatList, Alert, ActivityIndicator, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../component/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import TextInputComp from '../../component/TextInputComp';
import colors from '../../constant/colors';
import Card from '../../component/Card';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { StripeProvider } from '@stripe/stripe-react-native';
import Modal from "react-native-modal";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
import DarkMode from '../../component/DarkMode';
import DropDownPicker from 'react-native-dropdown-picker';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { C, T } from '../../arrayindex/Alphabet';
import { COLORS } from '../../utils/COLORS';
import Orientation from 'react-native-orientation-locker';
import { OrientationLocker, PORTRAIT, LANDSCAPE, useDeviceOrientationChange, OrientationType } from "react-native-orientation-locker";
import Icon from 'react-native-vector-icons/AntDesign'
import FastImage from 'react-native-fast-image'
import { useDispatch, useSelector } from 'react-redux';

const SavePdf = ({ navigation }) => {
    const [ImageUrl, setImageUrl] = useState("")
    const [data, setData] = useState()
    const [isDeleteModal, setDeleteModal] = useState(false)

    const color = useSelector(state => state.pdf.Dark)


    const COLORS = {
      WHITE : color === true ?  "#000000" : "#FFFFFF" ,
      Text : color === true ?  "#FFFFFF" :"#000000"
  
    }


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getPDFtoFirebaseDATA()
        });
        return unsubscribe;
    }, [navigation])


    const getPDFtoFirebaseDATA = () => {

        console.log("called?")

        const Temp = []
        firestore()
            .collection("SavedPDF")
            .get()
            .then((doc) => {

                doc?.docs?.forEach((doc) => {
                    Temp.push(doc?.data())
                })
            }).then((doc) => {

                setData(Temp)
            })



    }


    const DeletePdf = (code) => {
        setDeleteModal(true)
        const documentRef = firestore().collection('SavedPDF').doc(code);

        documentRef.delete().then(() => {
            console.log('Document successfully deleted!');
            setDeleteModal(false)

            getPDFtoFirebaseDATA()
        }).catch((error) => {
            setDeleteModal(false)

            console.error('Error removing document: ', error);
        });



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
        <FastImage source={color === true ?  require('../../assets/images/hidark.png') : require('../../assets/images/hi.jpeg')} style={{ flex: 1, padding: 20 }} resizeMode={'cover'}>
            {/* <Header Logo={require('../../assets/images/profile.png')} QuickFind={"NO"} ImageUrl={ImageUrl} profile={require('../../assets/images/OldPic.png')} btnColor={colors.primary} Nav={navigation} /> */}
            <Image source={color === true ? require('../../assets/images/logodark.png') : require('../../assets/images/profile.png')} style={{ height: 120, width: 120, alignSelf: 'center' }} resizeMode='contain' />
            <View style={{ backgroundColor: color === true ?  'rgba(252, 252, 252, 0.1)' : 'white', width: screenWidth * 0.9, alignSelf: 'center', borderRadius: 20, top: 10, marginBottom: 30, padding: 20, flex: 1, }}>


                <View style={{ width: screenWidth * 0.8, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>

                    <TouchableOpacity onPress={() => navigation.navigate("Home")} style={{ alignItems: 'center', justifyContent: 'center' }} >
                        <Icon name='back' color={COLORS.Text} size={30} />
                        <Text style={{color:COLORS.Text, }}>Return to Home</Text>


                    </TouchableOpacity>

                    <Text style={{ alignSelf: 'center', color: COLORS.Text, fontSize: hp('2.5%'), fontWeight: 'bold', marginBottom: 20, marginTop: 10 }}>My Saved Airports</Text>
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', width:40 }} >
       
                    </TouchableOpacity>

                </View>

                <FlatList
                    data={data}
                    contentContainerStyle={{ flexWrap: 'wrap', flexDirection: 'row', alignSelf: 'center' }}
                    renderItem={({ item }) => {
                        console.log('renderItem', item)
                        return (
                            <View style={{ width: wp('20%') }}>
                                <TouchableOpacity onPress={() => navigation.navigate('PDFText', { pageUrl: item.pdfURL, isSelected: item.code, Airport: item.AirportName })} style={{ height: 80, alignSelf: 'center', backgroundColor: colors.primary, borderRadius: 5, marginTop: 10, alignItems: 'center', paddingHorizontal: 10, justifyContent: 'center', width: wp('16%'), marginLeft: 10 }}>
                                    <View style={{ flexDirection: 'row' }}>

                                        <Text style={{ fontWeight: 'bold', fontSize: hp('2%'), color: 'white' }}>{item.code}</Text>

                                        {/* <FontAwesome5
                                        style={{ marginRight: 20, marginLeft: 20 }}
                                        name={'plane-departure'}
                                        size={25}
                                        color={'black'}
                                    /> */}



                                        {/* <Text style={{ fontSize: hp('2%') }}>{item.AirportName}</Text> */}
                                    </View>



                                </TouchableOpacity>



                                <TouchableOpacity onPress={() => DeletePdf(item.code)} >

                                    <AntDesign
                                        name='delete'
                                        size={35}
                                        color={"red"}
                                        style={{ alignSelf: 'flex-end', left: 10 }}
                                    />
                                </TouchableOpacity>
                            </View>
                        )
                    }}

                />



            </View>


            <Modal isVisible={isDeleteModal}>
        <View style={{ backgroundColor: COLORS.WHITE, borderRadius: 20, padding: 20, alignItems:'center', justifyContent:'center', height:150, width:150, alignSelf:'center' }}>

              <ActivityIndicator size={'large'} color={'black'}/>
              <Text style={{color:'black', fontWeight:'bold'}}>Deleting</Text>



        </View>
      </Modal>


        </FastImage>
    )
}

export default SavePdf