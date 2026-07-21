from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import os
from datetime import datetime, timedelta
import json

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY", "focusforge2026")

# ===== AI HELPER FUNCTIONS =====

def generate_fallback_schedule(subjects, days_left, daily_hours):
    """Smart schedule generator"""
    schedule = []
    
    for day in range(1, min(days_left + 1, 15)):
        day_subjects = []
        start_idx = ((day - 1) * 2) % len(subjects)
        
        for i in range(min(2, len(subjects))):
            subject_idx = (start_idx + i) % len(subjects)
            day_subjects.append(subjects[subject_idx])
        
        if day <= days_left * 0.3:
            focus = "🏗️ Foundation Building"
        elif day <= days_left * 0.7:
            focus = "📝 Practice & Application"
        else:
            focus = "🔄 Revision & Review"
        
        schedule.append({
            "day": day,
            "date": f"Day {day}",
            "subjects": day_subjects,
            "hours": daily_hours,
            "focus": focus
        })
    
    return schedule

def generate_fallback_motivation(challenge):
    """Personalized motivational messages"""
    messages = {
        "motivation": "🔥 Motivation fades, but discipline stays. Build the habit of showing up every day, even when you don't feel like it. You've got this!",
        "focus": "🎯 Try the Pomodoro technique: 25 minutes of deep focus, then a 5-minute break. Your brain will thank you and you'll get more done!",
        "time": "⏰ Time management is about priorities, not perfection. Block your study hours like important meetings and protect that time fiercely!",
        "understanding": "💡 Understanding beats memorization. Teach concepts to yourself out loud or write them in your own words. That's when real learning happens!"
    }
    return messages.get(challenge, messages["motivation"])

def generate_ai_study_schedule(subjects, days_left, daily_hours, challenge):
    """Generate smart day-by-day study schedule"""
    return generate_fallback_schedule(subjects, days_left, daily_hours)

def generate_ai_motivation(challenge):
    """Generate personalized motivational message"""
    return generate_fallback_motivation(challenge)

# ===== ROUTES =====

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/generate-plan", methods=["POST"])
def generate_plan():
    data = request.json
    subjects = data.get("subjects", [])
    exam_date = data.get("exam_date", "")
    daily_hours = data.get("daily_hours", 2)
    challenge = data.get("challenge", "motivation")
    days_left = data.get("days_left", 30)
    
    # Generate schedule
    schedule = generate_ai_study_schedule(
        subjects, days_left, daily_hours, challenge
    )
    
    # Generate motivation
    motivation = generate_ai_motivation(challenge)
    
    return jsonify({
        "status": "success",
        "message": f"Plan generated for {len(subjects)} subjects!",
        "subjects": subjects,
        "exam_date": exam_date,
        "daily_hours": daily_hours,
        "schedule": schedule,
        "motivation": motivation,
        "ai_enabled": True
    })

@app.route("/checkin", methods=["POST"])
def checkin():
    data = request.json
    completed = data.get("completed_today", False)
    
    return jsonify({
        "status": "success",
        "completed": completed,
        "message": "Check-in recorded!"
    })

if __name__ == "__main__":
    app.run(debug=True)