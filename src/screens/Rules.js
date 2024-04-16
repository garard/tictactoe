import { Text, View, ScrollView } from "react-native";
import Styles from "../components/Styles";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default Rules = function ({ navigation }) {
  const navToHome = () => navigation.navigate("Home");

  return (
    <SafeAreaView style={Styles.container}>
      <View style={[Styles.header, { flexDirection: "row", flexWrap: "wrap" }]}>
        <View
          style={[
            Styles.box,
            {
              height: 50,
              width: 150,
              backgroundColor: "white",
              marginVertical: "1.5%",
            },
          ]}
        >
          <Text style={{ fontSize: 20, textAlign: "center" }}>RULES</Text>
        </View>
      </View>
      <View
        style={[
          Styles.body,
          {
            borderWidth: 1,
            padding: 5,
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <View style={{ height: "90%", borderWidth: 1, marginHorizontal: 10 }}>
          <ScrollView>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 20, padding: 5 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Vitae congue mauris rhoncus aenean. Viverra aliquet eget sit
                amet tellus cras adipiscing. At auctor urna nunc id. Praesent
                semper feugiat nibh sed pulvinar proin gravida hendrerit lectus.
                Convallis convallis tellus id interdum velit laoreet id.
                Parturient montes nascetur ridiculus mus mauris vitae. Vulputate
                ut pharetra sit amet aliquam id. Gravida neque convallis a cras
                semper auctor neque vitae tempus. Sed lectus vestibulum mattis
                ullamcorper velit sed ullamcorper. Dolor sit amet consectetur
                adipiscing elit pellentesque habitant morbi. Netus et malesuada
                fames ac turpis egestas integer. Est pellentesque elit
                ullamcorper dignissim cras tincidunt lobortis. Nullam vehicula
                ipsum a arcu cursus vitae congue mauris. Risus sed vulputate
                odio ut enim. Purus in mollis nunc sed id semper risus in
                hendrerit. Faucibus vitae aliquet nec ullamcorper sit amet risus
                nullam. Ultricies tristique nulla aliquet enim tortor at auctor.
                Purus in massa tempor nec feugiat nisl pretium fusce. Sit amet
                nulla facilisi morbi tempus iaculis. Amet consectetur adipiscing
                elit pellentesque habitant morbi tristique senectus.
                Pellentesque elit eget gravida cum sociis. Fringilla phasellus
                faucibus scelerisque eleifend donec pretium vulputate. Urna
                cursus eget nunc scelerisque viverra mauris. Massa eget egestas
                purus viverra accumsan in nisl nisi. Id velit ut tortor pretium
                viverra suspendisse. Rutrum quisque non tellus orci ac auctor
                augue mauris augue. Magna fermentum iaculis eu non diam
                phasellus vestibulum lorem. Sit amet dictum sit amet.
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>

      <View style={Styles.footer}>
        <View
          style={[
            Styles.box,
            { height: 50, width: 150, borderRadius: 50 },
            { backgroundColor: "skyblue" },
          ]}
        >
          <Text style={{ fontSize: 20 }} onPress={navToHome}>
            Back
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
