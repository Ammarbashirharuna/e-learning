import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { getDatabase } from "../database/db";
import { Ionicons } from '@expo/vector-icons';

export default function CourseListScreen({ navigation }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const db = await getDatabase();
      
      // Get all courses with lesson count
      const coursesData = await db.getAllAsync(`
        SELECT 
          c.id,
          c.title,
          c.description,
          c.instructor,
          COUNT(l.id) as total_lessons
        FROM courses c
        LEFT JOIN lessons l ON c.id = l.course_id
        GROUP BY c.id
      `);
      
      setCourses(coursesData);
    } catch (error) {
      console.error('Error loading courses:', error);
    }
  };

  const getCourseIcon = (index) => {
    const icons = ['book-outline', 'code-slash-outline', 'layers-outline'];
    return icons[index % icons.length];
  };

  const renderItem = ({ item, index }) => {
    const hours = Math.ceil(item.total_lessons * 0.5); // Estimate hours

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("Lessons", {
            courseId: item.id,
            courseTitle: item.title,
          })
        }
      >
        <View style={styles.cardContent}>
          <View style={styles.iconContainer}>
            <Ionicons name={getCourseIcon(index)} size={24} color="#4169E1" />
          </View>
          
          <View style={styles.courseInfo}>
            <Text style={styles.courseTitle}>Course {item.id}</Text>
            <Text style={styles.courseMeta}>
              {item.total_lessons} Lessons • {hours} Hours
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.startButton}
            onPress={() =>
              navigation.navigate("Lessons", {
                courseId: item.id,
                courseTitle: item.title,
              })
            }
          >
            <Text style={styles.startButtonText}>Start</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Courses</Text>
        <Text style={styles.headerSubtitle}>Select a course to continue learning</Text>
      </View>

      <FlatList
        data={courses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 60,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 15,
    color: "#666",
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#E8EEFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  courseMeta: {
    fontSize: 13,
    color: "#666",
  },
  startButton: {
    backgroundColor: "#4169E1",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});