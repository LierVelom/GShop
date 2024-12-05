import React from 'react';
import { View, Text, Image, TextInput, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { ArrowLeft, ShoppingCart, Search, SlidersHorizontal, Star, Plus } from 'lucide-react-native';
import { getImageLink } from '../lib/getImageLink';
import { fetchAPI } from '../auth/ActionAPI';


const CategoryProductList = ({ navigation, route }) => {
	const [products, setProducts] = React.useState([]);
	const category = route.params;

	React.useEffect(() => {
		fetchAPI('products?category_id[eq]=' + category.id)
			.then((response) => {
				setProducts(response.data);
			})
			.catch((error) => {
				console.error('Error fetching products:', error);
			});
	}, []);

	const renderProductItem = ({ item }) => (
		<TouchableOpacity style={styles.productItem} onPress={() => navigation.navigate('product', { id: item.id })}>
			<Image
				source={{ uri: getImageLink('products', item.id) }}
				style={styles.productImage}
			/>
			<View style={styles.productInfo}>
				<Text style={styles.productName}>{item.name}</Text>
				<View style={styles.ratingContainer}>
					{[1, 2, 3, 4, 5].map((star) => (
						<Star
							key={star}
							size={16}
							color={star <= 4 ? "#FFD700" : "#E5E7EB"}
							fill={star <= 4 ? "#FFD700" : "#E5E7EB"}
						/>
					))}
				</View>
				<View style={styles.priceContainer}>
					{item.promotions && item.promotions.length > 0 ? (
						<>
							<Text style={styles.originalPrice}>${item.price.toFixed(2)}</Text>
							<Text style={styles.discountedPrice}>
								${(item.price * (1 - parseFloat(item.promotions[0].discount_percentage) / 100)).toFixed(2)}
							</Text>
						</>
					) : (
						<Text style={styles.price}>${item.price.toFixed(2)}</Text>
					)}
				</View>
			</View>
			<TouchableOpacity style={styles.addButton}
				onPress={() => {
					navigation.navigate('product-cart', { id: item.id });
				}}
			>
				<Plus size={20} color="#FFFFFF" />
			</TouchableOpacity>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<ArrowLeft size={24} color="#000" />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>{category.name}</Text>
				<View style={styles.headerRight}>
					
				</View>
			</View>

			{/* <View style={styles.searchContainer}>
				<View style={styles.searchInputContainer}>
					<Search size={20} color="#9CA3AF" />
					<TextInput
						style={styles.searchInput}
						placeholder="Search"
						placeholderTextColor="#9CA3AF"
					/>
				</View>
				<TouchableOpacity style={styles.filterButton}>
					<SlidersHorizontal size={20} color="#000" />
				</TouchableOpacity>
			</View> */}

			<FlatList
				data={products}
				renderItem={renderProductItem}
				keyExtractor={(item) => item.id.toString()}
				contentContainerStyle={styles.productList}
			/>
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
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 16,
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: '600',
	},
	headerRight: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	avatar: {
		width: 32,
		height: 32,
		borderRadius: 16,
	},
	searchContainer: {
		flexDirection: 'row',
		paddingHorizontal: 16,
		marginBottom: 16,
	},
	searchInputContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#F3F4F6',
		borderRadius: 8,
		paddingHorizontal: 12,
		marginRight: 12,
	},
	searchInput: {
		flex: 1,
		paddingVertical: 8,
		marginLeft: 8,
	},
	filterButton: {
		padding: 12,
		backgroundColor: '#F3F4F6',
		borderRadius: 8,
	},
	productList: {
		paddingHorizontal: 16,
	},
	productItem: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 16,
		backgroundColor: '#FFFFFF',
		borderRadius: 12,
		padding: 12,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 4,
	},
	productImage: {
		width: 80,
		height: 80,
		borderRadius: 8,
		marginRight: 12,
	},
	productInfo: {
		flex: 1,
	},
	productName: {
		fontSize: 16,
		fontWeight: '500',
		marginBottom: 4,
	},
	ratingContainer: {
		flexDirection: 'row',
		marginBottom: 4,
	},
	priceContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	price: {
		fontSize: 16,
		fontWeight: '600',
		color: '#111827',
	},
	originalPrice: {
		fontSize: 14,
		color: '#6B7280',
		textDecorationLine: 'line-through',
		marginRight: 4,
	},
	discountedPrice: {
		fontSize: 16,
		fontWeight: '600',
		color: '#DC2626',
	},
	addButton: {
		backgroundColor: '#06B6D4',
		borderRadius: 16,
		padding: 8,
	},
});

export default CategoryProductList;