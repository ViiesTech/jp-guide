import { View, Text, SafeAreaView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../constant/colors';
import Card from '../../component/Card';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Modal from "react-native-modal";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import { useConfirmPayment, initStripe, CardField, useStripe } from '@stripe/stripe-react-native';

import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
// import { CardField, useStripe } from '@stripe/stripe-react-native';
const stripe = require('stripe-client')('pk_test_51M8ALKAgW8OMwbeWlIQVZDIbJX1S9hMC8vtik17jjS2P04HQi2sbPcxyvKcN90nLJIuYJpeltBZzvT9uh0hfyTWN00r1AqtMkC');



const Payment = ({ navigation }) => {
    // const { confirmPayment } = useStripe();

    // const handlePayment = () => {
    //     console.log("Purchased")
    //     confirmPayment()
    // }
    const UID = auth()?.currentUser.uid
    const [isModalVisible, setModalVisible] = useState(false);
    const [Loading, setLoading] = useState(false)
    const [goBack, setBack] = useState(false)
    const [price, setPrice] = useState()

    const color = useSelector(state => state.pdf.Dark)


    const COLORS = {
        WHITE: color === true ? "#000000" : "#FFFFFF",
        Text: color === true ? "#FFFFFF" : "#000000"

    }


    useEffect(() => {

        firestore()
            .collection("Users")
            .doc(UID)
            .onSnapshot((doc) => {
                if (doc?.data()?.Buy != "") {
                    setBack(false)
                } else {
                    setBack(false)
                }
                setPrice(doc?.data()?.Plan)
            })
    }, [])

    const toggleModal = (sub) => {

        setModalVisible(!isModalVisible);


        firestore()
            .collection('Users')
            .doc(UID)
            .update({
                Plan: sub
            }).then(() => {

            })
    };


    const information = {
        card: {
            number: '4242424242424242',
            exp_month: '02',
            exp_year: '26',
            cvc: '999',
            name: 'Billy Joe'
        }
    }

    const onPayment = async () => {

        setLoading(true)
        const dollarinCents = price * 100;


        const card = await stripe.createToken(information);
        const token = card.id;

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://api.stripe.com/v1/charges?amount=${dollarinCents}&currency=usd&source=${token}`,
            headers: {

                //   'Authorization': 'Bearer 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',
                'Authorization': 'Bearer sk_test_51M8ALKAgW8OMwbeWY0N8Nkzj62ePjyaJBmvHGJF0tZ6I9M1bVXeKLBYrPxsTB3Jt99fnTOILrDs0pg54eZDY9Lgt00Nv6wVDTH',
                'Content-Type': 'application/x-www-form-urlencoded',
            },

        };

        axios.request(config)
            .then((response) => {
                console.log("purchased", response.data.id,);
                firestore()
                    .collection('Users')
                    .doc(UID)
                    .update({
                        Buy: token ? response.data.id : ""
                    }).then(() => {
                        // navigation.navigate('home')
                    })
                setLoading(false)
                Toast.show({
                    type: 'success',
                    text1: 'Successfully purchased!',
                });

            })
            .catch((error) => {
                console.log("erriririiriro", error.response.data.error);
                setLoading(false)
                Toast.show({
                    type: 'error',
                    text1: 'Please enter a valid detail!',
                });
            })



        // firestore()
        //     .collection('Users')
        //     .doc(UID)
        //     .update({
        //         Buy: token ? token : ""
        //     }).then(() => {
        //         firestore()
        //             .collection('Users')
        //             .doc(UID)
        //             .onSnapshot((data) => {
        //                 if (data?.exists == false) {
        //                     Toast.show({
        //                         type: 'error',
        //                         text1: 'Please enter a valid detail!',
        //                     });
        //                     setLoading(false)
        //                 }
        //                 if (data?.data()?.Buy === "") {
        //                     setLoading(false)
        //                     Toast.show({
        //                         type: 'error',
        //                         text1: 'Please enter a valid detail!',
        //                     });


        //                 } else {

        //                     setLoading(false)

        //                 }

        //             })
        //     })
        // send token to backend for processing


    }

    const Logout = () => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
        setModalVisible(false);
    }

    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>

                <View style={{ padding: 20, flex: 1, backgroundColor: COLORS.WHITE }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {
                            goBack == true ?
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Ionicons name='arrow-back' color={COLORS.Text} size={40} />
                                </TouchableOpacity>
                                :
                                null

                        }

                        <Text style={{ fontSize: hp('2.5%'), fontWeight: 'bold', color: COLORS.Text, }}>Payment Method</Text>

                    </View>

                    <Text style={{ color: COLORS.Text, fontSize: hp('3%'), fontWeight: 'bold', marginTop: 20 }}>${price} {price !== undefined ? price === '5.99' ? "Monthly" : "Yearly" : "choosing plan"} </Text>

                    <TextInput
                        placeholder='Name'
                        style={{ height: 60, width: wp('20%'), backgroundColor: '#D3D3D3', borderRadius: 10, paddingHorizontal: 10, marginTop: 20 }}
                        value={'Billy joe'}
                    />

                    <TextInput
                        placeholder='XXXX XXXX XXXX XXXX'
                        style={{ height: 60, width: wp('40%'), backgroundColor: '#D3D3D3', borderRadius: 10, paddingHorizontal: 10, marginTop: 20 }}
                        maxLength={16}
                        value={'4242424242424242'}
                    />

                    <View style={{ flexDirection: 'row' }}>
                        <TextInput
                            placeholder='02/25'
                            style={{ height: 60, width: wp('20%'), backgroundColor: '#D3D3D3', borderRadius: 10, paddingHorizontal: 10, marginTop: 20 }}
                            value={'02/25'}
                        />
                        <TextInput
                            placeholder='999'
                            style={{ height: 60, width: wp('20%'), backgroundColor: '#D3D3D3', borderRadius: 10, paddingHorizontal: 10, marginTop: 20, marginLeft: 10 }}
                            value={'999'}
                        />
                    </View>




                    <TouchableOpacity onPress={() => onPayment()} style={{ width: wp('90%'), height: 60, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginTop: 20 }}>
                        {
                            Loading ?

                                <ActivityIndicator size={'small'} color={'white'} />
                                :

                                <Text style={{ alignSelf: 'center', color: 'white', fontSize: hp('2%'), fontWeight: 'bold' }} >Pay Now</Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Logout()} style={{ width: wp('90%'), height: 60, backgroundColor: colors.secondery, alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginTop: 10 }}>
                        <Text style={{ alignSelf: 'center', color: 'white', fontSize: hp('2%'), fontWeight: 'bold' }} >Logout</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginTop: 20 }}>
                        <Text style={{ alignSelf: 'center', color: COLORS.Text, textDecorationLine: 'underline', fontSize: hp('2%'), fontWeight: 'bold' }} onPress={() => toggleModal(price)}>Change Plan</Text>
                    </TouchableOpacity>

                    <Modal isVisible={isModalVisible}>
                        <View style={{ backgroundColor: COLORS.WHITE, borderRadius: 20, padding: 20, borderWidth: 1, borderColor: COLORS.Text }}>

                            <Text style={{ fontSize: hp('2.5%',), fontWeight: 'bold', alignSelf: 'center', color: COLORS.Text }}>Subscription plan</Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 20 }}>

                                <TouchableOpacity onPress={() => toggleModal('5.99')} style={{ height: 100, width: wp('39%'), backgroundColor: colors.secondery, alignItems: 'center', justifyContent: 'center', borderRadius: 10, }}>
                                    <Text style={{ fontSize: hp('2%'), fontWeight: 'bold', color: "white" }}>Monthly</Text>
                                    <Text style={{ fontSize: hp('2%'), fontWeight: 'bold', color: "white" }}>$5.99</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => toggleModal('70.00')} style={{ height: 100, width: wp('39%'), backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                    <Text style={{ fontSize: hp('2%'), fontWeight: 'bold', color: "white" }}>Yearly</Text>
                                    <Text style={{ fontSize: hp('2%'), fontWeight: 'bold', color: "white", marginTop: 10 }}>$70.00</Text>
                                </TouchableOpacity>
                            </View>


                        </View>
                    </Modal>


                </View>
            </SafeAreaView>
            <Toast />
        </>
    )
}

export default Payment