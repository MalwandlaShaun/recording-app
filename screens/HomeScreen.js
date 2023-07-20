import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
//import { auth } from "../config/firebase";
import auth from "../config/firebase";
import { signOut } from "firebase/auth";
import Audio from "../audio";

//import Audio from "../audio.js"

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <Audio />
        <TouchableOpacity onPress={handleSignOut} style={styles.button}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
