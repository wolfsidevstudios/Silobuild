import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Settings } from '../types';
import { generateIdeaStream } from '../services/geminiService';
import { InspirationIcon, SparklesIcon, TrashIcon, EditIcon } from '../components/icons';
import { Spinner } from '../components/Spinner';

interface Note {
  id: string;
  content: string;
  createdAt: string;
}

const initialSettings: Settings = {
  geminiApiKey: '',
  vercelApiKey: '',
  supabaseUrl: '',
  supabaseAnonKey: '',
  stripePublicKey: '',
  stripeSecretKey: '',
  githubPat: '',
  netlifyPat: '',
};

export const InspirationPage: React.FC = () => {
    const [notes, setNotes] = useLocalStorage<Note[]>('silo-build-inspiration-notes', []);
    const [settings] = useLocalStorage<Settings>('ai-app-builder-settings', initialSettings);
    
    const [prompt, setPrompt] = useState('');
    const [idea, setIdea] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [editingNote, setEditingNote] = useState<Note | null>(null);

    const generateIdea = async () => {
        if (!prompt.trim()) return;
        if (!settings.geminiApiKey) {
            setError("Please configure your Gemini API Key in the dashboard settings to use the idea generator.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setIdea('');
        try {
            await generateIdeaStream(prompt, settings, (chunk) => {
                setIdea(prev => prev + chunk);
            });
        } catch (e) {
            setError(e instanceof Error ? e.message : 'An error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const addNote = (content: string) => {
        if (!content.trim()) return;
        const newNote: Note = {
            id: crypto.randomUUID(),
            content,
            createdAt: new Date().toISOString()
        };
        setNotes(prev => [newNote, ...prev]);
    };
    
    const updateNote = () => {
        if (editingNote && editingNote.content.trim()) {
            setNotes(prev => prev.map(n => n.id === editingNote.id ? editingNote : n));
            setEditingNote(null);
        }
    };

    const deleteNote = (id: string) => {
        setNotes(prev => prev.filter(n => n.id !== id));
    };
    
    const handleUsePrompt = (promptText: string) => {
        sessionStorage.setItem('initialPrompt', promptText);
        window.location.hash = '#/builder';
    };


    return (
        <div 
            className="h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('https://i.ibb.co/Df8NHGR8/IMG-3906.png')" }}
        >
            <div className="h-full w-full bg-black/50 backdrop-blur-sm p-8 overflow-y-auto">
                <div className="flex items-center gap-3 mb-6">
                    <InspirationIcon className="w-8 h-8 text-yellow-300" />
                    <h1 className="text-3xl font-bold text-white">Inspiration</h1>
                </div>
                <p className="text-gray-300 mb-8 max-w-3xl">
                    Brainstorm your next big idea with AI, and save your favorite prompts as notes for later.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* AI Idea Generator */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <SparklesIcon className="text-yellow-300"/>
                            AI Idea Generator
                        </h2>
                        <div className="space-y-4">
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                rows={4}
                                placeholder="e.g., 'An app for local gardeners to trade seeds' or 'A productivity tool for remote teams'"
                                className="w-full bg-white/5 border border-white/20 rounded-md p-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                            <button
                                onClick={generateIdea}
                                disabled={isLoading}
                                className="w-full bg-yellow-400 text-black px-4 py-2 font-semibold rounded-lg hover:bg-yellow-500 transition-colors disabled:bg-gray-500 flex items-center justify-center gap-2"
                            >
                                {isLoading ? <><Spinner className="w-5 h-5 text-black" /> Brainstorming...</> : 'Generate Ideas'}
                            </button>
                            {error && <p className="text-red-400 text-sm">{error}</p>}
                            {idea && (
                                <div className="bg-black/20 p-4 rounded-lg space-y-3 prose prose-invert prose-sm max-w-none text-gray-200">
                                    <p>{idea}</p>
                                    <button
                                        onClick={() => addNote(idea)}
                                        className="text-xs bg-white/10 px-2 py-1 rounded-md hover:bg-white/20 text-white font-semibold"
                                    >
                                        + Save to Notes
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* My Notes */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
                        <h2 className="text-xl font-bold text-white mb-4">My Notes & Prompts</h2>
                        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                           {editingNote && (
                                <div className="bg-black/30 p-3 rounded-lg">
                                    <textarea
                                        value={editingNote.content}
                                        onChange={(e) => setEditingNote({...editingNote, content: e.target.value})}
                                        rows={4}
                                        className="w-full bg-transparent text-white text-sm focus:outline-none"
                                    />
                                    <div className="flex justify-end gap-2 mt-2">
                                        <button onClick={() => setEditingNote(null)} className="text-xs px-3 py-1 bg-gray-600 rounded-md text-white">Cancel</button>
                                        <button onClick={updateNote} className="text-xs px-3 py-1 bg-yellow-500 text-black rounded-md">Save</button>
                                    </div>
                                </div>
                           )}

                           {notes.length === 0 && !editingNote && <p className="text-gray-400 text-sm italic">No notes yet. Use the generator to save ideas!</p>}

                            {notes.filter(note => note.id !== editingNote?.id).map(note => (
                                <div key={note.id} className="bg-black/20 p-3 rounded-lg group">
                                    <p className="text-sm text-gray-200 line-clamp-4">{note.content}</p>
                                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
                                         <button onClick={() => handleUsePrompt(note.content)} className="text-xs text-yellow-300 hover:underline">
                                            Use as Prompt
                                        </button>
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => setEditingNote(note)} className="text-gray-400 hover:text-white"><EditIcon className="w-4 h-4" /></button>
                                            <button onClick={() => deleteNote(note.id)} className="text-gray-400 hover:text-red-400"><TrashIcon className="w-4 h-4" /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
