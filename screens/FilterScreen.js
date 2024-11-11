import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

export default function FilterScreen({ navigation }) {
  const [priceRange, setPriceRange] = useState([10, 1000]);
  const [selectedRating, setSelectedRating] = useState(4);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FontAwesome
        key={index}
        name={index < rating ? 'star' : 'star-o'}
        size={20}
        color="#FFD700"
      />
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Filter</Text>
        <TouchableOpacity onPress={() => {
          navigation.goBack();
        }}>
          <FontAwesome name="close" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shipping options</Text>
            <FontAwesome name="angle-up" size={20} color="#000" />
          </View>
          <View style={styles.checkboxGroup}>
            <TouchableOpacity style={styles.checkboxItem}>
              <View style={styles.checkbox} />
              <Text style={styles.checkboxLabel}>Instant (2 hours delivery)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.checkboxItem}>
              <View style={styles.checkbox} />
              <Text style={styles.checkboxLabel}>Express (2 days delivery)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.checkboxItem}>
              <View style={styles.checkbox} />
              <Text style={styles.checkboxLabel}>Standard (7- 10 days delivery)</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Price range</Text>
            <FontAwesome name="angle-up" size={20} color="#000" />
          </View>
          <View style={styles.priceInputs}>
            <View style={styles.priceInputContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.priceInput}
                value={priceRange[0].toString()}
                onChangeText={setPriceRange}
                keyboardType="numeric"
                placeholder="10"
              />
            </View>
            <View style={styles.priceInputContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.priceInput}
                value={priceRange[1].toString()}
                onChangeText={setPriceRange}
                keyboardType="numeric"
                placeholder="1000"
              />
            </View>
          </View>
          <MultiSlider
            values={priceRange}
            min={priceRange[0]}
            max={priceRange[1]}
            step={1}
            sliderLength={280}
            onValuesChange={setPriceRange}
            selectedStyle={{ backgroundColor: '#00BCD4' }}
            unselectedStyle={{ backgroundColor: '#E0E0E0' }}
            markerStyle={styles.sliderMarker}
            showSteps={true}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Average review</Text>
            <FontAwesome name="angle-up" size={20} color="#000" />
          </View>
          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {renderStars(4)}
            </View>
            <Text style={styles.ratingText}>& Up</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Others</Text>
            <FontAwesome name="angle-up" size={20} color="#000" />
          </View>
          <View style={styles.optionsGrid}>
            <TouchableOpacity style={styles.optionCard}>
              <FontAwesome name="refresh" size={24} color="#00BCD4" />
              <Text style={styles.optionText}>30-day Free Return</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionCard}>
              <FontAwesome name="shield" size={24} color="#666" />
              <Text style={styles.optionText}>Buyer Protection</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionCard}>
              <FontAwesome name="tag" size={24} color="#666" />
              <Text style={styles.optionText}>Best Deal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionCard}>
              <FontAwesome name="map-marker" size={24} color="#666" />
              <Text style={styles.optionText}>Ship to store</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
		paddingTop: Platform.OS === 'android' ? 35 : 0
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  checkboxGroup: {
    gap: 12,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 4,
    marginRight: 12,
  },
  checkboxLabel: {
    color: '#666',
  },
  priceInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    paddingHorizontal: 8,
    width: '45%',
  },
  currencySymbol: {
    color: '#666',
    marginRight: 4,
  },
  priceInput: {
    flex: 1,
    height: 40,
  },
  sliderMarker: {
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderColor: '#00BCD4',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    color: '#666',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  optionCard: {
    width: '45%',
    aspectRatio: 2,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  optionText: {
    marginTop: 8,
    color: '#666',
    textAlign: 'center',
  },
});