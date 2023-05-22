import React, { useState } from 'react';
import { View, TextInput, FlatList, Text } from 'react-native';
import { A, B, C, F, G, H, K, L, M, N, P, R, S, U, V, X, Y } from '../arrayindex/Alphabet'


const DemoSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const performSearch = (query) => {
        const filteredItems = items.filter((item) => {
            return item.name.toLowerCase().includes(query.toLowerCase());
        });

        setSearchResults(filteredItems);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        performSearch(query);
    };


    return (
        <View>
            <TextInput
                placeholder="Search"
                value={searchQuery}
                onChangeText={handleSearch}
            />

            <FlatList
                data={searchResults}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.name}</Text>
                    </View>
                )}
            />

        </View>

    )
}

export default DemoSearch