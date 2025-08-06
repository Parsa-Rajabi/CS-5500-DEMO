# CS 5500 - BC Cancer API Testing Activity

## 🎯 What Can You Do With This Repository?

This repository contains a comprehensive **educational web application** designed to teach API testing concepts through hands-on practice. It's specifically created for CS 5500 students to learn modern testing methodologies.

## 📋 Learning Objectives

By working with this repository, you will learn:

- **Unit Testing**: Testing individual functions in isolation
- **Integration Testing**: Testing API interactions and data flow
- **Negative Testing**: Testing error conditions and edge cases
- **Async JavaScript**: Working with promises and async/await
- **API Consumption**: Fetching and processing data from external APIs
- **Test-Driven Development**: Writing tests before implementation

## 🚀 Quick Start

### 1. Run the Application

```bash
# Navigate to the source directory
cd src

# Start a local web server (Python 3)
python3 -m http.server 8000

# Or using Node.js (if available)
npx http-server -p 8000

# Or using PHP (if available)
php -S localhost:8000
```

### 2. Open in Browser

Navigate to `http://localhost:8000` in your web browser.

### 3. View Test Results

1. **Open Developer Console**: Right-click → Inspect → Console Tab
2. **Watch Tests Run**: You'll see test results in real-time
3. **Complete Tasks**: Follow the 4 tasks listed on the page

## 📚 Repository Structure

```
CS-5500-DEMO/
├── src/
│   ├── index.html              # Main application page
│   ├── CSS/
│   │   └── style.css          # Application styling
│   └── JS/
│       ├── bc-cancer.js       # Core API functions
│       ├── bc-cancer-test.js  # Student exercise templates
│       └── bc-cancer-test-solution.js  # Complete solutions
├── .github/
│   └── workflows/
│       └── demo-pipeline.yml  # CI/CD pipeline
└── README.md                  # Basic repository info
```

## 🧪 Testing Scenarios

### Core API Functions

1. **`fetchCancerEvents(cities)`** - Retrieves cancer events for specified cities
2. **`fetchDonors(limit)`** - Gets donor information with optional limit
3. **`fetchCities()`** - Returns list of available cities
4. **`formatEventSummary(events)`** - Transforms event data structure

### Student Tasks

**Task 1: Unit Test** - Test `formatEventSummary()` with Kelowna data
**Task 2: Integration Test** - Test `fetchDonors()` with limit of 2
**Task 3: Integration Test** - Verify `fetchCities()` contains Vancouver
**Task 4: Negative Test** - Test `fetchDonors()` with high limit (1000)

## 🛠 API Endpoints

The application uses the BC Cancer Faux API:
- **Base URL**: `https://bc-cancer-faux.onrender.com`
- **Events**: `/event?cities=Vancouver&format=json`
- **Donors**: `/donors?format=json&limit=5`
- **Cities**: `/cities?format=json`

## 🎓 Educational Benefits

### For Students
- **Hands-on Experience**: Write and run real tests
- **Immediate Feedback**: See results in browser console
- **Real-world APIs**: Work with actual HTTP endpoints
- **Progressive Learning**: Start with unit tests, advance to integration

### For Instructors
- **Ready-to-use Activity**: Complete lesson plan included
- **Flexible Tasks**: Can be modified for different skill levels
- **Assessment Ready**: Clear success/failure indicators
- **Version Control Practice**: Students can fork and submit PRs

## 🔧 Customization Ideas

### Extend the Learning Experience

1. **Add More Test Cases**:
   ```javascript
   // Add boundary condition tests
   // Test with empty arrays
   // Test with malformed data
   ```

2. **Implement New API Functions**:
   ```javascript
   // Add user authentication
   // Implement data filtering
   // Add error retry logic
   ```

3. **Enhance UI**:
   ```css
   /* Add test result visualization */
   /* Create progress indicators */
   /* Add dark mode support */
   ```

4. **CI/CD Integration**:
   ```yaml
   # Run tests automatically on push
   # Generate test reports
   # Deploy to GitHub Pages
   ```

## 📖 Next Steps

1. **Complete the Tasks**: Work through each testing scenario
2. **Experiment**: Try modifying the API functions
3. **Extend**: Add your own test cases
4. **Share**: Submit pull requests with improvements
5. **Learn More**: Explore advanced testing frameworks (Jest, Mocha, Cypress)

## 🤝 Contributing

This is an educational repository. Students and instructors are encouraged to:
- Add more test scenarios
- Improve documentation
- Fix bugs or issues
- Suggest new learning activities

## 📝 License

This repository is for educational use in CS 5500. Feel free to use and modify for learning purposes.