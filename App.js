import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setData(response.data);
      setShowData(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderTable = () => {
    if (showData) {
      const tableHead = ["ID", "Title", "Price"];
      const tableData = data.map((item) => [
        item.id.toString(),
        item.title,
        item.price.toString(),
      ]);

      return (
        <Table
          borderStyle={{
            borderWidth: 2,
            borderColor: "black",
            borderTopWidth: 80,
          }}
        >
          <Row data={tableHead} style={styles.head} textStyle={styles.texth} />
          <Rows data={tableData} textStyle={styles.text} />
        </Table>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Show Data" onPress={fetchData} />

      {renderTable()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 60,
    paddingTop: 30,
  },
  head: {
    height: 40,
    backgroundColor: "plum",
  },
  texth: {
    margin: 15,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  text: {
    margin: 13,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default App;
