/* Base Styles */
:root {
    --primary-color: #3a7bd5;
    --secondary-color: #00d2ff;
    --accent-color: #ff6b6b;
    --success-color: #4caf50;
    --celebration-color: #ffc107;
    --lock-color: #ff9800;
    --text-color: #333;
    --light-text: #666;
    --background-color: #f9f9f9;
    --card-color: #fff;
    --border-color: #e0e0e0;
    --error-color: #f44336;
    --shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    --border-radius: 12px;
    --overlay-bg: rgba(0, 0, 0, 0.7);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: var(--text-color);
    background-color: var(--background-color);
    line-height: 1.6;
}

.app-container {
    max-width: 600px;
    margin: 0 auto;
    background-color: var(--card-color);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
}

/* Header Styles */
header {
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
    color: white;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 100;
}

.logo {
    font-size: 1.2rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 8px;
}

.progress-indicator {
    display: flex;
    gap: 5px;
}

.progress-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    transition: all 0.2s ease;
}

.progress-dot.active {
    background-color: white;
    transform: scale(1.2);
}

.progress-dot.completed {
    background-color: var(--success-color);
}

/* Main Content Styles */
main {
    flex: 1;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
}

section {
    background-color: var(--card-color);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    overflow: hidden;
    margin-bottom: 20px;
}

.section-header {
    display: flex;
    align-items: center;
    padding: 15px;
    background-color: rgba(58, 123, 213, 0.05);
    border-bottom: 1px solid var(--border-color);
}

.section-header i {
    color: var(--primary-color);
    font-size: 1.2rem;
    margin-right: 10px;
}

.section-header h2 {
    font-size: 1.1rem;
    font-weight: 600;
}

/* Lesson Header Styles */
.lesson-header {
    padding: 15px;
    background-color: white;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    margin-bottom: 20px;
}

.lesson-header h1 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: var(--primary-color);
}

.lesson-progress {
    display: flex;
    align-items: center;
    gap: 10px;
}

.progress-bar {
    flex: 1;
    height: 6px;
    background-color: #e0e0e0;
    border-radius: 3px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    width: 0%;
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
    transition: width 0.5s ease;
}

.progress-text {
    font-size: 0.8rem;
    color: var(--light-text);
}

/* Lesson Complete Overlay Styles */
#lesson-complete-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--overlay-bg);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

#lesson-complete-overlay.visible {
    opacity: 1;
    visibility: visible;
}

.completion-card {
    background-color: var(--card-color);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    padding: 30px;
    text-align: center;
    max-width: 90%;
    width: 350px;
    transform: translateY(20px);
    transition: transform 0.4s ease;
}

#lesson-complete-overlay.visible .completion-card {
    transform: translateY(0);
}

.completion-icon {
    font-size: 60px;
    color: var(--success-color);
    margin-bottom: 20px;
    animation: pulse 2s infinite;
}

.completion-title {
    font-size: 1.8rem;
    color: var(--celebration-color);
    margin-bottom: 15px;
}

.completion-message {
    font-size: 1.2rem;
    margin-bottom: 10px;
}

.completion-submessage {
    color: var(--light-text);
    margin-bottom: 25px;
}

#close-completion {
    width: 100%;
    padding: 12px;
    font-size: 1.1rem;
}

/* Time Remaining Overlay Styles */
#time-remaining-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--overlay-bg);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

#time-remaining-overlay.visible {
    opacity: 1;
    visibility: visible;
}

.time-remaining-card {
    background-color: var(--card-color);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    padding: 30px;
    text-align: center;
    max-width: 90%;
    width: 350px;
    transform: translateY(20px);
    transition: transform 0.4s ease;
}

#time-remaining-overlay.visible .time-remaining-card {
    transform: translateY(0);
}

.time-icon {
    font-size: 60px;
    color: var(--lock-color);
    margin-bottom: 20px;
    animation: flip 2s infinite;
}

.time-title {
    font-size: 1.8rem;
    color: var(--primary-color);
    margin-bottom: 15px;
}

.time-message {
    font-size: 1.2rem;
    margin-bottom: 10px;
}

.countdown-timer {
    font-size: 1.8rem;
    font-weight: bold;
    color: var(--lock-color);
    margin: 15px 0;
    padding: 10px;
    background-color: rgba(255, 152, 0, 0.1);
    border-radius: var(--border-radius);
}

.time-submessage {
    color: var(--light-text);
    margin-bottom: 25px;
}

#close-time-remaining {
    width: 100%;
    padding: 12px;
    font-size: 1.1rem;
}

/* Lock indicator for Next button */
.lock-indicator {
    display: inline-block;
    margin-left: 5px;
    color: var(--lock-color);
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}

@keyframes flip {
    0% {
        transform: rotateY(0);
    }
    50% {
        transform: rotateY(180deg);
    }
    100% {
        transform: rotateY(0);
    }
}

/* Tip Section Styles */
.tip-content {
    padding: 15px;
}

.tip-content h3 {
    color: var(--primary-color);
    margin-bottom: 10px;
    font-size: 1.1rem;
}

.tip-content p {
    margin-bottom: 15px;
}

.tip-highlight {
    background-color: rgba(58, 123, 213, 0.05);
    border-left: 3px solid var(--primary-color);
    padding: 10px 15px;
    margin: 15px 0;
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
}

.tip-highlight ul, .tip-highlight ol {
    padding-left: 20px;
    margin: 10px 0;
}

.pro-tip {
    background-color: rgba(255, 107, 107, 0.05);
    border-left: 3px solid var(--accent-color);
    padding: 10px 15px;
    margin: 15px 0;
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
}

/* Quiz Section Styles */
.quiz-content {
    padding: 15px;
}

.question {
    font-weight: 500;
    margin-bottom: 15px;
}

.options {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
}

.option {
    display: flex;
    align-items: flex-start;
    padding: 10px;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: all 0.2s ease;
}

.option:hover {
    background-color: rgba(58, 123, 213, 0.05);
}

.option input[type="radio"] {
    margin-right: 10px;
    margin-top: 3px;
}

.option.correct {
    background-color: rgba(76, 175, 80, 0.1);
    border-color: var(--success-color);
}

.option.incorrect {
    background-color: rgba(244, 67, 54, 0.1);
    border-color: var(--error-color);
}

.btn {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 50px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
}

.btn:hover {
    background-color: #2a6ac0;
}

.btn:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

.feedback {
    margin-top: 15px;
    padding: 15px;
    border-radius: var(--border-radius);
    background-color: rgba(76, 175, 80, 0.1);
    border-left: 3px solid var(--success-color);
}

.feedback.error {
    background-color: rgba(244, 67, 54, 0.1);
    border-left: 3px solid var(--error-color);
}

.feedback-text {
    font-weight: 600;
    margin-bottom: 10px;
}

.explanation {
    font-size: 0.9rem;
}

.hidden {
    display: none !important;
}

/* Quote Section Styles */
.quote-content {
    padding: 20px;
}

blockquote {
    font-style: italic;
    position: relative;
    padding-left: 20px;
    border-left: 3px solid var(--primary-color);
}

cite {
    display: block;
    margin-top: 10px;
    font-weight: 500;
    font-style: normal;
}

/* Footer Styles */
footer {
    padding: 15px;
    border-top: 1px solid var(--border-color);
    background-color: white;
}

.nav-buttons {
    display: flex;
    justify-content: space-between;
    gap: 10px;
}

.btn-primary {
    flex: 2;
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
}

.btn-secondary {
    flex: 1;
    background-color: #e0e0e0;
    color: var(--text-color);
}

.btn-secondary:hover {
    background-color: #d0d0d0;
}

.btn-secondary:disabled {
    background-color: #f0f0f0;
    color: #aaaaaa;
    cursor: not-allowed;
}

/* Animation */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.fade-in {
    animation: fadeIn 0.5s ease forwards;
}

/* Responsive Adjustments */
@media (max-width: 480px) {
    .nav-buttons {
        flex-direction: column;
    }
    
    .btn {
        width: 100%;
    }
}

@media (max-width: 360px) {
    .section-header {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .section-header i {
        margin-bottom: 5px;
    }
    
    .completion-card, .time-remaining-card {
        padding: 20px;
    }
    
    .completion-icon, .time-icon {
        font-size: 50px;
    }
    
    .completion-title, .time-title {
        font-size: 1.5rem;
    }
}
