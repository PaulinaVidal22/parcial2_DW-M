import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, ScrollView, Platform, TouchableOpacity, Text } from "react-native";

const HomeScreen = ({ destinations }) => {
    const [sortedDestinations, setSortedDestinations] = useState([]);
    const navigation = useNavigation();

    const handleNavigation = () => {
        navigation.navigate("AddPage");
    };

    useEffect(() => {
        const sorted = [...destinations].sort((a, b) => b.favorites - a.favorites);
        setSortedDestinations(sorted);
    }, [destinations]);

    return (
        <>
            <View style={{ backgroundColor: "#000000", paddingVertical: 15, gap: 10, paddingHorizontal: 20, alignContent: "center" }}>
                {Platform.OS === 'ios' ? (
                    <TouchableOpacity
                        style={{ backgroundColor: "#84a98c", width: "45%", marginLeft: 'auto', marginRight: 30, alignContent: "center", borderRadius: 15, alignSelf: "flex-end" }}
                        onPress={handleNavigation}
                    >
                        <Text style={[styles.button, { textAlign: "center", color: "#ffffff" }]}>Create Destination</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={{ backgroundColor: "#4361ee", width: "45%", marginRight: 'auto', marginLeft: 25, alignContent: "center", borderRadius: 15, alignSelf: "flex-start" }}
                        onPress={handleNavigation}
                    >
                        <Text style={[styles.button, { textAlign: "center", color: "#000000" }]}>Add Destination</Text>
                    </TouchableOpacity>
                )}
            </View>
            <ScrollView style={{ alignContent: "center", backgroundColor: "#000000" }}>
                {sortedDestinations.map((destination) => (
                    <Card key={destination.id.toString()} destination={destination} />
                ))}
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    button: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 10,
        color: "#ffffff",
        alignSelf: "center",
        justifyContent: "center",
        width: 150,
        maxWidth: 150,
    },
});

export default HomeScreen;


// import React, {useEffect, useState} from "react";
// import Card from "../components/Card";
// import { useNavigation } from "@react-navigation/native";
// import { FlatList, TouchableOpacity, Text, StyleSheet, View, ScrollView, Platform } from "react-native";

// const HomeScreen = ({destinations}) => {
//     const [sortedDestinations, setSortedDestinations] = useState(destinations);
//     const navigation = useNavigation();

//     const handleNavigation = () => {
//         navigation.navigate("AddPage");
//     };

//     useEffect(() => {
//         setSortedDestinations(destinations);
//     }, [destinations]);

//     const handleOrder = () => {
//         const sorted = [...destinations].sort((a, b) => b.favorites - a.favorites);
//         setSortedDestinations(sorted);
//     };

//     return (
//         <>
//             <View style={{backgroundColor: "#000000", paddingVertical: 15, gap: 10, paddingHorizontal: 20, alignContent: "center"}}>
//                 <TouchableOpacity style={{backgroundColor: "#f0a6ca", width: "85%", alignContent: "center", borderRadius: 15, alignSelf: "center"}} onPress={handleOrder}>
//                     <Text style={[styles.button, {textAlign: "center", color: "#ffffff"}]}>Sort Destinations</Text>
//                 </TouchableOpacity>
//             {Platform.OS === 'ios' ? (
//                 <TouchableOpacity style={{backgroundColor: "#84a98c", width: "45%", marginLeft: 'auto', marginRight: 30, alignContent: "center", borderRadius: 15, alignSelf: "flex-end"}} onPress={handleNavigation}>
//                     <Text style={[styles.button, {textAlign: "center", color: "#ffffff"}]}>Create Destination</Text>
//                 </TouchableOpacity>
//             ) : (
//                 <TouchableOpacity style={{backgroundColor: "#4361ee", width: "45%", marginRight: 'auto', marginLeft: 25, alignContent: "center", borderRadius: 15, alignSelf: "flex-start"}} onPress={handleNavigation}>
//                     <Text style={[styles.button, {textAlign: "center", color: "#000000"}]}>Add Destination</Text>
//                 </TouchableOpacity>
//             )}
//             </View>
//             <ScrollView style={{ alignContent: "center", backgroundColor: "#000000" }}>
//                 {sortedDestinations.map((destination) => (
//                     <Card key={destination.id.toString()} destination={destination} />
//                 ))}
//             </ScrollView>
//         </>
//     );
// };

// const styles = StyleSheet.create({
//     button: {
//         fontSize: 20,
//         fontWeight: "bold",
//         marginBottom: 10,
//         marginTop: 10,
//         color: "#ffffff",
//         alignSelf: "center",
//         justifyContent: "center",
//         width: 150,
//         maxWidth: 150,
//     },
// });

// export default HomeScreen;
