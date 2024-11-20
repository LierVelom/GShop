import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Platform, Alert } from 'react-native';
import { ArrowLeft, Plus } from 'lucide-react-native';
import { postAPI } from '../auth/ActionAPI';

export default function PaymentScreen({ navigation, route }) {
	const [selectedPayment, setSelectedPayment] = useState('visa');

	const paymentMethods = [
		{ id: 'visa', type: 'Visa', number: '2334' },
		{ id: 'mastercard', type: 'Mastercard', number: '3774' },
		{ id: 'paypal', type: 'PayPal', email: 'abc@gmail.com' },
	];

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity style={styles.backButton}
					onPress={() => navigation.goBack()}
				>
					<ArrowLeft size={24} color="#000" />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Payment</Text>
			</View>

			<View style={styles.content}>
				<View style={styles.totalSection}>
					<Text style={styles.totalLabel}>TOTAL</Text>
					<Text style={styles.totalAmount}>${route.params.totalAmount}</Text>
				</View>

				<View style={styles.paymentMethods}>
					{paymentMethods.map((method) => (
						<TouchableOpacity
							key={method.id}
							style={[
								styles.paymentCard,
								selectedPayment === method.id && styles.selectedCard
							]}
							onPress={() => setSelectedPayment(method.id)}
						>
							<View style={styles.paymentInfo}>
								{method.id === 'visa' && (
									<View style={styles.cardBrand}>
										<View style={styles.visaLogo}>
											<Text style={styles.visaText}>VISA</Text>
										</View>
										<Text style={styles.cardNumber}>****** {method.number}</Text>
									</View>
								)}
								{method.id === 'mastercard' && (
									<View style={styles.cardBrand}>
										<View style={styles.mastercardLogo}>
											<View style={[styles.mcCircle, styles.mcCircleLeft]} />
											<View style={[styles.mcCircle, styles.mcCircleRight]} />
										</View>
										<Text style={styles.cardNumber}>****** {method.number}</Text>
									</View>
								)}
								{method.id === 'paypal' && (
									<View style={styles.cardBrand}>
										<Text style={styles.paypalText}>PayPal</Text>
										<Text style={styles.cardNumber}>{method.email}</Text>
									</View>
								)}
							</View>
							<View style={styles.radioOuter}>
								{selectedPayment === method.id && <View style={styles.radioInner} />}
							</View>
						</TouchableOpacity>
					))}
				</View>

				<TouchableOpacity style={styles.payNowButton}
					onPress={() => {
						postAPI('checkout', { payment_method: selectedPayment})
							.then((data) => {
								if (data) {
									Alert.alert('Success', 'Payment successful!');
									navigation.navigate('home');
								}
							})
							.catch((error) => {
								Alert.alert('Error', 'Failed to make payment!');
								console.error('Error during payment:', error);
							});
					}}
				>
					<Text style={styles.payNowText}>Pay now</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.addCardButton}>
					<Plus size={20} color="#06B6D4" />
					<Text style={styles.addCardText}>Add new card</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: Platform.OS === 'android' ? 25 : 0,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 16,
		height: 60,
		borderBottomWidth: 1,
		borderBottomColor: '#E5E7EB',
	},
	backButton: {
		padding: 8,
		marginLeft: -8,
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: '600',
		marginLeft: 8,
	},
	content: {
		flex: 1,
		padding: 16,
	},
	totalSection: {
		alignItems: 'center',
		marginVertical: 24,
	},
	totalLabel: {
		fontSize: 20,
		color: '#6B7280',
		marginBottom: 8,
	},
	totalAmount: {
		fontSize: 52,
		fontWeight: '700',
	},
	paymentMethods: {
		gap: 20,
		marginBottom: 24,
	},
	paymentCard: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 24,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#E5E7EB',
	},
	selectedCard: {
		borderColor: '#06B6D4',
	},
	paymentInfo: {
		gap: 12,
	},
	cardBrand: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	visaLogo: {
		backgroundColor: '#1A1F71',
		paddingHorizontal: 6,
		paddingVertical: 2,
		borderRadius: 4,
	},
	visaText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '700',
	},
	mastercardLogo: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	mcCircle: {
		width: 20,
		height: 20,
		borderRadius: 10,
	},
	mcCircleLeft: {
		backgroundColor: '#EB001B',
		marginRight: -8,
	},
	mcCircleRight: {
		backgroundColor: '#F79E1B',
	},
	paypalText: {
		color: '#003087',
		fontSize: 16,
		fontWeight: '700',
	},
	cardNumber: {
		color: '#6B7280',
		fontSize: 14,
	},
	radioOuter: {
		width: 20,
		height: 20,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: '#D1D5DB',
		justifyContent: 'center',
		alignItems: 'center',
	},
	radioInner: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: '#06B6D4',
	},
	payNowButton: {
		backgroundColor: '#06B6D4',
		padding: 16,
		borderRadius: 8,
		alignItems: 'center',
		marginBottom: 16,
	},
	payNowText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
	},
	addCardButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8,
	},
	addCardText: {
		color: '#06B6D4',
		fontSize: 16,
		fontWeight: '500',
	},
});