# E-Learning App

[![React Native](https://img.shields.io/badge/React%20Native-v0.72+-blue)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-v50+-black)](https://expo.dev/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Node Version](https://img.shields.io/badge/Node-v18%2B-green)](https://nodejs.org/)

A modern, cross-platform e-learning application built with React Native and Expo. Features comprehensive course management, video streaming, interactive quizzes, and progress tracking.

## 📱 Features

- ✅ Browse and enroll in courses
- ✅ Stream course videos with adaptive quality
- ✅ Interactive quiz system with instant feedback
- ✅ Real-time progress tracking
- ✅ Offline content support
- ✅ Cross-platform (iOS & Android)
- ✅ Responsive UI design
- ✅ Dark mode support

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **Git** v2.40 or higher ([Download](https://git-scm.com/))
- **Expo Go** app on your mobile device
  - [iOS App Store](https://apps.apple.com/us/app/expo-go/id1615743771)
  - [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/Ammarbashirharuna/e-learning.git
cd e-learning
```

**2. Install dependencies**
```bash
npm install
```

**3. Start the development server**
```bash
npx expo start
```

**4. Open on your device**

- **Android:** Press `a` in terminal or scan QR code with Expo Go
- **iOS:** Press `i` in terminal or scan QR code with Camera app

## 📚 Usage

### Development Mode

```bash
# Standard mode (local network only)
npx expo start

# Tunnel mode (works on different networks)
npx expo start --tunnel

# Clear cache and rebuild
npx expo start --clear

# Custom port
npx expo start --port 8082
```

### Keyboard Shortcuts (while app is running)

| Key | Action |
|-----|--------|
| `a` | Open on Android emulator |
| `i` | Open on iOS simulator |
| `w` | Open web preview |
| `r` | Reload app |
| `m` | Toggle menu |
| `Ctrl+C` | Stop server |

## 🏗️ Project Structure

e-learning/

├── src/

│   ├── components/      # Reusable UI components

│   ├── screens/         # Screen components

│   ├── navigation/       # Navigation setup

│   ├── services/        # API services

│   ├── utils/           # Utility functions

│   └── assets/          # Images, fonts, icons

├── app.json             # Expo configuration

├── package.json         # Dependencies

└── README.md            # This file
