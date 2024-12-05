import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, Image, ScrollView, Platform } from 'react-native';
import { ArrowLeft, Star } from 'lucide-react-native';
import { getImageLink } from '../lib/getImageLink';
import { postAPI } from '../auth/ActionAPI';

const WriteReviewScreen = ({ navigation, route }) => {
	const { product } = route.params;
	const [review, setReview] = useState('');
	const [rating, setRating] = useState(0);

	const handleSubmitReview = async () => {
		if (rating === 0) {
			Alert.alert('Error', 'Please select a rating');
			return;
		}

		if (review.trim().length === 0) {
			Alert.alert('Error', 'Please write a review');
			return;
		}

		const payload = {
			review: review,
			rating: rating
		};

		const response = await postAPI(`products/${product.id}/reviews`, payload);

		if (response) {
			Alert.alert('Success', 'Your review has been submitted', [
				{ text: 'OK', onPress: () => navigation.goBack() }
			]);
		} else {
			Alert.alert('Error', 'Failed to submit review. Please try again.');
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<ArrowLeft size={24} color="#000" />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Review</Text>
				<View style={styles.placeholder} />
			</View>

			<ScrollView style={styles.content}>
				<View style={styles.productCard}>
					<Image
						source={{ uri: getImageLink('products', product.id) }}
						style={styles.productImage}
					/>
					<View style={styles.productInfo}>
						<Text style={styles.productName}>{product.name}</Text>
						<Text style={styles.productDescription}>{product.description}</Text>
						{/* <View style={styles.productDetails}>
              <Text style={styles.productDetail}>Size: {product.size}</Text>
              <Text style={styles.productDetail}>Color: {product.color}</Text>
            </View> */}
					</View>
				</View>

				<View style={styles.ratingContainer}>
					<Text style={styles.ratingLabel}>Your Rating:</Text>
					<View style={styles.starContainer}>
						{[1, 2, 3, 4, 5].map((star) => (
							<TouchableOpacity
								key={star}
								onPress={() => setRating(star)}
							>
								<Star
									size={32}
									color={star <= rating ? "#FFD700" : "#E5E7EB"}
									fill={star <= rating ? "#FFD700" : "#E5E7EB"}
								/>
							</TouchableOpacity>
						))}
					</View>
				</View>

				<Text style={styles.reviewLabel}>How do you feel about this product?</Text>
				<TextInput
					style={styles.reviewInput}
					multiline
					numberOfLines={6}
					placeholder="Write your review here..."
					value={review}
					onChangeText={setReview}
					textAlignVertical="top"
				/>

				<TouchableOpacity style={styles.submitButton} onPress={handleSubmitReview}>
					<Text style={styles.submitButtonText}>Submit Review</Text>
				</TouchableOpacity>
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
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#E5E7EB',
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: '600',
	},
	placeholder: {
		width: 24,
	},
	content: {
		flex: 1,
	},
	productCard: {
		margin: 16,
		padding: 16,
		backgroundColor: '#F9FAFB',
		borderRadius: 12,
		flexDirection: 'row',
		alignItems: 'center',
	},
	productImage: {
		width: 80,
		height: 80,
		borderRadius: 8,
	},
	productInfo: {
		flex: 1,
		marginLeft: 16,
	},
	productName: {
		fontSize: 18,
		fontWeight: '600',
		marginBottom: 4,
	},
	productDescription: {
		fontSize: 14,
		color: '#6B7280',
		marginBottom: 8,
	},
	productDetails: {
		flexDirection: 'row',
		gap: 16,
	},
	productDetail: {
		fontSize: 12,
		color: '#6B7280',
	},
	ratingContainer: {
		margin: 16,
		marginVertical: 36,
	},
	ratingLabel: {
		fontSize: 16,
		fontWeight: '500',
		marginBottom: 8,
	},
	starContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 8,
	},
	reviewLabel: {
		fontSize: 16,
		fontWeight: '500',
		marginHorizontal: 16,
		marginBottom: 8,
	},
	reviewInput: {
		margin: 16,
		marginTop: 0,
		borderWidth: 1,
		borderColor: '#E5E7EB',
		borderRadius: 8,
		padding: 12,
		fontSize: 16,
		height: 120,
	},
	submitButton: {
		margin: 16,
		backgroundColor: '#06B6D4',
		borderRadius: 8,
		padding: 16,
		alignItems: 'center',
	},
	submitButtonText: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: '600',
	},
});

export default WriteReviewScreen;