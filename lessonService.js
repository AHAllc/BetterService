// Google Sheets integration for dynamic lesson loading
class LessonService {
 constructor(sheetId) {
  this.sheetId = sheetId;
  this.baseUrl = `https://spreadsheets.google.com/feeds/list/${sheetId}/1/public/values?alt=json`;
  this.cache = new CacheManager();
}
  
  // Get all completed lessons and current lesson
  async getInitialLessons(currentDay) {
    // Check cache first
    const cachedLessons = this.cache.getLessons(1, currentDay);
    if (cachedLessons && cachedLessons.length === currentDay) {
      return cachedLessons;
    }
    
    // Fetch from Google Sheets
    return this.fetchLessons(1, currentDay);
  }
  
  // Get specific lesson by day number
  async getLessonByDay(day) {
    // Check cache first
    const cachedLesson = this.cache.getLesson(day);
    if (cachedLesson) {
      return cachedLesson;
    }
    
    // Fetch from Google Sheets
    return this.fetchLesson(day);
  }
  
  // Fetch single lesson from Google Sheets
  async fetchLesson(day) {
    try {
      // Construct URL with query parameters to filter by day
      const url = `${this.baseUrl}&sq=day=${day}`;
      const response = await fetch(url);
      const data = await response.json();
      
      const lessons = this.parseLessonsFromResponse(data);
      
      // Update cache
      if (lessons && lessons.length > 0) {
        this.cache.storeLessons(lessons);
        return lessons[0];
      }
      
      return this.getFallbackLesson(day);
    } catch (error) {
      console.error(`Error fetching lesson ${day}:`, error);
      return this.getFallbackLesson(day);
    }
  }
  
  // Fetch range of lessons from Google Sheets
  async fetchLessons(startDay, endDay) {
    try {
      // Construct URL with query parameters to filter by day range
      const url = `${this.baseUrl}&sq=day>=${startDay} and day<=${endDay}`;
      const response = await fetch(url);
      const data = await response.json();
      
      const lessons = this.parseLessonsFromResponse(data);
      
      // Update cache
      if (lessons && lessons.length > 0) {
        this.cache.storeLessons(lessons);
      }
      
      return lessons.length > 0 ? lessons : this.getFallbackLessons(startDay, endDay);
    } catch (error) {
      console.error(`Error fetching lessons ${startDay}-${endDay}:`, error);
      return this.getFallbackLessons(startDay, endDay);
    }
  }
  
  // Parse Google Sheets response into lesson objects
  parseLessonsFromResponse(data) {
    const entries = data.feed.entry || [];
    
    return entries.map(entry => ({
      day: parseInt(entry.gsx$day.$t),
      title: entry.gsx$title.$t,
      tip: {
        title: entry.gsx$tiptitle.$t,
        description: entry.gsx$tipdescription.$t
      },
      quiz: {
        question: entry.gsx$quizquestion.$t,
        options: [
          entry.gsx$quizoption1.$t,
          entry.gsx$quizoption2.$t,
          entry.gsx$quizoption3.$t,
          entry.gsx$quizoption4.$t
        ],
        correctAnswer: parseInt(entry.gsx$correctanswer.$t) - 1, // Convert to 0-based index
        explanation: entry.gsx$quizexplanation.$t
      },
      quote: {
        text: entry.gsx$quotetext.$t,
        author: entry.gsx$quoteauthor.$t
      },
      // Preserve completion status from localStorage if available
      completed: this.cache.isLessonCompleted(parseInt(entry.gsx$day.$t)),
      completionTimestamp: this.cache.getLessonCompletionTimestamp(parseInt(entry.gsx$day.$t))
    }));
  }
  
  // Get fallback lesson from data.js if API fails
  getFallbackLesson(day) {
    return lessonData.find(lesson => lesson.day === day) || null;
  }
  
  // Get fallback lessons from data.js if API fails
  getFallbackLessons(startDay, endDay) {
    // Filter default lessons from data.js
    return lessonData.filter(lesson => 
      lesson.day >= startDay && lesson.day <= endDay
    );
  }
  
  // Check for updates to lessons
  async checkForUpdates(currentLessons) {
    try {
      // Get the days of current lessons
      const days = currentLessons.map(lesson => lesson.day);
      
      // Fetch these lessons again to check for updates
      const updatedLessons = await this.fetchLessons(Math.min(...days), Math.max(...days));
      
      // Compare and update cache if needed
      let hasUpdates = false;
      updatedLessons.forEach(updatedLesson => {
        const currentLesson = currentLessons.find(l => l.day === updatedLesson.day);
        if (this.isLessonContentDifferent(currentLesson, updatedLesson)) {
          // Preserve completion status
          updatedLesson.completed = currentLesson.completed;
          updatedLesson.completionTimestamp = currentLesson.completionTimestamp;
          
          // Update cache
          this.cache.storeLesson(updatedLesson);
          hasUpdates = true;
        }
      });
      
      return hasUpdates;
    } catch (error) {
      console.error('Error checking for updates:', error);
      return false;
    }
  }
  
  // Compare lesson content to check for differences
  isLessonContentDifferent(lesson1, lesson2) {
    if (!lesson1 || !lesson2) return true;
    
    // Compare basic properties
    if (lesson1.title !== lesson2.title) return true;
    if (lesson1.tip.title !== lesson2.tip.title) return true;
    if (lesson1.tip.description !== lesson2.tip.description) return true;
    if (lesson1.quiz.question !== lesson2.quiz.question) return true;
    if (lesson1.quiz.explanation !== lesson2.quiz.explanation) return true;
    if (lesson1.quote.text !== lesson2.quote.text) return true;
    if (lesson1.quote.author !== lesson2.quote.author) return true;
    
    // Compare quiz options
    for (let i = 0; i < 4; i++) {
      if (lesson1.quiz.options[i] !== lesson2.quiz.options[i]) return true;
    }
    
    // Compare correct answer
    if (lesson1.quiz.correctAnswer !== lesson2.quiz.correctAnswer) return true;
    
    return false;
  }
}
