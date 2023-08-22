import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  timeStamp: {
    textAlign: "right",
    fontSize: 9,
    color: "gray",
    marginTop: 5,
  },
  chatInput: {
    width: Dimensions.get("screen").width - 50,
    backgroundColor: "#fff",
    padding: 5,
    margin: 5,
  },

  white: { backgroundColor: "#ffffff", margin: 5 },
  badge: {
    top: 0,
    right: 6,
    bottom: 8,
    position: "absolute",
  },

  inputField: {
    margin: 10,
    padding: 5,
    width: Dimensions.get("screen").width - 40,
    backgroundColor: "#fff",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },

  welcomeTxt: {
    fontSize: 40,
    textAlign: "right",
  },

  logo: {
    height: 60,
    width: 60,
    margin:4
  },
  bottomView: {
    display: "flex",
    padding: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    elevation: 7,
    alignItems: "center",
    bottom: 0,
  },
  row: {
    display: "flex",
    padding: 2,
    flexDirection: "row",
    // justifyContent: "center",
  },
  row0: {
    display: "flex",
    padding: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  searchBar: {
    width: Dimensions.get("screen").width - 30,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    elevation: 10,
  },
  card: {
    width: Dimensions.get("screen").width - 30,
    padding: 5,
    margin: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
    backgroundColor: "#ffffff",
    borderRadius: 5,
  },
  row1: {
    padding: 2,
    margin: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    margin: 2,
    padding: 2,
    fontSize:20,
    color:"black"
  },

  qtybtn: { backgroundColor: "#87CEFA" },
  btn: {
    margin: 5,
    padding: 5,
    backgroundColor: "#87CEFA",
    borderRadius: 5,
    elevation: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // width: 60,
  },
  txt: {
    borderRadius: 8,
    width: "50%",
    padding: 2,
    margin: 2,
    elevation: 4,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
