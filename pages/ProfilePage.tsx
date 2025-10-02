import React, { useState, useEffect, useRef } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAuth } from '../context/AuthContext';
import { UserProfileData, Project, UserPost } from '../types';
import { UserIcon, EditIcon, FileIcon, PlusIcon, SparklesIcon } from '../components/icons';
import { timeAgo } from '../utils/projectUtils';

const EditProfileModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    profile: UserProfileData;
    onSave: (updatedProfile: UserProfileData) => void;
}> = ({ isOpen, onClose, profile, onSave }) => {
    const [formData, setFormData] = useState(profile);
    const bannerInputRef = useRef<HTMLInputElement>(null);
    const pictureInputRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        setFormData(profile);
    }, [profile, isOpen]);
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'bannerImageUrl' | 'profilePictureUrl') => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({...prev, [field]: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-xl p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
                <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Banner Image</label>
                        <div className="h-32 bg-gray-200 rounded-lg" style={{ backgroundImage: `url(${formData.bannerImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                        <input type="file" accept="image/*" ref={bannerInputRef} onChange={e => handleFileChange(e, 'bannerImageUrl')} className="hidden" />
                        <button onClick={() => bannerInputRef.current?.click()} className="text-xs mt-2 bg-gray-100 px-3 py-1 rounded-full">Change Banner</button>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
                         <img src={formData.profilePictureUrl} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
                         <input type="file" accept="image/*" ref={pictureInputRef} onChange={e => handleFileChange(e, 'profilePictureUrl')} className="hidden" />
                         <button onClick={() => pictureInputRef.current?.click()} className="text-xs mt-2 bg-gray-100 px-3 py-1 rounded-full">Change Picture</button>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                        <input type="text" value={formData.displayName} onChange={e => setFormData({...formData, displayName: e.target.value})} className="w-full bg-gray-50 border border-gray-300 rounded-full px-3 py-2 text-sm"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input type="text" value={formData.username || ''} onChange={e => setFormData({...formData, username: e.target.value})} placeholder="e.g., @username" className="w-full bg-gray-50 border border-gray-300 rounded-full px-3 py-2 text-sm"/>
                    </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                    <button onClick={onClose} className="px-4 py-2 text-sm rounded-full font-semibold hover:bg-gray-100 border border-gray-300">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 text-sm rounded-full font-semibold bg-blue-600 text-white hover:bg-blue-700">Save</button>
                </div>
            </div>
        </div>
    );
};


export const ProfilePage: React.FC = () => {
    const { user, isGuest } = useAuth();
    const [profiles, setProfiles] = useLocalStorage<UserProfileData[]>('silo-build-profiles', []);
    const [posts, setPosts] = useLocalStorage<UserPost[]>('silo-build-posts', []);
    const [projects] = useLocalStorage<Project[]>('ai-app-builder-projects', []);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    
    const [newPostContent, setNewPostContent] = useState('');
    const [attachedProjectId, setAttachedProjectId] = useState<string | null>(null);

    const currentUserProfile = profiles.find(p => p.userId === user?.sub);

    useEffect(() => {
        // Create a default profile if one doesn't exist for the logged-in user
        if (user && !currentUserProfile) {
            const defaultProfile: UserProfileData = {
                userId: user.sub,
                displayName: user.name,
                profilePictureUrl: user.picture,
            };
            setProfiles(prev => [...prev, defaultProfile]);
        }
    }, [user, currentUserProfile, setProfiles]);

    const handleProfileSave = (updatedProfile: UserProfileData) => {
        setProfiles(prev => prev.map(p => p.userId === user?.sub ? updatedProfile : p));
    };

    const userProjects = projects.filter(p => !p.teamId);
    const userPosts = posts
        .filter(p => p.authorId === user?.sub)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        
    const handleCreatePost = () => {
        if (!newPostContent.trim() || !user) return;
        
        const attachedProject = attachedProjectId ? projects.find(p => p.id === attachedProjectId) : null;
        
        const newPost: UserPost = {
            id: crypto.randomUUID(),
            authorId: user.sub,
            authorName: currentUserProfile?.displayName || user.name,
            authorImageUrl: currentUserProfile?.profilePictureUrl || user.picture,
            content: newPostContent,
            createdAt: new Date().toISOString(),
            projectId: attachedProject?.id,
            projectName: attachedProject?.name,
            projectIcon: attachedProject?.appIcon,
        };
        
        setPosts(prev => [newPost, ...prev]);
        setNewPostContent('');
        setAttachedProjectId(null);
    };

    if (isGuest) {
        return (
            <div className="p-8 text-center">
                <h1 className="text-2xl font-bold">Profiles are for logged-in users.</h1>
                <p className="text-gray-600 mt-2">Please sign in to create your profile and showcase your work.</p>
            </div>
        );
    }
    
    if (!user || !currentUserProfile) {
        return <div className="p-8">Loading profile...</div>
    }

    return (
        <div className="h-full overflow-y-auto">
            <div className="h-48 bg-gray-200" style={{ backgroundImage: `url(${currentUserProfile.bannerImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <div className="px-8">
                <div className="flex items-end -mt-16">
                    <img src={currentUserProfile.profilePictureUrl || user.picture} alt="Profile" className="w-32 h-32 rounded-full border-4 border-gray-50 bg-gray-200 object-cover" />
                    <div className="ml-4 mb-4">
                        <h1 className="text-3xl font-bold">{currentUserProfile.displayName}</h1>
                        <p className="text-gray-500">{currentUserProfile.username || user.email}</p>
                    </div>
                    <button onClick={() => setIsEditModalOpen(true)} className="ml-auto mb-4 flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 rounded-full transition-colors">
                        <EditIcon /> Edit Profile
                    </button>
                </div>

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left side: Posts */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h2 className="font-bold mb-2">Create a post</h2>
                            <textarea
                                value={newPostContent}
                                onChange={e => setNewPostContent(e.target.value)}
                                placeholder="Share an update or promote an app..."
                                className="w-full h-24 bg-gray-50 border border-gray-300 rounded-md p-2 text-sm"
                            />
                            <div className="flex justify-between items-center mt-2">
                                <select value={attachedProjectId || ''} onChange={e => setAttachedProjectId(e.target.value || null)} className="bg-gray-50 border border-gray-300 rounded-full px-3 py-1 text-xs">
                                    <option value="">Attach a project...</option>
                                    {userProjects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>
                                <button onClick={handleCreatePost} disabled={!newPostContent.trim()} className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-400">Post</button>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4">My Posts</h2>
                             {userPosts.length > 0 ? (
                                <div className="space-y-4">
                                {userPosts.map(post => (
                                    <div key={post.id} className="bg-white border border-gray-200 rounded-lg p-4">
                                        <p className="text-xs text-gray-500 mb-2">{timeAgo(post.createdAt)}</p>
                                        <p className="text-sm text-gray-700">{post.content}</p>
                                        {post.projectId && (
                                             <div className="mt-3 pt-3 border-t border-gray-200">
                                                <a href={`#/project/${post.projectId}`} className="flex items-center gap-3 bg-gray-50 p-2 rounded-md border border-gray-200 hover:bg-gray-100">
                                                    <div className="w-8 h-8 rounded-md bg-gray-200 flex-shrink-0 flex items-center justify-center border border-gray-300">
                                                        {post.projectIcon ? <img src={post.projectIcon} alt="" className="w-full h-full object-cover rounded-sm"/> : <FileIcon className="w-4 h-4 text-gray-400" />}
                                                    </div>
                                                    <p className="text-sm font-medium truncate">{post.projectName}</p>
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                </div>
                            ) : <p className="text-gray-500">You haven't made any posts yet.</p>}
                        </div>
                    </div>
                    {/* Right side: Projects */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">My Projects</h2>
                         {userProjects.length > 0 ? (
                            <div className="space-y-3">
                                {userProjects.map(p => (
                                    <a key={p.id} href={`#/project/${p.id}`} className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex-shrink-0 flex items-center justify-center border border-gray-200">
                                           {p.appIcon ? <img src={p.appIcon} alt="" className="w-full h-full object-cover rounded-md"/> : <FileIcon className="w-6 h-6 text-gray-400" />}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm truncate">{p.name}</p>
                                            <p className="text-xs text-gray-500">{p.stack}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        ) : <p className="text-gray-500">You haven't created any projects yet.</p>}
                    </div>
                </div>
            </div>
            <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} profile={currentUserProfile} onSave={handleProfileSave} />
        </div>
    );
};
