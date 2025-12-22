// screens/LessonScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getLessonsByCourse, markLessonComplete, markLessonIncomplete } from '../database/db';

const LessonScreen = ({ route, navigation }) => {
  const { course, lessonIndex = 0, lessonId } = route.params || {};
  
  const [lessons, setLessons] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(lessonIndex);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (course) {
      loadLessons();
    }
  }, [course]);

  useEffect(() => {
    if (lessons.length > 0) {
      loadCurrentLesson();
    }
  }, [currentIndex, lessons]);

  const loadLessons = async () => {
    try {
      setLoading(true);
      const courseLessons = await getLessonsByCourse(course.id);
      console.log('📚 Loaded lessons:', courseLessons.length);
      setLessons(courseLessons);
    } catch (error) {
      console.error('Error loading lessons:', error);
      Alert.alert('Error', 'Failed to load lessons');
    } finally {
      setLoading(false);
    }
  };

  const loadCurrentLesson = () => {
    if (lessons[currentIndex]) {
      const lesson = lessons[currentIndex];
      setCurrentLesson(lesson);
      setIsCompleted(lesson.completed === 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = async () => {
    // Mark current lesson as complete before moving to next
    if (currentLesson && !isCompleted) {
      await markLessonComplete(currentLesson.id);
      setIsCompleted(true);
    }

    if (currentIndex < lessons.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Reached the end
      Alert.alert(
        'Course Progress',
        'You have completed all lessons! Keep up the great work!',
        [
          {
            text: 'Back to Course',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }
  };

  const toggleComplete = async () => {
    if (!currentLesson) return;

    try {
      if (isCompleted) {
        await markLessonIncomplete(currentLesson.id);
        setIsCompleted(false);
      } else {
        await markLessonComplete(currentLesson.id);
        setIsCompleted(true);
      }
      
      // Reload lessons to update the list
      await loadLessons();
    } catch (error) {
      console.error('Error toggling completion:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4169E1" />
        <Text style={styles.loadingText}>Loading lesson...</Text>
      </View>
    );
  }

  if (!currentLesson || lessons.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.emptyContainer}>
          <Ionicons name="document-text-outline" size={80} color="#ddd" />
          <Text style={styles.emptyTitle}>No Lessons Available</Text>
          <Text style={styles.emptyText}>
            This course doesn't have any lessons yet.
          </Text>
        </View>
      </View>
    );
  }

  // Parse content into sections
  const contentSections = parseContent(currentLesson.content);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={toggleComplete} style={styles.completeButton}>
          <Ionicons 
            name={isCompleted ? "checkmark-circle" : "checkmark-circle-outline"} 
            size={24} 
            color={isCompleted ? "#28a745" : "#999"} 
          />
        </TouchableOpacity>
      </View>

      {/* Course Info */}
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle}>{course.title}</Text>
        <Text style={styles.lessonProgress}>
          Lesson {currentIndex + 1} of {lessons.length}
        </Text>
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text style={styles.lessonTitle}>{currentLesson.title}</Text>

        {/* Render content sections */}
        {contentSections.map((section, index) => (
          <View key={index}>
            {section.type === 'paragraph' && (
              <Text style={styles.paragraph}>{section.text}</Text>
            )}
            {section.type === 'heading' && (
              <Text style={styles.heading}>{section.text}</Text>
            )}
            {section.type === 'bulletList' && (
              <View style={styles.bulletList}>
                {section.items.map((item, idx) => (
                  <View key={idx} style={styles.bulletItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>{item}</Text>
                  </View>
                ))}
              </View>
            )}
            {section.type === 'keyPrinciple' && (
              <View style={styles.keyPrinciple}>
                <View style={styles.principleHeader}>
                  <Ionicons name="bulb" size={20} color="#4169E1" />
                  <Text style={styles.principleTitle}>Key Principle</Text>
                </View>
                <Text style={styles.principleText}>{section.text}</Text>
              </View>
            )}
          </View>
        ))}

        {/* Progress indicator */}
        <View style={styles.progressSection}>
          <Text style={styles.progressTitle}>Your Progress</Text>
          <View style={styles.progressDots}>
            {lessons.map((lesson, idx) => (
              <View
                key={idx}
                style={[
                  styles.progressDot,
                  idx === currentIndex && styles.progressDotActive,
                  lesson.completed === 1 && styles.progressDotCompleted,
                ]}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navigationBar}>
        <TouchableOpacity
          style={[styles.navButton, styles.prevButton, currentIndex === 0 && styles.navButtonDisabled]}
          onPress={handlePrevious}
          disabled={currentIndex === 0}
        >
          <Ionicons name="chevron-back" size={20} color={currentIndex === 0 ? "#ccc" : "#666"} />
          <Text style={[styles.navButtonText, currentIndex === 0 && styles.navButtonTextDisabled]}>
            Previous
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, styles.nextButton]}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {currentIndex === lessons.length - 1 ? 'Finish' : 'Next'}
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Helper function to parse content into structured sections
const parseContent = (content) => {
  if (!content) return [];

  const sections = [];
  const lines = content.split('\n').filter(line => line.trim());

  let currentBulletList = null;

  lines.forEach((line) => {
    const trimmed = line.trim();

    // Check for bullet points
    if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
      const text = trimmed.substring(1).trim();
      if (currentBulletList) {
        currentBulletList.items.push(text);
      } else {
        currentBulletList = { type: 'bulletList', items: [text] };
      }
    } else {
      // If we were building a bullet list, push it
      if (currentBulletList) {
        sections.push(currentBulletList);
        currentBulletList = null;
      }

      // Check if it's a heading (simple heuristic: short lines ending with :)
      if (trimmed.endsWith(':') && trimmed.length < 50) {
        sections.push({ type: 'heading', text: trimmed.replace(':', '') });
      } 
      // Check for key principle
      else if (trimmed.toLowerCase().includes('key principle') || 
               trimmed.toLowerCase().includes('important')) {
        sections.push({ type: 'keyPrinciple', text: trimmed });
      }
      // Regular paragraph
      else if (trimmed.length > 0) {
        sections.push({ type: 'paragraph', text: trimmed });
      }
    }
  });

  // Push any remaining bullet list
  if (currentBulletList) {
    sections.push(currentBulletList);
  }

  return sections;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8faff',
  },
  loadingContainer: {
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  completeButton: {
    padding: 8,
  },
  courseInfo: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  courseTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  lessonProgress: {
    fontSize: 12,
    color: '#999',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  lessonTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
    marginTop: 24,
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 26,
    color: '#444',
    marginBottom: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginTop: 20,
    marginBottom: 12,
  },
  bulletList: {
    marginVertical: 12,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingLeft: 8,
  },
  bullet: {
    fontSize: 20,
    color: '#4169E1',
    marginRight: 12,
    lineHeight: 26,
  },
  bulletText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 26,
    color: '#444',
  },
  keyPrinciple: {
    backgroundColor: '#e7f3ff',
    padding: 16,
    borderRadius: 12,
    marginVertical: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4169E1',
  },
  principleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  principleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4169E1',
    marginLeft: 8,
  },
  principleText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#333',
  },
  progressSection: {
    marginTop: 32,
    marginBottom: 20,
    alignItems: 'center',
  },
  progressTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    fontWeight: '500',
  },
  progressDots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
    marginHorizontal: 4,
  },
  progressDotActive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4169E1',
  },
  progressDotCompleted: {
    backgroundColor: '#28a745',
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  prevButton: {
    backgroundColor: '#f5f5f5',
  },
  nextButton: {
    backgroundColor: '#4169E1',
  },
  navButtonDisabled: {
    opacity: 0.4,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginLeft: 6,
  },
  navButtonTextDisabled: {
    color: '#ccc',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
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
  },
});

export default LessonScreen;