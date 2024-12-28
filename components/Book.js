import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Book() {
  // Form state
  const [formData, setFormData] = useState({
    from: "",
    fromStation: "Dehradun Railway Station",
    to: "",
    toStation: "Pune Railway Station",
    departureDate: new Date(),
    returnDate: new Date(),
    travelers: "1 Adult",
    class: "3rd AC"
  });

  // Navigation state
  const [activeTab, setActiveTab] = useState('search');
  
  // Modal states
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateType, setDateType] = useState(null);
  const [showTravellerModal, setShowTravellerModal] = useState(false);
  const [showClassModal, setShowClassModal] = useState(false);

  // Recent searches
  const [recentSearches, setRecentSearches] = useState([
    {
      from: "Kings Cross, London, UK",
      to: "Birmingham, UK",
      date: "Sat 15 June"
    },
    {
      from: "Kings Cross, London, UK",
      to: "Birmingham, UK",
      date: "Sat 15 June"
    }
  ]);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle location swap
  const handleSwap = () => {
    setFormData(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from,
      fromStation: prev.toStation,
      toStation: prev.fromStation
    }));
  };

  // Handle date changes
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleInputChange(dateType, selectedDate);
    }
  };

  // Handle search
  const handleSearch = () => {
    // Add current search to recent searches
    const newSearch = {
      from: formData.from,
      to: formData.to,
      date: formData.departureDate.toLocaleDateString()
    };
    setRecentSearches(prev => [newSearch, ...prev.slice(0, 4)]);
    // Implement your search logic here
  };

  // Navigation content components
  const renderContent = () => {
    switch (activeTab) {
      case 'search':
        return (
          <>
            {/* Train Image */}
            <View style={styles.imageContainer}>
              <Ionicons name="train-outline" size={100} color="#ccc" />
            </View>

            {/* Travel Form */}
            <View style={styles.formContainer}>
              {/* From Field */}
              <View style={styles.inputRow}>
                <Ionicons name="location-outline" size={24} color="#000" />
                <View style={styles.inputSection}>
                  <Text style={styles.label}>From</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.from}
                    onChangeText={(text) => handleInputChange('from', text)}
                    placeholder="Dehradun UK"
                    placeholderTextColor="#333"
                  />
                  <Text style={styles.subLabel}>{formData.fromStation}</Text>
                </View>
              </View>

              {/* Swap Button */}
              <TouchableOpacity style={styles.swapButton} onPress={handleSwap}>
                <Ionicons name="swap-vertical-outline" size={24} color="#007AFF" />
              </TouchableOpacity>

              {/* To Field */}
              <View style={styles.inputRow}>
                <Ionicons name="location-outline" size={24} color="#000" />
                <View style={styles.inputSection}>
                  <Text style={styles.label}>To</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.to}
                    onChangeText={(text) => handleInputChange('to', text)}
                    placeholder="Pune MAHARASHTRA"
                    placeholderTextColor="#333"
                  />
                  <Text style={styles.subLabel}>{formData.toStation}</Text>
                </View>
              </View>

              {/* Date Fields */}
              <View style={styles.dateContainer}>
                <TouchableOpacity 
                  style={styles.dateInput}
                  onPress={() => {
                    setDateType('departureDate');
                    setShowDatePicker(true);
                  }}
                >
                  <Text style={styles.label}>Departure</Text>
                  <Text style={styles.input}>
                    {formData.departureDate.toLocaleDateString()}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.dateInput}
                  onPress={() => {
                    setDateType('returnDate');
                    setShowDatePicker(true);
                  }}
                >
                  <Text style={styles.label}>Return</Text>
                  <Text style={styles.input}>
                    {formData.returnDate.toLocaleDateString()}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Traveler and Class */}
              <View style={styles.dateContainer}>
                <TouchableOpacity 
                  style={styles.dateInput}
                  onPress={() => setShowTravellerModal(true)}
                >
                  <Text style={styles.label}>Traveller</Text>
                  <Text style={styles.input}>{formData.travelers}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.dateInput}
                  onPress={() => setShowClassModal(true)}
                >
                  <Text style={styles.label}>Class</Text>
                  <Text style={styles.input}>{formData.class}</Text>
                </TouchableOpacity>
              </View>

              {/* Search Button */}
              <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                <Text style={styles.searchButtonText}>Search</Text>
              </TouchableOpacity>
            </View>

            {/* Recent Searches */}
            <View style={styles.recentSearchContainer}>
              {recentSearches.map((search, index) => (
                <View key={index} style={styles.recentSearch}>
                  <Ionicons name="time-outline" size={24} color="#000" />
                  <View style={styles.recentSearchTextContainer}>
                    <Text style={styles.recentSearchText}>
                      {search.from} → {search.to}
                    </Text>
                    <Text style={styles.recentSearchDate}>{search.date}</Text>
                  </View>
                </View>
              ))}
            </View>
          </>
        );
      case 'bookings':
        return (
          <View style={styles.centeredContent}>
            <Text>Your Bookings</Text>
          </View>
        );
      case 'chat':
        return (
          <View style={styles.centeredContent}>
            <Text>Chat Support</Text>
          </View>
        );
      case 'profile':
        return (
          <View style={styles.centeredContent}>
            <Text>User Profile</Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <StatusBar style="auto" />
        {renderContent()}
      </ScrollView>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <DateTimePicker
          value={dateType === 'departureDate' ? formData.departureDate : formData.returnDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => setActiveTab('search')}>
          <Ionicons 
            name={activeTab === 'search' ? "search" : "search-outline"} 
            size={24} 
            color={activeTab === 'search' ? "#007AFF" : "#000"} 
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('bookings')}>
          <Ionicons 
            name={activeTab === 'bookings' ? "bookmark" : "bookmark-outline"} 
            size={24} 
            color={activeTab === 'bookings' ? "#007AFF" : "#000"} 
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('chat')}>
          <Ionicons 
            name={activeTab === 'chat' ? "chatbubble" : "chatbubble-outline"} 
            size={24} 
            color={activeTab === 'chat' ? "#007AFF" : "#000"} 
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('profile')}>
          <Ionicons 
            name={activeTab === 'profile' ? "person" : "person-outline"} 
            size={24} 
            color={activeTab === 'profile' ? "#007AFF" : "#000"} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f5f5f5",
    },
    imageContainer: {
      alignItems: "center",
      marginVertical: 30,
    },
    formContainer: {
      paddingHorizontal: 20,
    },
    inputRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    inputSection: {
      flex: 1,
      paddingLeft: 10,
    },
    label: {
      fontSize: 14,
      color: "#666",
    },
    input: {
      fontSize: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      paddingVertical: 5,
    },
    subLabel: {
      fontSize: 12,
      color: "#888",
    },
    swapButton: {
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 10,
    },
    dateContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    dateInput: {
      flex: 1,
      marginRight: 10,
      paddingVertical: 10,
      backgroundColor: "#fff",
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "#ccc",
    },
    searchButton: {
      backgroundColor: "#007AFF",
      paddingVertical: 12,
      marginTop: 20,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
    },
    searchButtonText: {
      color: "#fff",
      fontSize: 16,
    },
    recentSearchContainer: {
      marginTop: 40,
    },
    recentSearch: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
    },
    recentSearchTextContainer: {
      marginLeft: 10,
    },
    recentSearchText: {
      fontSize: 14,
    },
    recentSearchDate: {
      fontSize: 12,
      color: "#888",
    },
    bottomNav: {
      flexDirection: "row",
      justifyContent: "space-around",
      backgroundColor: "#fff",
      paddingVertical: 10,
      borderTopWidth: 1,
      borderTopColor: "#ddd",
    },
    centeredContent: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
});
