import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export const url = "http://192.168.214.240:8000/destinations";

const DetailsScreen = ({ route, navigation, deleteDestinationAwait }) => {
    const { id } = route.params;
    const [destination, setDestination] = useState(null);
    const [favorites, setFavorites] = useState(0); 

    useEffect(() => {
        const fetchDestination = async () => {
            try {
                const response = await fetch(`${url}/${id}`);
                const data = await response.json();
                setDestination(data);
                setFavorites(data.favorites); 
            } catch (error) {
                console.error("Error fetching destination: ", error);
            }
        };

        fetchDestination();
    }, [id]);

    const handleDelete = async () => {
        await deleteDestinationAwait(id);
        navigation.reset({
            index: 0,
            routes: [{ name: "UCU travel" }],
        });
    };

    const handleNavigation = () => {
        navigation.navigate("EditionPage", { id });
    };

    const handleLike = async () => {
        try {
            const newFavorites = favorites + 1;
            setFavorites(newFavorites);

            await fetch(`http://192.168.214.240:8000/destinations/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ favorites: newFavorites }),
            });
        } catch (error) {
            console.error("Error al actualizar los favoritos:", error);
        }
    };

    const getDifficultyStyle = (difficulty) => {
        switch (difficulty) {
            case "Fácil":
                return styles.easyTag;
            case "Moderada":
                return styles.moderateTag;
            case "Difícil":
                return styles.hardTag;
            default:
                return styles.defaultTag;
        }
    };

    if (!destination) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4361ee" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.contenedor}>
                    <Text style={styles.name}>{destination.name}</Text>
                    <Text style={[styles.tag, getDifficultyStyle(destination.difficulty)]}>
                        {destination.difficulty}
                    </Text>
                    <Text style={styles.description}>{destination.description}</Text>
                    <View style={styles.likesContainer}>
                        <Text style={styles.description}>{favorites} Likes</Text>
                        <TouchableOpacity onPress={handleLike}>
                            <FontAwesome name="heart" size={24} color="#ff4757" />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleDelete}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleNavigation}>
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 20,
        alignItems: "center",
        color: "#000000",
    },
    container: {
        flex: 1,
        backgroundColor: "#000000",
    },
    contenedor: {
        width: "100%",
        alignItems: "center",
        backgroundColor: "#000000",
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
        backgroundColor: "#000000",
    },
    name: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#ffffff",
        marginBottom: 10,
        textAlign: "center",
    },
    description: {
        fontSize: 18,
        color: "#cccccc",
        textAlign: "center",
        marginTop: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        paddingVertical: 15,
        gap: 10,
        marginBottom: 40,
        paddingHorizontal: 20,
        justifyContent: "center",
    },
    button: {
        backgroundColor: "#f0a6ca",
        width: "45%",
        borderRadius: 15,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 18,
        color: "#ffffff",
        fontWeight: "bold",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000",
    },
    loadingText: {
        fontSize: 18,
        color: "#ffffff",
    },
    likesContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
    },
    tag: {
        fontSize: 14,
        fontWeight: "bold",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 15,
        textAlign: "center",
        alignSelf: "flex-start",
        marginTop: 10,
    },
    easyTag: {
        backgroundColor: "green",
        color: "#ffffff",
    },
    moderateTag: {
        backgroundColor: "yellow",
        color: "#000000",
    },
    hardTag: {
        backgroundColor: "purple",
        color: "#ffffff",
    },
    defaultTag: {
        backgroundColor: "gray",
        color: "#ffffff",
    },
});

export default DetailsScreen;


// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";

// export const url = "http://172.20.10.4:8000/destinations";

// const DetailsScreen = ({ route, navigation, deleteDestinationAwait }) => {
//     const { id } = route.params;
//     const [destination, setDestination] = useState(null);
//     const [favorites, setFavorites] = useState(destination.favorites);

//     useEffect(() => {
//         const fetchDestination = async () => {
//             try {
//                 const response = await fetch(`${url}/${id}`);
//                 const data = await response.json();
//                 setDestination(data);
//             } catch (error) {
//                 console.error("Error fetching destination: ", error);
//             }
//         };

//         fetchDestination();
//     }, [id]);

//     const handleDelete = async () => {
//         await deleteDestinationAwait(id)
//         navigation.reset({
//             index: 0,
//             routes: [{ name: "UCU travel" }],
//         });
//     };

//     const handleNavigation = () => {
//         navigation.navigate("EditionPage", { id });
//     };

//     if (!destination) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="medium" color="#4361ee" />
//             </View>
//         );
//     }

//     const handleLike = async () => {
//         try {
//             const newFavorites = favorites + 1;
//             setFavorites(newFavorites);

//             await fetch(`http://172.20.10.4:8000/destinations/${id}`, {
//                 method: "PATCH",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ favorites: newFavorites }),
//             });
//         } catch (error) {
//             console.error("Error al actualizar los favoritos:", error);
//         }
//     };

//     const getDifficultyStyle = (difficulty) => {
//         switch (difficulty) {
//             case "Fácil":
//                 return styles.easyTag;
//             case "Moderada":
//                 return styles.moderateTag;
//             case "Difícil":
//                 return styles.hardTag;
//             default:
//                 return styles.defaultTag;
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <ScrollView contentContainerStyle={styles.scrollContainer}>
//                 <View style={styles.contenedor}>
//                     <Text style={styles.name}>{destination.name}</Text>
//                     <Text style={[styles.tag, getDifficultyStyle(destination.difficulty)]}>
//                         {destination.difficulty}
//                     </Text>
//                     <Text style={styles.description}>{destination.description}</Text>
//                     <View style={styles.likesContainer}>
//                         <Text style={styles.description}>{destination.favorites} Likes</Text>
//                         <TouchableOpacity onPress={handleLike}>
//                             <FontAwesome name="heart" size={24} color="#ff4757" />
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </ScrollView>
//             <View style={styles.buttonContainer}>
//                 <TouchableOpacity style={styles.button} onPress={handleDelete}>
//                     <Text style={styles.buttonText}>Delete</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.button} onPress={handleNavigation}>
//                     <Text style={styles.buttonText}>Edit</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     scrollContainer: {
//         padding: 20,
//         alignItems: "center",
//         color: "#000000",
//     },
//     container: {
//         flex: 1,
//         backgroundColor: "#000000",
//     },
//     contenedor: {
//         width: "100%",
//         alignItems: "center",
//         backgroundColor: "#000000",
//     },
//     image: {
//         width: 200,
//         height: 200,
//         marginBottom: 20,
//         backgroundColor: "#000000",
//     },
//     name: {
//         fontSize: 30,
//         fontWeight: "bold",
//         color: "#ffffff",
//         marginBottom: 10,
//         textAlign: "center",
//     },
//     description: {
//         fontSize: 18,
//         color: "#cccccc",
//         textAlign: "center",
//         marginTop: 10,
//     },
//     buttonContainer: {
//         flexDirection: "row",
//         paddingVertical: 15,
//         gap: 10,
//         marginBottom: 40,
//         paddingHorizontal: 20,
//         justifyContent: "center",
//     },
//     button: {
//         backgroundColor: "#f0a6ca",
//         width: "45%",
//         borderRadius: 15,
//         height: 50,
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     buttonText: {
//         fontSize: 18,
//         color: "#ffffff",
//         fontWeight: "bold",
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#000000",
//     },
//     loadingText: {
//         fontSize: 18,
//         color: "#ffffff",
//     },
//     likesContainer: {
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//         marginVertical: 10,
//     },
//     tag: {
//         fontSize: 14,
//         fontWeight: "bold",
//         paddingVertical: 5,
//         paddingHorizontal: 10,
//         borderRadius: 15,
//         textAlign: "center",
//         alignSelf: "flex-start",
//         marginTop: 10,
//     },
//     easyTag: {
//         backgroundColor: "green",
//         color: "#ffffff",
//     },
//     moderateTag: {
//         backgroundColor: "yellow",
//         color: "#000000",
//     },
//     hardTag: {
//         backgroundColor: "purple",
//         color: "#ffffff",
//     },
//     defaultTag: {
//         backgroundColor: "gray",
//         color: "#ffffff",
//     },
// });

// export default DetailsScreen;