import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { map } from "lodash";
import { Icon, ListItem } from "react-native-elements";

import Modal from "../Modal";
import ChangeDisplayNameForm from "./ChangeDisplayNameForm";
import ChangeEmailForm from "./ChangeEmailForm";

export default function AccountOptions({ user, toastRef, setReloadUser }) {
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);

  const generateOptions = () => {
    return [
      {
        title: "Change Name and Second Name",
        iconNameLeft: "account-circle",
        iconColorLeft: "#a7bfd3",
        iconNameRight: "chevron-right",
        iconColorRight: "#a7bfd3",
        onPress: () => selectedComponent("displayName"),
      },

      {
        title: "Change Email",
        iconNameLeft: "at",
        iconColorLeft: "#a7bfd3",
        iconNameRight: "chevron-right",
        iconColorRight: "#a7bfd3",
        onPress: () => selectedComponent("email"),
      },

      {
        title: "Change Password",
        iconNameLeft: "lock-reset",
        iconColorLeft: "#a7bfd3",
        iconNameRight: "chevron-right",
        iconColorRight: "#a7bfd3",
        onPress: () => selectedComponent("password"),
      },
    ];
  };

  const selectedComponent = (key) => {
    switch (key) {
      case "displayName":
        setRenderComponent(
          <ChangeDisplayNameForm
            displayName={user.displayName}
            setShowModal={setShowModal}
            toastRef={toastRef}
            setReloadUser={setReloadUser}
          />
        );
        break;
      case "email":
        setRenderComponent(
          <ChangeEmailForm
            email={user.email}
            setShowModal={setShowModal}
            toastRef={toastRef}
            setReloadUser={setReloadUser}
          />
        );
        break;
      case "password":
        setRenderComponent(<Text>Password</Text>);
        break;
    }

    setShowModal(true);
  };

  const menuOptions = generateOptions();

  return (
    <View>
      {map(menuOptions, (menu, index) => (
        <ListItem key={index} style={styles.menuItem} onPress={menu.onPress}>
          <Icon
            type="material-community"
            name={menu.iconNameLeft}
            color={menu.iconColorLeft}
          />
          <ListItem.Content>
            <ListItem.Title>{menu.title}</ListItem.Title>
          </ListItem.Content>
          <Icon
            type="material-community"
            name={menu.iconNameRight}
            color={menu.iconColorRight}
          />
        </ListItem>
      ))}
      <Modal isVisible={showModal} setVisible={setShowModal}>
        {renderComponent}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#a7bfd3",
  },
});
