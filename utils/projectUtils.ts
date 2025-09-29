// FIX: Replaced placeholder content with actual implementation for project utility functions.
import JSZip from 'jszip';
import saveAs from 'file-saver';
import { Project } from '../types';

/**
 * Creates a zip file from project files and initiates a download.
 * @param project - The project object containing files to be zipped.
 */
export const downloadProjectAsZip = async (project: Project): Promise<void> => {
  const zip = new JSZip();
  
  // Use a Set to track paths and avoid duplicates if previewFile is also in files array
  const addedPaths = new Set<string>();

  // Add multi-file code
  project.files.forEach(file => {
    if (!addedPaths.has(file.path)) {
      zip.file(file.path, file.content);
      addedPaths.add(file.path);
    }
  });
  
  // Add preview file if it exists and hasn't been added
  if (project.previewFile && !addedPaths.has(project.previewFile.path)) {
      zip.file(project.previewFile.path, project.previewFile.content);
      addedPaths.add(project.previewFile.path);
  }

  const sanitizedProjectName = project.name.toLowerCase().replace(/[^a-z0-9-]/g, '-');

  try {
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `${sanitizedProjectName}.zip`);
  } catch (error) {
    console.error("Failed to create or download zip file:", error);
    alert("An error occurred while creating the zip file. Please check the console for details.");
  }
};

/**
 * Converts an ISO timestamp string to a human-readable "time ago" format.
 * @param timestamp - The ISO date string.
 * @returns A string like "5 minutes ago".
 */
export const timeAgo = (timestamp?: string): string => {
  if (!timestamp) return 'never';

  const now = new Date();
  const past = new Date(timestamp);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) {
    const years = Math.floor(interval);
    return years + (years === 1 ? " year ago" : " years ago");
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    const months = Math.floor(interval);
    return months + (months === 1 ? " month ago" : " months ago");
  }
  interval = seconds / 86400;
  if (interval > 1) {
    const days = Math.floor(interval);
    return days + (days === 1 ? " day ago" : " days ago");
  }
  interval = seconds / 3600;
  if (interval > 1) {
    const hours = Math.floor(interval);
    return hours + (hours === 1 ? " hour ago" : " hours ago");
  }
  interval = seconds / 60;
  if (interval > 1) {
    const minutes = Math.floor(interval);
    return minutes + (minutes === 1 ? " minute ago" : " minutes ago");
  }
  if (seconds < 10) return "just now";
  
  return Math.floor(seconds) + " seconds ago";
};

/**
 * Shows a local browser notification via the service worker.
 * @param title - The title of the notification.
 * @param options - Standard Notification API options.
 */
export const showLocalNotification = (title: string, options: NotificationOptions) => {
    if (!('Notification' in window)) {
        console.warn('This browser does not support desktop notification');
        return;
    }

    if (Notification.permission === 'granted') {
        navigator.serviceWorker.getRegistration().then(reg => {
            if (reg) {
                reg.showNotification(title, options);
            }
        });
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission(permission => {
            if (permission === 'granted') {
                showLocalNotification(title, options);
            }
        });
    }
}