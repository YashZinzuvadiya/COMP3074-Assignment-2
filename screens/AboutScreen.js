import { View, Text, Button, StyleSheet } from 'react-native';

// Simple screen that shows the student's name and ID.
export default function AboutScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Yash Zinzuvadiya</Text>
      <Text style={styles.text}>Student ID: 101475983</Text>
      {/* Button to go back to the Main screen */}
      <Button title="Back to Main" onPress={() => navigation.navigate('Main')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 22, marginBottom: 16 },
});
