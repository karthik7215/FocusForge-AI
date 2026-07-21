# 🚀 FocusForge AI - Study Accountability Web App

An AI-powered study accountability platform that helps students stay on track with personalized study schedules and motivational coaching.

## ✨ Features

### 🤖 AI-Powered Features
1. **Smart Day-by-Day Study Schedule** - AI analyzes your subjects, exam date, and available hours to create an optimized study plan
2. **Personalized Motivational Messages** - Get custom motivation based on your biggest challenge (motivation, focus, time management, or understanding)
3. **Intelligent Subject Distribution** - Balances workload across subjects with review sessions before exams

### 📊 Core Features
- Daily check-in system with streak tracking
- Progress dashboard with visual charts
- Focus score calculation
- Countdown to exam date
- Responsive design

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure Environment Variables

Edit the `.env` file:

```env
FLASK_SECRET_KEY=focusforge2026

# Optional: Add OpenAI API key for AI features
OPENAI_API_KEY=your_openai_api_key_here
```

**Note:** The app works in two modes:
- **AI Mode** (with OpenAI API key): Full AI-powered schedule generation and personalized motivation
- **Fallback Mode** (without API key): Smart algorithm-based scheduling with preset motivational tips

### 3. Get OpenAI API Key (Optional)

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create an account or sign in
3. Generate a new API key
4. Add it to your `.env` file

### 4. Run the Application

```bash
python app.py
```

The app will be available at: `http://localhost:5000`

## 📖 How to Use

1. **Build Your Study Plan**
   - Enter your subjects (comma-separated)
   - Set your exam date
   - Choose daily study hours (1-12)
   - Select your biggest challenge

2. **Generate AI Plan**
   - Click "Generate My AI Study Plan"
   - View your personalized day-by-day schedule
   - Read your custom motivational message

3. **Daily Check-In**
   - Mark whether you completed your study goal
   - Build your streak
   - Track progress over time

4. **Monitor Progress**
   - View your study consistency chart
   - Track your focus score
   - See days remaining until exam

## 🎯 AI Features Explained

### Smart Schedule Generation
The AI considers:
- Number of subjects and their complexity
- Days available until exam
- Daily study hours
- Your biggest challenge
- Optimal spacing for retention
- Review sessions before exam

### Personalized Motivation
Based on your challenge, the AI provides:
- **Motivation Issues**: Daily encouragement and habit-building tips
- **Focus Problems**: Pomodoro technique and concentration strategies
- **Time Management**: Scheduling and prioritization advice
- **Understanding**: Active recall and learning techniques

## 🔧 Technical Stack

- **Backend**: Python Flask
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **AI Partner**: IBM Bob (Primary Development Tool)
- **Charts**: Chart.js
- **Styling**: Custom CSS with gradient effects

## 📁 Project Structure

```
FocusForge-AI/
├── app.py                 # Flask backend with AI logic
├── requirements.txt       # Python dependencies
├── .env                   # Environment variables
├── static/
│   ├── style.css         # Styling with day-card designs
│   └── script.js         # Frontend logic
└── templates/
    └── index.html        # Main HTML template
```

## 🚀 Future Enhancements

- [ ] User authentication and data persistence
- [ ] Email/SMS reminders for study sessions
- [ ] Integration with calendar apps
- [ ] Mobile app version
- [ ] Study group features
- [ ] Gamification with badges and rewards

## 📝 License

MIT License - Feel free to use and modify!

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

---

Built with ❤️ for students who want to ace their exams!
