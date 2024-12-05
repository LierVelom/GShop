import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { ArrowLeft, User, Mail, Phone, Lock, ChevronRight, LogOut, Bolt, ReceiptText } from 'lucide-react-native';
import { getImageLink } from '../lib/getImageLink';
import { fetchAPI, postAPI } from '../auth/ActionAPI';
import { removeToken } from '../auth/AuthToken';


export default function UserProfileScreen({ navigation }) {

	const [user, setUser] = React.useState({});

	useEffect(() => {
		// Fetch user data
		fetchAPI('user')
			.then((data) => {
				setUser(data);
			})
			.catch((error) => {
				console.error('Error fetching user data:', error);
			});

	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<View style={styles.header}>
					<TouchableOpacity style={styles.backButton}
						onPress={() => navigation.goBack()}
					>
					</TouchableOpacity>
				</View>

				<View style={styles.profileSection}>
					<Image
						source={{ uri: getImageLink('users', user.id) }}
						style={styles.profileImage}
					/>
					<Text style={styles.userName}>{user.name}</Text>
					<Text style={styles.userEmail}>{user.email}</Text>
				</View>

				<View style={styles.infoSection}>

					{/* Invoice List */}

					<TouchableOpacity style={styles.infoItem}
						onPress={() => navigation.navigate('invoiceList')}
					>
						<View style={styles.infoIcon}>
							<ReceiptText size={20} color="#06B6D4" />
						</View>
						<View style={styles.infoContent}>
							<Text style={styles.infoLabel}>Invoices</Text>
							<ChevronRight size={20} color="#9CA3AF" />
						</View>
					</TouchableOpacity>

					<TouchableOpacity style={styles.infoItem}>
						<View style={styles.infoIcon}>
							<User size={20} color="#06B6D4" />
						</View>
						<View style={styles.infoContent}>
							<Text style={styles.infoLabel}>Edit Profile</Text>
							<ChevronRight size={20} color="#9CA3AF" />
						</View>
					</TouchableOpacity>

					<TouchableOpacity style={styles.infoItem}>
						<View style={styles.infoIcon}>
							<Bolt size={20} color="#06B6D4" />
						</View>
						<View style={styles.infoContent}>
							<Text style={styles.infoLabel}>Setting</Text>
							<ChevronRight size={20} color="#9CA3AF" />
						</View>
					</TouchableOpacity>

					<TouchableOpacity style={styles.infoItem}>
						<View style={styles.infoIcon}>
							<Lock size={20} color="#06B6D4" />
						</View>
						<View style={styles.infoContent}>
							<Text style={styles.infoLabel}>Change Password</Text>
							<ChevronRight size={20} color="#9CA3AF" />
						</View>
					</TouchableOpacity>
				</View>

				<TouchableOpacity style={styles.logoutButton}
					onPress={() => {
						// Log out
						Alert.alert('Log Out', 'Are you sure you want to log out?', [
							{
								text: 'Cancel',
								style: 'cancel',
							},
							{
								text: 'Log Out',
								style: 'destructive',
								onPress: () => {
									postAPI('logout')
										.then(() => {
											removeToken();
											navigation.replace('welcome');
										})
										.catch((error) => {
											console.error('Error logging out:', error);
										});
								},
							},
						]);
					}}
				>
					<LogOut size={20} color="#EF4444" />
					<Text style={styles.logoutText}>Log Out</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 16,
	},
	backButton: {
		padding: 8,
		marginRight: 8,
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: '600',
	},
	profileSection: {
		alignItems: 'center',
		padding: 20,
	},
	profileImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginBottom: 16,
	},
	userName: {
		fontSize: 24,
		fontWeight: '600',
		marginBottom: 4,
	},
	userEmail: {
		fontSize: 16,
		color: '#6B7280',
	},
	infoSection: {
		paddingHorizontal: 16,
	},
	infoItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#E5E7EB',
	},
	infoIcon: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: '#E5E7EB',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 12,
	},
	infoContent: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	infoLabel: {
		fontSize: 16,
		color: '#1F2937',
	},
	logoutButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 32,
		marginBottom: 16,
		padding: 16,
		backgroundColor: '#FEE2E2',
		borderRadius: 8,
		marginHorizontal: 16,
	},
	logoutText: {
		marginLeft: 8,
		fontSize: 16,
		fontWeight: '600',
		color: '#EF4444',
	},
});