import React from 'react';
import {
	View,
	Text,
	Image,
	TextInput,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
	SafeAreaView,
	Platform
} from 'react-native';
import { ArrowLeft, Edit2 } from 'lucide-react-native';

import { fetchAPI } from '../auth/ActionAPI';
import { getImageLink } from '../lib/getImageLink';

const CartItem = ({ id, name, description, price, quantity, promotions, navigation }) => (
	<View style={styles.cartItem}>
		<Image source={{ uri: getImageLink('products', id) }} style={styles.productImage} />
		<View style={styles.productInfo}>
			<View style={styles.productHeader}>
				<Text style={styles.productName}>{name}</Text>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate('product-cart', { id: id });
					}}
				>
					<Edit2 size={20} color="#666" />
				</TouchableOpacity>
			</View>
			<Text style={styles.productDescription}>{description}</Text>
			<View style={styles.priceQuantity}>
				<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
					{Array.isArray(promotions) && promotions.length > 0 && (
						<Text style={styles.priceDiscount}>${price.toFixed(2)}</Text>
					)}
					<Text style={styles.price}>
						${
							Array.isArray(promotions) && promotions.length > 0
								? (price - price * promotions[0].discount_percentage / 100).toFixed(2)
								: price
						}
					</Text>
				</View>
				<Text style={styles.quantity}>x{quantity}</Text>
			</View>
		</View>
	</View>
);


export default function CheckoutScreen({ navigation }) {

	const [cartData, setCartData] = React.useState({});
	const [cartItems, setCartItems] = React.useState([]);

	React.useEffect(() => {
		fetchAPI('cart')
			.then((response) => {
				setCartData(response.data);
				setCartItems(response.data.products);
			})
			.catch((error) => {
				console.error('Error fetching cart:', error);
			});
	}, []);

	const totalAmount = cartItems.reduce((total, item) => {
		if (Array.isArray(item.promotions) && item.promotions.length > 0) {
			return total + item.price - item.price * item.promotions[0].discount_percentage / 100;
		}
		return total + item.price;
	}, 0).toFixed(2);

	return (

		<SafeAreaView style={[styles.container, {}]}>
			<View style={styles.header}>
				<TouchableOpacity
					onPress={() => {
						navigation.goBack();
					}}
				>
					<ArrowLeft size={24} color="#000" />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Checkout</Text>
				<View style={styles.headerRight} />
			</View>

			<ScrollView style={styles.content}>
				{cartItems.map((item, index) => (
					<CartItem
						key={index}
						id={item.id}
						name={item.name}
						description={item.description}
						price={item.price}
						quantity={item.quantity}
						promotions={item.promotions}
						navigation={navigation} />
				))}

				<View style={styles.voucherSection}>
					<Text style={styles.voucherLabel}>Voucher</Text>
					<View style={styles.voucherInput}>
						<TextInput
							placeholder="Enter voucher code"
							style={styles.input}
							placeholderTextColor="#999"
						/>
						<TouchableOpacity>
							<Text style={styles.applyButton}>Apply</Text>
						</TouchableOpacity>
					</View>
				</View>

				<View style={styles.totalSection}>
					<Text style={styles.totalLabel}>TOTAL</Text>
					<Text style={styles.totalAmount}>{totalAmount} $</Text>
				</View>
			</ScrollView>

			<TouchableOpacity style={styles.nextButton}>
				<Text style={styles.nextButtonText}>Next</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: Platform.OS === 'android' ? 25 : 0
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: '600',
	},
	headerRight: {
		width: 24,
	},
	content: {
		flex: 1,
	},
	cartItem: {
		flexDirection: 'row',
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
	},
	productImage: {
		width: 80,
		height: 80,
		borderRadius: 8,
		marginRight: 16,
	},
	productInfo: {
		flex: 1,
	},
	productHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	productName: {
		fontSize: 16,
		fontWeight: '500',
	},
	productDescription: {
		color: '#666',
		marginTop: 4,
	},
	priceQuantity: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 8,
	},
	priceDiscount: {
		color: '#666',
		textDecorationLine: 'line-through',
		marginRight: 4,
	},
	price: {
		fontSize: 16,
		fontWeight: '600',
	},
	quantity: {
		color: '#666',
	},
	voucherSection: {
		padding: 16,
	},
	voucherLabel: {
		fontSize: 16,
		marginBottom: 8,
	},
	voucherInput: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#eee',
		borderRadius: 8,
		paddingHorizontal: 12,
	},
	input: {
		flex: 1,
		height: 44,
	},
	applyButton: {
		color: '#a855f7',
		fontWeight: '500',
	},
	totalSection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 16,
		borderTopWidth: 1,
		borderTopColor: '#eee',
	},
	totalLabel: {
		fontSize: 16,
		fontWeight: '500',
	},
	totalAmount: {
		fontSize: 24,
		fontWeight: '600',
	},
	nextButton: {
		backgroundColor: '#576CD6',
		margin: 16,
		padding: 16,
		borderRadius: 8,
		alignItems: 'center',
	},
	nextButtonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
	},
});