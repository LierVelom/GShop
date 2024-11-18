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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { fetchAPI } from '../auth/ActionAPI';

export default function HomeScreen() {

	const [categories, setCategories] = React.useState([]);
	const [recommendedProducts, setRecommendedProducts] = React.useState([]);

	React.useEffect(() => {
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
	}
	, []);


	// const categories = [
	// 	{ id: 1, title: 'Electronics', icon: '📱', color: '#8B5CF6' },
	// 	{ id: 2, title: 'Fashion', icon: '👕', color: '#4F46E5' },
	// 	{ id: 3, title: 'Beauty', icon: '💄', color: '#F97316' },
	// 	{ id: 4, title: 'Fresh Food', icon: '🥑', color: '#EF4444' },
	// ];

	// const recommendedProducts = [
	// 	{ id: 1, title: 'Shoes', rating: 4.5, price: 299, image: '/placeholder.svg' },
	// 	{ id: 2, title: 'Tablet', rating: 4.5, price: 499, image: '/placeholder.svg' },
	// 	{ id: 3, title: 'Pear', rating: 4.8, price: 4.99, image: '/placeholder.svg' },
	// ];

	return (
		<SafeAreaView style={styles.container}>
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
							<View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
								<Text style={styles.categoryEmoji}>{category.icon}</Text>
							</View>
							<Text style={styles.categoryTitle}>{category.name}</Text>
						</TouchableOpacity>
					))}
				</ScrollView>

				{/* Shoes Promotion */}
				<View style={styles.promotionCard}>
					<View>
						<Text style={styles.shoesTitle}>Shoes</Text>
						<Text style={styles.discount}>50% off</Text>
						<TouchableOpacity style={styles.buyButton}>
							<Text style={styles.buyButtonText}>Buy now</Text>
						</TouchableOpacity>
					</View>
					<Image
						source={{ uri: '/placeholder.svg' }}
						style={styles.promotionImage}
					/>
				</View>

				{/* Sale Cards */}
				<View style={styles.saleContainer}>
					<View style={styles.saleCard}>
						<View style={styles.saleBadge}>
							<Text style={styles.saleBadgeText}>30%</Text>
						</View>
						<Image
							source={{ uri: '/placeholder.svg' }}
							style={styles.saleImage}
						/>
					</View>
					<View style={styles.saleCard}>
						<View style={styles.saleBadge}>
							<Text style={styles.saleBadgeText}>30%</Text>
						</View>
						<Image
							source={{ uri: '/placeholder.svg' }}
							style={styles.saleImage}
						/>
					</View>
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
							<TouchableOpacity key={product.id} style={styles.productCard}>
								<Image
									source={{ uri: product.image }}
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
		borderRadius: 32,
		alignItems: 'center',
		justifyContent: 'center',
	},
	categoryEmoji: {
		fontSize: 24,
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
});