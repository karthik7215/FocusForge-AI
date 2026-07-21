# 🚀 Quick Setup Guide for FocusForge AI

## Step 1: Install Dependencies

```bash
pip install -r requirements.txt
```

This installs:
- Flask (web framework)
- python-dotenv (environment variables)
- openai (AI features)

## Step 2: Choose Your Mode

### Option A: AI-Powered Mode (Recommended)

1. Get an OpenAI API key from https://platform.openai.com/api-keys
2. Open `.env` file
3. Uncomment and add your key:
   ```
   OPENAI_API_KEY=sk-your-actual-key-here
   ```

**Benefits:**
- ✅ Intelligent day-by-day schedules
- ✅ Personalized motivational messages
- ✅ Adaptive to your specific needs

### Option B: Fallback Mode (No API Key Needed)

Just run the app without adding an API key!

**Features:**
- ✅ Smart algorithm-based scheduling
- ✅ Preset motivational tips
- ✅ All core features work

## Step 3: Run the App

```bash
python app.py
```

Open your browser to: **http://localhost:5000**

## Step 4: Create Your First Study Plan

1. Enter subjects: `Mathematics, Physics, Chemistry`
2. Set exam date (future date)
3. Choose daily hours: `4-6 hours recommended`
4. Select your challenge
5. Click **"Generate My AI Study Plan"**

## 🎯 What You'll Get

### With AI Mode:
- Day-by-day breakdown with specific topics
- Smart distribution based on difficulty
- Review sessions scheduled automatically
- Custom motivation for YOUR challenge

### With Fallback Mode:
- Balanced subject rotation
- Time allocation per subject
- General study tips
- All tracking features

## 💡 Pro Tips

1. **Be Realistic**: Don't overcommit on daily hours
2. **Check In Daily**: Build that streak! 🔥
3. **Review the Schedule**: Adjust as needed
4. **Use Pomodoro**: 25 min focus, 5 min break
5. **Track Progress**: Use the dashboard

## 🐛 Troubleshooting

**Issue**: "Import openai could not be resolved"
- **Fix**: Run `pip install openai`

**Issue**: AI features not working
- **Fix**: Check your API key in `.env` file
- **Alternative**: App works fine in fallback mode!

**Issue**: Port 5000 already in use
- **Fix**: Change port in `app.py`: `app.run(debug=True, port=5001)`

## 📞 Need Help?

The app is designed to work with or without AI. Start simple, and add AI features when ready!

---

**Ready to crush your exams? Let's go! 🚀**