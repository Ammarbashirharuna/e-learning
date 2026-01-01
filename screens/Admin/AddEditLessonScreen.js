// screens/Admin/AddEditLessonScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createLesson, updateLesson } from '../../database/adminDb';

const AddEditLessonScreen = ({ navigation, route }) => {
  const { mode, lesson, courseId, courseTitle } = route.params || {};
  const isEditMode = mode === 'edit';
  const isViewMode = mode === 'view';

  const [title, setTitle] = useState(lesson?.title || '');
  const [content, setContent] = useState(lesson?.content || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    // Validation
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter lesson title');
      return;
    }
    if (!content.trim()) {
      Alert.alert('Error', 'Please enter lesson content');
      return;
    }

    try {
      setLoading(true);

      if (isEditMode) {
        // Update existing lesson
        await updateLesson(lesson.id, title.trim(), content.trim());
        Alert.alert('Success', 'Lesson updated successfully', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } else {
        // Create new lesson
        await createLesson(courseId, title.trim(), content.trim());
        Alert.alert('Success', 'Lesson created successfully', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      }
    } catch (error) {
      console.error('Error saving lesson:', error);
      Alert.alert('Error', 'Failed to save lesson. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>
            {isViewMode ? 'View Lesson' : isEditMode ? 'Edit Lesson' : 'Create Lesson'}
          </Text>
          <Text style={styles.headerSubtitle} numberOfLines={1}>
            {courseTitle}
          </Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Form */}
        <View style={styles.form}>
          {/* Lesson Title */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Lesson Title *</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="document-text-outline" size={20} color="#6b7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="e.g., Introduction to Variables"
                value={title}
                onChangeText={setTitle}
                placeholderTextColor="#9ca3af"
                editable={!isViewMode}
              />
            </View>
          </View>

          {/* Lesson Content */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Lesson Content *</Text>
            <View style={[styles.inputContainer, styles.textAreaContainer]}>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter the lesson content here...

You can include:
• Key concepts and definitions
• Examples and explanations
• Step-by-step instructions
• Important notes and tips"
                value={content}
                onChangeText={setContent}
                multiline
                numberOfLines={20}
                textAlignVertical="top"
                placeholderTextColor="#9ca3af"
                editable={!isViewMode}
              />
            </View>
          </View>

          {/* Info Box */}
          {!isViewMode && (
            <View style={styles.infoBox}>
              <Ionicons name="information-circle" size={20} color="#3b82f6" />
              <Text style={styles.infoText}>
                Write clear and detailed content. Students will read this lesson to learn the topic.
              </Text>
            </View>
          )}

          {/* Character Count */}
          <View style={styles.characterCount}>
            <Ionicons name="text-outline" size={16} color="#6b7280" />
            <Text style={styles.characterCountText}>
              {content.length} characters
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      {!isViewMode && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.saveButton, loading && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={loading}
          >
            <Ionicons name="checkmark-circle" size={20} color="white" />
            <Text style={styles.saveButtonText}>
              {loading ? 'Saving...' : isEditMode ? 'Update Lesson' : 'Create Lesson'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {isViewMode && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.editFromViewButton}
            onPress={() =>
              navigation.replace('AddEditLesson', {
                mode: 'edit',
                lesson,
                courseId,
                courseTitle,
              })
            }
          >
            <Ionicons name="create" size={20} color="white" />
            <Text style={styles.saveButtonText}>Edit This Lesson</Text>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8faff',
  },
  header: {
    backgroundColor: 'white',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1f2937',
  },
  textAreaContainer: {
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  textArea: {
    minHeight: 300,
    paddingTop: 0,
    lineHeight: 22,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#e7f3ff',
    padding: 12,
    borderRadius: 12,
    gap: 10,
    marginTop: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#1e40af',
    lineHeight: 18,
  },
  characterCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  characterCountText: {
    fontSize: 13,
    color: '#6b7280',
  },
  footer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  editFromViewButton: {
    flexDirection: 'row',
    backgroundColor: '#f59e0b',
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
});

export default AddEditLessonScreen;