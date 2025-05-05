**Weather App (React Native)**
A cross-platform Weather App built using React Native. It allows users to check the current weather for any location. The app supports light/dark modes, uses Redux Toolkit for global state management, and follows a clean architecture.

**Features**
Search real-time weather by city name
Display temperature, humidity, and weather conditions
Dark and light mode support
Android-optimized layout and user experience
Dynamic UI styling with centralized theme management
Stores and loads last searched city after reopening
Reusable components and clean code structure
Singleton pattern for consistent API access
Unit tests included

**My Approach**
**Architecture**: Followed clean code architecture – separating logic into components, API services, contexts, Redux slices, and hooks.
**Theme Management**: Used Redux Toolkit to manage dark/light mode with optional system detection via useColorScheme.
**State Management**: Chose Redux Toolkit to manage theme and search data. AsyncStorage ensures data persistence.
**API Handling**: Managed via a Singleton API manager for maintainability.
**UI Design**: Built reusable, clean components styled dynamically based on the theme.

**State Management**
Redux Toolkit
Manages:
Theme (dark/light)
Search history (latest city searched)
AsyncStorage stores last searched city, which gets auto-loaded on app restart.


🔗 **API Used**
OpenWeatherMap API : https://openweathermap.org/

**Project Structure Overview**:
src/
├── api/                 # Singleton class for API handling
├── components/          # Reusable UI components
├── contexts/            # Theme Context
├── redux/               # Redux Toolkit setup
├── screens/             # Main UI screens
└── utils/               # Utility functions

Clean and maintainable codebase
Commented, readable, and developer-friendly

**Testing**
Basic unit tests added for core functionality
Tools: jest, @testing-library/react-native

**Bonus Feature**
Dark Mode Toggle
Users can manually toggle dark/light mode, or the app auto-detects system theme using useColorScheme.

**Setup Instructions**:
**1. Clone the Repository**
git clone https://github.com/yourusername/weather-app.git
cd weather-app
**2. Install Dependencies**
npm install
# or
yarn install
**3. Add .env File**
Create a .env file in the root directory and add your OpenWeatherMap API key:
WEATHER_API_KEY=your_api_key_here
**4. Start Metro Bundler**:
npm start
# or
yarn start
5. Run the App
For Android : npm run android
# or
yarn android : 
cd ios
pod install
cd ..
npm run ios
# or
yarn ios


**Troubleshooting**:
**Make sure your environment is set up correctly: **
React Native Environment Setup

**Android/iOS emulator issues? Rebuild and clear cache:**
npx react-native clean
cd android && ./gradlew clean
