import React from 'react';
import {
	View,
	Text,
	TextInput,
	ScrollView,
	Image,
	TouchableOpacity,
	StyleSheet,
	SafeAreaView,
	Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { fetchAPI } from '../auth/ActionAPI';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { getImageLink } from '../lib/getImageLink'
import { ArrowLeft, ShoppingCart } from 'lucide-react-native';

export default function HomeScreen({ navigation }) {

	const [categories, setCategories] = React.useState([]);
	const [recommendedProducts, setRecommendedProducts] = React.useState([]);
	const [productsWithPromotions, setProductsWithPromotions] = React.useState([]);
	const [user, setUser] = React.useState([]);
	const [cart, setCart] = React.useState([]);
	const [cartTotal, setCartTotal] = React.useState(0);

	const randomPastelColor = () => {
		const letters = 'BCDEF'.split('');
		let color = '#';
		for (let i = 0; i < 3; i++) {
			color += letters[Math.floor(Math.random() * letters.length)];
		}
		return color;
	}

	React.useEffect(() => {
		fetchAPI('user')
			.then((response) => {
				setUser(response);
			})
			.catch((error) => {
				console.error('Error fetching user:', error);
			});

		fetchAPI('cart')
			.then((response) => {
				setCart(response.data);
				let count = 0;
				response.data.products.forEach(item => {
					count++;
				});
				setCartTotal(count);
			})
			.catch((error) => {
				console.error('Error fetching cart:', error);
			});

		fetchAPI('categories')
			.then((response) => {
				setCategories(response.data);
			})

			.catch((error) => {
				console.error('Error fetching categories:', error);
			});

		fetchAPI('products')
			.then((response) => {
				setRecommendedProducts(response.data);
			})
			.catch((error) => {
				console.error('Error fetching recommended products:', error);
			});

		fetchAPI('products-with-promotions')
			.then((response) => {
				setProductsWithPromotions(response);
			})
			.catch((error) => {
				console.error('Error fetching products with promotions:', error);
			});
	}, []);

	const tabBarHeight = useBottomTabBarHeight();

	return (
		<SafeAreaView style={[styles.container, { paddingBottom: tabBarHeight }]}>
			<View style={styles.headerContainer}>
				{/* <TouchableOpacity style={styles.backButton}>
					<ArrowLeft size={24} color="#000" />
				</TouchableOpacity> */}

				<Text style={styles.title}></Text>

				<View style={styles.rightSection}>
					<TouchableOpacity style={styles.cartButton}
						onPress={() => {
							navigation.navigate('checkout');
						}}
					>
						<ShoppingCart size={24} color="#000" />
						<View style={styles.cartBadge}>
							<Text style={styles.cartBadgeText}>{cartTotal}</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity>
						<Image
							source={{ uri: getImageLink('users', user.id) }}
							style={styles.avatar}
						/>
					</TouchableOpacity>
				</View>
			</View>

			<ScrollView showsVerticalScrollIndicator={false}>
				{/* Search Bar */}
				<View style={styles.searchContainer}>
					<View style={styles.searchBar}>
						<Ionicons name="search" size={20} color="#666" />
						<TextInput
							placeholder="Search for product"
							style={styles.searchInput}
							placeholderTextColor="#666"
						/>
					</View>
					<TouchableOpacity>
						<Ionicons name="filter" size={24} color="#000" />
					</TouchableOpacity>
				</View>

				{/* Categories */}
				<ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
					{categories.map((category) => (
						<TouchableOpacity key={category.id} style={styles.categoryItem}>
							<View style={[styles.categoryIcon, { backgroundColor: randomPastelColor() }]}>
								<Image source={{ uri: getImageLink('categories', category.id) }} style={styles.categoryImage} />
							</View>
							<Text style={styles.categoryTitle}>{category.name}</Text>
						</TouchableOpacity>
					))}
				</ScrollView>

				{/* Only First Product Promotion */}

				{productsWithPromotions.slice(0, 1).map((product) => (
					<View style={styles.promotionCard} key={product.id}>
						<View>
							<Text style={styles.shoesTitle}>{product.name}</Text>
							<Text style={styles.discount}>{product.promotions[0].description}</Text>
							<TouchableOpacity style={styles.buyButton}
								onPress={() => {
									navigation.navigate('product', { id: product.id, cartTotal: cartTotal });
								}}
							>
								<Text style={styles.buyButtonText}>Buy now</Text>
							</TouchableOpacity>
						</View>
						<Image
							source={{ uri: getImageLink('products', product.id) }}
							style={styles.promotionImage}
						/>
					</View>
				))}

				{/* Sale Cards */}

				<View style={styles.saleContainer}>
					{productsWithPromotions.slice(1).map((product) => (
						<View style={styles.saleCard} key={product.id}>
							<View style={styles.saleBadge}>
								<Text style={styles.saleBadgeText}>{Math.round(product.promotions[0].discount_percentage)}%</Text>
							</View>
							<Image
								source={{ uri: getImageLink('products', product.id) }}
								style={styles.saleImage}
							/>
						</View>
					))}
				</View>

				{/* Recommended Section */}
				<View style={styles.recommendedSection}>
					<View style={styles.recommendedHeader}>
						<Text style={styles.recommendedTitle}>Recommended for you</Text>
						<TouchableOpacity>
							<Text style={styles.viewAll}>View all</Text>
						</TouchableOpacity>
					</View>
					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
						{recommendedProducts.map((product) => (
							<TouchableOpacity key={product.id} style={styles.productCard}
								onPress={() => {
									navigation.navigate('product', { id: product.id, cartTotal: cartTotal });
								}}
							>
								<Image
									source={{ uri: getImageLink('products', product.id) }}
									style={styles.productImage}
								/>
								<Text style={styles.productTitle}>{product.name}</Text>
								<View style={styles.ratingContainer}>
									<Ionicons name="star" size={16} color="#FFD700" />
									<Text style={styles.rating}>5</Text>
								</View>
								<Text style={styles.price}>${product.price}</Text>
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: Platform.OS === 'android' ? 25 : 0
	},
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 16,
		gap: 12,
	},
	searchBar: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#F3F4F6',
		borderRadius: 8,
		padding: 8,
		gap: 8,
	},
	searchInput: {
		flex: 1,
		fontSize: 16,
	},
	categoriesContainer: {
		paddingHorizontal: 16,
		marginBottom: 24,
	},
	categoryItem: {
		alignItems: 'center',
		marginRight: 20,
	},
	categoryIcon: {
		width: 64,
		height: 64,
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'center',
	},
	categoryEmoji: {
		fontSize: 24,
	},
	categoryImage: {
		width: 64,
		height: 64,
		borderRadius: 50,
	},
	categoryTitle: {
		marginTop: 8,
		fontSize: 14,
	},
	promotionCard: {
		margin: 16,
		padding: 16,
		backgroundColor: '#F3F4F6',
		borderRadius: 12,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	shoesTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#000',
	},
	discount: {
		fontSize: 18,
		color: '#666',
		marginVertical: 8,
	},
	buyButton: {
		backgroundColor: '#000',
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 6,
		alignSelf: 'flex-start',
	},
	buyButtonText: {
		color: '#fff',
		fontWeight: '600',
	},
	promotionImage: {
		width: 120,
		height: 120,
	},
	saleContainer: {
		flexDirection: 'row',
		padding: 16,
		gap: 16,
	},
	saleCard: {
		flex: 1,
		height: 150,
		backgroundColor: '#F3F4F6',
		borderRadius: 12,
		overflow: 'hidden',
	},
	saleBadge: {
		position: 'absolute',
		top: 8,
		left: 8,
		backgroundColor: '#F97316',
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 4,
		zIndex: 1,
	},
	saleBadgeText: {
		color: '#fff',
		fontWeight: '600',
	},
	saleImage: {
		width: '100%',
		height: '100%',
	},
	recommendedSection: {
		padding: 16,
	},
	recommendedHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 16,
	},
	recommendedTitle: {
		fontSize: 18,
		fontWeight: '600',
	},
	viewAll: {
		color: '#666',
	},
	productCard: {
		width: 150,
		marginRight: 16,
	},
	productImage: {
		width: '100%',
		height: 150,
		borderRadius: 8,
		backgroundColor: '#F3F4F6',
	},
	productTitle: {
		fontSize: 16,
		fontWeight: '500',
		marginTop: 8,
	},
	ratingContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
		marginTop: 4,
	},
	rating: {
		color: '#666',
	},
	price: {
		fontSize: 16,
		fontWeight: '600',
		color: '#059669',
		marginTop: 4,
	},
	headerContainer: {
		height: 56,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		backgroundColor: '#fff',
		borderBottomWidth: 1,
		borderBottomColor: '#E5E7EB',
	},
	backButton: {
		padding: 8,
		marginLeft: -8,
	},
	title: {
		fontSize: 16,
		fontWeight: '600',
		color: '#000',
	},
	rightSection: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 16,
	},
	cartButton: {
		padding: 8,
		marginRight: -8,
	},
	avatar: {
		width: 32,
		height: 32,
		borderRadius: 16,
	},
	cartBadge: {
		position: 'absolute',
		top: 4,
		right: 4,
		backgroundColor: '#EF4444',
		borderRadius: 10,
		minWidth: 20,
		height: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	cartBadgeText: {
		color: '#fff',
		fontSize: 12,
		fontWeight: 'bold',
	},
});