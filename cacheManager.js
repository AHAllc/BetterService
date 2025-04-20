// Cache Manager for lesson data
class CacheManager {
  constructor() {
    this.memoryCache = {};
    this.initFromLocalStorage();
  }
  
  // Initialize cache from localStorage
  initFromLocalStorage() {
    try {
      // Get lesson completion status
      const storedLessons = JSON.parse(localStorage.getItem('serverSchoolLessons')) || [];
      
      // Extract completion status and timestamps
      this.completionStatus = {};
      storedLessons.forEach(lesson => {
        this.completionStatus[lesson.day] = {
          completed: lesson.completed || false,
          completionTimestamp: lesson.completionTimestamp || null
        };
      });
      
      // Get cached lesson content
      this.lessonContent = JSON.parse(localStorage.getItem('serverSchoolLessonContent')) || {};
    } catch (error) {
      console.error('Error initializing cache:', error);
      this.completionStatus = {};
      this.lessonContent = {};
    }
  }
  
  // Get lessons from cache
  getLessons(startDay, endDay) {
    const lessons = [];
    for (let day = startDay; day <= endDay; day++) {
      const lesson = this.getLesson(day);
      if (lesson) {
        lessons.push(lesson);
      } else {
        // If any lesson is missing, return null to trigger a fetch
        return null;
      }
    }
    return lessons;
  }
  
  // Get single lesson from cache
  getLesson(day) {
    // Check memory cache first
    if (this.memoryCache[day]) {
      return this.memoryCache[day];
    }
    
    // Check localStorage cache
    if (this.lessonContent[day]) {
      const lesson = this.lessonContent[day];
      
      // Apply completion status
      if (this.completionStatus[day]) {
        lesson.completed = this.completionStatus[day].completed;
        lesson.completionTimestamp = this.completionStatus[day].completionTimestamp;
      }
      
      // Add to memory cache
      this.memoryCache[day] = lesson;
      
      return lesson;
    }
    
    return null;
  }
  
  // Store multiple lessons in cache
  storeLessons(lessons) {
    if (!lessons || !Array.isArray(lessons)) return;
    
    lessons.forEach(lesson => {
      this.storeLesson(lesson);
    });
    
    // Save to localStorage (throttled to prevent excessive writes)
    this.throttledSave();
  }
  
  // Store single lesson in cache
  storeLesson(lesson) {
    if (!lesson || !lesson.day) return;
    
    const day = lesson.day;
    
    // Apply completion status from existing data
    if (this.completionStatus[day]) {
      lesson.completed = this.completionStatus[day].completed;
      lesson.completionTimestamp = this.completionStatus[day].completionTimestamp;
    }
    
    // Update memory cache
    this.memoryCache[day] = lesson;
    
    // Update localStorage cache
    this.lessonContent[day] = lesson;
  }
  
  // Check if lesson is completed
  isLessonCompleted(day) {
    return this.completionStatus[day]?.completed || false;
  }
  
  // Get lesson completion timestamp
  getLessonCompletionTimestamp(day) {
    return this.completionStatus[day]?.completionTimestamp || null;
  }
  
  // Update lesson completion status
  updateLessonCompletion(day, completed, timestamp) {
    // Update in-memory status
    this.completionStatus[day] = {
      completed,
      completionTimestamp: timestamp
    };
    
    // Update lesson in memory cache if it exists
    if (this.memoryCache[day]) {
      this.memoryCache[day].completed = completed;
      this.memoryCache[day].completionTimestamp = timestamp;
    }
    
    // Update lesson in localStorage cache if it exists
    if (this.lessonContent[day]) {
      this.lessonContent[day].completed = completed;
      this.lessonContent[day].completionTimestamp = timestamp;
    }
    
    // Save to localStorage
    this.saveCompletionStatus();
  }
  
  // Save completion status to localStorage
  saveCompletionStatus() {
    try {
      // Get existing lessons from localStorage
      const storedLessons = JSON.parse(localStorage.getItem('serverSchoolLessons')) || [];
      
      // Update completion status
      storedLessons.forEach(lesson => {
        if (this.completionStatus[lesson.day]) {
          lesson.completed = this.completionStatus[lesson.day].completed;
          lesson.completionTimestamp = this.completionStatus[lesson.day].completionTimestamp;
        }
      });
      
      // Save back to localStorage
      localStorage.setItem('serverSchoolLessons', JSON.stringify(storedLessons));
    } catch (error) {
      console.error('Error saving completion status:', error);
    }
  }
  
  // Throttled save to localStorage to prevent excessive writes
  throttledSave() {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
    
    this.saveTimeout = setTimeout(() => {
      localStorage.setItem('serverSchoolLessonContent', JSON.stringify(this.lessonContent));
    }, 2000); // 2 second delay
  }
  
  // Clear all cache data
  clearCache() {
    this.memoryCache = {};
    this.lessonContent = {};
    localStorage.removeItem('serverSchoolLessonContent');
  }
  
  // Get total number of lessons in cache
  getTotalLessonsCount() {
    return Object.keys(this.lessonContent).length;
  }
  
  // Get highest day number in cache
  getHighestDayNumber() {
    const days = Object.keys(this.lessonContent).map(day => parseInt(day));
    return days.length > 0 ? Math.max(...days) : 0;
  }
}
