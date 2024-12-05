import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Image, Platform } from 'react-native';
import { ArrowLeft, Printer, Share2, Tag } from 'lucide-react-native';
import { getImageLink } from '../lib/getImageLink';

const InvoiceDetailScreen = ({ route, navigation }) => {
	const { invoice } = route.params;

	const calculateTotal = () => {
		return invoice.cart_details.products.reduce((total, product) => {
			const basePrice = product.price * product.quantity;
			const promotion = product.promotions[0]; // Get first promotion if exists
			if (promotion) {
				const discount = (basePrice * parseFloat(promotion.discount_percentage)) / 100;
				return total + (basePrice - discount);
			}
			return total + basePrice;
		}, 0);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
					<ArrowLeft size={24} color="#000" />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Invoice Details</Text>
				<View style={styles.headerActions}>
					{/* <TouchableOpacity style={styles.actionButton}>
            <Printer size={24} color="#06B6D4" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Share2 size={24} color="#06B6D4" />
          </TouchableOpacity> */}
				</View>
			</View>
			<ScrollView contentContainerStyle={styles.content}>
				<View style={styles.invoiceHeader}>
					<Text style={styles.invoiceNumber}>Invoice #{invoice.id}</Text>
					<Text style={styles.invoiceDate}>Date: {new Date(invoice.created_at).toLocaleDateString()}</Text>
				</View>
				<View style={styles.statusContainer}>
					<Text style={[styles.statusText, { color: invoice.status === 'success' ? '#10B981' : '#F59E0B' }]}>
						{invoice.status === 'success' ? 'Paid' : 'Pending'}
					</Text>
				</View>
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Items</Text>
					{invoice.cart_details.products.map((product) => (
						<View key={product.id} style={styles.itemRow}>
							<Image
								source={{ uri: getImageLink('products', product.id) }}
								style={styles.productImage}
							/>
							<View style={styles.itemDetails}>
								<View style={styles.itemDescription}>
									<Text style={styles.itemText}>{product.name}</Text>
									<Text style={styles.itemQuantity}>{product.quantity} x ${product.price.toFixed(2)}</Text>
									{product.promotions && product.promotions.length > 0 && (
										<View style={styles.promotionContainer}>
											<Tag size={16} color="#F59E0B" />
											<Text style={styles.promotionText}>
												{product.promotions[0].name} - {product.promotions[0].discount_percentage}% off
											</Text>
										</View>
									)}
								</View>
								<View style={styles.priceContainer}>
									{product.promotions && product.promotions.length > 0 ? (
										<>
											<Text style={styles.originalPrice}>
												${(product.price * product.quantity).toFixed(2)}
											</Text>
											<Text style={styles.discountedPrice}>
												${((product.price * product.quantity) * (1 - parseFloat(product.promotions[0].discount_percentage) / 100)).toFixed(2)}
											</Text>
										</>
									) : (
										<Text style={styles.itemTotal}>
											${(product.quantity * product.price).toFixed(2)}
										</Text>
									)}
								</View>
							</View>
						</View>
					))}
				</View>
				<View style={styles.totalSection}>
					<View style={styles.totalRow}>
						<Text style={styles.totalLabel}>Subtotal</Text>
						<Text style={styles.totalValue}>${calculateTotal().toFixed(2)}</Text>
					</View>
					<View style={styles.totalRow}>
						<Text style={styles.totalLabel}>Tax (0%)</Text>
						<Text style={styles.totalValue}>${(calculateTotal() * 0).toFixed(2)}</Text>
					</View>
					<View style={styles.totalRow}>
						<Text style={styles.totalLabel}>Total</Text>
						<Text style={styles.grandTotal}>${(calculateTotal() * 1).toFixed(2)}</Text>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		paddingTop: Platform.OS === 'android' ? 25 : 0
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#E5E7EB',
	},
	backButton: {
		padding: 8,
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: '600',
		color: '#111827',
	},
	headerActions: {
		flexDirection: 'row',
	},
	actionButton: {
		padding: 8,
		marginLeft: 16,
	},
	content: {
		padding: 16,
	},
	invoiceHeader: {
		marginBottom: 16,
	},
	invoiceNumber: {
		fontSize: 24,
		fontWeight: '700',
		color: '#111827',
	},
	invoiceDate: {
		fontSize: 16,
		color: '#6B7280',
		marginTop: 4,
	},
	statusContainer: {
		backgroundColor: '#F3F4F6',
		borderRadius: 16,
		paddingVertical: 6,
		paddingHorizontal: 12,
		alignSelf: 'flex-start',
		marginBottom: 24,
	},
	statusText: {
		fontSize: 14,
		fontWeight: '600',
	},
	section: {
		marginBottom: 24,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: '600',
		color: '#111827',
		marginBottom: 8,
	},
	itemRow: {
		flexDirection: 'row',
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#E5E7EB',
	},
	productImage: {
		width: 60,
		height: 60,
		borderRadius: 8,
		marginRight: 12,
	},
	itemDetails: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	itemDescription: {
		flex: 1,
	},
	itemText: {
		fontSize: 16,
		color: '#111827',
	},
	itemQuantity: {
		fontSize: 14,
		color: '#6B7280',
		marginTop: 4,
	},
	promotionContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 4,
		gap: 4,
	},
	promotionText: {
		fontSize: 14,
		color: '#F59E0B',
	},
	priceContainer: {
		alignItems: 'flex-end',
	},
	originalPrice: {
		fontSize: 14,
		color: '#6B7280',
		textDecorationLine: 'line-through',
	},
	discountedPrice: {
		fontSize: 16,
		fontWeight: '600',
		color: '#DC2626',
		marginTop: 2,
	},
	itemTotal: {
		fontSize: 16,
		fontWeight: '600',
		color: '#111827',
	},
	totalSection: {
		borderTopWidth: 1,
		borderTopColor: '#E5E7EB',
		paddingTop: 16,
	},
	totalRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 8,
	},
	totalLabel: {
		fontSize: 16,
		color: '#4B5563',
	},
	totalValue: {
		fontSize: 16,
		fontWeight: '600',
		color: '#111827',
	},
	grandTotal: {
		fontSize: 20,
		fontWeight: '700',
		color: '#06B6D4',
	},
});

export default InvoiceDetailScreen;