import React from 'react';
import {
	View,
	Text,
	Image,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
	SafeAreaView,
	Switch,
	Platform
} from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export default function ProductDetailsScreen({ navigation }) {
	const [notifyEnabled, setNotifyEnabled] = React.useState(false);

	const renderRatingStars = (rating) => {
		return [...Array(5)].map((_, index) => (
			<FontAwesome
				key={index}
				name={index < Math.floor(rating) ? 'star' : 'star-o'}
				size={16}
				color="#FFD700"
			/>
		));
	};

	const renderReviewBars = () => {
		const ratings = [5, 4, 3, 2, 1];
		return ratings.map((rating) => (
			<View key={rating} style={styles.ratingBar}>
				<Text style={styles.ratingNumber}>{rating}</Text>
				<View style={styles.barContainer}>
					<View
						style={[
							styles.barFill,
							{ width: rating === 5 ? '80%' : rating === 4 ? '60%' : '20%' }
						]}
					/>
				</View>
			</View>
		));
	};

	const tabBarHeight = useBottomTabBarHeight();

	return (
		<SafeAreaView style={[styles.container, { paddingBottom: tabBarHeight }]}>
			<View style={styles.header}>
				<TouchableOpacity
					onPress={() => {
						navigation.goBack();
					}}
				>
					<FontAwesome name="angle-left" size={24} color="#000" />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Headphone</Text>
				<View style={styles.headerRight}>
					<TouchableOpacity style={styles.cartButton}>
						<Feather name="shopping-cart" size={24} color="#000" />
					</TouchableOpacity>
					<Image
						source={require('../img/anhSignUp.png')}
						style={styles.profilePic}
					/>
				</View>
			</View>

			<ScrollView style={styles.content}>
				<Image
					source={require('../img/iphon13_1.jpg')}
					style={styles.productImage}
				/>

				<View style={styles.imageDots}>
					{[0, 1, 2, 3].map((index) => (
						<View
							key={index}
							style={[
								styles.dot,
								{ backgroundColor: index === 0 ? '#576CD6' : '#E0E0E0' }
							]}
						/>
					))}
				</View>

				<View style={styles.priceRating}>
					<Text style={styles.price}>$59</Text>
					<View style={styles.rating}>
						{renderRatingStars(4.5)}
						<Text style={styles.reviews}> 4.5 (99 reviews)</Text>
					</View>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Description</Text>
					<Text style={styles.description}>
						Quis occaecat magna elit magna do nisi ipsum amet excepteur tempor nisi exercitation qui...
					</Text>
				</View>

				<View style={styles.features}>
					<View style={styles.featureItem}>
						<FontAwesome name="flash" size={20} color="#576CD6" />
						<Text style={styles.featureText}>Express</Text>
					</View>
					<View style={styles.featureItem}>
						<FontAwesome name="refresh" size={20} color="#576CD6" />
						<Text style={styles.featureText}>30-day free return</Text>
					</View>
					<View style={styles.featureItem}>
						<FontAwesome name="thumbs-up" size={20} color="#576CD6" />
						<Text style={styles.featureText}>Good review</Text>
					</View>
					<View style={styles.featureItem}>
						<FontAwesome name="check-circle" size={20} color="#576CD6" />
						<Text style={styles.featureText}>Authorized shop</Text>
					</View>
				</View>

				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<Text style={styles.sectionTitle}>Reviews</Text>
						<TouchableOpacity>
							<Text style={styles.seeAll}>See all</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.ratingOverview}>
						<View style={styles.ratingLeft}>
							<Text style={styles.ratingBig}>4.5/5</Text>
							<Text style={styles.ratingCount}>(99 reviews)</Text>
							<View style={styles.ratingStars}>
								{renderRatingStars(4.5)}
							</View>
						</View>
						<View style={styles.ratingRight}>
							{renderReviewBars()}
						</View>
					</View>

					<View style={styles.reviewList}>
						<View style={styles.reviewItem}>
							<Image
								source={require('../img/iphon13_1.jpg')}
								style={styles.reviewerPic}
							/>
							<View style={styles.reviewContent}>
								<Text style={styles.reviewerName}>Jevon Raynor</Text>
								<Text style={styles.reviewText}>Deserunt minim incididunt cillum</Text>
								<Text style={styles.reviewTime}>A day ago</Text>
							</View>
						</View>
						<View style={styles.reviewItem}>
							<Image
								source={require('../img/iphon13_1.jpg')}
								style={styles.reviewerPic}
							/>
							<View style={styles.reviewContent}>
								<Text style={styles.reviewerName}>Jason D.</Text>
								<Text style={styles.reviewText}>Magna pariatur sit et ullamco paria</Text>
								<Text style={styles.reviewTime}>3 days ago</Text>
							</View>
						</View>
					</View>
				</View>

				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<Text style={styles.sectionTitle}>Relevant products</Text>
						<TouchableOpacity>
							<Text style={styles.seeAll}>See all</Text>
						</TouchableOpacity>
					</View>

					<ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productList}>
						{[1, 2, 3].map((item) => (
							<View key={item} style={styles.productCard}>
								<Image
									source={require('../img/iphon13_1.jpg')}
									style={styles.productCardImage}
								/>
								<Text style={styles.productCardTitle}>Headphone</Text>
								<View style={styles.productCardRating}>
									<FontAwesome name="star" size={12} color="#FFD700" />
									<Text style={styles.productCardRatingText}>4.5</Text>
								</View>
								<Text style={styles.productCardPrice}>$99</Text>
							</View>
						))}
					</ScrollView>
				</View>
			</ScrollView>

			<View style={styles.bottomBar}>
				<View style={styles.notifyContainer}>
					<FontAwesome name="bell" size={24} color="#576CD6" />
					<Text style={styles.notifyText}>Notify me of promotions</Text>
					<Switch
						value={notifyEnabled}
						onValueChange={setNotifyEnabled}
						trackColor={{ false: '#E0E0E0', true: '#576CD6' }}
					/>
				</View>
				<View style={styles.buyContainer}>
					<TouchableOpacity style={styles.cartIconButton}>
						<FontAwesome name="shopping-cart" size={24} color="#576CD6" />
					</TouchableOpacity>
					<TouchableOpacity style={styles.buyButton}>
						<Text style={styles.buyButtonText}>Buy Now</Text>
					</TouchableOpacity>
				</View>
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
		justifyContent: 'space-between',
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#E0E0E0',
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: '600',
	},
	headerRight: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	cartButton: {
		marginRight: 16,
	},
	profilePic: {
		width: 32,
		height: 32,
		borderRadius: 16,
	},
	content: {
		flex: 1,
	},
	productImage: {
		width: '100%',
		height: 300,
		resizeMode: 'cover',
	},
	imageDots: {
		flexDirection: 'row',
		justifyContent: 'center',
		padding: 16,
	},
	dot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		marginHorizontal: 4,
	},
	priceRating: {
		padding: 16,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	price: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	rating: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	reviews: {
		color: '#666',
		marginLeft: 4,
	},
	section: {
		padding: 16,
		borderTopWidth: 1,
		borderTopColor: '#E0E0E0',
	},
	sectionHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 16,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: '600',
	},
	seeAll: {
		color: '#576CD6',
	},
	description: {
		color: '#666',
		lineHeight: 20,
	},
	features: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		padding: 16,
	},
	featureItem: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '50%',
		marginBottom: 16,
	},
	featureText: {
		marginLeft: 8,
		color: '#666',
	},
	ratingOverview: {
		flexDirection: 'row',
		marginBottom: 16,
	},
	ratingLeft: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	ratingBig: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	ratingCount: {
		color: '#666',
		marginVertical: 4,
	},
	ratingRight: {
		flex: 2,
	},
	ratingBar: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 4,
	},
	ratingNumber: {
		width: 20,
		textAlign: 'center',
	},
	ratingStars: {
		flexDirection: 'row',
	},
	barContainer: {
		flex: 1,
		height: 4,
		backgroundColor: '#E0E0E0',
		marginLeft: 8,
		borderRadius: 2,
	},
	barFill: {
		height: '100%',
		backgroundColor: '#FFD700',
		borderRadius: 2,
	},
	reviewList: {
		marginTop: 16,
	},
	reviewItem: {
		flexDirection: 'row',
		marginBottom: 16,
	},
	reviewerPic: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 12,
	},
	reviewContent: {
		flex: 1,
	},
	reviewerName: {
		fontWeight: '600',
		marginBottom: 4,
	},
	reviewText: {
		color: '#666',
		marginBottom: 4,
	},
	reviewTime: {
		color: '#999',
		fontSize: 12,
	},
	productList: {
		marginTop: 16,
	},
	productCard: {
		width: 150,
		marginRight: 16,
	},
	productCardImage: {
		width: '100%',
		height: 150,
		borderRadius: 8,
		marginBottom: 8,
	},
	productCardTitle: {
		fontWeight: '500',
		marginBottom: 4,
	},
	productCardRating: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 4,
	},
	productCardRatingText: {
		marginLeft: 4,
		color: '#666',
	},
	productCardPrice: {
		fontWeight: '600',
	},
	bottomBar: {
		borderTopWidth: 1,
		borderTopColor: '#E0E0E0',
		padding: 16,
	},
	notifyContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 16,
	},
	notifyText: {
		flex: 1,
		marginLeft: 12,
	},
	buyContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	cartIconButton: {
		width: 48,
		height: 48,
		borderRadius: 24,
		borderWidth: 1,
		borderColor: '#576CD6',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 16,
	},
	buyButton: {
		flex: 1,
		backgroundColor: '#576CD6',
		height: 48,
		borderRadius: 24,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buyButtonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
	},
});