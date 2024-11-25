import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons"; 

const Card = ({ destination }) => {
    const [favorites, setFavorites] = useState(destination.favorites);
    const navigation = useNavigation();
    const id = destination.id;

    const handleNavigation = () => {
        navigation.navigate("Details", { id });
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

    return (
        <TouchableOpacity onPress={handleNavigation} style={styles.card}>
            <View style={styles.container}>
                <Text style={styles.text}>{destination.name}</Text>
                <View style={styles.likesContainer}>
                    <Text style={styles.description}>{destination.favorites} Likes</Text>
                    <TouchableOpacity onPress={handleLike}>
                        <FontAwesome name="heart" size={24} color="#ff4757" />
                    </TouchableOpacity>
                </View>
                <Text style={[styles.tag, getDifficultyStyle(destination.difficulty)]}>
                    {destination.difficulty}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        height: 170,
        width: "80%",
        minWidth: 250,
        margin: 10,
        alignSelf: "center",
        marginBottom: 0,
        paddingBottom: 0,
        borderColor: "#ffffff",
        borderWidth: 2,
        borderRadius: 10,
    },
    container: {
        backgroundColor: "#000000",
        padding: 15,
        margin: 0,
        borderRadius: 10,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#ffffff",
        alignSelf: "center",
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        textAlign: "justify",
        marginVertical: 12,
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

export default Card;
