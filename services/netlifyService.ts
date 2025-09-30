import { GeneratedFile } from '../types';
import JSZip from 'jszip';

const NETLIFY_API_BASE = 'https://api.netlify.com/api/v1';

const apiFetch = async (pat: string, endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${NETLIFY_API_BASE}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${pat}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Netlify API Error on ${endpoint}: ${errorData.message || response.statusText}`);
  }
  if (response.status === 204 || response.headers.get('Content-Length') === '0') {
    return null;
  }
  return response.json();
};

const createSite = async (pat: string, name: string): Promise<{ site_id: string; url: string }> => {
  return apiFetch(pat, '/sites', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name,
    }),
  });
};

const deployZip = async (pat: string, siteId: string, zipBlob: Blob): Promise<any> => {
  const response = await fetch(`${NETLIFY_API_BASE}/sites/${siteId}/deploys`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${pat}`,
      'Content-Type': 'application/zip',
    },
    body: zipBlob,
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Netlify API Error on /sites/${siteId}/deploys: ${errorData.message || response.statusText}`);
  }
  return response.json();
};

const waitForDeployment = async (pat: string, siteId: string, deployId: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        const interval = setInterval(async () => {
            try {
                const deploy = await apiFetch(pat, `/sites/${siteId}/deploys/${deployId}`);
                if (deploy.state === 'ready') {
                    clearInterval(interval);
                    resolve(deploy);
                } else if (['error', 'canceled'].includes(deploy.state)) {
                    clearInterval(interval);
                    reject(new Error(`Netlify deployment failed: ${deploy.error_message || 'Deployment was canceled.'}`));
                }
            } catch (error) {
                clearInterval(interval);
                reject(error);
            }
        }, 5000); // Poll every 5 seconds
    });
};

export const deployToNetlify = async (
    pat: string, 
    projectName: string, 
    files: GeneratedFile[]
): Promise<{ url: string }> => {
    const sanitizedName = projectName.toLowerCase().replace(/[^a-z0-9-]/g, '-').substring(0, 50) + '-' + Date.now().toString().slice(-6);
    
    const zip = new JSZip();
    files.forEach(file => {
        zip.file(file.path, file.content);
    });

    const zipBlob = await zip.generateAsync({ type: 'blob' });

    const site = await createSite(pat, sanitizedName);
    const initialDeploy = await deployZip(pat, site.site_id, zipBlob);
    const finalDeploy = await waitForDeployment(pat, site.site_id, initialDeploy.id);
    
    return { url: finalDeploy.ssl_url || finalDeploy.url };
};
