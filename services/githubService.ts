import { GeneratedFile } from '../types';

const GITHUB_API_BASE = 'https://api.github.com';

const apiFetch = async (pat: string, endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${pat}`,
      'Accept': 'application/vnd.github.v3+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`GitHub API Error on ${endpoint}: ${errorData.message || response.statusText}`);
  }
  // Some responses might be empty (e.g., PATCH ref)
  if (response.status === 204 || response.headers.get('Content-Length') === '0') {
    return null;
  }
  return response.json();
};

const createRepo = async (pat: string, name: string): Promise<{ html_url: string; name: string; owner: { login: string } }> => {
  const sanitizedName = name.toLowerCase().replace(/[^a-z0-9-]/g, '-').substring(0, 100);
  return apiFetch(pat, '/user/repos', {
    method: 'POST',
    body: JSON.stringify({
      name: sanitizedName,
      description: 'Project generated with Silo Build AI',
      private: false,
      auto_init: true, // Creates with a README, giving us a main branch and first commit
    }),
  });
};

const pushFiles = async (
  pat: string,
  owner: string,
  repo: string,
  files: GeneratedFile[],
  commitMessage: string
): Promise<void> => {
  // 1. Get the main branch reference
  const mainRef = await apiFetch(pat, `/repos/${owner}/${repo}/git/ref/heads/main`);
  const parentCommitSha = mainRef.object.sha;

  // 2. Create a blob for each file
  const blobPromises = files.map(file =>
    apiFetch(pat, `/repos/${owner}/${repo}/git/blobs`, {
      method: 'POST',
      body: JSON.stringify({
        content: file.content,
        encoding: 'utf-8',
      }),
    })
  );
  const blobs = await Promise.all(blobPromises);

  const tree = blobs.map((blob, index) => ({
    path: files[index].path,
    mode: '100644' as const, // file
    type: 'blob' as const,
    sha: blob.sha,
  }));

  // 3. Create a new tree. Get the base tree from the parent commit.
  const parentCommit = await apiFetch(pat, `/repos/${owner}/${repo}/git/commits/${parentCommitSha}`);

  const newTree = await apiFetch(pat, `/repos/${owner}/${repo}/git/trees`, {
    method: 'POST',
    body: JSON.stringify({
      base_tree: parentCommit.tree.sha,
      tree,
    }),
  });

  // 4. Create a new commit
  const newCommit = await apiFetch(pat, `/repos/${owner}/${repo}/git/commits`, {
    method: 'POST',
    body: JSON.stringify({
      message: commitMessage,
      tree: newTree.sha,
      parents: [parentCommitSha],
    }),
  });

  // 5. Update the main branch reference
  await apiFetch(pat, `/repos/${owner}/${repo}/git/refs/heads/main`, {
    method: 'PATCH',
    body: JSON.stringify({
      sha: newCommit.sha,
    }),
  });
};

export const getGitHubRepos = async (token: string): Promise<any[]> => {
  // Fetch up to 100 repos, sorted by last push
  return apiFetch(token, '/user/repos?sort=pushed&per_page=100');
};

export const getGitHubUser = async (token: string): Promise<{ login: string; avatar_url: string; }> => {
  return apiFetch(token, '/user');
};

export const createAndPushToRepo = async (
    pat: string, 
    projectName: string, 
    files: GeneratedFile[]
): Promise<string> => {
    const newRepo = await createRepo(pat, projectName);
    const owner = newRepo.owner.login;
    const repoName = newRepo.name;

    await pushFiles(pat, owner, repoName, files, 'Initial commit from Silo Build');
    return newRepo.html_url;
};

export const pushToRepo = async (
    pat: string,
    repoUrl: string,
    files: GeneratedFile[],
    commitMessage: string
): Promise<void> => {
    const urlParts = new URL(repoUrl);
    const pathParts = urlParts.pathname.split('/').filter(Boolean);
    if (pathParts.length < 2) throw new Error('Invalid repository URL');
    const owner = pathParts[0];
    const repo = pathParts[1];

    await pushFiles(pat, owner, repo, files, commitMessage);
};