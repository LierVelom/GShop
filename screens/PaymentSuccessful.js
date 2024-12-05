import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Check, Star, Home } from 'lucide-react-native';

export default function Component({ navigation, route }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successIcon}>
          <Check size={40} color="#fff" />
        </View>

        <Text style={styles.title}>Order placed successfully!</Text>
        <Text style={styles.subtitle}>
          Commodo eu ut sunt qui minim{'\n'}fugiat elit nisi enim
        </Text>

        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>{route.params.totalAmount}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax (0%)</Text>
            <Text style={styles.summaryValue}>$0</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Fees</Text>
            <Text style={styles.summaryValue}>$0</Text>
          </View>

          <View style={styles.cardRow}>
            <Text style={styles.summaryLabel}>Card</Text>
            <View style={styles.cardInfo}>
              <View style={styles.visaLogo}>
                <Text style={styles.visaText}>VISA</Text>
              </View>
              <Text style={styles.cardNumber}>****** 2334</Text>
            </View>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <View style={styles.totalValue}>
              <Text style={styles.successTag}>Success</Text>
              <Text style={styles.totalAmount}>$3,080</Text>
            </View>
          </View>
        </View>

        <View style={styles.ratingSection}>
          <Text style={styles.ratingTitle}>How was your experience?</Text>
          <View style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                size={32} 
                color="#FFB800"
                fill="#FFB800"
              />
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.homeButton}
			onPress={() => navigation.navigate('home')}
		>
          <Home size={20} color="#fff" />
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
	marginTop: 32,
  },
  successIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#06B6D4',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  summaryContainer: {
    width: '100%',
    gap: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 16,
    color: '#1F2937',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  visaLogo: {
    backgroundColor: '#1A1F71',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  visaText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  cardNumber: {
    color: '#6B7280',
    fontSize: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  totalValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  successTag: {
    fontSize: 14,
    color: '#22C55E',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  ratingSection: {
    marginTop: 32,
    alignItems: 'center',
    gap: 16,
  },
  ratingTitle: {
    fontSize: 16,
    color: '#1F2937',
  },
  starContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#06B6D4',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    gap: 8,
    width: '100%',
    marginTop: 'auto',
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});