import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from "./pages/Home";
import DetailsScreen from "./pages/Details";
import AddScreen from "./pages/AddPage";
import EditScreen from "./pages/EditionPage";

const Stack = createNativeStackNavigator();
export const url = "http://192.168.214.240:8000/destinations";

export default function App() {
  const [destinations, setDestinations] = useState([]);

  async function fetchDestinations() {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error fetching data: ", error);
      return [];
    }
  }

  function getDestinationsAwait() {
    fetchDestinations()
      .then((data) => {
        if (data.length > 0) {
          setDestinations(data);
        } else {
          console.log("No destinations found.");
        }
      })
      .catch((error) => console.error("Error fetching destinations:", error));
  }

  useEffect(() => {
    getDestinationsAwait();
  }, []);

  async function createDestination(newDestination) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDestination),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error creating destination: ", error);
      return null;
    }
  }

  function createDestinationAwait(newDestination) {
    createDestination(newDestination)
      .then((createdDestination) => {
        if (createdDestination) {
          setDestinations((prev) => [...prev, createdDestination]);
        } else {
          console.log("Failed to create destination.");
        }
      })
      .catch((error) => console.error("Error creating destination:", error));
  }

  async function updateDestination(id, updatedFields) {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error updating destination: ", error);
      return null;
    }
  }

  function updateDestinationAwait(id, updatedFields) {
    updateDestination(id, updatedFields)
      .then((updatedDestination) => {
        if (updatedDestination) {
          setDestinations((prev) =>
            prev.map((destination) =>
              destination.id === id ? { ...destination, ...updatedDestination } : destination
            )
          );
        } else {
          console.log("Failed to update destination.");
        }
      })
      .catch((error) => console.error("Error updating destination:", error));
  }

  async function deleteDestination(id) {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        return true;
      } else {
        console.log(`Failed to delete destination with ID ${id}`);
        return false;
      }
    } catch (error) {
      console.log("Error deleting destination: ", error);
      return false;
    }
  }

  function deleteDestinationAwait(id) {
    deleteDestination(id)
      .then((success) => {
        if (success) {
          setDestinations((prev) => prev.filter((destination) => destination.id !== id));
        } else {
          console.log(`Failed to delete destination with ID ${id}.`);
        }
      })
      .catch((error) => console.error("Error deleting destination:", error));
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="UCU travel">
          {(props) => <HomeScreen {...props} destinations={destinations} />}
        </Stack.Screen>
        <Stack.Screen name="Details">
            {(props) => (
                <DetailsScreen
                    {...props}
                    getDestinationsAwait={getDestinationsAwait}
                    deleteDestinationAwait={deleteDestinationAwait}
                />
            )}
        </Stack.Screen>
        <Stack.Screen name="EditionPage">
            {(props) => (
                <EditScreen
                    {...props}
                    updateDestinationAwait={updateDestinationAwait}
                    getDestinationsAwait={getDestinationsAwait}
                />
            )}
        </Stack.Screen>
        <Stack.Screen name="AddPage">
            {(props) => (
                <AddScreen
                    {...props}
                    createDestinationAwait={createDestinationAwait}
                    getDestinationsAwait={getDestinationsAwait}
                />
            )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});
