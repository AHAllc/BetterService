// Main application script with dynamic lesson loading
document.addEventListener('DOMContentLoaded', function() {
    // Google Sheet ID - Replace with your actual Google Sheet ID
    const SHEET_ID = 'your-google-sheet-id';
    
    // Initialize LessonService and CacheManager
    const lessonService = new LessonService(SHEET_ID);
    
    // Get current lesson index from localStorage
    let currentLessonIndex = parseInt(localStorage.getItem('currentLessonIndex')) || 0;
    
    // DOM Elements
    const lessonTitle = document.getElementById('lesson-title');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    const progressDots = document.querySelectorAll('.progress-dot');
    const tipTitle = document.getElementById('tip-title');
    const tipDescription = document.getElementById('tip-description');
    const quizQuestion = document.getElementById('quiz-question');
    const quizOptions = document.getElementById('quiz-options');
    const checkAnswerBtn = document.getElementById('check-answer');
    const feedbackElement = document.getElementById('answer-feedback');
    const feedbackText = document.querySelector('.feedback-text');
    const quizExplanation = document.getElementById('quiz-explanation');
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const nextBtnLock = document.getElementById('next-btn-lock');
    const completeBtn = document.getElementById('complete-btn');
    
    // Lesson Complete Overlay Elements
    const lessonCompleteOverlay = document.getElementById('lesson-complete-overlay');
    const completedDay = document.getElementById('completed-day');
    const closeCompletionBtn = document.getElementById('close-completion');
    
    // Time Remaining Overlay Elements
    const timeRemainingOverlay = document.getElementById('time-remaining-overlay');
    const timeRemainingElement = document.getElementById('time-remaining');
    const closeTimeRemainingBtn = document.getElementById('close-time-remaining');
    
    // Timer interval reference
    let countdownInterval = null;
    
    // Lessons array - will be populated dynamically
    let lessons = [];
    
    // Initialize the app
    async function init() {
        showLoadingState();
        
        try {
            // Get current day (1-based)
            const currentDay = currentLessonIndex + 1;
            
            // Load initial lessons (all completed + current)
            const initialLessons = await lessonService.getInitialLessons(currentDay);
            
            if (initialLessons && initialLessons.length > 0) {
                lessons = initialLessons;
                
                // Update UI
                updateProgressIndicators();
                loadLesson(currentLessonIndex);
                updateNavigationButtons();
                
                // Background load next few lessons
                lessonService.fetchLessons(currentDay + 1, currentDay + 5)
                    .then(nextLessons => {
                        // These will be automatically cached for future use
                        console.log(`Preloaded ${nextLessons.length} upcoming lessons`);
                    })
                    .catch(error => {
                        console.error('Error preloading upcoming lessons:', error);
                    });
            } else {
                // Fallback to default lessons if no lessons could be loaded
                lessons = lessonData;
                updateProgressIndicators();
                loadLesson(currentLessonIndex);
                updateNavigationButtons();
                
                console.warn('Using fallback lesson data');
            }
        } catch (error) {
            console.error('Error initializing app:', error);
            
            // Fallback to default lessons
            lessons = lessonData;
            updateProgressIndicators();
            loadLesson(currentLessonIndex);
            updateNavigationButtons();
        }
        
        hideLoadingState();
        
        // Check for updates periodically
        setInterval(() => {
            lessonService.checkForUpdates(lessons)
                .then(hasUpdates => {
                    if (hasUpdates) {
                        console.log('Lesson content updated from Google Sheets');
                        // Reload current lesson if it was updated
                        loadLesson(currentLessonIndex);
                    }
                })
                .catch(error => {
                    console.error('Error checking for updates:', error);
                });
        }, 5 * 60 * 1000); // Check every 5 minutes
    }
    
    // Show loading state
    function showLoadingState() {
        // Add loading indicators or spinner here
        document.body.classList.add('loading');
    }
    
    // Hide loading state
    function hideLoadingState() {
        // Remove loading indicators
        document.body.classList.remove('loading');
    }
    
    // Load lesson content
    function loadLesson(index) {
        if (index < 0 || index >= lessons.length) {
            console.error(`Invalid lesson index: ${index}`);
            return;
        }
        
        const lesson = lessons[index];
        
        // Update lesson title
        lessonTitle.textContent = `Day ${lesson.day}: ${lesson.title}`;
        
        // Update tip content
        tipTitle.textContent = lesson.tip.title;
        tipDescription.innerHTML = lesson.tip.description;
        
        // Update quiz content
        quizQuestion.textContent = lesson.quiz.question;
        
        // Clear previous options
        quizOptions.innerHTML = '';
        
        // Add new options
        lesson.quiz.options.forEach((option, i) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.dataset.index = i;
            
            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = 'quiz-answer';
            radioInput.id = `option-${i}`;
            
            const label = document.createElement('label');
            label.htmlFor = `option-${i}`;
            label.textContent = `${String.fromCharCode(65 + i)}) ${option}`;
            
            optionElement.appendChild(radioInput);
            optionElement.appendChild(label);
            quizOptions.appendChild(optionElement);
            
            // Add click event to the option
            optionElement.addEventListener('click', function() {
                radioInput.checked = true;
                // Clear previous feedback
                feedbackElement.classList.add('hidden');
                // Reset all options
                document.querySelectorAll('.option').forEach(opt => {
                    opt.classList.remove('correct', 'incorrect');
                });
            });
        });
        
        // Update quiz explanation
        quizExplanation.textContent = lesson.quiz.explanation;
        
        // Update quote
        quoteText.innerHTML = `${lesson.quote.text}<cite>— ${lesson.quote.author}</cite>`;
        
        // Reset feedback
        feedbackElement.classList.add('hidden');
        
        // Update active dot
        progressDots.forEach(dot => {
            dot.classList.remove('active');
            if (parseInt(dot.dataset.day) === lesson.day) {
                dot.classList.add('active');
            }
        });
        
        // Update complete button state
        completeBtn.textContent = lesson.completed ? 'Completed' : 'Mark Complete';
        completeBtn.disabled = lesson.completed;
        
        // Apply fade-in animation
        document.querySelectorAll('section').forEach(section => {
            if (section.id !== 'lesson-complete-overlay' && section.id !== 'time-remaining-overlay') {
                section.classList.remove('fade-in');
                void section.offsetWidth; // Trigger reflow
                section.classList.add('fade-in');
            }
        });
        
        // Save current lesson index
        localStorage.setItem('currentLessonIndex', index);
        currentLessonIndex = index;
    }
    
    // Update progress indicators
    function updateProgressIndicators() {
        // Count completed lessons
        const completedCount = lessons.filter(lesson => lesson.completed).length;
        
        // Update progress bar
        const progressPercentage = (completedCount / lessons.length) * 100;
        progressFill.style.width = `${progressPercentage}%`;
        
        // Update progress text
        progressText.textContent = `${completedCount} of ${lessons.length} days completed`;
        
        // Update progress dots
        progressDots.forEach(dot => {
            const dayIndex = parseInt(dot.dataset.day) - 1;
            if (dayIndex < lessons.length && lessons[dayIndex].completed) {
                dot.classList.add('completed');
            } else {
                dot.classList.remove('completed');
            }
        });
    }
    
    // Update navigation buttons
    function updateNavigationButtons() {
        prevBtn.disabled = currentLessonIndex === 0;
        
        // Check if current lesson is completed
        const isCurrentLessonCompleted = lessons[currentLessonIndex].completed;
        
        // Check if next lesson is available
        const isLastLesson = currentLessonIndex === lessons.length - 1;
        
        // Check if 24 hours have passed since completion
        let timeRemaining = null;
        if (isCurrentLessonCompleted && !isLastLesson) {
            timeRemaining = calculateTimeRemaining(lessons[currentLessonIndex].completionTimestamp);
        }
        
        // Next button is disabled if:
        // 1. It's the last lesson, OR
        // 2. Current lesson is not completed, OR
        // 3. 24 hours haven't passed since completion
        nextBtn.disabled = isLastLesson || 
                          !isCurrentLessonCompleted || 
                          (timeRemaining && !timeRemaining.unlocked);
        
        // Show lock icon if waiting for time to pass
        if (isCurrentLessonCompleted && !isLastLesson && timeRemaining && !timeRemaining.unlocked) {
            nextBtnLock.classList.remove('hidden');
        } else {
            nextBtnLock.classList.add('hidden');
        }
    }
    
    // Show lesson complete overlay
    function showLessonCompleteOverlay() {
        const currentLesson = lessons[currentLessonIndex];
        completedDay.textContent = `Day ${currentLesson.day}`;
        lessonCompleteOverlay.classList.remove('hidden');
        setTimeout(() => {
            lessonCompleteOverlay.classList.add('visible');
        }, 50); // Small delay for transition to work
    }
    
    // Hide lesson complete overlay
    function hideLessonCompleteOverlay() {
        lessonCompleteOverlay.classList.remove('visible');
        setTimeout(() => {
            lessonCompleteOverlay.classList.add('hidden');
        }, 300); // Match transition duration
    }
    
    // Show time remaining overlay
    function showTimeRemainingOverlay() {
        const currentLesson = lessons[currentLessonIndex];
        const timeRemaining = calculateTimeRemaining(currentLesson.completionTimestamp);
        
        if (timeRemaining && !timeRemaining.unlocked) {
            updateTimeRemainingDisplay(timeRemaining);
            
            // Start countdown timer
            if (countdownInterval) {
                clearInterval(countdownInterval);
            }
            
            countdownInterval = setInterval(() => {
                const updatedTimeRemaining = calculateTimeRemaining(currentLesson.completionTimestamp);
                
                if (updatedTimeRemaining.unlocked) {
                    // Time is up, unlock the next lesson
                    clearInterval(countdownInterval);
                    hideTimeRemainingOverlay();
                    updateNavigationButtons();
                } else {
                    updateTimeRemainingDisplay(updatedTimeRemaining);
                }
            }, 1000);
            
            timeRemainingOverlay.classList.remove('hidden');
            setTimeout(() => {
                timeRemainingOverlay.classList.add('visible');
            }, 50);
        }
    }
    
    // Hide time remaining overlay
    function hideTimeRemainingOverlay() {
        timeRemainingOverlay.classList.remove('visible');
        setTimeout(() => {
            timeRemainingOverlay.classList.add('hidden');
            
            // Clear countdown interval
            if (countdownInterval) {
                clearInterval(countdownInterval);
                countdownInterval = null;
            }
        }, 300);
    }
    
    // Update time remaining display
    function updateTimeRemainingDisplay(timeObj) {
        if (!timeObj || timeObj.unlocked) {
            timeRemainingElement.textContent = "Unlocked!";
            return;
        }
        
        // Format as HH:MM:SS
        const hours = String(timeObj.hours).padStart(2, '0');
        const minutes = String(timeObj.minutes).padStart(2, '0');
        const seconds = String(timeObj.seconds).padStart(2, '0');
        
        timeRemainingElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
    
    // Check answer
    checkAnswerBtn.addEventListener('click', function() {
        const selectedOption = document.querySelector('input[name="quiz-answer"]:checked');
        
        // If no option selected
        if (!selectedOption) {
            feedbackElement.classList.remove('hidden');
            feedbackElement.classList.add('error');
            feedbackText.textContent = 'Please select an answer first.';
            return;
        }
        
        const selectedIndex = parseInt(selectedOption.parentElement.dataset.index);
        const correctIndex = lessons[currentLessonIndex].quiz.correctAnswer;
        const isCorrect = selectedIndex === correctIndex;
        
        // Mark selected option
        if (isCorrect) {
            selectedOption.parentElement.classList.add('correct');
            feedbackElement.classList.remove('hidden', 'error');
            feedbackText.textContent = 'Correct! Well done!';
        } else {
            selectedOption.parentElement.classList.add('incorrect');
            feedbackElement.classList.remove('hidden');
            feedbackElement.classList.add('error');
            feedbackText.textContent = 'Not quite right. Try again!';
            
            // Highlight correct answer
            document.querySelectorAll('.option').forEach(option => {
                if (parseInt(option.dataset.index) === correctIndex) {
                    option.classList.add('correct');
                }
            });
        }
        
        // Show explanation
        feedbackElement.classList.remove('hidden');
    });
    
    // Navigation buttons
    prevBtn.addEventListener('click', function() {
        if (currentLessonIndex > 0) {
            loadLesson(currentLessonIndex - 1);
            updateNavigationButtons();
        }
    });
    
    nextBtn.addEventListener('click', function() {
        const currentLesson = lessons[currentLessonIndex];
        
        // If lesson is completed but 24 hours haven't passed
        if (currentLesson.completed && currentLesson.completionTimestamp) {
            const timeRemaining = calculateTimeRemaining(currentLesson.completionTimestamp);
            
            if (!timeRemaining.unlocked) {
                // Show time remaining overlay
                showTimeRemainingOverlay();
                return;
            }
        }
        
        // If all conditions are met, proceed to next lesson
        if (currentLessonIndex < lessons.length - 1 && currentLesson.completed) {
            // Check if we need to load the next lesson from Google Sheets
            const nextIndex = currentLessonIndex + 1;
            const nextDay = nextIndex + 1; // Convert to 1-based day number
            
            if (nextIndex >= lessons.length) {
                // Try to fetch the next lesson
                lessonService.getLessonByDay(nextDay)
                    .then(nextLesson => {
                        if (nextLesson) {
                            // Add to lessons array
                            lessons.push(nextLesson);
                            // Load the lesson
                            loadLesson(nextIndex);
                            updateNavigationButtons();
                        } else {
                            console.error(`Could not load lesson for day ${nextDay}`);
                        }
                    })
                    .catch(error => {
                        console.error(`Error loading lesson for day ${nextDay}:`, error);
                    });
            } else {
                // Lesson is already loaded
                loadLesson(nextIndex);
                updateNavigationButtons();
            }
        }
    });
    
    // Complete button
    completeBtn.addEventListener('click', function() {
        lessons[currentLessonIndex].completed = true;
        lessons[currentLessonIndex].completionTimestamp = Date.now(); // Store completion timestamp
        
        // Update cache in LessonService
        lessonService.cache.updateLessonCompletion(
            lessons[currentLessonIndex].day,
            true,
            lessons[currentLessonIndex].completionTimestamp
        );
        
        // Update UI
        completeBtn.textContent = 'Completed';
        completeBtn.disabled = true;
        updateProgressIndicators();
        updateNavigationButtons();
        
        // Show completion overlay
        showLessonCompleteOverlay();
    });
    
    // Close completion overlay button
    closeCompletionBtn.addEventListener('click', function() {
        hideLessonCompleteOverlay();
    });
    
    // Close time remaining overlay button
    closeTimeRemainingBtn.addEventListener('click', function() {
        hideTimeRemainingOverlay();
    });
    
    // Progress dot navigation
    progressDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const dayIndex = parseInt(this.dataset.day) - 1;
            
            // Check if we need to load this lesson
            if (dayIndex >= lessons.length) {
                const day = parseInt(this.dataset.day);
                
                // Try to fetch the lesson
                lessonService.getLessonByDay(day)
                    .then(lesson => {
                        if (lesson) {
                            // Add to lessons array (ensuring proper order)
                            while (lessons.length < dayIndex) {
                                // Fill any gaps with placeholder lessons
                                lessons.push(null);
                            }
                            lessons[dayIndex] = lesson;
                            
                            // Load the lesson
                            loadLesson(dayIndex);
                            updateNavigationButtons();
                        } else {
                            console.error(`Could not load lesson for day ${day}`);
                        }
                    })
                    .catch(error => {
                        console.error(`Error loading lesson for day ${day}:`, error);
                    });
            } else {
                // Lesson is already loaded
                loadLesson(dayIndex);
                updateNavigationButtons();
            }
        });
    });
    
    // Add CSS for loading state
    const style = document.createElement('style');
    style.textContent = `
        body.loading::after {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        }
        
        body.loading::before {
            content: 'Loading...';
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 1.5rem;
            color: var(--primary-color);
            z-index: 10000;
        }
    `;
    document.head.appendChild(style);
    
    // Initialize the app
    init();
});
