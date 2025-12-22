// screens/MyCoursesScreen.js
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { getEnrolledCourses } from '../database/db';

const MyCoursesScreen = ({ navigation }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Reload courses every time screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadEnrolledCourses();
    }, [])
  );

  const loadEnrolledCourses = async () => {
    try {
      setLoading(true);
      console.log('📚 Loading enrolled courses...');
      const courses = await getEnrolledCourses();
      console.log('✅ Loaded enrolled courses:', courses.length);
      setEnrolledCourses(courses);
    } catch (error) {
      console.error('❌ Error loading enrolled courses:', error);
      setEnrolledCourses([]);
    } finally {
      setLoading(false);
    }
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
      return null;
    }
  };

  const getCourseColor = (index) => {
    const colors = ['#1e3a8a', '#059669', '#7c3aed', '#dc2626', '#ea580c'];
    return colors[index % colors.length];
  };

  const renderCourse = ({ item, index }) => {
    const progressPercentage =
      item.total_lessons > 0
        ? Math.round((item.completed_lessons / item.total_lessons) * 100)
        : 0;

    const courseImage = getCourseImage(item.id);
    const bgColor = getCourseColor(index);

    return (
      <TouchableOpacity
        style={styles.courseCard}
        onPress={() => navigation.navigate('CourseDetail', { course: item })}
        activeOpacity={0.8}
      >
        {/* Course Image/Icon */}
        <View style={[styles.imageContainer, { backgroundColor: bgColor }]}>
          {courseImage ? (
            <Image 
              source={courseImage} 
              style={styles.courseImage} 
              resizeMode="contain"
            />
          ) : (
            <Ionicons name="book" size={50} color="#fff" />
          )}
        </View>
        
        <View style={styles.courseContent}>
          <Text style={styles.courseTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.instructor} numberOfLines={1}>
            <Ionicons name="person-outline" size={14} color="#666" /> {item.instructor}
          </Text>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressInfo}>
              <Text style={styles.progressText}>Progress</Text>
              <Text style={styles.progressPercentage}>{progressPercentage}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[styles.progressFill, { width: `${progressPercentage}%` }]}
              />
            </View>
            <Text style={styles.lessonCount}>
              {item.completed_lessons} of {item.total_lessons} lessons completed
            </Text>
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => navigation.navigate('CourseDetail', { course: item })}
          >
            <Text style={styles.continueText}>Continue Learning</Text>
            <Ionicons name="arrow-forward" size={16} color="#4169E1" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4169E1" />
        <Text style={styles.loadingText}>Loading your courses...</Text>
      </View>
    );
  }

  if (enrolledCourses.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Courses</Text>
        </View>
        
        <View style={styles.emptyContainer}>
          <Ionicons name="school-outline" size={80} color="#ddd" />
          <Text style={styles.emptyTitle}>No Enrolled Courses Yet</Text>
          <Text style={styles.emptyText}>
            Start learning by enrolling in a course from the home screen
          </Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.browseButtonText}>Browse Courses</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Courses</Text>
        <Text style={styles.headerSubtitle}>
          {enrolledCourses.length} course{enrolledCourses.length !== 1 ? 's' : ''} enrolled
        </Text>
      </View>

      <FlatList
        data={enrolledCourses}
        renderItem={renderCourse}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8faff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8faff',
  },
  loadingText: {
    marginTop: 12,
    color: '#666',
    fontSize: 16,
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#222',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#666',
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  imageContainer: {
    width: '100%',
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseImage: {
    width: 80,
    height: 80,
    tintColor: '#fff',
  },
  courseContent: {
    padding: 16,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginBottom: 6,
  },
  instructor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  progressContainer: {
    marginTop: 8,
    marginBottom: 12,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  progressPercentage: {
    fontSize: 13,
    color: '#4169E1',
    fontWeight: '700',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e9ecef',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4169E1',
    borderRadius: 3,
  },
  lessonCount: {
    fontSize: 12,
    color: '#999',
    marginTop: 6,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e7f3ff',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 8,
  },
  continueText: {
    color: '#4169E1',
    fontSize: 15,
    fontWeight: '600',
    marginRight: 6,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginTop: 20,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: '#4169E1',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MyCoursesScreen;