import { View, Text, ImageBackground, TextInput, TouchableOpacity, Image, ActivityIndicator, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { COLORS } from '../../utils/COLORS';
import Icon from 'react-native-vector-icons/AntDesign'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

const AllNotes = ({navigation}) => {
  const [Notes, setAllNotes] = useState()
  useEffect(() => {
    getAllNotes()
  }, [])

  const getAllNotes = () => {
    firestore()
      .collection('AllAppNotes')
      .get()
      .then((querySnapshot) => {
        const notes = [];
        querySnapshot.forEach((doc) => {
          notes.push(doc.data());
        });

        // Sort the notes array in descending order by the createAt timestamp
        const sortedNotes = notes.sort((a, b) => b.createAt.seconds - a.createAt.seconds);

        setAllNotes(sortedNotes);
      });
  };

  return (
    <ImageBackground source={require('../../assets/images/hi.jpeg')}  style={{ flex: 1, padding: 20 }}>

      <View style={{ flexDirection: 'row', width: wp('70%'), justifyContent: 'space-between', marginBottom: 20 }}>

        <TouchableOpacity onPress={() => navigation.goBack()} style={{ height: 60, padding: 10,  }}>
          <Icon name='back' color={'black'} size={30} />
        </TouchableOpacity>

      </View>

      <FlatList
        data={Notes}
        renderItem={({ item }) => {



          const milliseconds = item.createAt.seconds * 1000 + Math.floor(item.createAt.nanoseconds / 1000000);

          const date = new Date(milliseconds);
          const year = date.getFullYear();
          const formattedDate = date.toLocaleString('en-US', { dateStyle: 'medium' });
          const formattedTime = date.toLocaleTimeString('en-US', { timeStyle: 'short' });



          console.log("item", year, formattedDate, formattedTime)
          return (
            <View style={{ backgroundColor: COLORS.WHITE, borderRadius: 10, padding: 10, marginTop:10 }}>
              <Text style={{ color: "black", fontSize: 24 }}>{item?.NoteMsg}</Text>

              <Text style={{ color: "black", fontSize: 14, alignSelf:'flex-end' }}>{formattedDate}, {formattedTime}</Text>

            </View>
          )
        }}

      />
    </ImageBackground>
  )
}

export default AllNotes