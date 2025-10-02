import { CodeFile } from '../types';

// Helper to encode content to Base64
const toBase64 = (str: string) => {
    try {
        // Use a robust method to handle UTF-8 characters
        return btoa(unescape(encodeURIComponent(str)));
    } catch (e) {
        // Fallback for non-string data or other issues
        return btoa(str);
    }
};

const GITHUB_API_BASE = 'https://api.github.com';

export interface GitHubRepoInfo {
    owner: string;
    repo: string;
}

interface SaveToGitHubParams {
    token: string;
    files: CodeFile[];
    repoInfo: GitHubRepoInfo;
    isPrivate: boolean;
    commitMessage?: string;
}

const githubApiRequest = async (url: string, token: string, options: RequestInit = {}) => {
    const response = await fetch(`${GITHUB_API_BASE}${url}`, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'X-GitHub-Api-Version': '2022-11-28',
        }
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`GitHub API Error (${response.status}): ${errorData.message || 'Unknown error'}`);
    }
    if (response.status === 204 || response.status === 201) {
        // For 'No Content' or 'Created' responses, check if there is a body
        const text = await response.text();
        return text ? JSON.parse(text) : null;
    }
    return response.json();
};

const createRepo = async (token: string, { owner, repo }: GitHubRepoInfo, isPrivate: boolean) => {
    return githubApiRequest('/user/repos', token, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: repo,
            private: isPrivate,
            description: 'Created with Silo Build AI',
            auto_init: true, // Creates an initial commit with a README
        }),
    });
};

const getRepo = async (token: string, { owner, repo }: GitHubRepoInfo) => {
    return githubApiRequest(`/repos/${owner}/${repo}`, token);
}

const getLatestCommitSha = async (token: string, { owner, repo }: GitHubRepoInfo, branch: string) => {
    const refData = await githubApiRequest(`/repos/${owner}/${repo}/git/ref/heads/${branch}`, token);
    return refData.object.sha;
};

const createBlobsAndGetTree = async (token: string, { owner, repo }: GitHubRepoInfo, files: CodeFile[]) => {
    const blobCreationPromises = files.map(async (file) => {
        const blobData = await githubApiRequest(`/repos/${owner}/${repo}/git/blobs`, token, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: toBase64(file.content),
                encoding: 'base64',
            }),
        });
        return {
            path: file.name,
            mode: '100644' as const,
            type: 'blob' as const,
            sha: blobData.sha,
        };
    });

    const treeItems = await Promise.all(blobCreationPromises);
    const treeData = await githubApiRequest(`/repos/${owner}/${repo}/git/trees`, token, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tree: treeItems }),
    });

    return treeData.sha;
};


const createCommit = async (token: string, { owner, repo }: GitHubRepoInfo, treeSha: string, message: string, parentSha: string) => {
    const commitData = await githubApiRequest(`/repos/${owner}/${repo}/git/commits`, token, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            message,
            tree: treeSha,
            parents: [parentSha]
        }),
    });
    return commitData.sha;
};

const updateBranch = async (token: string, { owner, repo }: GitHubRepoInfo, branch: string, commitSha: string) => {
    await githubApiRequest(`/repos/${owner}/${repo}/git/refs/heads/${branch}`, token, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sha: commitSha, force: false }),
    });
};

export const saveToGitHub = async ({ token, files, repoInfo, isPrivate, commitMessage = 'feat: Update project via Silo Build' }: SaveToGitHubParams): Promise<string> => {
    const { owner, repo } = repoInfo;

    let repoData;
    let isNewRepo = false;
    try {
        repoData = await getRepo(token, repoInfo);
    } catch (error: any) {
        if (error.message.includes('404')) {
            repoData = await createRepo(token, repoInfo, isPrivate);
            isNewRepo = true;
        } else {
            throw error;
        }
    }
    
    const defaultBranch = repoData.default_branch;
    const latestCommitSha = await getLatestCommitSha(token, repoInfo, defaultBranch);
    const treeSha = await createBlobsAndGetTree(token, repoInfo, files);
    
    const finalCommitMessage = isNewRepo ? 'feat: Initial commit from Silo Build' : commitMessage;
    const newCommitSha = await createCommit(token, repoInfo, treeSha, finalCommitMessage, latestCommitSha);

    await updateBranch(token, repoInfo, defaultBranch, newCommitSha);

    return repoData.html_url;
};
