// database/adminDb.js - Admin Repository Functions
import { getDatabase, initDatabase } from './db';

// Helper to ensure database is initialized
const ensureDatabase = async () => {
  try {
    let db = await getDatabase();
    if (!db) {
      console.log('Database not initialized, initializing now...');
      await initDatabase();
      db = await getDatabase();
    }
    return db;
  } catch (error) {
    console.error('Error ensuring database:', error);
    throw error;
  }
};

// ==================== COURSE MANAGEMENT ====================

/**
 * Create a new course
 */
export const createCourse = async (title, description, instructor) => {
  try {
    const db = await ensureDatabase();
    const result = await db.runAsync(
      'INSERT INTO courses (title, description, instructor) VALUES (?, ?, ?)',
      [title, description, instructor]
    );
    console.log('✅ Course created with ID:', result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error('❌ Error creating course:', error);
    throw error;
  }
};

/**
 * Update an existing course
 */
export const updateCourse = async (id, title, description, instructor) => {
  try {
    const db = await ensureDatabase();
    await db.runAsync(
      'UPDATE courses SET title = ?, description = ?, instructor = ? WHERE id = ?',
      [title, description, instructor, id]
    );
    console.log('✅ Course updated:', id);
    return true;
  } catch (error) {
    console.error('❌ Error updating course:', error);
    throw error;
  }
};

/**
 * Delete a course and all its lessons
 */
export const deleteCourse = async (id) => {
  try {
    const db = await ensureDatabase();
    
    // First, delete all lessons for this course
    await db.runAsync('DELETE FROM lessons WHERE course_id = ?', [id]);
    
    // Delete all progress for lessons in this course
    await db.runAsync(
      `DELETE FROM progress WHERE lesson_id IN 
       (SELECT id FROM lessons WHERE course_id = ?)`,
      [id]
    );
    
    // Delete enrollments for this course
    await db.runAsync('DELETE FROM enrollments WHERE course_id = ?', [id]);
    
    // Finally, delete the course
    await db.runAsync('DELETE FROM courses WHERE id = ?', [id]);
    
    console.log('✅ Course and related data deleted:', id);
    return true;
  } catch (error) {
    console.error('❌ Error deleting course:', error);
    throw error;
  }
};

/**
 * Get all courses (admin view)
 */
export const getAllCoursesAdmin = async () => {
  try {
    const db = await ensureDatabase();
    const courses = await db.getAllAsync('SELECT * FROM courses ORDER BY id DESC');
    
    // Get lesson count for each course
    const coursesWithInfo = await Promise.all(
      courses.map(async (course) => {
        const lessonCount = await db.getFirstAsync(
          'SELECT COUNT(*) as count FROM lessons WHERE course_id = ?',
          [course.id]
        );
        
        const enrollmentCount = await db.getFirstAsync(
          'SELECT COUNT(*) as count FROM enrollments WHERE course_id = ?',
          [course.id]
        );
        
        return {
          ...course,
          lessonCount: lessonCount?.count || 0,
          enrollmentCount: enrollmentCount?.count || 0
        };
      })
    );
    
    return coursesWithInfo;
  } catch (error) {
    console.error('❌ Error getting courses:', error);
    return [];
  }
};

// ==================== LESSON MANAGEMENT ====================

/**
 * Create a new lesson
 */
export const createLesson = async (courseId, title, content) => {
  try {
    const db = await ensureDatabase();
    const result = await db.runAsync(
      'INSERT INTO lessons (course_id, title, content) VALUES (?, ?, ?)',
      [courseId, title, content]
    );
    console.log('✅ Lesson created with ID:', result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error('❌ Error creating lesson:', error);
    throw error;
  }
};

/**
 * Update an existing lesson
 */
export const updateLesson = async (id, title, content) => {
  try {
    const db = await ensureDatabase();
    await db.runAsync(
      'UPDATE lessons SET title = ?, content = ? WHERE id = ?',
      [title, content, id]
    );
    console.log('✅ Lesson updated:', id);
    return true;
  } catch (error) {
    console.error('❌ Error updating lesson:', error);
    throw error;
  }
};

/**
 * Delete a lesson
 */
export const deleteLesson = async (id) => {
  try {
    const db = await ensureDatabase();
    
    // Delete progress for this lesson
    await db.runAsync('DELETE FROM progress WHERE lesson_id = ?', [id]);
    
    // Delete the lesson
    await db.runAsync('DELETE FROM lessons WHERE id = ?', [id]);
    
    console.log('✅ Lesson deleted:', id);
    return true;
  } catch (error) {
    console.error('❌ Error deleting lesson:', error);
    throw error;
  }
};

/**
 * Get all lessons for a course (admin view)
 */
export const getLessonsByCourseAdmin = async (courseId) => {
  try {
    const db = await ensureDatabase();
    const lessons = await db.getAllAsync(
      'SELECT * FROM lessons WHERE course_id = ? ORDER BY id ASC',
      [courseId]
    );
    
    // Get completion count for each lesson
    const lessonsWithInfo = await Promise.all(
      lessons.map(async (lesson) => {
        const completionCount = await db.getFirstAsync(
          'SELECT COUNT(*) as count FROM progress WHERE lesson_id = ? AND completed = 1',
          [lesson.id]
        );
        
        return {
          ...lesson,
          completionCount: completionCount?.count || 0
        };
      })
    );
    
    return lessonsWithInfo;
  } catch (error) {
    console.error('❌ Error getting lessons:', error);
    return [];
  }
};

/**
 * Get course by ID
 */
export const getCourseById = async (id) => {
  try {
    const db = await ensureDatabase();
    const course = await db.getFirstAsync(
      'SELECT * FROM courses WHERE id = ?',
      [id]
    );
    return course;
  } catch (error) {
    console.error('❌ Error getting course:', error);
    return null;
  }
};

/**
 * Get lesson by ID
 */
export const getLessonByIdAdmin = async (id) => {
  try {
    const db = await ensureDatabase();
    const lesson = await db.getFirstAsync(
      'SELECT * FROM lessons WHERE id = ?',
      [id]
    );
    return lesson;
  } catch (error) {
    console.error('❌ Error getting lesson:', error);
    return null;
  }
};

// ==================== STATISTICS ====================

/**
 * Get admin dashboard statistics
 */
export const getAdminStatistics = async () => {
  try {
    const db = await ensureDatabase();
    
    const totalCourses = await db.getFirstAsync('SELECT COUNT(*) as count FROM courses');
    const totalLessons = await db.getFirstAsync('SELECT COUNT(*) as count FROM lessons');
    const totalEnrollments = await db.getFirstAsync('SELECT COUNT(*) as count FROM enrollments');
    const completedLessons = await db.getFirstAsync(
      'SELECT COUNT(*) as count FROM progress WHERE completed = 1'
    );
    
    return {
      totalCourses: totalCourses?.count || 0,
      totalLessons: totalLessons?.count || 0,
      totalEnrollments: totalEnrollments?.count || 0,
      completedLessons: completedLessons?.count || 0
    };
  } catch (error) {
    console.error('❌ Error getting statistics:', error);
    return {
      totalCourses: 0,
      totalLessons: 0,
      totalEnrollments: 0,
      completedLessons: 0
    };
  }
};

export default {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCoursesAdmin,
  createLesson,
  updateLesson,
  deleteLesson,
  getLessonsByCourseAdmin,
  getCourseById,
  getLessonByIdAdmin,
  getAdminStatistics
};