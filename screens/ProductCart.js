import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Platform, Alert } from 'react-native';
import { ArrowLeft, ChevronRight, Star, Minus, Plus } from 'lucide-react-native';
import { fetchAPI, deleteAPIWithStatus, putAPI, postAPI } from '../auth/ActionAPI';

export default function ProductCart({ navigation, route }) {
	const [quantity, setQuantity] = useState(1);
	const [cart, setCart] = useState([]);
	const [product, setProduct] = useState({});
	const [isProductInCart, setIsProductInCart] = useState(false);

	React.useEffect(() => {
		fetchAPI('cart')
			.then((response) => {
				setCart(response.data.products);

				// Kiểm tra sản phẩm có trong giỏ hàng không
				const productExists = response.data['products'].some(item => item.id == route.params.id);
				setIsProductInCart(productExists);
			})
			.catch((error) => {
				console.error('Error fetching cart:', error);
			});
	}, []);

	React.useEffect(() => {
		if (isProductInCart) {
			setProduct(cart.find(item => item.id == route.params.id));
			setQuantity(cart.find(item => item.id == route.params.id).quantity);
			console.log('Product in cart:', product);
		} else {
			fetchAPI(`products/${route.params.id}`)
				.then((response) => {
					setProduct(response.data);
				})
				.catch((error) => {
					console.error('Error fetching product:', error);
				});
		}
	}, [isProductInCart]);  // Chạy lại khi trạng thái isProductInCart thay đổi

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				{/* Navigation Bar */}
				<View style={styles.navbar}>
					<TouchableOpacity style={styles.backButton}
						onPress={() => navigation.goBack()}
					>
						<ArrowLeft size={24} color="#000" />
					</TouchableOpacity>
					<Text style={styles.navTitle}>{product.name}</Text>
				</View>

				{/* Main Image */}
				<Image
					source={{ uri: '/placeholder.svg?height=300&width=400' }}
					style={styles.mainImage}
				/>

				{/* Thumbnail Gallery
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.thumbnailContainer}>
          {thumbnails.map((uri, index) => (
            <TouchableOpacity key={index} style={styles.thumbnailWrapper}>
              <Image source={{ uri }} style={styles.thumbnail} />
            </TouchableOpacity>
          ))}
        </ScrollView> */}

				{/* Product Info */}
				<View style={styles.productInfo}>
					<View style={styles.priceRow}>
						<Text style={styles.price}>{product.price}</Text>
						{/* <Text style={styles.offer}>Buy 1 get 1</Text> */}
					</View>

					<View style={styles.titleRow}>
						<Text style={styles.title}>{product.name}</Text>
						<View style={styles.rating}>
							<Star size={16} color="#FFB800" fill="#FFB800" />
							<Text style={styles.ratingText}>4.5</Text>
						</View>
					</View>

					<Text style={styles.description}>{product.description}</Text>

					{/* Color Selection
          <Text style={styles.sectionTitle}>Color</Text>
          <View style={styles.colorOptions}>
            {colors.map(({ id, color }) => (
              <TouchableOpacity
                key={id}
                style={[
                  styles.colorButton,
                  { backgroundColor: color },
                  selectedColor === id && styles.selectedColor,
                ]}
                onPress={() => setSelectedColor(id)}
              />
            ))}
          </View>

        //   {/* Size Selection 
        //   <Text style={styles.sectionTitle}>Size</Text>
        //   <View style={styles.sizeOptions}>
        //     {sizes.map((size) => (
        //       <TouchableOpacity
        //         key={size}
        //         style={[
        //           styles.sizeButton,
        //           selectedSize === size && styles.selectedSize,
        //         ]}
        //         onPress={() => setSelectedSize(size)}
        //       >
        //         <Text
        //           style={[
        //             styles.sizeText,
        //             selectedSize === size && styles.selectedSizeText,
        //           ]}
        //         >
        //           {size}
        //         </Text>
        //       </TouchableOpacity>
        //     ))}
        //   </View> */}

					{/* Quantity */}
					<Text style={styles.sectionTitle}>Quantity</Text>
					<View style={styles.quantityContainer}>
						<View style={styles.quantityControls}>
							<TouchableOpacity
								style={styles.quantityButton}
								onPress={() => quantity > 1 && setQuantity(quantity - 1)}
							>
								<Minus size={20} color="#000" />
							</TouchableOpacity>
							<Text style={styles.quantityText}>{quantity}</Text>
							<TouchableOpacity
								style={styles.quantityButton}
								onPress={() => setQuantity(quantity + 1)}
							>
								<Plus size={20} color="#000" />
							</TouchableOpacity>
						</View>
						<Text style={styles.total}>Total ${(2.99 * quantity).toFixed(2)}</Text>
					</View>

					{/* Size Guide & Reviews */}
					<View style={styles.link}>
						<Text style={styles.linkText}>Size guide</Text>
						<ChevronRight size={20} color="#666" />
					</View>

					<TouchableOpacity style={styles.link}>
						<Text style={styles.linkText}>Reviews (99)</Text>
						<ChevronRight size={20} color="#666" />
					</TouchableOpacity>
				</View>
			</ScrollView>

			<View style={styles.buttonContainer}>
				{isProductInCart && (
					<TouchableOpacity style={styles.removeButton} onPress={() => {
						Alert.alert('Remove from cart', 'Are you sure you want to remove this item from your cart?', [ 
							{ text: 'Cancel', style: 'cancel' },
							{ text: 'Remove', style: 'destructive', onPress: () => {
								deleteAPIWithStatus('cart/' + product.id)
									.then((response) => {
										console.log('Response:', response.status);
										if (response.status === 200) {
											console.log('Product removed from cart:', product);
											Alert.alert('Success', 'Product removed from cart', [{ text: 'OK' }]);
											navigation.navigate('checkout');
										}
									})
									.catch((error) => {
										console.error('Error removing product from cart:', error);
										Alert.alert('Error', 'Failed to remove product from cart', [{ text: 'OK' }]);
									});
							} }
						]);
					}}>
						<Text style={styles.removeButtonText}>Remove from cart</Text>
					</TouchableOpacity>
				)}
				<TouchableOpacity
					style={[styles.addToCartButton, isProductInCart && styles.addToCartButtonWide]}
					onPress={() => {
						if (isProductInCart) {
							putAPI('cart/' + product.id, { quantity: quantity })
								.then((response) => {
									console.log('Product updated in cart:', product);
									Alert.alert('Success', 'Product updated in cart', [{ text: 'OK' }]);
									navigation.navigate('checkout');
								})
								.catch((error) => {
									console.error('Error updating product in cart:', error);
									Alert.alert('Error', 'Failed to update product in cart', [{ text: 'OK' }]);
								});
						} else {
							postAPI('cart', { product_id: product.id, quantity: quantity })
								.then((response) => {
									console.log('Product added to cart:', product);
									Alert.alert('Success', 'Product added to cart', [{ text: 'OK' }]);
									navigation.navigate('checkout');
								})
								.catch((error) => {
									console.error('Error adding product to cart:', error);
									Alert.alert('Error', 'Failed to add product to cart', [{ text: 'OK' }]);
								});
						}
					}}
				>
					<Text style={styles.addToCartText}>
						{isProductInCart ? 'Update cart' : 'Add to cart'}
					</Text>
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
	navbar: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 64,
		paddingHorizontal: 16,
		backgroundColor: '#fff',
		borderBottomWidth: 1,
		borderBottomColor: '#E5E7EB',
	},
	backButton: {
		padding: 8,
		marginLeft: -8,
	},
	navTitle: {
		fontSize: 16,
		fontWeight: '600',
		marginLeft: 8,
	},
	mainImage: {
		width: '100%',
		height: 400,
		backgroundColor: '#f3f4f6',
	},
	thumbnailContainer: {
		padding: 16,
	},
	thumbnailWrapper: {
		marginRight: 8,
	},
	thumbnail: {
		width: 80,
		height: 80,
		borderRadius: 8,
		backgroundColor: '#f3f4f6',
	},
	productInfo: {
		padding: 16,
	},
	priceRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	price: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#06B6D4',
	},
	offer: {
		color: '#06B6D4',
	},
	titleRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 8,
	},
	title: {
		fontSize: 20,
		fontWeight: '600',
	},
	rating: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	ratingText: {
		color: '#666',
	},
	description: {
		color: '#666',
		marginTop: 4,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: '600',
		marginTop: 24,
		marginBottom: 12,
	},
	colorOptions: {
		flexDirection: 'row',
		gap: 12,
	},
	colorButton: {
		width: 32,
		height: 32,
		borderRadius: 16,
	},
	selectedColor: {
		borderWidth: 2,
		borderColor: '#000',
	},
	sizeOptions: {
		flexDirection: 'row',
		gap: 12,
	},
	sizeButton: {
		width: 48,
		height: 48,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#E5E7EB',
		alignItems: 'center',
		justifyContent: 'center',
	},
	selectedSize: {
		backgroundColor: '#06B6D4',
		borderColor: '#06B6D4',
	},
	sizeText: {
		fontSize: 16,
		color: '#000',
	},
	selectedSizeText: {
		color: '#fff',
	},
	quantityContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	quantityControls: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 16,
		backgroundColor: '#F3F4F6',
		borderRadius: 8,
		padding: 8,
	},
	quantityButton: {
		padding: 4,
	},
	quantityText: {
		fontSize: 16,
		fontWeight: '500',
		minWidth: 24,
		textAlign: 'center',
	},
	total: {
		fontSize: 16,
		fontWeight: '500',
	},
	link: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#E5E7EB',
	},
	linkText: {
		fontSize: 16,
		color: '#000',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		margin: 16,
		gap: 12,
	},
	addToCartButton: {
		flex: 1,
		backgroundColor: '#06B6D4',
		padding: 16,
		borderRadius: 8,
		alignItems: 'center',
	},
	addToCartButtonWide: {
		flex: 2,
	},
	addToCartText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
	},
	removeButton: {
		flex: 1,
		padding: 16,
		borderRadius: 8,
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#06B6D4',
	},
	removeButtonText: {
		color: '#06B6D4',
		fontSize: 16,
		fontWeight: '600',
	},
});