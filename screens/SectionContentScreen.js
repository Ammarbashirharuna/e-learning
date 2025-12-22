// screens/SectionContentScreen.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const SectionContentScreen = ({ route }) => {
  const { section } = route.params || {};

  if (!section) {
    return (
      <View style={styles.empty}>
        <Text style={{ color: '#666' }}>Section not found.</Text>
      </View>
    );
  }

  const renderBlock = (block, index) => {
    switch (block.type) {
      case 'heading':
        return <Text key={index} style={styles.heading}>{block.text}</Text>;
      case 'paragraph':
        return <Text key={index} style={styles.paragraph}>{block.text}</Text>;
      case 'bullet':
        return (
          <View key={index} style={styles.bulletContainer}>
            {block.items.map((it, i) => (
              <View key={i} style={styles.bulletRow}>
                <View style={styles.bulletDot} />
                <Text style={styles.bulletText}>{it}</Text>
              </View>
            ))}
          </View>
        );
      case 'highlight':
        return (
          <View key={index} style={styles.highlightBox}>
            <Text style={styles.highlightText}>{block.text}</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.title}>{section.title}</Text>
      {section.blocks.map((b, idx) => renderBlock(b, idx))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8faff' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12, color: '#222' },
  heading: { fontSize: 18, fontWeight: '700', marginTop: 12, marginBottom: 6, color: '#111' },
  paragraph: { fontSize: 15, color: '#444', lineHeight: 22, marginBottom: 8 },
  bulletContainer: { marginVertical: 8, marginLeft: 4 },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 },
  bulletDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#007bff', marginTop: 8, marginRight: 10 },
  bulletText: { flex: 1, color: '#444', fontSize: 15, lineHeight: 22 },
  highlightBox: { backgroundColor: '#fff6e6', borderLeftWidth: 4, borderLeftColor: '#ffb703', padding: 12, borderRadius: 8, marginVertical: 8 },
  highlightText: { color: '#6b4f00', fontSize: 15 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default SectionContentScreen;
