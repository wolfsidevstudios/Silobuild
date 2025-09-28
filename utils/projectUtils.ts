import { Project } from '../types';
import JSZip from 'jszip';

export const downloadProjectAsZip = async (project: Project) => {
    const zip = new JSZip();
    
    project.files.forEach(file => {
      zip.file(file.path, file.content);
    });

    if (project.previewFile) {
        // To avoid conflicts, name it uniquely if a file with the same path exists
        const finalPath = project.files.some(f => f.path === project.previewFile!.path) 
            ? `preview-${project.previewFile.path}` 
            : project.previewFile.path;
        zip.file(finalPath, project.previewFile.content);
    }

    if (project.appIcon) {
        const base64Data = project.appIcon.split(';base64,').pop();
        if (base64Data) {
            // These paths must match what the AI is told to use in manifest.json
            zip.file('icon-192x192.png', base64Data, { base64: true });
            zip.file('icon-512x512.png', base64Data, { base64: true });
        }
    }

    try {
      const content = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      const sanitizedName = project.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      link.download = `${sanitizedName}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
        console.error("Failed to generate zip file", error);
        alert("Sorry, there was an error downloading the project.");
    }
};

export const timeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  if (seconds < 10) return "just now";
  return Math.floor(seconds) + " seconds ago";
};