import React from 'react';

// Google Material Symbols
export const MagicWandIcon: React.FC<{ className?: string }> = ({ className = '' }) => <span className={`material-symbols-outlined ${className}`}>auto_awesome</span>;
export const CodeBrowserIcon: React.FC<{ className?: string }> = ({ className = '' }) => <span className={`material-symbols-outlined ${className}`}>code</span>;
export const RocketIcon: React.FC<{ className?: string }> = ({ className = '' }) => <span className={`material-symbols-outlined ${className}`}>rocket_launch</span>;
export const ArrowRightIcon: React.FC<{ className?: string }> = ({ className = '' }) => <span className={`material-symbols-outlined ${className}`}>arrow_forward</span>;
export const CloseIcon: React.FC<{ className?: string }> = ({ className = '' }) => <span className={`material-symbols-outlined ${className}`}>close</span>;


// Brand icons - keep as SVGs for accuracy
export const GoogleIcon: React.FC = () => <svg viewBox="0 0 48 48" className="w-5 h-5"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="M6.306 14.691c-1.645 3.121-2.483 6.64-2.483 10.309c0 3.669.838 7.188 2.483 10.309l-5.657 5.657C.623 37.062 0 32.54 0 28s.623-9.062 2.649-12.967l5.657 5.658z"></path><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-5.657-5.657c-1.556 1.036-3.46 1.652-5.752 1.652c-4.796 0-8.91-2.756-10.638-6.638l-5.657 5.657C7.031 39.103 14.864 44 24 44z"></path><path fill="#1976D2" d="M43.611 20.083L43.595 20L42 20H24v8h11.303c-0.792 2.237-2.231 4.166-4.087 5.571l5.657 5.657C39.816 35.617 44 29.81 44 24c0-1.341-0.138-2.65-0.389-3.917z"></path></svg>;

export const GithubIcon: React.FC = () => <svg viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.19.01-.82.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21-.15.46-.55.38A8.013 8.013 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg>;
