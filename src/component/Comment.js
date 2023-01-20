import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Ionicons from 'react-native-vector-icons/Ionicons'
const Comment = (props) => {
    return (

        <View style={{ width: wp('80%'), alignSelf: 'center', padding: 20, }}>
            <Text style={{ fontSize: hp('2.5%'), fontWeight: 'bold', color: 'black', }}>Comments</Text>


            <View style={{ flexDirection: 'row', alignItems: 'center' ,marginTop:10,}}>
                <TextInput
                    style={{ height: 60, width: wp('70'), borderWidth: 1, borderColor: 'gray', borderRadius: 10, paddingHorizontal: 20, }}
                    placeholder={"Comment here"}
                    placeholderTextColor={"gray"}
                    onChangeText={(txt) => {
                        props.onState(txt)
                    }}

                    value={props.val}
                />

                <TouchableOpacity onPress={props.onSendComment} style={{ backgroundColor: 'white', borderRadius: 100, alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
                    <Ionicons name='send' color={'black'} size={40} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Comment