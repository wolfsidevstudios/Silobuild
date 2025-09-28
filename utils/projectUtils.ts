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
