import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Alert,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Button, Icon, Image, Input } from "react-native-elements";
import CountryPicker from "react-native-country-picker-modal";
import { map, size, filter, isEmpty } from "lodash";
import MapView, { Marker } from "react-native-maps";

import {
  getCurrentLocation,
  loadImageFromGallery,
  validateEmail,
} from "../../utils/helpers";
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
  const [locationRestaurant, setLocationRestaurant] = useState(null);

  const addRestaurant = () => {
    if (!validateForm()) {
      return;
    }

    console.log("Correct form");
  };

  const validateForm = () => {
    clearErrors();
    let isValid = true;

    if (isEmpty(formData.name)) {
      setErrorName("You must enter the name of the Restaurant.");
      isValid = false;
    }

    if (isEmpty(formData.address)) {
      setErrorAddress("You must enter the address of the Restaurant.");
      isValid = false;
    }

    if (!validateEmail(formData.email)) {
      setErrorEmail("You must enter a valid email for the Restaurant.");
      isValid = false;
    }

    if (size(formData.phone) < 10) {
      setErrorPhone("You must enter a valid phone for the Restaurant.");
      isValid = false;
    }

    if (isEmpty(formData.description)) {
      setErrorDescription("You must enter the description of the Restaurant.");
      isValid = false;
    }

    if (!locationRestaurant) {
      toastRef.current.show("You must locate the restaurant on the map.", 3000);
      isValid = false;
    } else if (size(imagesSelected) === 0) {
      toastRef.current.show(
        "You must add at least one image to the Restaurant.",
        3000
      );
      isValid = false;
    }

    return isValid;
  };

  const clearErrors = () => {
    setErrorName(null);
    setErrorAddress(null);
    setErrorDescription(null);
    setErrorEmail(null);
    setErrorPhone(null);
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
        locationRestaurant={locationRestaurant}
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
        setLocationRestaurant={setLocationRestaurant}
        toastRef={toastRef}
      />
    </ScrollView>
  );
}

function MapRestaurant({
  isVisibleMap,
  setIsVisibleMap,
  setLocationRestaurant,
  toastRef,
}) {
  const [newRegion, setNewRegion] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getCurrentLocation();
      if (response.status) {
        setNewRegion(response.location);
      }
    })();
  }, []);

  const confirmLocation = () => {
    setLocationRestaurant(newRegion);
    toastRef.current.show("Location saved successfully.", 3000);
    setIsVisibleMap(false);
  };

  return (
    <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
      <View>
        {newRegion && (
          <MapView
            style={styles.mapStyle}
            initialRegion={newRegion}
            showsUserLocation={true}
            onRegionChange={(region) => setNewRegion(region)}
          >
            <Marker coordinate={newRegion} draggable />
          </MapView>
        )}
        <View style={styles.viewMapBtn}>
          <Button
            title="Save location"
            containerStyle={styles.viewMapBtnContainerSave}
            buttonStyle={styles.viewMapBtnSave}
            onPress={confirmLocation}
          />
          <Button
            title="Cancel location"
            containerStyle={styles.viewMapBtnContainerCancel}
            buttonStyle={styles.viewMapBtnCancel}
            onPress={() => setIsVisibleMap(false)}
          />
        </View>
      </View>
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
  locationRestaurant,
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
          color: locationRestaurant ? "#442484" : "#c2c2c2",
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
    address: "",
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

  mapStyle: {
    width: "100%",
    height: 550,
  },

  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },

  viewMapBtnContainerCancel: {
    paddingLeft: 15,
  },

  viewMapBtnContainerSave: {
    paddingRight: 15,
  },

  viewMapBtnCancel: {
    backgroundColor: "#a65273",
  },

  viewMapBtnSave: {
    backgroundColor: "#442484",
  },
});
