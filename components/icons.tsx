import React from 'react';

export const IconWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "w-5 h-5" }) => (
  <div className={className}>{children}</div>
);

export const ChatIcon = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

export const CodeIcon = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

export const EyeIcon = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

export const HomeIcon = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

export const SaveIcon = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

export const SendIcon = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);

export const CheckIcon = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export const FileIcon = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export const DownloadIcon = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

export const TrashIcon = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

export const DatabaseIcon = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7a8 8 0 0116 0" />
  </svg>
);

export const SettingsIcon = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const GeminiLogo = ({ className = 'h-6' }) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" color="#8e83f3">
        <title>Gemini</title>
        <path d="M12.003 24C5.37 24 0 18.623 0 11.996 0 5.375 5.37 0 12.003 0c6.63 0 11.998 5.375 11.998 11.996 0 6.627-5.368 12.004-11.998 12.004zM12.003 1.13c-6.002 0-10.87 4.868-10.87 10.866 0 6.005 4.868 10.87 10.87 10.87 6.002 0 10.87-4.865 10.87-10.87 0-5.998-4.868-10.866-10.87-10.866zm-5.02 14.532h10.04V14.15H6.983v1.512zm2.008-3.023h8.032V11.13H8.99v1.51zm0-3.023h8.032V8.106H8.99v1.512z"/>
    </svg>
);

export const SupabaseLogo = ({ className = 'h-6' }) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" color="#3ecf8e">
        <title>Supabase</title>
        <path d="M12.24 1.252a.24.24 0 0 0-.48 0L0 19.332v3.416h24v-3.416L12.24 1.252zM3.483 19.332l8.52-15.08 8.52 15.08H3.483z"/>
    </svg>
);

export const StripeLogo = ({ className = 'h-6' }) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" color="#635bff">
        <title>Stripe</title>
        <path d="M21.12.023c-1.28 0-2.56.32-3.84.96v6.4c1.28-.64 2.56-.96 3.84-.96 1.28 0 2.56.32 3.84.96V.983c-1.28-.64-2.56-.96-3.84-.96zm-8.96 15.36c0-1.28-.32-2.56-.96-3.84H.003V24h12.158c0-2.88-.96-5.44-2.24-7.68-1.28 0-2.56-.32-3.84-.64 1.28 0 2.56.32 3.84.64.96-1.28 1.28-2.56 1.28-3.84zm0-7.68c0-1.28-.32-2.56-.96-3.84H.003v6.4h11.2V7.703a5.2 5.2 0 0 0 .96-3.84z"/>
    </svg>
);

export const LogoutIcon = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

export const PlusIcon = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
  </svg>
);

export const BoltIcon = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

export const EditIcon = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
  </svg>
);

export const SparklesIcon = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L9.09 8.26 2 9.27l5.45 4.73L5.82 21 12 17.27 18.18 21l-1.63-7 5.45-4.73-7.09-1.01L12 2z" />
    </svg>
);

export const LayoutIcon = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12" />
    </svg>
);

export const MobileIcon = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
);

export const LockIcon = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

export const GoogleIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <title>Google</title>
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 2.04-4.82 2.04-5.82 0-9.6-4.82-9.6-9.6s3.78-9.6 9.6-9.6c2.53 0 4.46.93 5.96 2.32l2.6-2.6C19.03 1.73 16.05 0 12.48 0 5.82 0 .06 5.82.06 12.5s5.76 12.5 12.42 12.5c2.8 0 5.22-.93 7.02-2.72 1.93-1.93 2.53-4.49 2.53-7.56 0-.82-.07-1.48-.18-2.2z" fill="#4285F4"/>
  </svg>
);

export const ReactIcon = ({ className = "w-8 h-8" }) => (
    <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
    </svg>
);

export const HtmlIcon = ({ className = "w-8 h-8" }) => (
    <svg className={className} fill="#E34F26" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.375 0h21.25L20.438 21.625l-8.438 2.375-8.438-2.375L1.375 0zM12 19.344l6.219-1.688.844-9.531H12v3.219h-3.25l-.219-2.281h3.469V5.438H5.688l.5 5.625h8.906l-.5 5.531-2.594.719-2.594-.719-.188-2.031h-3.25l.375 4.031L12 19.344z"/>
    </svg>
);

export const DesktopIcon = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

export const FinderIcon = ({ className = 'w-10 h-10' }) => (
    <svg className={className} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <path fill="#00A2E3" d="M128 64c0 35.346-28.654 64-64 64S0 99.346 0 64 28.654 0 64 0s64 28.654 64 64"/>
        <path fill="#fff" d="M78.06 43.088c-6.19-6.28-14.7-9.828-23.59-9.828-9.15 0-17.85 3.73-24.01 10.2-11.45 12.01-13.78 30.63-5.83 45.39 3.99 7.42 10.45 13.06 18.27 16.03 2.1.8 4.3.43 5.92-1a4.24 4.24 0 001.21-3.28V46.338a4.25 4.25 0 00-4.17-4.25c-.2 0-.4 0-.6.01a4.25 4.25 0 00-4.04 4.84v35.43c-6.16-2.5-11.08-7.3-13.8-13.23-6-11.83-4.14-26.68 5.17-35.91 5.3-5.26 12.44-8.19 19.84-8.19 7.15 0 14.05 2.76 19.3 7.95a4.25 4.25 0 106.01-6.04z"/>
        <path fill="#fff" d="M91.81 74.19a16.34 16.34 0 00-16.3-16.33H42.54a4.25 4.25 0 100 8.5h32.97a7.84 7.84 0 110 15.68H64a4.25 4.25 0 100 8.5h11.51a16.34 16.34 0 0016.3-16.35z"/>
        <path d="M64 42.06a4.5 4.5 0 100-9 4.5 4.5 0 000 9" fill="#fff"/>
        <path d="M88 42.06a4.5 4.5 0 100-9 4.5 4.5 0 000 9" fill="#fff"/>
    </svg>
);

export const LaunchpadIcon = ({ className = 'w-10 h-10' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 3H4C3.44772 3 3 3.44772 3 4V10C3 10.5523 3.44772 11 4 11H10C10.5523 11 11 10.5523 11 10V4C11 3.44772 10.5523 3 10 3Z" fill="#F43F5E"/>
        <path d="M20 3H14C13.4477 3 13 3.44772 13 4V10C13 10.5523 13.4477 11 14 11H20C20.5523 11 21 10.5523 21 10V4C21 3.44772 20.5523 3 20 3Z" fill="#3B82F6"/>
        <path d="M10 13H4C3.44772 13 3 13.4477 3 14V20C3 20.5523 3.44772 21 4 21H10C10.5523 21 11 20.5523 11 20V14C11 13.4477 10.5523 13 10 13Z" fill="#FBBF24"/>
        <path d="M20 13H14C13.4477 13 13 13.4477 13 14V20C13 20.5523 13.4477 21 14 21H20C20.5523 21 21 20.5523 21 20V14C21 13.4477 20.5523 13 20 13Z" fill="#10B981"/>
    </svg>
);

export const NotesIcon = ({ className = 'w-10 h-10' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 2H18.5L20 3.5V22H4V2Z" fill="#FBBF24"/>
        <path d="M4 2H16V7H4V2Z" fill="#D97706"/>
        <path d="M7 11H17" stroke="#A16207" strokeWidth="2" strokeLinecap="round"/>
        <path d="M7 15H17" stroke="#A16207" strokeWidth="2" strokeLinecap="round"/>
        <path d="M7 19H13" stroke="#A16207" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

export const MailIcon = ({ className = 'w-10 h-10' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 8.5L12 15.5L22 8.5" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 18V6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18Z" stroke="#3B82F6" strokeWidth="2"/>
    </svg>
);