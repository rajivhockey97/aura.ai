/* ==========================================================================
   Aura - AI Fluency Quizzing Core Logic & UI Orchestrator
   ========================================================================== */

// --- Global Application State ---
const state = {
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    correctCount: 0,
    activeCategoryId: "",
    userSelections: [], // Array to hold detailed results for final review
    
    // Timer controls
    timerInterval: null,
    timeLeft: 30,
    maxTimePerQuestion: 30,
    questionStartTime: 0,
    totalTimeSpent: 0
};

// --- DOM Elements ---
const elements = {
    // Screens
    screenLanding: document.getElementById("screen-landing"),
    screenQuiz: document.getElementById("screen-quiz"),
    screenResults: document.getElementById("screen-results"),
    screenSettings: document.getElementById("screen-settings"),
    loaderOverlay: document.getElementById("quiz-loader"),
    loaderSubText: document.getElementById("loader-sub-text"),

    // Headers & Global UI
    brandHome: document.getElementById("brand-home"),
    btnSettings: document.getElementById("btn-settings"),
    globalHighScore: document.getElementById("global-high-score"),

    // Categories
    categoryGrid: document.getElementById("category-grid"),

    // Quiz Play
    btnQuitQuiz: document.getElementById("btn-quit-quiz"),
    quizCategoryTitle: document.getElementById("quiz-category-title"),
    quizCurrentScore: document.getElementById("quiz-current-score"),
    currentQuestionNum: document.getElementById("current-question-num"),
    questionPointsBadge: document.getElementById("question-points-badge"),
    quizProgressFill: document.getElementById("quiz-progress-fill"),
    timerText: document.getElementById("timer-text"),
    timerFill: document.getElementById("quiz-timer-fill"),
    questionText: document.getElementById("question-text"),
    optionsContainer: document.getElementById("options-container"),
    quizFeedbackText: document.getElementById("quiz-feedback-text"),
    btnNextQuestion: document.getElementById("btn-next-question"),

    // Results Summary
    resultsCategoryName: document.getElementById("results-category-name"),
    resultsRankBadge: document.getElementById("results-rank-badge"),
    scoreRingFill: document.getElementById("score-ring-fill"),
    resultsCorrectCount: document.getElementById("results-correct-count"),
    resultsPointsTotal: document.getElementById("results-points-total"),
    statAccuracy: document.getElementById("stat-accuracy"),
    statAvgTime: document.getElementById("stat-avg-time"),
    statHighScoreTag: document.getElementById("stat-high-score-tag"),
    btnRestartQuiz: document.getElementById("btn-restart-quiz"),
    btnResultsHome: document.getElementById("btn-results-home"),
    reviewListContainer: document.getElementById("review-list-container"),

    // Settings
    btnSettingsBack: document.getElementById("btn-settings-back"),
    inputApiKey: document.getElementById("input-api-key"),
    btnToggleApiVisibility: document.getElementById("btn-toggle-api-visibility"),
    inputModelName: document.getElementById("input-model-name"),
    btnSaveSettings: document.getElementById("btn-save-settings"),
    settingsStatusMsg: document.getElementById("settings-status-msg")
};

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

function initApp() {
    // 1. Load high score from local storage
    const storedHighScore = localStorage.getItem("aura_high_score") || 0;
    elements.globalHighScore.textContent = storedHighScore;

    // 2. Load settings form variables
    elements.inputApiKey.value = localStorage.getItem("gemini_api_key") || "";
    elements.inputModelName.value = localStorage.getItem("gemini_model_name") || "gemini-2.5-flash";

    // 3. Render categories on Landing Page
    renderCategories();

    // 4. Tab switching
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabIndicator = document.getElementById("tab-indicator");
    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const tab = btn.dataset.tab;
            if (tab === activeTab) return;
            activeTab = tab;
            tabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            if (tab === "gcp-cert") {
                tabIndicator.classList.add("tab-right");
            } else {
                tabIndicator.classList.remove("tab-right");
            }
            renderCategories();
        });
    });

    // 5. Bind Global Event Listeners
    elements.brandHome.addEventListener("click", () => showScreen("landing"));
    elements.btnSettings.addEventListener("click", () => showScreen("settings"));
    elements.btnSettingsBack.addEventListener("click", () => showScreen("landing"));
    elements.btnResultsHome.addEventListener("click", () => showScreen("landing"));
    
    // Quit quiz warning
    elements.btnQuitQuiz.addEventListener("click", () => {
        if (confirm("Are you sure you want to quit the current quiz? Your progress will be lost.")) {
            clearInterval(state.timerInterval);
            showScreen("landing");
        }
    });

    // Save configurations
    elements.btnSaveSettings.addEventListener("click", saveSettings);

    // Toggle API password field visibility
    elements.btnToggleApiVisibility.addEventListener("click", toggleApiKeyVisibility);

    // Next Question Button
    elements.btnNextQuestion.addEventListener("click", nextQuestion);

    // Restart Quiz Button
    elements.btnRestartQuiz.addEventListener("click", () => {
        setupAndStartQuiz(state.activeCategoryId);
    });
}

// --- Screen Router ---
function showScreen(screenId) {
    const screens = [
        { id: "landing", el: elements.screenLanding },
        { id: "quiz", el: elements.screenQuiz },
        { id: "results", el: elements.screenResults },
        { id: "settings", el: elements.screenSettings }
    ];

    screens.forEach(screen => {
        if (screen.id === screenId) {
            screen.el.classList.add("active");
            screen.el.style.display = "block";
            // Trigger animation frame for transition
            setTimeout(() => {
                screen.el.style.opacity = "1";
                screen.el.style.transform = "translateY(0)";
            }, 50);
        } else {
            screen.el.classList.remove("active");
            screen.el.style.opacity = "0";
            screen.el.style.transform = "translateY(15px)";
            screen.el.style.display = "none";
        }
    });

    // If returning home, refresh the global high score display
    if (screenId === "landing") {
        elements.globalHighScore.textContent = localStorage.getItem("aura_high_score") || 0;
    }
}

// --- Render Categories Grid ---
function renderCategories() {
    const categories = getActiveCategories();
    elements.categoryGrid.innerHTML = "";

    // Update section header text based on tab
    const sectionTitle = document.getElementById("section-title");
    const sectionDesc = document.getElementById("section-description");
    if (activeTab === "ai-fluency") {
        sectionTitle.textContent = "Select AI Knowledge Domain";
        sectionDesc.textContent = "Choose a specialization to start your 10-question dynamic quiz module.";
    } else {
        sectionTitle.textContent = "GCP ML Engineer Exam Domains";
        sectionDesc.textContent = "Practice the 6 core domains of the Google Cloud Professional ML Engineer certification.";
    }

    categories.forEach(category => {
        const card = document.createElement("div");
        card.className = "category-card";
        card.id = `cat-${category.id}`;
        card.innerHTML = `
            <div>
                <div class="category-icon-wrapper">${category.icon}</div>
                <h3 class="category-title">${category.name}</h3>
                <p class="category-desc">${category.desc}</p>
            </div>
            <div class="category-footer">
                <span class="category-stats-tag">${category.stats}</span>
                <span class="category-play-btn">
                    Start
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </span>
            </div>
        `;
        
        card.addEventListener("click", () => {
            setupAndStartQuiz(category.id);
        });
        
        elements.categoryGrid.appendChild(card);
    });
}

// --- Setup Quiz (Fetch Questions + Transition) ---
async function setupAndStartQuiz(categoryId) {
    state.activeCategoryId = categoryId;
    
    // Choose loading message based on whether API key is present
    const hasKey = !!(localStorage.getItem("gemini_api_key"));
    if (hasKey) {
        elements.loaderSubText.textContent = "AI is dynamically compiling fresh, professional-grade questions...";
    } else {
        elements.loaderSubText.textContent = "Offline Mode: Assembling pre-loaded core domain questions...";
    }
    
    // Show Loader
    elements.loaderOverlay.classList.remove("hidden");
    
    try {
        // Fetch questions from API adapter (falls back to offline automatically)
        const questions = await fetchQuizQuestions(categoryId);
        
        // Hide Loader
        elements.loaderOverlay.classList.add("hidden");
        
        if (questions && questions.length === 10) {
            startQuiz(questions);
        } else {
            alert("Error: Failed to construct quiz questions. Please check your network or try again.");
        }
    } catch (err) {
        elements.loaderOverlay.classList.add("hidden");
        console.error("Error setting up quiz:", err);
        alert("An unexpected error occurred. Please try again.");
    }
}

// --- Start Quiz Game Loop ---
function startQuiz(questions) {
    state.questions = questions;
    state.currentQuestionIndex = 0;
    state.score = 0;
    state.correctCount = 0;
    state.totalTimeSpent = 0;
    state.userSelections = [];

    // Set category title header
    const cat = getActiveCategories().find(c => c.id === state.activeCategoryId);
    elements.quizCategoryTitle.textContent = cat ? cat.name : "AI Fluency";
    elements.quizCurrentScore.textContent = "0";

    showScreen("quiz");
    loadQuestion(0);
}

// --- Load Question Screen Details ---
function loadQuestion(index) {
    state.currentQuestionIndex = index;
    const questionData = state.questions[index];

    // Reset UI buttons and action panel
    elements.btnNextQuestion.classList.add("hidden");
    elements.quizFeedbackText.textContent = "";
    elements.quizFeedbackText.className = "feedback-text";
    elements.optionsContainer.innerHTML = "";

    // Set text contents
    elements.currentQuestionNum.textContent = (index + 1).toString();
    elements.questionText.textContent = questionData.question;
    elements.quizProgressFill.style.width = `${(index + 1) * 10}%`;

    // Reset point multiplier badge
    elements.questionPointsBadge.textContent = "+100 pts";
    elements.questionPointsBadge.style.color = "var(--accent-blue)";
    elements.questionPointsBadge.style.borderColor = "var(--border-glass)";

    // Render multiple choice options (A, B, C, D)
    const prefixes = ["A", "B", "C", "D"];
    questionData.options.forEach((optionText, i) => {
        const optionBtn = document.createElement("button");
        optionBtn.className = "option-btn";
        optionBtn.innerHTML = `
            <span>
                <span class="option-prefix">${prefixes[i]}.</span>
                <span class="option-body-text">${escapeHtml(optionText)}</span>
            </span>
            <span class="option-status-icon"></span>
        `;
        
        optionBtn.addEventListener("click", () => {
            handleAnswerSelect(i);
        });
        
        elements.optionsContainer.appendChild(optionBtn);
    });

    // Start Timer
    state.timeLeft = state.maxTimePerQuestion;
    elements.timerText.textContent = `${state.timeLeft}s`;
    elements.timerText.style.color = "var(--color-correct)";
    elements.timerFill.style.width = "100%";
    elements.timerFill.style.backgroundColor = "var(--color-correct)";
    
    // Force CSS reflow to ensure the transition animations function correctly
    elements.timerFill.offsetHeight;
    
    // Set timestamp
    state.questionStartTime = Date.now();
    
    // Launch countdown interval
    startTimer();
}

// --- Countdown Timer Logic ---
function startTimer() {
    clearInterval(state.timerInterval);
    
    // Trigger transition immediately
    elements.timerFill.style.transition = "width 1s linear, background-color 0.5s ease";
    
    state.timerInterval = setInterval(() => {
        state.timeLeft--;
        elements.timerText.textContent = `${state.timeLeft}s`;
        
        const percentage = (state.timeLeft / state.maxTimePerQuestion) * 100;
        elements.timerFill.style.width = `${percentage}%`;

        // Update colors based on time remaining
        if (state.timeLeft > 15) {
            elements.timerText.style.color = "var(--color-correct)";
            elements.timerFill.style.backgroundColor = "var(--color-correct)";
        } else if (state.timeLeft <= 15 && state.timeLeft > 5) {
            elements.timerText.style.color = "var(--color-warning)";
            elements.timerFill.style.backgroundColor = "var(--color-warning)";
        } else {
            elements.timerText.style.color = "var(--color-incorrect)";
            elements.timerFill.style.backgroundColor = "var(--color-incorrect)";
        }

        // Apply dynamic score decay to badge (reward faster responses)
        const currentReward = 100 + (state.timeLeft * 10);
        elements.questionPointsBadge.textContent = `+${currentReward} pts`;

        if (state.timeLeft <= 0) {
            clearInterval(state.timerInterval);
            handleAnswerSelect(null, true); // Timeout
        }
    }, 1000);
}

// --- Answer Selection & Verification Handler ---
function handleAnswerSelect(selectedIndex, isTimeout = false) {
    clearInterval(state.timerInterval);
    const questionData = state.questions[state.currentQuestionIndex];
    const correctIdx = questionData.answer_index;
    const timeTaken = (Date.now() - state.questionStartTime) / 1000;
    state.totalTimeSpent += timeTaken;

    // Disable all option buttons
    const buttons = elements.optionsContainer.getElementsByClassName("option-btn");
    for (let btn of buttons) {
        btn.disabled = true;
    }

    let isCorrect = false;
    let pointsAwarded = 0;

    if (isTimeout) {
        // Time out
        elements.quizFeedbackText.textContent = "⏱️ Time Limit Expired! The correct answer is highlighted.";
        elements.quizFeedbackText.className = "feedback-text fail";
        
        // Highlight correct button
        buttons[correctIdx].classList.add("incorrect"); // Mark as failed
        buttons[correctIdx].querySelector(".option-status-icon").innerHTML = "❌";
    } else {
        isCorrect = (selectedIndex === correctIdx);
        
        if (isCorrect) {
            // Speed Bonus: 100 base + 10 points per remaining second
            pointsAwarded = 100 + (state.timeLeft * 10);
            state.score += pointsAwarded;
            state.correctCount++;

            // Visual feedback on selected correct button
            buttons[selectedIndex].classList.add("correct");
            buttons[selectedIndex].classList.add("pulse-correct-animation");
            buttons[selectedIndex].querySelector(".option-status-icon").innerHTML = "✔️";
            
            elements.quizCurrentScore.textContent = state.score.toLocaleString();
            elements.quizFeedbackText.textContent = `🎉 Correct! +${pointsAwarded} points.`;
            elements.quizFeedbackText.className = "feedback-text success";
        } else {
            // Visual feedback on selected incorrect button
            buttons[selectedIndex].classList.add("incorrect");
            buttons[selectedIndex].classList.add("shake-animation");
            buttons[selectedIndex].querySelector(".option-status-icon").innerHTML = "❌";

            // Highlight the correct one
            buttons[correctIdx].classList.add("correct");
            buttons[correctIdx].querySelector(".option-status-icon").innerHTML = "✔️";

            elements.quizFeedbackText.textContent = "❌ Incorrect. See explanation below in the review.";
            elements.quizFeedbackText.className = "feedback-text fail";
        }
    }

    // Save logs for review panel
    state.userSelections.push({
        question: questionData.question,
        options: questionData.options,
        userIndex: selectedIndex,
        correctIndex: correctIdx,
        isCorrect: isCorrect,
        isTimeout: isTimeout,
        timeTaken: timeTaken,
        explanation: questionData.explanation
    });

    // Toggle Next Question / Finish Button
    if (state.currentQuestionIndex === 9) {
        elements.btnNextQuestion.querySelector("span").textContent = "View Results";
    } else {
        elements.btnNextQuestion.querySelector("span").textContent = "Next Question";
    }
    elements.btnNextQuestion.classList.remove("hidden");
}

// --- Proceed to Next Question ---
function nextQuestion() {
    const nextIdx = state.currentQuestionIndex + 1;
    if (nextIdx < 10) {
        loadQuestion(nextIdx);
    } else {
        endQuiz();
    }
}

// --- End Quiz & Show Scoreboard Results ---
function endQuiz() {
    showScreen("results");

    // 1. Calculate accuracy and average response time
    const accuracy = Math.round((state.correctCount / 10) * 100);
    const avgTime = (state.totalTimeSpent / 10).toFixed(1);

    // 2. Check for high score and store
    let isNewRecord = false;
    const currentRecord = parseInt(localStorage.getItem("aura_high_score") || "0", 10);
    if (state.score > currentRecord) {
        localStorage.setItem("aura_high_score", state.score.toString());
        isNewRecord = true;
    }

    // 3. Render Rank title
    let rankTitle = "AI Rookie";
    if (state.correctCount >= 9) {
        rankTitle = "AI Researcher";
        elements.resultsRankBadge.style.background = "var(--primary-grad)";
        elements.resultsRankBadge.style.color = "var(--text-inverse)";
    } else if (state.correctCount >= 7) {
        rankTitle = "ML Engineer";
        elements.resultsRankBadge.style.background = "var(--accent-purple)";
        elements.resultsRankBadge.style.color = "var(--text-main)";
    } else if (state.correctCount >= 4) {
        rankTitle = "AI Associate";
        elements.resultsRankBadge.style.background = "var(--accent-blue)";
        elements.resultsRankBadge.style.color = "var(--text-inverse)";
    } else {
        rankTitle = "AI Apprentice";
        elements.resultsRankBadge.style.background = "rgba(255, 255, 255, 0.1)";
        elements.resultsRankBadge.style.color = "var(--text-main)";
    }

    const activeCat = getActiveCategories().find(c => c.id === state.activeCategoryId);
    elements.resultsCategoryName.textContent = activeCat ? activeCat.name : "AI Fluency Modules";
    elements.resultsRankBadge.textContent = rankTitle;
    elements.resultsCorrectCount.textContent = state.correctCount.toString();
    elements.resultsPointsTotal.textContent = `${state.score.toLocaleString()} pts`;
    elements.statAccuracy.textContent = `${accuracy}%`;
    elements.statAvgTime.textContent = `${avgTime}s`;

    if (isNewRecord && state.score > 0) {
        elements.statHighScoreTag.textContent = "🏆 NEW RECORD!";
        elements.statHighScoreTag.style.color = "var(--color-warning)";
    } else {
        elements.statHighScoreTag.textContent = `Record: ${currentRecord.toLocaleString()}`;
        elements.statHighScoreTag.style.color = "var(--text-muted)";
    }

    // 4. Animate the Score Ring Fill
    // Total circumference of circle (r=85) is 2 * PI * 85 ≈ 534
    const circumference = 534;
    const offset = circumference - (state.correctCount / 10) * circumference;
    elements.scoreRingFill.style.strokeDasharray = `${circumference}`;
    
    // Short delay to allow DOM transition to register
    setTimeout(() => {
        elements.scoreRingFill.style.strokeDashoffset = `${offset}`;
    }, 150);

    // 5. Render Detailed Question Review Accordion list
    renderReviewSection();
}

// --- Render Question Review Panel ---
function renderReviewSection() {
    elements.reviewListContainer.innerHTML = "";
    const prefixes = ["A", "B", "C", "D"];

    state.userSelections.forEach((item, index) => {
        const itemEl = document.createElement("div");
        itemEl.className = `review-item ${item.isCorrect ? 'correct-item' : 'incorrect-item'}`;

        const isTimeout = item.isTimeout;
        let userAnsText = "None (Timeout)";
        if (item.userIndex !== null && item.userIndex !== undefined) {
            userAnsText = `${prefixes[item.userIndex]}. ${item.options[item.userIndex]}`;
        }
        const correctAnsText = `${prefixes[item.correctIndex]}. ${item.options[item.correctIndex]}`;

        itemEl.innerHTML = `
            <div class="review-header-row">
                <h4 class="review-q-text">${index + 1}. ${escapeHtml(item.question)}</h4>
                <span class="review-status-badge ${item.isCorrect ? 'correct-badge' : 'incorrect-badge'}">
                    ${item.isCorrect ? 'Correct' : isTimeout ? 'Timeout' : 'Incorrect'}
                </span>
            </div>
            <div class="review-answers">
                <span class="review-answer-line">Your Answer: <strong style="color: ${item.isCorrect ? 'var(--color-correct)' : 'var(--color-incorrect)'}">${escapeHtml(userAnsText)}</strong></span>
                <span class="review-answer-line">Correct Answer: <strong style="color: var(--color-correct)">${escapeHtml(correctAnsText)}</strong></span>
                <span class="review-answer-line" style="font-size: 0.8rem;">Response Time: <strong>${item.timeTaken.toFixed(1)}s</strong></span>
            </div>
            <div class="review-explanation">
                <strong>AI Explanation:</strong> ${escapeHtml(item.explanation)}
            </div>
        `;
        
        elements.reviewListContainer.appendChild(itemEl);
    });
}

// --- Developer Settings Logic ---
function saveSettings() {
    const key = elements.inputApiKey.value.trim();
    const model = elements.inputModelName.value.trim() || "gemini-2.5-flash";

    localStorage.setItem("gemini_api_key", key);
    localStorage.setItem("gemini_model_name", model);

    elements.settingsStatusMsg.textContent = "Configurations Saved Successfully!";
    elements.settingsStatusMsg.className = "save-status-msg show success";

    // Fade out status message after 3 seconds
    setTimeout(() => {
        elements.settingsStatusMsg.classList.remove("show");
    }, 3000);
}

function toggleApiKeyVisibility() {
    const type = elements.inputApiKey.type === "password" ? "text" : "password";
    elements.inputApiKey.type = type;
    elements.btnToggleApiVisibility.textContent = type === "password" ? "👁️" : "🙈";
}

// --- Helper Functions ---
function escapeHtml(str) {
    if (!str) return "";
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
