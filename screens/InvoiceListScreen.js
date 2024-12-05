import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { ArrowLeft, ChevronRight, FileText } from 'lucide-react-native';
import { fetchAPI } from '../auth/ActionAPI';

const InvoiceItem = ({ invoice, onPress }) => {
	const totalItems = invoice.cart_details.products.reduce((sum, product) => sum + product.quantity, 0);
	const totalAmount = invoice.cart_details.products.reduce((sum, product) => {
		let effectivePrice = product.price;
	
		// Kiểm tra và áp dụng khuyến mãi nếu có
		if (product.promotions && product.promotions.length > 0) {
			const applicablePromotion = product.promotions[0]; // Lấy khuyến mãi đầu tiên (giả sử có một khuyến mãi được áp dụng)
			const discount = (effectivePrice * parseFloat(applicablePromotion.discount_percentage)) / 100;
			effectivePrice -= discount;
		}
	
		// Tính tổng với giá sau khuyến mãi
		return sum + (effectivePrice * product.quantity);
	}, 0);
	

	return (
		<TouchableOpacity style={styles.invoiceItem} onPress={onPress}>
			<View style={styles.invoiceIcon}>
				<FileText size={24} color="#06B6D4" />
			</View>
			<View style={styles.invoiceDetails}>
				<Text style={styles.invoiceNumber}>Invoice #{invoice.id}</Text>
				<Text style={styles.invoiceDate}>{new Date(invoice.created_at).toLocaleDateString()}</Text>
				<Text style={styles.itemCount}>{totalItems} item{totalItems !== 1 ? 's' : ''}</Text>
			</View>
			<View style={styles.invoiceAmount}>
				<Text style={styles.amountText}>${totalAmount.toFixed(2)}</Text>
				<Text style={[styles.statusText, { color: invoice.status === 'success' ? '#10B981' : '#F59E0B' }]}>
					{invoice.status === 'success' ? 'Paid' : 'Pending'}
				</Text>
			</View>
			<ChevronRight size={20} color="#9CA3AF" />
		</TouchableOpacity>
	);
};

const InvoiceListScreen = ({ navigation, route }) => {
	const [invoices, setInvoices] = React.useState([]);

	React.useEffect(() => {
		// Fetch invoices
		fetchAPI('invoices')
			.then((response) => {
				setInvoices(response.data);
			})
			.catch((error) => {
				console.error('Error fetching invoices:', error);
			});
	}, []);

	const handleInvoicePress = (invoice) => {
		navigation.navigate('invoiceDetail', { invoice });
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
					<ArrowLeft size={24} color="#000" />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Invoices</Text>
			</View>
			<FlatList
				data={invoices}
				renderItem={({ item }) => <InvoiceItem invoice={item} onPress={() => handleInvoicePress(item)} />}
				keyExtractor={item => item.id.toString()}
				contentContainerStyle={styles.listContent}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F3F4F6',
		
		paddingTop: Platform.OS === 'android' ? 25 : 0
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 16,
		backgroundColor: '#FFFFFF',
		borderBottomWidth: 1,
		borderBottomColor: '#E5E7EB',
	},
	backButton: {
		padding: 8,
		marginRight: 16,
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: '600',
		color: '#111827',
	},
	listContent: {
		padding: 16,
	},
	invoiceItem: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		borderRadius: 8,
		padding: 16,
		marginBottom: 12,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},
	invoiceIcon: {
		marginRight: 16,
	},
	invoiceDetails: {
		flex: 1,
	},
	invoiceNumber: {
		fontSize: 16,
		fontWeight: '600',
		color: '#111827',
	},
	invoiceDate: {
		fontSize: 14,
		color: '#6B7280',
		marginTop: 4,
	},
	itemCount: {
		fontSize: 14,
		color: '#6B7280',
		marginTop: 4,
	},
	invoiceAmount: {
		alignItems: 'flex-end',
		marginRight: 16,
	},
	amountText: {
		fontSize: 16,
		fontWeight: '600',
		color: '#111827',
	},
	statusText: {
		fontSize: 14,
		fontWeight: '500',
		marginTop: 4,
	},
});

export default InvoiceListScreen;