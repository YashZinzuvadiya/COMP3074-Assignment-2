import { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';

// Turns the typed text into a number, or returns null if it is empty/invalid/negative.
function parseInput(text) {
  const value = parseFloat(text);
  if (text.trim() === '' || isNaN(value) || value < 0) return null;
  return value;
}

export default function MainScreen({ navigation }) {
  // State for the three inputs (kept as text) ...
  const [hours, setHours] = useState('');
  const [rate, setRate] = useState('');
  const [taxRate, setTaxRate] = useState('');
  // ... and for the results and error message.
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculate = () => {
    const h = parseInput(hours);
    const r = parseInput(rate);
    const t = parseInput(taxRate);

    // Validation: stop if any field is empty or not a valid number.
    if (h === null || r === null || t === null) {
      setError('Please enter valid non-negative numbers in all fields.');
      setResult(null);
      return;
    }
    setError('');

    let pay;
    let overtimePay;
    if (h <= 40) {
      pay = h * r;
      overtimePay = 0;
    } else {
      pay = 40 * r;
      overtimePay = (h - 40) * r * 1.5;
    }
    const totalPay = pay + overtimePay;
    // Tax rate is typed as a percent (e.g. 15), so divide by 100.
    const tax = pay * (t / 100);

    setResult({ pay, overtimePay, totalPay, tax });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput style={styles.input} placeholder="Hours worked" keyboardType="numeric"
        value={hours} onChangeText={setHours} />
      <TextInput style={styles.input} placeholder="Hourly rate ($)" keyboardType="numeric"
        value={rate} onChangeText={setRate} />
      <TextInput style={styles.input} placeholder="Tax rate (%)" keyboardType="numeric"
        value={taxRate} onChangeText={setTaxRate} />

      <Button title="Calculate" onPress={calculate} />

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      {result && (
        <View style={styles.results}>
          <Text style={styles.resultText}>Pay: ${result.pay.toFixed(2)}</Text>
          <Text style={styles.resultText}>Overtime pay: ${result.overtimePay.toFixed(2)}</Text>
          <Text style={styles.resultText}>Total pay: ${result.totalPay.toFixed(2)}</Text>
          <Text style={styles.resultText}>Tax: ${result.tax.toFixed(2)}</Text>
        </View>
      )}

      <View style={styles.aboutButton}>
        <Button title="About" onPress={() => navigation.navigate('About')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, borderColor: '#999', borderRadius: 6, padding: 10, marginBottom: 12, fontSize: 16 },
  error: { color: 'red', marginTop: 12 },
  results: { marginTop: 20 },
  resultText: { fontSize: 18, marginBottom: 8 },
  aboutButton: { marginTop: 30 },
});
