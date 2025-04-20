// Performance optimizations for large lesson sets
class PerformanceOptimizer {
  constructor(lessonService) {
    this.lessonService = lessonService;
    this.batchSize = 10; // Number of lessons to load at once
    this.preloadDistance = 5; // How many lessons ahead to preload
    this.updateCheckInterval = 5 * 60 * 1000; // Check for updates every 5 minutes
    this.lastUpdateCheck = Date.now();
    this.isPreloading = false;
  }
  
  // Initialize performance optimizations
  init() {
    // Set up periodic update checks
    setInterval(() => this.checkForUpdates(), this.updateCheckInterval);
    
    // Set up intersection observer for lazy loading images
    this.setupLazyLoading();
  }
  
  // Preload upcoming lessons in the background
  async preloadUpcomingLessons(currentDay) {
    if (this.isPreloading) return;
    
    this.isPreloading = true;
    
    try {
      // Calculate range to preload
      const startDay = currentDay + 1;
      const endDay = currentDay + this.preloadDistance;
      
      // Check if already in cache
      const cachedLessons = this.lessonService.cache.getLessons(startDay, endDay);
      if (cachedLessons && cachedLessons.length === (endDay - startDay + 1)) {
        console.log(`Lessons ${startDay}-${endDay} already cached`);
        this.isPreloading = false;
        return;
      }
      
      // Fetch in batches to avoid overloading
      for (let batchStart = startDay; batchStart <= endDay; batchStart += this.batchSize) {
        const batchEnd = Math.min(batchStart + this.batchSize - 1, endDay);
        
        console.log(`Preloading lessons ${batchStart}-${batchEnd}`);
        await this.lessonService.fetchLessons(batchStart, batchEnd);
        
        // Small delay between batches to avoid overwhelming the API
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      console.log(`Successfully preloaded lessons ${startDay}-${endDay}`);
    } catch (error) {
      console.error('Error preloading upcoming lessons:', error);
    } finally {
      this.isPreloading = false;
    }
  }
  
  // Check for updates to current and completed lessons
  async checkForUpdates() {
    // Don't check too frequently
    const now = Date.now();
    if (now - this.lastUpdateCheck < this.updateCheckInterval) return;
    
    this.lastUpdateCheck = now;
    
    try {
      // Get current lesson index from localStorage
      const currentLessonIndex = parseInt(localStorage.getItem('currentLessonIndex')) || 0;
      const currentDay = currentLessonIndex + 1;
      
      // Check for updates to lessons up to current day
      const hasUpdates = await this.lessonService.checkForUpdates(
        this.lessonService.cache.getLessons(1, currentDay) || []
      );
      
      if (hasUpdates) {
        console.log('Lesson content updated from Google Sheets');
        // Trigger UI refresh if needed
        document.dispatchEvent(new CustomEvent('lessons-updated'));
      }
    } catch (error) {
      console.error('Error checking for updates:', error);
    }
  }
  
  // Set up lazy loading for images in lesson content
  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const lazyImageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target;
            if (lazyImage.dataset.src) {
              lazyImage.src = lazyImage.dataset.src;
              lazyImage.removeAttribute('data-src');
              lazyImageObserver.unobserve(lazyImage);
            }
          }
        });
      });
      
      // Apply to any images with data-src attribute
      document.addEventListener('lessons-loaded', () => {
        document.querySelectorAll('img[data-src]').forEach(img => {
          lazyImageObserver.observe(img);
        });
      });
    } else {
      // Fallback for browsers without IntersectionObserver
      // Load all images immediately
      document.addEventListener('lessons-loaded', () => {
        document.querySelectorAll('img[data-src]').forEach(img => {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        });
      });
    }
  }
  
  // Process HTML content to optimize images and heavy content
  processContent(html) {
    if (!html) return html;
    
    // Create a DOM parser
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Convert images to lazy loading
    doc.querySelectorAll('img').forEach(img => {
      const src = img.getAttribute('src');
      if (src) {
        img.setAttribute('data-src', src);
        img.removeAttribute('src');
        img.classList.add('lazy-image');
      }
    });
    
    // Optimize large tables
    doc.querySelectorAll('table').forEach(table => {
      if (table.rows.length > 10) {
        table.classList.add('large-table');
        // Add pagination or virtualization if needed
      }
    });
    
    // Return the optimized HTML
    return doc.body.innerHTML;
  }
  
  // Optimize storage by compressing lesson content
  compressLessonContent(lesson) {
    if (!lesson) return lesson;
    
    // Create a copy to avoid modifying the original
    const compressedLesson = { ...lesson };
    
    // Process HTML content for optimization
    if (compressedLesson.tip && compressedLesson.tip.description) {
      compressedLesson.tip.description = this.processContent(compressedLesson.tip.description);
    }
    
    return compressedLesson;
  }
  
  // Clean up old or unused lessons from cache
  cleanupCache(currentDay, completedDays) {
    // Keep all completed lessons and a window of upcoming lessons
    const keepDays = [...completedDays, currentDay];
    for (let i = 1; i <= this.preloadDistance; i++) {
      keepDays.push(currentDay + i);
    }
    
    // Get all cached days
    const cachedDays = Object.keys(this.lessonService.cache.lessonContent)
      .map(day => parseInt(day));
    
    // Find days to remove
    const daysToRemove = cachedDays.filter(day => !keepDays.includes(day));
    
    // Remove from cache
    daysToRemove.forEach(day => {
      delete this.lessonService.cache.lessonContent[day];
      delete this.lessonService.cache.memoryCache[day];
    });
    
    if (daysToRemove.length > 0) {
      console.log(`Cleaned up ${daysToRemove.length} unused lessons from cache`);
      this.lessonService.cache.throttledSave();
    }
  }
}
