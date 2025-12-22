// screens/CoursesScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { getCoursesWithProgress } from '../database/db';

const CoursesScreen = ({ navigation }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Reload courses when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadCourses();
    }, [])
  );

  const loadCourses = async () => {
    try {
      setLoading(true);
      const allCourses = await getCoursesWithProgress();
      setCourses(allCourses);
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderCourse = ({ item }) => {
    const progressPercentage =
      item.total_lessons > 0
        ? Math.round((item.completed_lessons / item.total_lessons) * 100)
        : 0;

    // Assign images based on course ID or title
    let imageSource;
    if (item.id === 1) {
      imageSource = require('../assets/editing.png');
    } else if (item.id === 2) {
      imageSource = require('../assets/editing.png');
    } else if (item.id === 3) {
      imageSource = require('../assets/editing.png');
    } else {
      imageSource = require('../assets/editing.png');
    }

    return (
      <TouchableOpacity
        style={styles.courseCard}
        onPress={() => navigation.navigate('CourseDetail', { course: item })}
        activeOpacity={0.8}
      >
        <View style={styles.courseImageContainer}>
          <Image source={imageSource} style={styles.courseImage} resizeMode="contain" />
          
          {/* Enrollment Badge */}
          {item.is_enrolled && (
            <View style={styles.enrolledBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#fff" />
              <Text style={styles.enrolledBadgeText}>Enrolled</Text>
            </View>
          )}
        </View>

        <View style={styles.courseInfo}>
          <Text style={styles.courseTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.instructor} numberOfLines={1}>
            <Ionicons name="person-outline" size={14} color="#666" /> {item.instructor}
          </Text>
          <Text style={styles.lessonCount}>
            <Ionicons name="book-outline" size={14} color="#666" /> {item.total_lessons}{' '}
            Lesson{item.total_lessons !== 1 ? 's' : ''}
          </Text>

          {/* Show progress if enrolled */}
          {item.is_enrolled ? (
            <View style={styles.progressSection}>
              <View style={styles.progressBar}>
                <View
                  style={[styles.progressFill, { width: `${progressPercentage}%` }]}
                />
              </View>
              <Text style={styles.progressText}>{progressPercentage}% Complete</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.enrollButton}
              onPress={() => navigation.navigate('CourseDetail', { course: item })}
            >
              <Ionicons name="add-circle" size={18} color="#007bff" />
              <Text style={styles.enrollButtonText}>Enroll</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading courses...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>All Courses</Text>
        <Text style={styles.headerSubtitle}>
          Select a course to {courses.some(c => c.is_enrolled) ? 'continue learning' : 'start learning'}
        </Text>
      </View>

      <FlatList
        data={courses}
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
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  courseImageContainer: {
    width: 120,
    backgroundColor: '#e7f3ff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  courseImage: {
    width: 70,
    height: 70,
    tintColor: '#007bff',
  },
  enrolledBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#28a745',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  enrolledBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 4,
  },
  courseInfo: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  courseTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222',
    marginBottom: 6,
  },
  instructor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  lessonCount: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  progressSection: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e9ecef',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007bff',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#007bff',
    fontWeight: '600',
  },
  enrollButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e7f3ff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  enrollButtonText: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
});

export default CoursesScreen;