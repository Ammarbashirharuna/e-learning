const fs = require('fs');
const path = require('path');

// Simple placeholder image (100x100 gray square PNG)
const placeholderImage = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAXklEQVR42u3QMQEAAAgDINc/9K6B' +
  'QQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgBZWIAAc2i+IEAAAAASUVORK5CYII=',
  'base64'
);

const imagePath = path.join(__dirname, 'assets', 'editing.png');

try {
  fs.writeFileSync(imagePath, placeholderImage);
  console.log('✅ Successfully replaced editing.png with placeholder!');
  console.log('📁 Location:', imagePath);
} catch (error) {
  console.error('❌ Error:', error.message);
}