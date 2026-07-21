// ===== MOTIVATION QUOTES =====
const quotes = [
    "💪 Every expert was once a beginner. Keep going!",
    "🔥 You didn't come this far to only come this far!",
    "⚡ Small progress is still progress. Stay consistent!",
    "🎯 Focus on the step in front of you, not the whole staircase!",
    "🚀 Your future self is cheering you on right now!",
    "💡 Discipline beats motivation every single day!",
    "🏆 The pain of studying is less than the pain of regret!",
    "⭐ You are closer than you think. Keep pushing!"
];

// ===== PROGRESS DATA =====
let progressData = {
    streak: 0,
    focusScore: 0,
    weeklyData: [0, 0, 0, 0, 0, 0, 0]
};

// ===== SCROLL TO PLANNER =====
function scrollToPlanner() {
    document.getElementById('planner').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// ===== UPDATE HOURS DISPLAY =====
function updateHours(value) {
    document.getElementById('hours-display').textContent = 
        value + ' hours';
}

// ===== GENERATE STUDY PLAN =====
async function generatePlan() {
    const subjectsInput = document.getElementById('subjects-input').value;
    const examDate = document.getElementById('exam-date').value;
    const dailyHours = document.getElementById('daily-hours').value;
    const challenge = document.getElementById('challenge-select').value;

    // Validation
    if (!subjectsInput || !examDate) {
        alert('⚠️ Please fill in your subjects and exam date!');
        return;
    }

    const subjects = subjectsInput.split(',').map(s => s.trim());

    // Calculate days left
    const today = new Date();
    const exam = new Date(examDate);
    const daysLeft = Math.ceil((exam - today) / (1000 * 60 * 60 * 24));

    if (daysLeft <= 0) {
        alert('⚠️ Please choose a future exam date!');
        return;
    }

    // Update stats
    document.getElementById('days-left').textContent = daysLeft;

    // Show loading
    const btn = document.querySelector('.primary-btn');
    btn.textContent = '⏳ Generating your plan...';
    btn.disabled = true;

    try {
        // Call Flask backend
        const response = await fetch('/generate-plan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                subjects: subjects,
                exam_date: examDate,
                daily_hours: parseInt(dailyHours),
                challenge: challenge,
                days_left: daysLeft
            })
        });

        const data = await response.json();

        // Generate plan display with AI data
        displayPlan(subjects, daysLeft, parseInt(dailyHours), challenge, data);

    } catch (error) {
        console.error('Error:', error);
        displayPlan(subjects, daysLeft, parseInt(dailyHours), challenge, null);
    }

    btn.textContent = '⚡ Generate My AI Study Plan';
    btn.disabled = false;
}

// ===== DISPLAY STUDY PLAN =====
function displayPlan(subjects, daysLeft, dailyHours, challenge, aiData) {
    const hoursPerSubject = Math.floor(
        (daysLeft * dailyHours) / subjects.length
    );
    const dailyPerSubject = (dailyHours / subjects.length).toFixed(1);

    let planHTML = `
        <div class="plan-summary">
            <p>📅 <strong>${daysLeft} days</strong> until your exam</p>
            <p>⏰ <strong>${dailyHours} hours</strong> per day</p>
            <p>📚 <strong>${subjects.length} subjects</strong> to cover</p>
            ${aiData && aiData.ai_enabled ? '<p>🤖 <strong>AI-Powered</strong> Schedule</p>' : ''}
        </div>
    `;

    // Display AI-generated day-by-day schedule if available
    if (aiData && aiData.schedule && aiData.schedule.length > 0) {
        planHTML += `
            <div class="schedule-section">
                <h3>📆 Your Day-by-Day Study Schedule</h3>
                <div class="schedule-grid">
        `;

        const colors = ['#667eea', '#764ba2', '#11998e', '#f093fb', '#4facfe', '#f5576c'];
        
        aiData.schedule.forEach((day, index) => {
            const color = colors[index % colors.length];
            const subjectsList = Array.isArray(day.subjects)
                ? day.subjects.map(s => `<li>📖 ${s}</li>`).join('')
                : '<li>Study session</li>';
            
            planHTML += `
                <div class="day-card" style="border-left: 4px solid ${color}">
                    <div class="day-header" style="background: linear-gradient(135deg, ${color}22, transparent)">
                        <h4 style="color: ${color}">Day ${day.day}</h4>
                        <span class="day-focus">${day.focus || 'Study'}</span>
                    </div>
                    <ul class="day-subjects">
                        ${subjectsList}
                    </ul>
                    <p class="day-hours">⏰ ${day.hours} hours</p>
                </div>
            `;
        });

        planHTML += `
                </div>
            </div>
        `;
    } else {
        // Fallback: Show subjects overview
        planHTML += `<div class="subjects-grid">`;
        
        const colors = ['#667eea', '#764ba2', '#11998e', '#f093fb', '#4facfe', '#f5576c'];

        subjects.forEach((subject, index) => {
            const color = colors[index % colors.length];
            planHTML += `
                <div class="subject-card" style="border-left: 4px solid ${color}">
                    <h4 style="color: ${color}">${subject}</h4>
                    <p>⏱️ ${dailyPerSubject} hrs/day</p>
                    <p>📖 ${hoursPerSubject} total hours</p>
                    <div class="progress-bar">
                        <div class="progress-fill"
                            style="width: 0%; background: ${color}"
                            id="progress-${index}">
                        </div>
                    </div>
                </div>
            `;
        });

        planHTML += `</div>`;
    }

    // AI-generated personalized motivation or fallback
    const motivation = aiData && aiData.motivation
        ? aiData.motivation
        : getFallbackMotivation(challenge);

    planHTML += `
        <div class="ai-tip">
            <p>🤖 <strong>AI Coach Says:</strong> ${motivation}</p>
        </div>
    `;

    document.getElementById('plan-content').innerHTML = planHTML;
    document.getElementById('plan-output').classList.remove('hidden');
    document.getElementById('plan-output').scrollIntoView({
        behavior: 'smooth'
    });

    // Animate progress bars (if using fallback view)
    if (!aiData || !aiData.schedule) {
        setTimeout(() => {
            subjects.forEach((_, index) => {
                const bar = document.getElementById(`progress-${index}`);
                if (bar) bar.style.width = '15%';
            });
        }, 500);
    }

    // Update focus score
    const score = Math.min(100, Math.round((dailyHours / 12) * 100));
    document.getElementById('focus-score').textContent = score + '%';
}

// Helper function for fallback motivation
function getFallbackMotivation(challenge) {
    const motivationMap = {
        motivation: "🔥 We'll send you daily motivation pushes to keep you going!",
        focus: "🎯 Break each session into 25-minute Pomodoro blocks!",
        time: "⏰ Stick to your daily schedule — consistency beats cramming!",
        understanding: "💡 Use active recall — test yourself after every topic!"
    };
    return motivationMap[challenge] || motivationMap.motivation;
}

// ===== DAILY CHECK-IN =====
async function submitCheckin(completed) {
    try {
        const response = await fetch('/checkin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed_today: completed })
        });

        const data = await response.json();
        const messageDiv = document.getElementById('checkin-message');
        messageDiv.classList.remove('hidden');

        if (completed) {
            progressData.streak++;
            progressData.weeklyData[new Date().getDay()] = 1;
            document.getElementById('streak-count').textContent = 
                progressData.streak + '🔥';
            messageDiv.style.background = 
                'rgba(17, 153, 142, 0.2)';
            messageDiv.style.border = 
                '1px solid rgba(17, 153, 142, 0.4)';
            messageDiv.innerHTML = `
                🎉 Amazing! Streak: ${progressData.streak} days!
                <br>Keep this momentum going tomorrow!
            `;
            updateChart();
        } else {
            progressData.streak = 0;
            document.getElementById('streak-count').textContent = '0';
            messageDiv.style.background = 
                'rgba(245, 87, 108, 0.2)';
            messageDiv.style.border = 
                '1px solid rgba(245, 87, 108, 0.4)';
            messageDiv.innerHTML = `
                😔 No worries! Tomorrow is a fresh start.
                <br>💡 Tip: Even 15 minutes counts. Try again tomorrow!
            `;
        }
    } catch (error) {
        console.error('Checkin error:', error);
    }
}

// ===== PROGRESS CHART =====
let chart = null;

function initChart() {
    const ctx = document.getElementById('progressChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            datasets: [{
                label: 'Study Sessions Completed',
                data: progressData.weeklyData,
                backgroundColor: 'rgba(102, 126, 234, 0.6)',
                borderColor: '#667eea',
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { 
                    labels: { color: 'rgba(255,255,255,0.7)' } 
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1,
                    ticks: { color: 'rgba(255,255,255,0.5)' },
                    grid: { color: 'rgba(255,255,255,0.05)' }
                },
                x: {
                    ticks: { color: 'rgba(255,255,255,0.5)' },
                    grid: { color: 'rgba(255,255,255,0.05)' }
                }
            }
        }
    });
}

function updateChart() {
    if (chart) {
        chart.data.datasets[0].data = progressData.weeklyData;
        chart.update();
    }
}

// ===== MOTIVATION QUOTES =====
let quoteIndex = 0;

function newMotivation() {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    document.getElementById('motivation-text').textContent = 
        quotes[quoteIndex];
}

// Auto rotate quotes every 10 seconds
setInterval(newMotivation, 10000);

// ===== INITIALIZE =====
window.onload = function() {
    initChart();
    // Set today's date as minimum for exam date
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('exam-date').min = today;
};