import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Alert,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { Avatar, Button, Icon, Image, Input } from "react-native-elements";
import CountryPicker from "react-native-country-picker-modal";
import { map, size, filter } from "lodash";

import { loadImageFromGallery } from "../../utils/helpers";
import Modal from "../Modal";

const widthScreen = Dimensions.get("window").width;

export default function AddRestaurantForm({
  toastRef,
  setLoading,
  navigation,
}) {
  const [formData, setFormData] = useState(defaultFormValues());
  const [errorName, setErrorName] = useState(null);
  const [errorDescription, setErrorDescription] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorAddress, setErrorAddress] = useState(null);
  const [errorPhone, setErrorPhone] = useState(null);
  const [imagesSelected, setImagesSelected] = useState([]);
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationrestaurant, setLocationrestaurant] = useState(null);

  const addRestaurant = () => {
    console.log(formData);
  };

  return (
    <ScrollView style={styles.viewContainer}>
      <ImageRestaurant imageRestaurant={imagesSelected[0]} />
      <FormAdd
        formData={formData}
        setFormData={setFormData}
        errorName={errorName}
        errorDescription={errorDescription}
        errorEmail={errorEmail}
        errorAddress={errorAddress}
        errorPhone={errorPhone}
        setIsVisibleMap={setIsVisibleMap}
      />
      <UploadImage
        toastRef={toastRef}
        imagesSelected={imagesSelected}
        setImagesSelected={setImagesSelected}
      />
      <Button
        title="Create Restaurant"
        onPress={addRestaurant}
        buttonStyle={styles.btnAddRestaurant}
      />
      <MapRestaurant
        isVisibleMap={isVisibleMap}
        setIsVisibleMap={setIsVisibleMap}
        setLocationrestaurant={setLocationrestaurant}
        toastRef={toastRef}
      />
    </ScrollView>
  );
}

function MapRestaurant({
  isVisibleMap,
  setIsVisibleMap,
  setLocationrestaurant,
  toastRef,
}) {
  return (
    <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
      <Text>map goes here!</Text>
    </Modal>
  );
}

function ImageRestaurant({ imageRestaurant }) {
  return (
    <View style={styles.viewPhoto}>
      <Image
        style={{ width: widthScreen, height: 200 }}
        source={
          imageRestaurant
            ? { uri: imageRestaurant }
            : require("../../assets/no-image.png")
        }
      />
    </View>
  );
}

function UploadImage({ toastRef, imagesSelected, setImagesSelected }) {
  const imageSelected = async () => {
    const response = await loadImageFromGallery([4, 3]);

    if (!response.status) {
      toastRef.current.show("You did not select any images.", 3000);
    }

    setImagesSelected([...imagesSelected, response.image]);
  };

  const removeImage = (image) => {
    Alert.alert(
      "Delete Image",
      "¿Are you sure you want delete this image?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            setImagesSelected(
              filter(imagesSelected, (imageUrl) => imageUrl !== image)
            );
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView horizontal styles={styles.viewImages}>
      {size(imagesSelected) < 10 && (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.containerIcon}
          onPress={imageSelected}
        />
      )}
      {map(imagesSelected, (imageRestaurant, index) => (
        <Avatar
          key={index}
          style={styles.miniatureStyles}
          source={{ uri: imageRestaurant }}
          onPress={() => removeImage(imageRestaurant)}
        />
      ))}
    </ScrollView>
  );
}

function FormAdd({
  formData,
  setFormData,
  errorName,
  errorDescription,
  errorEmail,
  errorAddress,
  errorPhone,
  setIsVisibleMap,
}) {
  const [country, setCountry] = useState("AR");
  const [callingCode, setCallingCode] = useState("54");
  const [phone, setPhone] = useState("");

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Restaurant Name"
        defaultValue={formData.name}
        onChange={(e) => onChange(e, "name")}
        errorMessage={errorName}
      />
      <Input
        placeholder="Restaurant Address"
        defaultValue={formData.address}
        onChange={(e) => onChange(e, "address")}
        errorMessage={errorAddress}
        rightIcon={{
          type: "material-community",
          name: "google-maps",
          color: "#c2c2c2",
          onPress: () => setIsVisibleMap(true),
        }}
      />
      <Input
        placeholder="Restaurant Email"
        keyboardType="email-address"
        defaultValue={formData.email}
        onChange={(e) => onChange(e, "email")}
        errorMessage={errorEmail}
      />
      <View style={styles.phoneView}>
        <CountryPicker
          withFlag
          withCallingCode
          withFilter
          withCallingCodeButton
          containerStyle={styles.countryPicker}
          countryCode={formData.country}
          onSelect={(country) => {
            setFormData({
              ...formData,
              country: country.cca2,
              callingCode: country.callingCode[0],
            });
          }}
        />
        <Input
          placeholder="Restaurant WhatsApp..."
          keyboardType="phone-pad"
          containerStyle={styles.inputPhone}
          defaultValue={formData.phone}
          onChange={(e) => onChange(e, "phone")}
          errorMessage={errorPhone}
        />
      </View>
      <Input
        placeholder="Restaurant Description..."
        multiline
        containerStyle={styles.textArea}
        defaultValue={formData.description}
        onChange={(e) => onChange(e, "description")}
        errorMessage={errorDescription}
      />
    </View>
  );
}

const defaultFormValues = () => {
  return {
    name: "",
    description: "",
    email: "",
    phone: "",
    country: "AR",
    callingCode: "57",
  };
};

const styles = StyleSheet.create({
  viewContainer: {
    height: "100%",
  },

  viewForm: {
    marginHorizontal: 10,
  },

  textArea: {
    height: 100,
    width: "100%",
  },

  phoneView: {
    width: "80%",
    flexDirection: "row",
  },

  inputPhone: {
    width: "80%",
  },

  btnAddRestaurant: {
    margin: 20,
    backgroundColor: "#442484",
  },

  viewImages: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 30,
  },

  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3",
  },

  miniatureStyles: {
    width: 70,
    height: 70,
    marginRight: 10,
  },

  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20,
  },
});
