// database/db.js
import * as SQLite from 'expo-sqlite';

// For Expo SDK 51+ use openDatabaseAsync
let db;

export const initDatabase = async () => {
  try {
    // Open database asynchronously
    db = await SQLite.openDatabaseAsync('elearning.db');

    // COURSES TABLE
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        instructor TEXT
      );
    `);

    // LESSONS TABLE
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS lessons (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        course_id INTEGER,
        title TEXT,
        content TEXT
      );
    `);

    // ENROLLMENTS - Updated to include timestamp
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS enrollments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        course_id INTEGER,
        enrolled_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // PROGRESS
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS progress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lesson_id INTEGER,
        completed INTEGER DEFAULT 0
      );
    `);

    // Run migrations to add missing columns
    // await runMigrations();

    console.log('Database initialized successfully');
    return db;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};


export const seedCourses = async () => {
  try {
    if (!db) {
      db = await SQLite.openDatabaseAsync('elearning.db');
    }

    const result = await db.getFirstAsync('SELECT COUNT(*) as count FROM courses;');
    
    if (result.count === 0) {
      // COURSE 1
      await db.runAsync(
        `INSERT INTO courses (title, description, instructor) VALUES (?, ?, ?)`,
        [
          'Introduction to Computer Science',
          'This course introduces students to the fundamental concepts of computer science, including algorithms, data, hardware, and software systems.',
          'Dr. Ahmed Musa'
        ]
      );

      // COURSE 2
      await db.runAsync(
        `INSERT INTO courses (title, description, instructor) VALUES (?, ?, ?)`,
        [
          'Mobile Application Development',
          'Learn how mobile applications are designed, developed, and deployed using modern tools and best practices.',
          'Engr. Sadiq Bello'
        ]
      );

      // COURSE 3
      await db.runAsync(
        `INSERT INTO courses (title, description, instructor) VALUES (?, ?, ?)`,
        [
          'Database Management Systems',
          'Learn about database design, SQL, and how to manage data effectively in modern applications.',
          'Prof. Fatima Aliyu'
        ]
      );

      // COURSE 4
      await db.runAsync(
        `INSERT INTO courses (title, description, instructor) VALUES (?, ?, ?)`,
        [
          'Web Development Fundamentals',
          'Master the core technologies of web development including HTML, CSS, JavaScript, and responsive design principles.',
          'Engr. Ibrahim Yusuf'
        ]
      );

      // COURSE 5
      await db.runAsync(
        `INSERT INTO courses (title, description, instructor) VALUES (?, ?, ?)`,
        [
          'Data Structures and Algorithms',
          'Comprehensive guide to data structures, algorithms, time complexity, and problem-solving techniques.',
          'Dr. Aisha Abdullahi'
        ]
      );

      // LESSONS FOR COURSE 1
      await db.runAsync(
        `INSERT INTO lessons (course_id, title, content) VALUES (1, ?, ?)`,
        [
          'What is Computer Science?',
          `Computer Science is the study of computers and computational systems. Unlike electrical and computer engineers, computer scientists deal mostly with software and software systems.

This includes their theory, design, development, and application.

Topics include:
• Algorithms and computational theory
• Programming languages and compilers
• Software engineering and architecture
• Computer hardware fundamentals
• Operating systems
• Artificial intelligence and machine learning
• Database systems
• Computer networks and security

Computer science is essential in modern society because it drives innovation in technology, enables automation, and creates solutions to complex problems.

Key Principle: Computer Science is not just about programming - it is about problem-solving and computational thinking.`
        ]
      );

      await db.runAsync(
        `INSERT INTO lessons (course_id, title, content) VALUES (1, ?, ?)`,
        [
          'History of Computers',
          `The evolution of computers spans over several centuries, from mechanical calculators to modern supercomputers.

Early Computing Devices:
• Abacus (3000 BC) - First calculating device
• Charles Babbage's Analytical Engine (1837) - First mechanical computer design
• Herman Hollerith's Tabulating Machine (1890) - Used for US Census

Generations of Modern Computers:

First Generation (1940-1956):
• Used vacuum tubes for circuitry
• Very large, expensive, and generated lots of heat
• Examples: ENIAC, UNIVAC

Second Generation (1956-1963):
• Transistors replaced vacuum tubes
• Smaller, faster, cheaper, more energy-efficient
• Programming languages like COBOL and FORTRAN emerged

Third Generation (1964-1971):
• Integrated Circuits (ICs) replaced transistors
• Even smaller and more reliable
• Operating systems were developed

Fourth Generation (1971-Present):
• Microprocessors brought thousands of ICs onto a single chip
• Personal computers became affordable
• Development of GUI (Graphical User Interface)
• Internet revolution

Fifth Generation (Present-Future):
• Artificial Intelligence and Machine Learning
• Quantum Computing
• Internet of Things (IoT)
• Cloud Computing

Key Principle: Moore's Law states that the number of transistors on a microchip doubles approximately every two years, leading to exponential growth in computing power.`
        ]
      );

      await db.runAsync(
        `INSERT INTO lessons (course_id, title, content) VALUES (1, ?, ?)`,
        [
          'Programming Fundamentals',
          `Programming is the process of creating a set of instructions that tell a computer how to perform a task.

Core Programming Concepts:

Variables and Data Types:
• Variables store information that can be referenced and manipulated
• Common data types: integers, floats, strings, booleans, arrays

Control Structures:
• Conditional statements (if-else)
• Loops (for, while)
• Switch statements

Functions and Methods:
• Reusable blocks of code
• Take inputs (parameters) and return outputs
• Promote code organization and reusability

Object-Oriented Programming (OOP):
• Classes and Objects
• Encapsulation
• Inheritance
• Polymorphism

Best Programming Practices:
• Write clean, readable code
• Use meaningful variable names
• Comment your code
• Follow DRY principle (Don't Repeat Yourself)
• Test your code regularly

Popular Programming Languages:
• Python - Easy to learn, versatile
• JavaScript - Web development
• Java - Enterprise applications
• C++ - System programming
• Swift - iOS development

Key Principle: Good code is not just about making it work - it is about making it readable, maintainable, and efficient.`
        ]
      );

      await db.runAsync(
        `INSERT INTO lessons (course_id, title, content) VALUES (1, ?, ?)`,
        [
          'Computer Networks Basics',
          `Computer networks allow computers to communicate and share resources. Understanding networking is crucial in today's connected world.

What is a Network?
A computer network is a group of interconnected computers that can exchange data and share resources.

Types of Networks:

LAN (Local Area Network):
• Covers a small geographic area
• High speed and low latency
• Examples: Home network, office network

WAN (Wide Area Network):
• Covers large geographic areas
• Example: The Internet

MAN (Metropolitan Area Network):
• Covers a city or campus
• Larger than LAN, smaller than WAN

Network Components:
• Router - Directs data between networks
• Switch - Connects devices within a network
• Modem - Converts signals for internet connection
• Access Point - Provides wireless connectivity

Network Protocols:
• TCP/IP - Foundation of internet communication
• HTTP/HTTPS - Web browsing
• FTP - File transfer
• SMTP - Email transmission

IP Addressing:
Every device on a network has a unique IP address for identification.

IPv4 example: 192.168.1.1
IPv6 example: 2001:0db8:85a3:0000:0000:8a2e:0370:7334

Key Principle: The Internet is essentially a global network of networks, all communicating using standardized protocols.`
        ]
      );

      // LESSONS FOR COURSE 2
      await db.runAsync(
        `INSERT INTO lessons (course_id, title, content) VALUES (2, ?, ?)`,
        [
          'Introduction to Mobile Apps',
          `Mobile applications have revolutionized how we interact with technology, providing access to services and information anywhere, anytime.

What are Mobile Applications?
Mobile applications (apps) are software programs designed to run on smartphones, tablets, and other mobile devices.

Evolution of Mobile Apps:
• Early 2000s: Simple games and utilities
• 2008: Apple App Store and Google Play launch
• Present: Complex, feature-rich applications

Types of Mobile Applications:

Native Apps:
• Built specifically for one platform (iOS or Android)
• Best performance and user experience
• Full access to device features
• Examples: iOS apps (Swift), Android apps (Kotlin, Java)

Web Apps:
• Run in mobile web browsers
• Platform-independent
• Easier to develop and maintain
• Limited access to device features

Hybrid Apps:
• Combination of native and web technologies
• Single codebase for multiple platforms
• Examples: React Native, Flutter, Ionic

Progressive Web Apps (PWAs):
• Advanced web apps that work like native apps
• Can work offline
• Installable on home screen

Mobile App Development Lifecycle:
• Ideation and Planning
• Design (UI/UX)
• Development
• Testing
• Deployment
• Maintenance and Updates

Key Principle: Choose the right type of mobile app based on your requirements, budget, timeline, and target audience.`
        ]
      );

      await db.runAsync(
        `INSERT INTO lessons (course_id, title, content) VALUES (2, ?, ?)`,
        [
          'Offline Mobile Applications',
          `Offline applications store data locally on the device, enabling functionality without an internet connection. This is crucial for providing reliable user experiences.

Why Offline Functionality Matters:
• Poor internet connectivity in many regions
• Provides uninterrupted user experience
• Reduces data usage
• Faster app performance
• Works in airplane mode

Technologies for Offline Storage:

SQLite:
• Lightweight, embedded database
• Perfect for structured data
• SQL-based queries
• Used in both iOS and Android

Local Storage:
• Key-value storage system
• Simple to implement
• Good for small amounts of data
• Limited to about 5-10MB

AsyncStorage (React Native):
• Asynchronous, persistent key-value storage
• Simple API
• Great for app preferences and settings

Realm Database:
• Mobile-first database
• Fast and efficient
• Real-time data sync
• Object-oriented

Caching Strategies:

Cache-First:
• Check cache before network
• Fastest user experience
• Risk of stale data

Network-First:
• Try network first, fallback to cache
• Always fresh data when online
• Slower initial load

Cache-Then-Network:
• Show cached data immediately
• Update from network in background
• Best user experience

Offline Data Synchronization:
When the device comes back online:
• Detect connectivity changes
• Queue pending operations
• Sync data with server
• Resolve conflicts
• Update local cache

Best Practices:
• Store essential data locally
• Implement smart caching strategies
• Handle sync conflicts gracefully
• Provide visual feedback on sync status
• Compress data to save space

Key Principle: A good offline-first app feels fast and responsive regardless of network conditions.`
        ]
      );

      await db.runAsync(
        `INSERT INTO lessons (course_id, title, content) VALUES (2, ?, ?)`,
        [
          'Mobile UI/UX Design Principles',
          `Great mobile apps aren't just functional—they're intuitive, beautiful, and delightful to use. Understanding UI/UX principles is crucial for success.

UI vs UX:

User Interface (UI):
• Visual design and aesthetics
• Colors, typography, icons
• Buttons, forms, layouts
• Brand consistency

User Experience (UX):
• How users interact with the app
• Navigation flow
• Ease of use
• User satisfaction

Core Mobile Design Principles:

Simplicity:
• Keep interfaces clean and uncluttered
• Focus on essential features
• Progressive disclosure of complexity

Consistency:
• Use platform conventions (iOS vs Android)
• Maintain visual and functional consistency
• Follow established design patterns

Feedback:
• Provide immediate response to actions
• Use animations and transitions
• Show loading states
• Display error messages clearly

Accessibility:
• Design for users with disabilities
• Proper color contrast
• Screen reader support
• Adjustable text sizes

Touch Targets:
• Minimum size: 44x44 points (iOS) or 48x48dp (Android)
• Adequate spacing between interactive elements
• Easy to tap with thumb

Navigation Patterns:
• Tab bars for main sections
• Stack navigation for hierarchical content
• Drawer navigation for many options
• Bottom sheets for contextual actions

Performance Considerations:
• Smooth animations (60 FPS)
• Fast app launch time
• Responsive touch interactions
• Minimal loading times

Platform-Specific Guidelines:

iOS (Apple Human Interface Guidelines):
• Clarity, deference, depth
• Native iOS components
• San Francisco font
• Light, minimalist design

Android (Material Design):
• Material metaphor
• Bold, graphic, intentional
• Motion provides meaning
• Roboto font
• Floating Action Button (FAB)

Key Principle: Design for your users, not for yourself. Test with real users and iterate based on feedback.`
        ]
      );

      await db.runAsync(
        `INSERT INTO lessons (course_id, title, content) VALUES (2, ?, ?)`,
        [
          'Mobile App Security Best Practices',
          `Security is paramount in mobile app development. Users trust apps with sensitive data, and developers must protect it.

Common Security Threats:

Data Leakage:
• Insecure data storage
• Unencrypted communication
• Logging sensitive information

Insecure Authentication:
• Weak passwords
• No multi-factor authentication
• Session management issues

Code Tampering:
• Reverse engineering
• Code injection
• Unauthorized modifications

Security Best Practices:

Secure Data Storage:
• Encrypt sensitive data at rest
• Use platform-provided secure storage (Keychain, Keystore)
• Never store passwords in plain text
• Avoid storing sensitive data if possible

Network Security:
• Use HTTPS for all communications
• Implement certificate pinning
• Validate SSL certificates
• Encrypt data in transit

Authentication & Authorization:
• Implement strong password policies
• Use biometric authentication when available
• Implement OAuth 2.0 for third-party auth
• Use JWT tokens securely
• Implement session timeout

Code Security:
• Obfuscate your code
• Remove debugging code in production
• Use ProGuard (Android) or similar tools
• Regular security audits

API Security:
• Validate all inputs
• Implement rate limiting
• Use API keys securely
• Don't expose sensitive endpoints

Secure Development Practices:
• Keep dependencies updated
• Use static code analysis tools
• Perform regular security testing
• Follow OWASP Mobile Top 10 guidelines

Privacy Considerations:
• Request minimal permissions
• Explain why permissions are needed
• Comply with GDPR, CCPA regulations
• Provide privacy policy
• Allow users to delete their data

Key Principle: Security is not a feature - it is a fundamental requirement. Build security into your app from the start, not as an afterthought.`
        ]
      );

      // LESSONS FOR COURSE 3
      await db.runAsync(
        `INSERT INTO lessons (course_id, title, content) VALUES (3, ?, ?)`,
        [
          'Introduction to Databases',
          `Databases are the backbone of modern applications, storing and managing vast amounts of structured data efficiently.

What is a Database?
A database is an organized collection of structured information or data, typically stored electronically in a computer system.

Why Databases Matter:
• Efficient data storage and retrieval
• Data integrity and consistency
• Concurrent access by multiple users
• Security and access control
• Backup and recovery capabilities

Types of Databases:

Relational Databases (SQL):
• Data organized in tables with rows and columns
• Relationships between tables
• ACID properties (Atomicity, Consistency, Isolation, Durability)
• Examples: MySQL, PostgreSQL, Oracle, SQL Server

NoSQL Databases:
• Flexible schema design
• Horizontal scalability
• Better for unstructured data
• Types: Document, Key-Value, Column-family, Graph
• Examples: MongoDB, Redis, Cassandra, Neo4j

In-Memory Databases:
• Store data in RAM for ultra-fast access
• Examples: Redis, Memcached

Cloud Databases:
• Hosted on cloud platforms
• Scalable and managed
• Examples: Amazon RDS, Google Cloud SQL, Azure SQL Database

Database Components:

Tables:
• Store data in rows and columns
• Each row is a record
• Each column is a field

Primary Key:
• Unique identifier for each record
• Cannot be null

Foreign Key:
• Links tables together
• Maintains referential integrity

Indexes:
• Speed up data retrieval
• Trade-off: slower writes, faster reads

ACID Properties Explained:

Atomicity:
• Transactions are all-or-nothing
• Either complete fully or not at all

Consistency:
• Data remains valid after transaction
• Integrity constraints are maintained

Isolation:
• Concurrent transactions don't interfere
• Each transaction is independent

Durability:
• Committed data is permanent
• Survives system failures

Key Principle: Choose the right database type based on your data structure, scalability needs, and consistency requirements.`
        ]
      );

      await db.runAsync(
        `INSERT INTO lessons (course_id, title, content) VALUES (3, ?, ?)`,
        [
          'SQL Basics and Queries',
          `SQL (Structured Query Language) is the standard language for interacting with relational databases. Mastering SQL is essential for any developer.

Core SQL Commands:

Data Query Language (DQL):

SELECT Statement:
• Retrieve data from database
• Filter with WHERE clause
• Sort with ORDER BY
• Limit results with LIMIT

Example:
SELECT name, email FROM users WHERE age > 18 ORDER BY name;

Data Manipulation Language (DML):

INSERT:
• Add new records to table
• INSERT INTO users (name, email) VALUES ('John', 'john@example.com');

UPDATE:
• Modify existing records
• UPDATE users SET email = 'new@example.com' WHERE id = 1;

DELETE:
• Remove records from table
• DELETE FROM users WHERE id = 1;

Data Definition Language (DDL):

CREATE TABLE:
• Define new table structure
• Specify columns and data types

ALTER TABLE:
• Modify existing table structure
• Add or remove columns

DROP TABLE:
• Delete entire table
• Irreversible operation

Advanced SQL Concepts:

JOINS:
• Combine data from multiple tables

INNER JOIN:
• Returns matching records from both tables

LEFT JOIN:
• Returns all records from left table
• Matching records from right table

RIGHT JOIN:
• Opposite of LEFT JOIN

FULL OUTER JOIN:
• Returns all records when match in either table

Aggregate Functions:
• COUNT() - Count records
• SUM() - Calculate total
• AVG() - Calculate average
• MIN() - Find minimum value
• MAX() - Find maximum value

GROUP BY:
• Group rows with same values
• Used with aggregate functions

HAVING:
• Filter grouped results
• WHERE filters before grouping
• HAVING filters after grouping

Subqueries:
• Query within another query
• Can be in SELECT, FROM, or WHERE clause

Query Optimization:

Use Indexes:
• Speed up data retrieval
• Create on frequently queried columns

Avoid SELECT *:
• Only select needed columns
• Reduces data transfer

Use WHERE Efficiently:
• Filter data early
• Use indexed columns

Limit Results:
• Use LIMIT/TOP for large datasets
• Pagination for better performance

Key Principle: Write clear, efficient SQL queries. Understand query execution plans and optimize for performance.`
        ]
      );

      await db.runAsync(
        `INSERT INTO lessons (course_id, title, content) VALUES (3, ?, ?)`,
        [
          'Database Design and Normalization',
          `Proper database design is crucial for creating efficient, maintainable, and scalable applications. Poor design leads to data redundancy, inconsistency, and performance issues.

Database Design Process:

Requirements Analysis:
• Understand what data needs to be stored
• Identify entities and relationships
• Define user requirements

Conceptual Design:
• Create Entity-Relationship (ER) diagram
• Define entities, attributes, and relationships
• Independent of any DBMS

Logical Design:
• Convert ER diagram to relational schema
• Define tables, columns, keys
• Apply normalization

Physical Design:
• Choose specific DBMS
• Define indexes, partitions
• Optimize for performance

Entity-Relationship Modeling:

Entities:
• Objects or concepts (e.g., Customer, Order)
• Represented as tables

Attributes:
• Properties of entities (e.g., name, email)
• Become table columns

Relationships:
• Connections between entities
• Types: One-to-One, One-to-Many, Many-to-Many

Database Normalization:

What is Normalization?
• Process of organizing data to reduce redundancy
• Divides large tables into smaller related tables
• Ensures data dependencies make sense

Normal Forms:

First Normal Form (1NF):
• Eliminate repeating groups
• Each cell contains single value
• Each record is unique

Second Normal Form (2NF):
• Meet 1NF requirements
• Remove partial dependencies
• All non-key attributes depend on entire primary key

Third Normal Form (3NF):
• Meet 2NF requirements
• Remove transitive dependencies
• Non-key attributes depend only on primary key

Boyce-Codd Normal Form (BCNF):
• Stricter version of 3NF
• Every determinant is a candidate key

When to Denormalize:
• Read-heavy applications
• Performance requirements
• Reporting and analytics
• When joins become too expensive

Best Practices:

Naming Conventions:
• Use clear, descriptive names
• Consistent naming patterns
• Avoid reserved keywords

Data Types:
• Choose appropriate types
• Use smallest type that fits data
• Consider future growth

Constraints:
• Primary keys for uniqueness
• Foreign keys for referential integrity
• CHECK constraints for validation
• NOT NULL for required fields

Documentation:
• Document table purposes
• Explain complex relationships
• Maintain ER diagrams

Key Principle: Good database design reduces redundancy, ensures data integrity, and improves performance. Normalize to eliminate redundancy, but denormalize strategically for performance when needed.`
        ]
      );

      await db.runAsync(
        `INSERT INTO lessons (course_id, title, content) VALUES (3, ?, ?)`,
        [
          'Database Security and Transactions',
          `Database security and transaction management are critical for protecting data and ensuring reliability in multi-user environments.

Database Security:

Authentication:
• Verify user identity
• Username and password
• Multi-factor authentication
• Integration with LDAP/Active Directory

Authorization:
• Control what authenticated users can do
• Grant/revoke permissions
• Role-based access control (RBAC)
• Principle of least privilege

Common Security Threats:

SQL Injection:
• Malicious SQL code in user input
• Can expose or destroy data

Prevention:
• Use parameterized queries
• Input validation
• Stored procedures
• ORM frameworks

Data Encryption:

Encryption at Rest:
• Protect stored data
• Transparent Data Encryption (TDE)
• File-level encryption

Encryption in Transit:
• SSL/TLS for connections
• Secure communication channels

Backup and Recovery:
• Regular automated backups
• Test restore procedures
• Off-site backup storage
• Point-in-time recovery

Database Transactions:

What is a Transaction?
• A sequence of database operations
• Treated as a single unit of work
• Either all operations succeed or all fail

Transaction Control Commands:

BEGIN TRANSACTION:
• Start a new transaction

COMMIT:
• Save all changes permanently
• Make changes visible to others

ROLLBACK:
• Undo all changes in transaction
• Restore to state before transaction

SAVEPOINT:
• Create checkpoint within transaction
• Partial rollback option

Transaction Isolation Levels:

Read Uncommitted:
• Lowest isolation
• Dirty reads possible
• Best performance

Read Committed:
• Prevents dirty reads
• Default in most databases

Repeatable Read:
• Prevents dirty and non-repeatable reads
• Same query returns same results

Serializable:
• Highest isolation
• Prevents all concurrency issues
• Lowest performance

Concurrency Issues:

Dirty Read:
• Reading uncommitted changes

Non-Repeatable Read:
• Data changes between reads in transaction

Phantom Read:
• New rows appear between reads

Lost Update:
• Two transactions update same data
• One update is lost

Deadlock:
• Two transactions wait for each other
• Database detects and rolls back one

Best Practices:

Transaction Management:
• Keep transactions short
• Avoid user interaction during transactions
• Handle errors and rollback properly
• Use appropriate isolation level

Performance:
• Monitor slow queries
• Use connection pooling
• Implement caching
• Regular maintenance and optimization

Auditing:
• Log database access
• Track data modifications
• Monitor security events
• Comply with regulations

Key Principle: Security is not optional. Implement defense in depth with authentication, authorization, encryption, and proper transaction management.`
        ]
      );

      // LESSONS FOR COURSE 4 - Web Development
      await db.runAsync(
        `INSERT INTO lessons (course_id, title, content) VALUES (4, ?, ?)`,
        [
          'HTML Fundamentals',
          `HTML (HyperText Markup Language) is the standard markup language for creating web pages. It provides the structure and content of websites.

What is HTML?
HTML describes the structure of a web page using a series of elements. These elements tell the browser how to display the content.

Basic HTML Structure:

Document Type Declaration:
• <!DOCTYPE html> tells browser this is HTML5

HTML Element:
• Root element containing all content
• <html> tag wraps everything

Head Section:
• <head> contains meta information
• Title, character encoding, links to CSS
• Not displayed directly on page

Body Section:
• <body> contains visible content
• All displayed elements go here

Essential HTML Elements:

Headings:
• <h1> to <h6> for hierarchical headings
• <h1> is largest, <h6> is smallest
• Use semantically, not just for styling

Paragraphs:
• <p> for text blocks
• Automatically adds spacing

Links:
• <a href="url">Link Text</a>
• Connect pages together

Images:
• <img src="path" alt="description">
• Alt text for accessibility

Lists:

Unordered Lists:
• <ul> creates bullet list
• <li> for each item

Ordered Lists:
• <ol> creates numbered list
• <li> for each item

Semantic HTML5 Elements:
• <header> - Page or section header
• <nav> - Navigation links
• <main> - Main content
• <article> - Self-contained content
• <section> - Thematic grouping
• <aside> - Sidebar content
• <footer> - Page or section footer

Forms:
• <form> container for inputs
• <input> for user data entry
• <button> for submissions
• <select> for dropdown menus
• <textarea> for multi-line text

Tables:
• <table> container
• <tr> table row
• <th> table header cell
• <td> table data cell

HTML Attributes:
• id - Unique identifier
• class - Group elements for styling
• style - Inline CSS
• title - Tooltip text
• href - Link destination
• src - Resource location

Best Practices:
• Use semantic elements
• Proper document structure
• Accessibility considerations
• Valid, well-formed HTML
• Consistent indentation
• Comments for complex sections

Key Principle: HTML provides structure and meaning. Use semantic elements to make your content accessible and SEO-friendly.`
        ]
      );

      await db.runAsync(
        `INSERT INTO lessons (course_id, title, content) VALUES (4, ?, ?)`,
        [
          'CSS Styling and Layouts',
          `CSS (Cascading Style Sheets) controls the presentation and layout of web pages. It separates content from design.

What is CSS?
CSS describes how HTML elements should be displayed. It handles colors, fonts, spacing, positioning, and responsive design.

CSS Syntax:

Selectors:
• Element: p { }
• Class: .classname { }
• ID: #idname { }
• Attribute: [type="text"] { }
• Descendant: div p { }
• Child: div > p { }

Properties and Values:
selector {
  property: value;
  another-property: value;
}

CSS Box Model:

Every element is a box with:
• Content - The actual content
• Padding - Space inside border
• Border - Line around padding
• Margin - Space outside border

Understanding this is crucial for layouts!

Common CSS Properties:

Colors:
• color: text color
• background-color: element background
• Values: names, hex (#FF0000), rgb, rgba

Typography:
• font-family: typeface
• font-size: text size
• font-weight: boldness
• line-height: spacing between lines
• text-align: alignment

Spacing:
• margin: outer space
• padding: inner space
• Can specify all sides or individual

Dimensions:
• width, height: element size
• max-width, min-height: constraints
• Units: px, %, em, rem, vw, vh

Display and Positioning:

Display Property:
• block: full width, new line
• inline: flows with text
• inline-block: flows but accepts dimensions
• none: hidden from view
• flex: flexible box layout
• grid: grid layout system

Position Property:
• static: default flow
• relative: offset from normal position
• absolute: positioned relative to parent
• fixed: positioned relative to viewport
• sticky: switches between relative and fixed

Flexbox Layout:

Perfect for one-dimensional layouts:
• display: flex on container
• flex-direction: row or column
• justify-content: align along main axis
• align-items: align along cross axis
• gap: spacing between items

Grid Layout:

For two-dimensional layouts:
• display: grid on container
• grid-template-columns: column sizes
• grid-template-rows: row sizes
• gap: spacing between cells
• grid-area: item placement

Responsive Design:

Media Queries:
@media (max-width: 768px) {
  /* Styles for small screens */
}

Mobile-First Approach:
• Start with mobile styles
• Add complexity for larger screens

Viewport Units:
• vw: percentage of viewport width
• vh: percentage of viewport height
• Perfect for responsive sizing

CSS Transitions and Animations:

Transitions:
• Smooth changes between states
• transition: property duration timing-function

Animations:
• @keyframes define animation
• animation property applies it
• Full control over sequence

Best Practices:
• Use external stylesheets
• Organize CSS logically
• Use CSS variables for colors/sizes
• Mobile-first responsive design
• Avoid !important unless necessary
• Use meaningful class names

Key Principle: CSS is powerful but can be complex. Master the box model, flexbox, and grid for modern, responsive layouts.`
        ]
      );

      await db.runAsync(
        `INSERT INTO lessons (course_id, title, content) VALUES (4, ?, ?)`,
        [
          'JavaScript Basics',
          `JavaScript is the programming language of the web, enabling interactive and dynamic web pages. It's essential for modern web development.

What is JavaScript?
JavaScript adds interactivity to web pages. While HTML structures and CSS styles, JavaScript makes pages come alive with functionality.

JavaScript Basics:

Variables:

let - Block-scoped, can be reassigned:
let name = "John";
name = "Jane"; // OK

const - Block-scoped, cannot be reassigned:
const PI = 3.14159;
// PI = 3.14; // Error!

var - Function-scoped (old style, avoid):
var old = "style";

Data Types:

Primitive Types:
• String: "text"
• Number: 42, 3.14
• Boolean: true, false
• null: intentional absence of value
• undefined: variable declared but not assigned
• Symbol: unique identifier
• BigInt: very large numbers

Reference Types:
• Object: {key: value}
• Array: [1, 2, 3]
• Function: reusable code blocks

Operators:

Arithmetic:
• +, -, *, /, %
• ++ (increment), -- (decrement)

Comparison:
• ==, === (strict equality)
• !=, !== (strict inequality)
• <, >, <=, >=

Logical:
• && (AND)
• || (OR)
• ! (NOT)

Control Structures:

Conditionals:
if (condition) {
  // code
} else if (anotherCondition) {
  // code
} else {
  // code
}

Switch Statement:
switch (value) {
  case 1:
    // code
    break;
  case 2:
    // code
    break;
  default:
    // code
}

Loops:

For Loop:
for (let i = 0; i < 10; i++) {
  console.log(i);
}

While Loop:
while (condition) {
  // code
}

Arrays and Methods:
let fruits = ["apple", "banana"];
fruits.push("orange");  // Add to end
fruits.pop();           // Remove from end
fruits.length;          // Get length
fruits.forEach(item => console.log(item));

Functions:

Function Declaration:
function greet(name) {
  return "Hello, " + name;
}

Arrow Functions (ES6+):
const greet = (name) => "Hello, " + name;

Objects:

Creating Objects:
let person = {
  name: "John",
  age: 30,
  greet: function() {
    return "Hello!";
  }
};

Accessing Properties:
person.name        // Dot notation
person["age"]      // Bracket notation

DOM Manipulation:

Selecting Elements:
• document.getElementById("id")
• document.querySelector(".class")
• document.querySelectorAll("div")

Modifying Elements:
• element.textContent = "text"
• element.innerHTML = "<p>HTML</p>"
• element.style.color = "red"
• element.classList.add("class")

Event Handling:
element.addEventListener("click", function() {
  // Handle click
});

Modern JavaScript (ES6+):

Template Literals:
let name = "John";
let greeting = "Hello, " + name + "!";

Destructuring:
let [a, b] = [1, 2];
let obj = {name, age} = person;

Spread Operator:
let newArray = [...oldArray, 4, 5];

Promises and Async:
async function fetchData() {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

Best Practices:
• Use const by default, let when needed
• Avoid var
• Use meaningful variable names
• Comment complex code
• Handle errors properly
• Use strict equality (===)
• Keep functions small and focused

Key Principle: JavaScript brings web pages to life. Master the fundamentals before diving into frameworks like React, Vue, or Angular.`
        ]
      );

      // LESSONS FOR COURSE 5 - Data Structures and Algorithms
      await db.runAsync(
        `INSERT INTO lessons (course_id, title, content) VALUES (5, ?, ?)`,
        [
          'Introduction to Data Structures',
          `Data structures are fundamental to computer science, providing efficient ways to store, organize, and access data.

What are Data Structures?
A data structure is a way of organizing and storing data so it can be accessed and modified efficiently.

Why Data Structures Matter:
• Efficient data access and manipulation
• Better program performance
• Reduced complexity
• Code reusability
• Foundation for algorithms

Common Data Structures:

Arrays:
• Fixed-size, ordered collection
• Fast random access by index
• Sequential memory allocation
• O(1) access time
• O(n) insertion/deletion

Advantages:
• Simple to implement
• Fast access by index
• Cache-friendly

Disadvantages:
• Fixed size
• Expensive insertion/deletion
• Wastes memory if not full

Linked Lists:
• Nodes connected by pointers
• Dynamic size
• Each node contains data and reference to next

Types:
• Singly Linked: one-way traversal
• Doubly Linked: two-way traversal
• Circular Linked: last connects to first

Advantages:
• Dynamic size
• Easy insertion/deletion
• No memory waste

Disadvantages:
• No random access
• Extra memory for pointers
• Not cache-friendly

Stacks:
• LIFO (Last In, First Out)
• Like a stack of plates

Operations:
• Push: add to top
• Pop: remove from top
• Peek: view top without removing

Use Cases:
• Function call stack
• Undo operations
• Expression evaluation
• Backtracking algorithms

Queues:
• FIFO (First In, First Out)
• Like a waiting line

Operations:
• Enqueue: add to rear
• Dequeue: remove from front
• Front: view first element

Types:
• Simple Queue
• Circular Queue
• Priority Queue
• Double-Ended Queue (Deque)

Use Cases:
• Task scheduling
• Breadth-First Search
• Print spooling
• Resource sharing

Hash Tables:
• Key-value pairs
• Fast lookup, insertion, deletion
• Uses hash function to compute index

Advantages:
• O(1) average time complexity
• Perfect for lookups
• Flexible keys

Collision Handling:
• Chaining: linked lists
• Open Addressing: probing

Trees:
• Hierarchical structure
• Nodes connected by edges
• Root node at top

Binary Trees:
• Each node has at most 2 children
• Left child < Parent < Right child

Binary Search Trees (BST):
• Sorted binary tree
• Fast search, insertion, deletion
• O(log n) average time

Tree Traversal:
• In-order: Left, Root, Right
• Pre-order: Root, Left, Right
• Post-order: Left, Right, Root
• Level-order: Breadth-first

Graphs:
• Nodes (vertices) and edges
• Can be directed or undirected
• Weighted or unweighted

Representation:
• Adjacency Matrix
• Adjacency List

Use Cases:
• Social networks
• Maps and navigation
• Network topology
• Dependency resolution

Choosing Data Structures:

Consider:
• Required operations
• Time complexity needs
• Space constraints
• Data relationships
• Access patterns

Key Principle: The right data structure can dramatically improve program efficiency. Understand the trade-offs and choose based on your specific needs.`
        ]
      );

      await db.runAsync(
        `INSERT INTO lessons (course_id, title, content) VALUES (5, ?, ?)`,
        [
          'Algorithm Analysis and Complexity',
          `Understanding algorithm complexity is crucial for writing efficient code. It helps predict performance and compare algorithms objectively.

What is an Algorithm?
An algorithm is a step-by-step procedure for solving a problem or performing a task.

Why Analyze Algorithms?
• Predict performance
• Compare alternatives
• Identify bottlenecks
• Make informed decisions
• Optimize critical code

Time Complexity:

Big O Notation:
Describes how runtime grows with input size (n).

O(1) - Constant Time:
• Same time regardless of input size
• Examples: Array access, hash table lookup
• Best possible complexity

O(log n) - Logarithmic:
• Runtime grows slowly
• Examples: Binary search, balanced tree operations
• Very efficient

O(n) - Linear:
• Runtime grows proportionally with input
• Examples: Linear search, array traversal
• Acceptable for most cases

O(n log n) - Linearithmic:
• Slightly worse than linear
• Examples: Efficient sorting (merge sort, quicksort)
• Good for sorting

O(n²) - Quadratic:
• Runtime grows quadratically
• Examples: Bubble sort, nested loops
• Acceptable for small inputs only

O(2ⁿ) - Exponential:
• Runtime doubles with each addition
• Examples: Recursive Fibonacci, subset generation
• Avoid if possible!

O(n!) - Factorial:
• Extremely slow growth
• Examples: Permutations, traveling salesman
• Only feasible for tiny inputs

Space Complexity:

Memory Usage:
• How much extra memory algorithm needs
• Separate from input size

Trade-offs:
• Sometimes use more space for better time
• Or vice versa
• Context-dependent decision

Analyzing Algorithms:

Best Case:
• Optimal input scenario
• Least operations needed
• Often not very useful

Average Case:
• Expected performance
• Most useful for predictions
• Harder to calculate

Worst Case:
• Worst possible input
• Maximum operations needed
• Most commonly analyzed
• Guarantees performance floor

Algorithm Design Techniques:

Divide and Conquer:
• Break problem into smaller parts
• Solve parts recursively
• Combine solutions
• Examples: Merge sort, quicksort

Greedy Algorithms:
• Make locally optimal choice
• Hope for global optimum
• Not always correct
• Examples: Dijkstra's, Huffman coding

Dynamic Programming:
• Break into overlapping subproblems
• Store solutions to avoid recalculation
• Examples: Fibonacci, shortest paths

Backtracking:
• Try solutions incrementally
• Abandon when not viable
• Examples: N-Queens, Sudoku solver

Common Algorithm Patterns:

Two Pointers:
• Use two indices to scan array
• Often O(n) instead of O(n²)
• Example: Finding pairs

Sliding Window:
• Maintain window of elements
• Move window across data
• Example: Maximum subarray

Binary Search:
• Search sorted array in O(log n)
• Divide search space in half
• Must be sorted!

Recursion:
• Function calls itself
• Base case to stop
• Can be elegant but uses stack space

Optimization Tips:

Early Exit:
• Return when answer found
• Don't process unnecessary data

Caching/Memoization:
• Store computed results
• Avoid redundant calculations
• Trade space for time

Choose Better Data Structures:
• Right structure can change O(n²) to O(1)
• Understand your access patterns

Avoid Nested Loops When Possible:
• Often indicates O(n²) or worse
• Look for O(n) alternatives

Premature Optimization:
• Don't optimize too early
• Profile first, optimize bottlenecks
• Readable code > clever code

Key Principle: Know your complexity! Understanding Big O notation helps you write scalable code and avoid performance pitfalls.`
        ]
      );

      await db.runAsync(
        `INSERT INTO lessons (course_id, title, content) VALUES (5, ?, ?)`,
        [
          'Sorting and Searching Algorithms',
          `Sorting and searching are fundamental operations in computer science. Understanding these algorithms is essential for every programmer.

Sorting Algorithms:

Bubble Sort:
• Compare adjacent elements
• Swap if in wrong order
• Repeat until sorted
• Time: O(n²)
• Space: O(1)
• Simple but inefficient

How it works:
Pass through array multiple times, "bubbling" largest elements to end.

Insertion Sort:
• Build sorted array one element at a time
• Insert each element in correct position
• Time: O(n²)
• Space: O(1)
• Efficient for small or nearly sorted data

Best for:
• Small datasets
• Nearly sorted data
• Online sorting (data arrives gradually)

Selection Sort:
• Find minimum element
• Swap with first unsorted element
• Repeat for remaining array
• Time: O(n²)
• Space: O(1)
• Makes minimum swaps

Merge Sort:
• Divide array in half recursively
• Sort each half
• Merge sorted halves
• Time: O(n log n)
• Space: O(n)
• Stable, guaranteed performance

Key Feature:
Divide and conquer approach. Always O(n log n)!

Quick Sort:
• Choose pivot element
• Partition around pivot
• Recursively sort partitions
• Time: O(n log n) average, O(n²) worst
• Space: O(log n)
• Usually fastest in practice

Why so fast?
Good cache performance and in-place sorting.

Heap Sort:
• Build max heap
• Extract maximum repeatedly
• Time: O(n log n)
• Space: O(1)
• Not stable

Counting Sort:
• Count occurrences of each value
• Calculate positions
• Place elements in sorted order
• Time: O(n + k) where k is range
• Space: O(k)
• Only for integers in small range

Radix Sort:
• Sort by individual digits
• Stable sort required
• Time: O(d * n) where d is digit count
• Space: O(n + k)
• Very fast for integers

Choosing Sorting Algorithm:

Small arrays (< 50 elements):
• Insertion sort

General purpose:
• Quick sort or Merge sort

Guaranteed O(n log n):
• Merge sort or Heap sort

Integer arrays, small range:
• Counting sort or Radix sort

Stable sorting needed:
• Merge sort

Searching Algorithms:

Linear Search:
• Check each element sequentially
• Time: O(n)
• Works on unsorted data

When to use:
• Small arrays
• Unsorted data
• Single search

Binary Search:
• Divide sorted array in half
• Compare with middle element
• Search appropriate half
• Time: O(log n)
• Requires sorted array

Algorithm:
left = 0, right = length - 1
while left <= right:
  mid = (left + right) / 2
  if target == arr[mid]: return mid
  if target < arr[mid]: right = mid - 1
  else: left = mid + 1
return not found

Why so fast?
Eliminates half the search space each step!

Interpolation Search:
• Improvement on binary search
• Estimates position based on value
• Time: O(log log n) average
• Best for uniformly distributed data

Jump Search:
• Jump ahead by fixed steps
• Linear search in block
• Time: O(√n)
• Good for sorted arrays

Exponential Search:
• Find range where element exists
• Binary search in range
• Time: O(log n)
• Good for unbounded arrays

Hash-based Search:
• Use hash table
• Time: O(1) average
• Requires extra space
• Best when multiple searches

Pattern Matching:

Brute Force:
• Check pattern at each position
• Time: O(n * m)
• Simple but slow

Knuth-Morris-Pratt (KMP):
• Preprocess pattern
• Skip unnecessary comparisons
• Time: O(n + m)
• Very efficient

Boyer-Moore:
• Start from end of pattern
• Large skip on mismatch
• Time: O(n/m) best case
• Often fastest in practice

Practical Considerations:

Data Size:
• Small: Simple algorithms work
• Large: Need efficient algorithms

Data Distribution:
• Random: Quick sort
• Nearly sorted: Insertion sort
• Known range: Counting sort

Stability:
• Need to preserve order of equal elements?
• Use stable sort (merge, insertion)

Memory:
• Limited space: In-place sorts
• Plenty of space: Can use extra arrays

Key Principle: Choose algorithms based on your data characteristics and requirements. In practice, hybrid approaches often work best.`
        ]
      );

      console.log('Database seeded successfully');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};

export const getDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('elearning.db');
  }
  return db;
};

// ============ ENROLLMENT FUNCTIONS ============

// Check if user is enrolled in a course
export const checkEnrollment = async (courseId) => {
  try {
    const db = await getDatabase();
    const result = await db.getFirstAsync(
      'SELECT * FROM enrollments WHERE course_id = ?',
      [courseId]
    );
    return !!result;
  } catch (error) {
    console.error('Error checking enrollment:', error);
    return false;
  }
};

// Enroll user in a course
export const enrollInCourse = async (courseId) => {
  try {
    const db = await getDatabase();
    
    // Check if already enrolled
    const isEnrolled = await checkEnrollment(courseId);
    if (isEnrolled) {
      return false;
    }
    
    // Insert enrollment
    await db.runAsync(
      'INSERT INTO enrollments (course_id, enrolled_at) VALUES (?, CURRENT_TIMESTAMP)',
      [courseId]
    );
    
    console.log(`User enrolled in course ${courseId}`);
    return true;
  } catch (error) {
    console.error('Error enrolling in course:', error);
    return false;
  }
};

// Get all enrolled courses
// Get all enrolled courses
export const getEnrolledCourses = async () => {
  try {
    const db = await getDatabase();
    
    const enrolledCourses = await db.getAllAsync(`
      SELECT c.*, e.enrolled_at
      FROM courses c
      INNER JOIN enrollments e ON c.id = e.course_id
      ORDER BY e.enrolled_at DESC
    `);
    
    // Process each course one by one
    const coursesWithProgress = [];
    
    for (const course of enrolledCourses) {
      try {
        const lessonCount = await db.getFirstAsync(
          'SELECT COUNT(*) as total FROM lessons WHERE course_id = ?',
          [course.id]
        );
        
        const completedCount = await db.getFirstAsync(
          `SELECT COUNT(*) as completed 
           FROM lessons l 
           INNER JOIN progress p ON l.id = p.lesson_id 
           WHERE l.course_id = ? AND p.completed = 1`,
          [course.id]
        );
        
        coursesWithProgress.push({
          ...course,
          total_lessons: lessonCount?.total || 0,
          completed_lessons: completedCount?.completed || 0
        });
      } catch (err) {
        console.log(`Error processing enrolled course ${course.id}:`, err);
        coursesWithProgress.push({
          ...course,
          total_lessons: 0,
          completed_lessons: 0
        });
      }
    }
    
    return coursesWithProgress;
  } catch (error) {
    console.error('Error getting enrolled courses:', error);
    return [];
  }
};

// ============ COURSE FUNCTIONS ============

// Helper function to get all courses with lesson count
export const getCoursesWithProgress = async () => {
  try {
    const db = await getDatabase();
    
    // First get all courses
    const courses = await db.getAllAsync('SELECT * FROM courses ORDER BY id');
    
    // Then get lesson count and enrollment status for each course
    const coursesWithProgress = await Promise.all(
      courses.map(async (course) => {
        const lessonCount = await db.getFirstAsync(
          'SELECT COUNT(*) as total FROM lessons WHERE course_id = ?',
          [course.id]
        );
        
        // Check if enrolled
        const isEnrolled = await checkEnrollment(course.id);
        
        let completedCount = { completed: 0 };
        if (isEnrolled) {
          completedCount = await db.getFirstAsync(
            `SELECT COUNT(*) as completed 
             FROM lessons l 
             LEFT JOIN progress p ON l.id = p.lesson_id 
             WHERE l.course_id = ? AND p.completed = 1`,
            [course.id]
          );
        }
        
        return {
          ...course,
          total_lessons: lessonCount?.total || 0,
          completed_lessons: completedCount?.completed || 0,
          is_enrolled: isEnrolled
        };
      })
    );
    
    return coursesWithProgress;
  } catch (error) {
    console.error('Error getting courses with progress:', error);
    return [];
  }
};

// ============ LESSON FUNCTIONS ============

// Get lessons for a specific course
// Get lessons for a specific course
export const getLessonsByCourse = async (courseId) => {
  try {
    const db = await getDatabase();
    
    // Simple query without complex joins
    const lessons = await db.getAllAsync(
      'SELECT id, course_id, title, content FROM lessons WHERE course_id = ? ORDER BY id',
      [courseId]
    );
    
    console.log(`Found ${lessons.length} lessons for course ${courseId}`);
    
    if (!lessons || lessons.length === 0) {
      return [];
    }
    
    // Get completion status for each lesson separately
    const lessonsWithProgress = [];
    
    for (const lesson of lessons) {
      try {
        const progress = await db.getFirstAsync(
          'SELECT completed FROM progress WHERE lesson_id = ?',
          [lesson.id]
        );
        
        lessonsWithProgress.push({
          ...lesson,
          completed: progress?.completed || 0
        });
      } catch (err) {
        console.log(`Progress check failed for lesson ${lesson.id}, using default`);
        lessonsWithProgress.push({
          ...lesson,
          completed: 0
        });
      }
    }
    
    return lessonsWithProgress;
  } catch (error) {
    console.error('Error getting lessons:', error);
    console.error('CourseId was:', courseId);
    return [];
  }
};

// Get a specific lesson
export const getLessonById = async (lessonId) => {
  try {
    const db = await getDatabase();
    const lesson = await db.getFirstAsync(
      'SELECT * FROM lessons WHERE id = ?',
      [lessonId]
    );
    
    if (!lesson) return null;
    
    // Get course title
    const course = await db.getFirstAsync(
      'SELECT title FROM courses WHERE id = ?',
      [lesson.course_id]
    );
    
    // Get progress
    const progress = await db.getFirstAsync(
      'SELECT completed FROM progress WHERE lesson_id = ?',
      [lessonId]
    );
    
    return {
      ...lesson,
      course_title: course?.title || '',
      completed: progress?.completed || 0
    };
  } catch (error) {
    console.error('Error getting lesson:', error);
    return null;
  }
};

// Mark lesson as complete
export const markLessonComplete = async (lessonId) => {
  try {
    const db = await getDatabase();
    
    // Check if progress record exists
    const existing = await db.getFirstAsync(
      'SELECT * FROM progress WHERE lesson_id = ?',
      [lessonId]
    );
    
    if (existing) {
      // Update existing record - don't use completed_at for now
      await db.runAsync(
        'UPDATE progress SET completed = 1 WHERE lesson_id = ?',
        [lessonId]
      );
    } else {
      // Insert new record - don't use completed_at for now
      await db.runAsync(
        'INSERT INTO progress (lesson_id, completed) VALUES (?, 1)',
        [lessonId]
      );
    }
    
    console.log('Lesson marked as complete');
    return true;
  } catch (error) {
    console.error('Error marking lesson complete:', error);
    return false;
  }
};

// Mark lesson as incomplete
export const markLessonIncomplete = async (lessonId) => {
  try {
    const db = await getDatabase();
    
    await db.runAsync(
      'UPDATE progress SET completed = 0 WHERE lesson_id = ?',
      [lessonId]
    );
    
    console.log('Lesson marked as incomplete');
    return true;
  } catch (error) {
    console.error('Error marking lesson incomplete:', error);
    return false;
  }
};

// Get course progress percentage
export const getCourseProgress = async (courseId) => {
  try {
    const db = await getDatabase();
    
    // Get total lessons
    const totalResult = await db.getFirstAsync(
      'SELECT COUNT(*) as total FROM lessons WHERE course_id = ?',
      [courseId]
    );
    
    // Get completed lessons
    const completedResult = await db.getFirstAsync(
      `SELECT COUNT(*) as completed 
       FROM lessons l 
       LEFT JOIN progress p ON l.id = p.lesson_id 
       WHERE l.course_id = ? AND p.completed = 1`,
      [courseId]
    );
    
    const total = totalResult?.total || 0;
    const completed = completedResult?.completed || 0;
    
    if (total > 0) {
      return Math.round((completed / total) * 100);
    }
    return 0;
  } catch (error) {
    console.error('Error getting course progress:', error);
    return 0;
  }
};

// Helper function to completely reset database (for development only)
export const resetDatabase = async () => {
  try {
    const db = await getDatabase();
    
    // Drop all tables
    await db.execAsync(`
      DROP TABLE IF EXISTS progress;
      DROP TABLE IF EXISTS enrollments;
      DROP TABLE IF EXISTS lessons;
      DROP TABLE IF EXISTS courses;
    `);
    
    console.log('Database reset successfully');
    
    // Reinitialize
    await initDatabase();
    await seedCourses();
    
  } catch (error) {
    console.error('Error resetting database:', error);
  }
};

export default { 
  initDatabase, 
  seedCourses, 
  getDatabase,
  // Enrollment functions
  checkEnrollment,
  enrollInCourse,
  getEnrolledCourses,
  // Course functions
  getCoursesWithProgress,
  getCourseProgress,
  // Lesson functions
  getLessonsByCourse,
  getLessonById,
  markLessonComplete,
  markLessonIncomplete,
  // Development helper
  resetDatabase,
};