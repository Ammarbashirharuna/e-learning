// screens/CourseDetailScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getDatabase, checkEnrollment, enrollInCourse, getLessonsByCourse } from '../database/db';

const placeholder = require('../assets/editing.png');

const CourseDetailScreen = ({ route, navigation }) => {
  const { course } = route.params || {};
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!course) return;
    loadCourseData();
  }, [course]);

  const loadCourseData = async () => {
    try {
      setLoading(true);
      // Check if user is enrolled
      const enrolled = await checkEnrollment(course.id);
      setIsEnrolled(enrolled);

      // If enrolled, load lessons with progress
      if (enrolled) {
        const courseLessons = await getLessonsByCourse(course.id);
        setLessons(courseLessons);
      }
    } catch (e) {
      console.error('Error loading course data:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    if (!course) {
      Alert.alert('Error', 'Course data missing.');
      return;
    }
    
    setEnrolling(true);
    try {
      const success = await enrollInCourse(course.id);
      
      if (success) {
        setIsEnrolled(true);
        // Load lessons after enrollment
        const courseLessons = await getLessonsByCourse(course.id);
        setLessons(courseLessons);
        Alert.alert(
          'Success!', 
          `You have successfully enrolled in "${course.title}". You can now start learning!`,
          [
            {
              text: 'Start Learning',
              onPress: () => {
                // Navigate to first lesson if available
                if (courseLessons.length > 0) {
                  navigation.navigate('Lesson', { 
                    course, 
                    lessonIndex: 0,
                    lessonId: courseLessons[0].id 
                  });
                }
              }
            },
            { text: 'OK' }
          ]
        );
      } else {
        Alert.alert('Already Enrolled', 'You are already enrolled in this course.');
        setIsEnrolled(true);
        const courseLessons = await getLessonsByCourse(course.id);
        setLessons(courseLessons);
      }
    } catch (error) {
      console.error('Enrollment error:', error);
      Alert.alert('Error', 'Something went wrong while enrolling. Please try again.');
    } finally {
      setEnrolling(false);
    }
  };

  const onOpenLesson = (lesson, index) => {
    navigation.navigate('Lesson', { 
      course, 
      lessonIndex: index,
      lessonId: lesson.id 
    });
  };

  const renderLesson = ({ item, index }) => {
    const completed = item.completed === 1;
    return (
      <TouchableOpacity
        style={styles.lessonCard}
        onPress={() => onOpenLesson(item, index)}
        activeOpacity={0.85}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <Ionicons 
            name={completed ? 'checkmark-circle' : 'play-circle-outline'} 
            size={24} 
            color={completed ? '#28a745' : '#007bff'} 
          />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={[styles.lessonText, completed && { color: '#999' }]}>
              {index + 1}. {item.title}
            </Text>
            {completed && (
              <Text style={styles.completedLabel}>Completed</Text>
            )}
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </View>
      </TouchableOpacity>
    );
  };

  if (!course) {
    return (
      <View style={styles.empty}>
        <Text style={{ color: '#666' }}>Course not found.</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.empty}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  const imageSource =
    typeof course.image === "string"
      ? { uri: course.image }
      : course.image || placeholder;

  // Calculate progress if enrolled
  const completedLessons = lessons.filter(l => l.completed === 1).length;
  const totalLessons = lessons.length;
  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={imageSource} style={styles.banner} resizeMode="cover" />

      <View style={styles.content}>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.instructor}>
          <Ionicons name="person" size={16} color="#666" /> {course.instructor}
        </Text>

        {course.rating && (
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={18} color="#FFD700" />
            <Text style={styles.ratingText}>{course.rating} / 5.0</Text>
          </View>
        )}

        {/* Show progress bar if enrolled */}
        {isEnrolled && (
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressText}>Your Progress</Text>
              <Text style={styles.progressPercentage}>{progressPercentage}%</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
            </View>
            <Text style={styles.progressDetail}>
              {completedLessons} of {totalLessons} lessons completed
            </Text>
          </View>
        )}

        <Text style={styles.sectionHeader}>About this Course</Text>
        <Text style={styles.description}>
          {course.longDescription ?? course.description ?? course.shortDescription}
        </Text>

        {/* What you'll learn section */}
        {!isEnrolled && (
          <View style={styles.whatYouLearnContainer}>
            <Text style={styles.sectionHeader}>What You'll Learn</Text>
            <View style={styles.learnItem}>
              <Ionicons name="checkmark-circle" size={20} color="#28a745" />
              <Text style={styles.learnText}>Understand fundamental concepts</Text>
            </View>
            <View style={styles.learnItem}>
              <Ionicons name="checkmark-circle" size={20} color="#28a745" />
              <Text style={styles.learnText}>Gain practical skills</Text>
            </View>
            <View style={styles.learnItem}>
              <Ionicons name="checkmark-circle" size={20} color="#28a745" />
              <Text style={styles.learnText}>Complete hands-on exercises</Text>
            </View>
          </View>
        )}

        {/* Course Content - Only show if enrolled */}
        {isEnrolled ? (
          <>
            <Text style={styles.sectionHeader}>Course Content</Text>
            <Text style={styles.lessonCount}>
              {totalLessons} Lesson{totalLessons !== 1 ? 's' : ''}
            </Text>
            
            <FlatList
              data={lessons}
              renderItem={renderLesson}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              contentContainerStyle={{ marginTop: 10 }}
            />
          </>
        ) : (
          <View style={styles.lockedContent}>
            <Ionicons name="lock-closed" size={48} color="#ccc" />
            <Text style={styles.lockedText}>Enroll to access course content</Text>
            <Text style={styles.lockedSubtext}>
              {totalLessons || course.total_lessons || 'Multiple'} lessons waiting for you
            </Text>
          </View>
        )}
      </View>

      {/* Enroll Button - Fixed at bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.enrollButton, 
            isEnrolled && styles.enrolledButton,
            enrolling && { opacity: 0.7 }
          ]}
          onPress={isEnrolled ? null : handleEnroll}
          disabled={enrolling || isEnrolled}
          activeOpacity={isEnrolled ? 1 : 0.7}
        >
          {enrolling ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Ionicons 
                name={isEnrolled ? "checkmark-circle" : "add-circle"} 
                size={24} 
                color="white" 
                style={{ marginRight: 8 }}
              />
              <Text style={styles.enrollText}>
                {isEnrolled ? 'Already Enrolled' : 'Enroll in this Course'}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#f8faff', flex: 1 },
  banner: { width: '100%', height: 220 },
  content: { padding: 20, paddingBottom: 100 },
  title: { fontSize: 24, fontWeight: '700', color: '#222', marginBottom: 8 },
  instructor: { color: '#666', marginVertical: 4, fontSize: 15 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  ratingText: { marginLeft: 5, color: '#444', fontWeight: '600' },
  progressContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: { fontSize: 15, fontWeight: '600', color: '#333' },
  progressPercentage: { fontSize: 16, fontWeight: '700', color: '#007bff' },
  progressBarBg: {
    height: 8,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#007bff',
    borderRadius: 4,
  },
  progressDetail: { fontSize: 13, color: '#666', marginTop: 6 },
  sectionHeader: { 
    fontWeight: '700', 
    fontSize: 18, 
    marginTop: 20, 
    marginBottom: 10, 
    color: '#222' 
  },
  description: { color: '#555', lineHeight: 22, fontSize: 15 },
  whatYouLearnContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  learnItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  learnText: { marginLeft: 12, color: '#333', fontSize: 15 },
  lessonCount: {
    color: '#666',
    fontSize: 14,
    marginTop: -5,
    marginBottom: 5,
  },
  lessonCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'white', 
    padding: 16, 
    marginVertical: 6, 
    borderRadius: 12, 
    shadowColor: '#000', 
    shadowOpacity: 0.06, 
    shadowRadius: 4, 
    elevation: 2 
  },
  lessonText: { 
    color: '#333', 
    fontSize: 15, 
    fontWeight: '500',
  },
  completedLabel: {
    fontSize: 12,
    color: '#28a745',
    marginTop: 2,
  },
  lockedContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 16,
  },
  lockedText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
    marginTop: 16,
  },
  lockedSubtext: {
    fontSize: 14,
    color: '#bbb',
    marginTop: 4,
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 30,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  enrollButton: { 
    backgroundColor: '#007bff', 
    paddingVertical: 16, 
    borderRadius: 12, 
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#007bff',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  enrolledButton: { 
    backgroundColor: '#28a745',
    shadowColor: '#28a745',
  },
  enrollText: { 
    color: 'white', 
    fontWeight: '700', 
    fontSize: 17,
  },
  empty: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#f8faff',
  },
});

export default CourseDetailScreen;