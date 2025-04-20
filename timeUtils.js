// Helper functions for time calculations
function calculateTimeRemaining(completionTimestamp) {
    if (!completionTimestamp) return null;
    
    const now = Date.now();
    const unlockTime = completionTimestamp + 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const timeRemaining = unlockTime - now;
    
    // If time remaining is negative or zero, the lesson is unlocked
    if (timeRemaining <= 0) {
        return { unlocked: true, hours: 0, minutes: 0, seconds: 0 };
    }
    
    // Calculate hours, minutes, and seconds remaining
    const hours = Math.floor(timeRemaining / (60 * 60 * 1000));
    const minutes = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000);
    
    return {
        unlocked: false,
        hours,
        minutes,
        seconds,
        totalMilliseconds: timeRemaining
    };
}

function formatTimeRemaining(timeObj) {
    if (!timeObj || timeObj.unlocked) {
        return "Unlocked";
    }
    
    let timeString = "";
    
    if (timeObj.hours > 0) {
        timeString += `${timeObj.hours} hour${timeObj.hours !== 1 ? 's' : ''}`;
    }
    
    if (timeObj.minutes > 0 || timeObj.hours > 0) {
        if (timeObj.hours > 0) timeString += " and ";
        timeString += `${timeObj.minutes} minute${timeObj.minutes !== 1 ? 's' : ''}`;
    }
    
    if (timeObj.hours === 0 && timeObj.minutes === 0) {
        timeString = `${timeObj.seconds} second${timeObj.seconds !== 1 ? 's' : ''}`;
    }
    
    return timeString;
}
