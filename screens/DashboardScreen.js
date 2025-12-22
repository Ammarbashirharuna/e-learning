// screens/DashboardScreen.js
import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  FlatList,
  ActivityIndicator,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { getCoursesWithProgress } from '../database/db';

const DashboardScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadUser();
      loadCourses();
    }, [])
  );

  const loadUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('loggedInUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserName(user.name);
      }
    } catch (error) {
      console.error('Error loading user:', error);
    }
  };

  const loadCourses = async () => {
    try {
      setLoading(true);
      console.log('📚 Loading courses from database...');
      const data = await getCoursesWithProgress();
      console.log('✅ Loaded courses:', data?.length || 0);
      setCourses(data || []);
    } catch (error) {
      console.error('❌ Error loading courses:', error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const getCourseIcon = (index) => {
    const icons = ['desktop-outline', 'phone-portrait-outline', 'server-outline', 'code-outline', 'git-branch-outline'];
    return icons[index % icons.length];
  };

  const getCourseColor = (index) => {
    const colors = ['#1e3a8a', '#059669', '#7c3aed', '#dc2626', '#ea580c'];
    return colors[index % colors.length];
  };

  const getCourseImage = (courseId) => {
    try {
      if (courseId === 1) {
        return require('../assets/editing.png');
      } else if (courseId === 2) {
        return require('../assets/editing.png');
      } else if (courseId === 3) {
        return require('../assets/editing.png');
      } else if (courseId === 4) {
        return require('../assets/editing.png');
      } else if (courseId === 5) {
        return require('../assets/editing.png');
      }
      return require('../assets/editing.png');
    } catch (error) {
      // If images don't exist, return null and use icon fallback
      return null;
    }
  };

  const renderCourse = ({ item, index }) => {
    const progressPercentage = item.total_lessons > 0
      ? Math.round((item.completed_lessons / item.total_lessons) * 100)
      : 0;
    
    const courseImage = getCourseImage(item.id);
    const bgColor = getCourseColor(index);
    const icon = getCourseIcon(index);

    return (
      <TouchableOpacity
        style={styles.courseCard}
        onPress={() => navigation.navigate('CourseDetail', { course: item })}
        activeOpacity={0.85}
      >
        <View style={[styles.courseImage, { backgroundColor: bgColor }]}>
          {courseImage ? (
            <Image 
              source={courseImage} 
              style={styles.courseImageIcon} 
              resizeMode="contain"
            />
          ) : (
            <Ionicons name={icon} size={40} color="#fff" />
          )}
        </View>
        
        <View style={styles.courseInfo}>
          <Text style={styles.courseTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.courseLectures}>
            {item.total_lessons} Lesson{item.total_lessons !== 1 ? 's' : ''}
          </Text>
          
          {/* Enrollment Badge */}
          {item.is_enrolled ? (
            <View style={styles.enrolledBadge}>
              <Ionicons name="checkmark-circle" size={14} color="#28a745" />
              <Text style={styles.enrolledText}>{progressPercentage}% Done</Text>
            </View>
          ) : (
            <View style={styles.notEnrolledBadge}>
              <Ionicons name="add-circle-outline" size={14} color="#4169E1" />
              <Text style={styles.notEnrolledText}>Enroll Now</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={24} color="#fff" />
          </View>
          <View>
            <Text style={styles.greeting}>Hi! {userName || 'Student'}</Text>
            <Text style={styles.subText}>Find your favorite course here!</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.notificationIcon}
          onPress={() => navigation.navigate('Profile')}
        >
          <Ionicons name="notifications-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#888" />
          <TextInput 
            placeholder="Search Course" 
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>

        {/* Categories */}
        <View style={styles.categories}>
          <TouchableOpacity style={styles.categoryCard}>
            <Ionicons name="color-palette-outline" size={28} color="#4169E1" />
            <Text style={styles.categoryText}>Design</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryCard}>
            <Ionicons name="briefcase-outline" size={28} color="#4169E1" />
            <Text style={styles.categoryText}>Marketing</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryCard}>
            <Ionicons name="create-outline" size={28} color="#4169E1" />
            <Text style={styles.categoryText}>Editing</Text>
          </TouchableOpacity>
        </View>

        {/* Trending Courses */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Courses</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Courses')}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4169E1" />
          </View>
        ) : (
          <FlatList
            data={courses}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderCourse}
            contentContainerStyle={styles.coursesList}
          />
        )}

        <TouchableOpacity 
          style={styles.viewMoreBtn}
          onPress={() => navigation.navigate('Courses')}
        >
          <Text style={styles.viewMoreText}>View more courses</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5' 
  },
  header: {
    backgroundColor: '#4169E1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 24,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#5a7fd9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  greeting: { 
    color: 'white', 
    fontWeight: '600', 
    fontSize: 16 
  },
  subText: { 
    color: '#e0e7ff', 
    fontSize: 13,
    marginTop: 2,
  },
  notificationIcon: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    backgroundColor: 'white',
    margin: 16,
    marginBottom: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: { 
    flex: 1, 
    marginLeft: 10, 
    paddingVertical: 14,
    fontSize: 15,
    color: '#000',
  },
  categories: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    marginHorizontal: 10,
    marginBottom: 24,
  },
  categoryCard: {
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryText: {
    marginTop: 8,
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16, 
    marginBottom: 16,
    alignItems: 'center',
  },
  sectionTitle: { 
    fontWeight: '700', 
    fontSize: 18,
    color: '#000',
  },
  seeAll: { 
    color: '#4169E1',
    fontSize: 14,
    fontWeight: '600',
  },
  loadingContainer: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  coursesList: {
    paddingLeft: 16,
  },
  courseCard: {
    backgroundColor: 'white',
    width: 160,
    borderRadius: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  courseImage: { 
    width: '100%', 
    height: 100, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseImageIcon: {
    width: 50,
    height: 50,
    tintColor: '#fff',
  },
  courseInfo: {
    padding: 12,
  },
  courseTitle: { 
    fontWeight: '600', 
    fontSize: 15,
    color: '#000',
    marginBottom: 6,
    minHeight: 36,
  },
  courseLectures: { 
    color: '#666', 
    fontSize: 12,
    marginBottom: 8,
  },
  enrolledBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d4edda',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  enrolledText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#28a745',
    marginLeft: 4,
  },
  notEnrolledBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e7f3ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  notEnrolledText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4169E1',
    marginLeft: 4,
  },
  viewMoreBtn: { 
    alignSelf: 'center', 
    marginVertical: 24,
    paddingVertical: 14,
  },
  viewMoreText: { 
    color: '#4169E1', 
    fontWeight: '600',
    fontSize: 15,
  },
});

export default DashboardScreen;