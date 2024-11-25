
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const AddScreen = ({ createDestinationAwait, getDestinationsAwait }) => {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            createDestinationAwait,
            getDestinationsAwait,
        });
    }, []);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [favorites, setFavorites] = useState("");
    const [difficulty, setDifficulty] = useState("");

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

    const handleCreateDestination = () => {
        if (!name || !description || !favorites || !difficulty) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        const newDestination = {
            name,
            description,
            favorites: parseInt(favorites) || 0,
            difficulty,
        };

        createDestinationAwait(newDestination);
        navigation.reset({
            index: 0,
            routes: [{ name: "UCU travel" }],
        });
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.headerText}>New Destination</Text>
            <TextInput
                style={styles.input}
                placeholder="Destination Name"
                placeholderTextColor="#aaa"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                placeholderTextColor="#aaa"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Favorites"
                placeholderTextColor="#aaa"
                keyboardType="numeric"
                value={favorites}
                onChangeText={setFavorites}
            />
            <TextInput
                style={styles.input}
                placeholder="Difficulty (e.g., Fácil, Moderada, Difícil)"
                 placeholderTextColor="#aaa"
                value={difficulty}
                 onChangeText={setDifficulty}
            /> 
            <Text style={[styles.tag, getDifficultyStyle(difficulty)]}>
                {difficulty || "Select Difficulty"}
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleCreateDestination}>
                <Text style={styles.buttonText}>Create Destination</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#000000",
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ffffff",
        textAlign: "center",
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        alignSelf: "center",
        marginBottom: 20,
    },
    input: {
        backgroundColor: "#222222",
        color: "#ffffff",
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#f0a6ca",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
    cancelButton: {
        backgroundColor: "#555555",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    cancelButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
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

export default AddScreen;