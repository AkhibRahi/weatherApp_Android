**Weather App (React Native)**
A cross-platform Weather App built using React Native. It allows users to check the current weather for any location. The app supports light/dark modes, uses Redux Toolkit for global state management, and follows a clean architecture.

**Features**
 Search weather by city name
 Display current weather details (temperature, humidity, condition, etc.)
 Light and dark mode support
 Dynamic UI styling using React Context
 System theme detection and toggle
 Singleton Pattern for centralized API management
 Clean architecture with reusable components
 Smooth user experience with loading/error handling

**My Approach**
**Architecture**: Utilized Redux Toolkit for global theme state and React Context API for theming and styling.
**Dark Mode Support**: Integrated system color scheme (Appearance.getColorScheme) with a manual toggle using Redux.
**API Management**: Weather data is fetched from OpenWeatherMap API, managed via a Singleton Pattern class to ensure a single, reusable API service instance throughout the app.
**Component Design**: Modular and reusable components like ModeTogglerButton enhance maintainability and scalability.
**Error Handling**: Gracefully handles loading and API error states for a better UX.
**Clean Code**: Followed best practices, using TypeScript (if applicable), and split responsibilities across files for readability.

🔗 **API Used**
OpenWeatherMap API : https://openweathermap.org/

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

**Project Structure Overview**:
src/
├── api/                 # Singleton class for API handling
├── components/          # Reusable UI components
├── contexts/            # Theme Context
├── redux/               # Redux Toolkit setup
├── screens/             # Main UI screens
└── utils/               # Utility functions

**Technologies Used**
React Native
Redux Toolkit
React Context API
OpenWeatherMap API
Axios 
react-native-vector-icons

**Troubleshooting**:
**Make sure your environment is set up correctly: **
React Native Environment Setup

**Android/iOS emulator issues? Rebuild and clear cache:**
npx react-native clean
cd android && ./gradlew clean
