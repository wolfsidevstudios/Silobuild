import React from 'react';

export const IconWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "w-5 h-5" }) => (
  <div className={className}>{children}</div>
);

export const AgentIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" className={className}>
        <g>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M6.02228 4.34741c-0.64173 0.48343 -1.29436 1.04948 -1.93066 1.68578C1.24823 8.87659 -0.192409 12.046 0.873863 13.1123c1.066267 1.0662 4.235677 -0.3744 7.079067 -3.21779 0.6363 -0.6363 1.20235 -1.28893 1.68578 -1.93066" strokeWidth="1"></path>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M9.63871 7.96387c1.67689 2.22593 2.35969 4.32073 1.53199 5.14843 -1.0663 1.0663 -4.23569 -0.3744 -7.07908 -3.21778C1.24823 7.05113 -0.192409 3.88172 0.873863 2.81545c0.827657 -0.82766 2.922487 -0.14487 5.148417 1.53198" strokeWidth="1"></path>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M5.52228 7.96387c0 0.27614 0.22386 0.5 0.5 0.5s0.5 -0.22386 0.5 -0.5c0 -0.27615 -0.22386 -0.5 -0.5 -0.5s-0.5 0.22385 -0.5 0.5Z" strokeWidth="1"></path>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M8.03162 3.61001c-0.31413 -0.05465 -0.31413 -0.5056 0 -0.56025C9.16967 2.85177 10.0748 1.98495 10.3218 0.856524l0.019 -0.086497c0.0679 -0.310466 0.51 -0.312398 0.5807 -0.002538l0.023 0.100802c0.2561 1.123099 1.1615 1.982599 2.2964 2.180039 0.3158 0.05493 0.3158 0.50818 0 0.56311 -1.1349 0.19744 -2.0403 1.05695 -2.2964 2.18005l-0.023 0.1008c-0.0707 0.30986 -0.5128 0.30793 -0.5807 -0.00254l-0.019 -0.0865c-0.247 -1.12842 -1.15213 -1.99525 -2.29018 -2.19324Z" strokeWidth="1"></path>
        </g>
    </svg>
);

export const InspirationIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" className={className}>
        <g>
            <path fill="currentColor" fillRule="evenodd" d="M11.1761 0.649356c-0.1952 -0.87008 -1.428 -0.863859 -1.61549 0.007044l-0.02083 0.096752 0.48882 0.105228 -0.48882 -0.105227C9.30995 1.82077 8.46983 2.63397 7.42219 2.81931c-0.89609 0.15852 -0.89609 1.45286 0 1.61139 1.04764 0.18533 1.88776 0.99853 2.11759 2.06615l0.02083 0.09675c0.18748 0.8709 1.42029 0.87713 1.61549 0.00705l0.0253 -0.11276c0.2385 -1.06349 1.0796 -1.87059 2.1253 -2.0556 0.8979 -0.15883 0.8979 -1.45575 0 -1.61458 -1.0457 -0.18501 -1.8868 -0.99211 -2.1253 -2.0556l-0.0253 -0.112754Zm-3.92841 -0.1266C6.52643 0.164928 5.72837 -0.0146634 4.9208 0.000937371 4.0253 0.0182368 3.15075 0.274919 2.38794 0.744337 1.62514 1.21376 1.00189 1.8788 0.582892 2.67042c-0.418996 0.79162 -0.6184617 1.68097 -0.57768952 2.57571C0.0459747 6.14087 0.325498 7.00839 0.814755 7.75862c0.417025 0.63948 0.973465 1.17387 1.625535 1.56425v1.09403c0 0.2952 0.11727 0.5783 0.32602 0.7871 0.20874 0.2087 0.49186 0.326 0.78706 0.326h2.92848c0.2952 0 0.57832 -0.1173 0.78706 -0.326 0.20875 -0.2088 0.32602 -0.4919 0.32602 -0.7871V9.32393c0.43574 -0.25954 0.82869 -0.58346 1.16584 -0.95998 0.23026 -0.25716 0.20846 -0.65229 -0.04869 -0.88255 -0.25715 -0.23026 -0.65228 -0.20846 -0.88254 0.0487 -0.31867 0.35588 -0.70379 0.64907 -1.13583 0.86194 -0.21355 0.10521 -0.34878 0.32259 -0.34878 0.56064V10.28H3.69029V8.95268c0 -0.23742 -0.13452 -0.45434 -0.3472 -0.55987 -0.60246 -0.29892 -1.11393 -0.75366 -1.4813 -1.31699 -0.36738 -0.56334 -0.57727 -1.21475 -0.60788 -1.88659 -0.03062 -0.67185 0.11916 -1.33964 0.43377 -1.93406 0.31462 -0.59441 0.78261 -1.09378 1.35539 -1.44626 0.57277 -0.35248 1.22946 -0.54522 1.90187 -0.55821 0.60639 -0.01171 1.20564 0.12314 1.74722 0.39183 0.30922 0.1534 0.68425 0.02709 0.83765 -0.28212 0.15341 -0.30922 0.0271 -0.684249 -0.28212 -0.837654ZM3.125 12.75c-0.34518 0 -0.625 0.2798 -0.625 0.625s0.27982 0.625 0.625 0.625h3.75c0.34518 0 0.625 -0.2798 0.625 -0.625s-0.27982 -0.625 -0.625 -0.625h-3.75Z" clipRule="evenodd" strokeWidth="1"></path>
        </g>
    </svg>
);


export const ChatIcon = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);
export const CodeIcon = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);
export const EyeIcon = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);
export const SendIcon = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);
export const BoltIcon = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
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
export const FileIcon = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
);
export const PlusIcon = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
);
export const TrashIcon = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

export const CheckIcon = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);
export const DatabaseIcon = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7l8-4 8 4m-8 4v10" />
    </svg>
);
export const SettingsIcon = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
export const LogoutIcon = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);

export const EditIcon = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
    </svg>
);

export const SparklesIcon = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m1-12l1.09 2.18L12 6l-1.09 2.18L10 10l-2.18 1.09L6 12l2.18 1.09L10 14l1.09-2.18L12 10zM17 3l1.09 2.18L20 6l-1.09 2.18L18 10l-2.18 1.09L14 12l2.18 1.09L18 14l1.09-2.18L20 10zM17 17l1.09 2.18L20 20l-1.09 2.18L18 24l-2.18-1.09L14 22l2.18-1.09L18 20z" />
    </svg>
);

export const KeyIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5 text-gray-400' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
    </svg>
);

export const GeminiLogo: React.FC<{ className?: string }> = ({ className = 'h-6' }) => (
     <svg className={className} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient x1="38.74%" y1="100%" x2="68.21%" y2="100%" id="a"><stop stop-color="#4285F4" offset="0%"></stop><stop stop-color="#2962FF" offset="100%"></stop></linearGradient><linearGradient x1="31.79%" y1="100%" x2="61.26%" y2="100%" id="b"><stop stop-color="#4285F4" offset="0%"></stop><stop stop-color="#2962FF" offset="100%"></stop></linearGradient></defs><path d="M128 256c70.69 0 128-57.31 128-128S198.69 0 128 0 0 57.31 0 128s57.31 128 128 128z" fill-rule="evenodd" fill="#6F32FF"></path><path d="M128 160a32 32 0 100-64 32 32 0 000 64z" fill="#FFF"></path><g fill-rule="nonzero" transform="matrix(.48 0 0 .48 66.56 66.56)"><path d="M128 256c70.69 0 128-57.31 128-128S198.69 0 128 0 0 57.31 0 128s57.31 128 128 128z" fill="#6F32FF"></path><path d="M128 160a32 32 0 100-64 32 32 0 000 64z" fill="#FFF"></path><path d="M256 128c0 35.34-14.36 67.24-37.5 90.5L90.5 37.5C113.76 14.36 145.66 0 176 0c44.18 0 80 35.82 80 80v48z" fill="url(#a)"></path><path d="M0 128c0-35.34 14.36-67.24 37.5-90.5L165.5 218.5c-23.26 23.14-55.16 37.5-90.5 37.5-44.18 0-80-35.82-80-80V80z" fill="url(#b)"></path></g></svg>
);

export const VercelIcon: React.FC<{ className?: string }> = ({ className = 'h-6' }) => (
    <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M64 128C99.3462 128 128 99.3462 128 64C128 28.6538 99.3462 0 64 0C28.6538 0 0 28.6538 0 64C0 99.3462 28.6538 128 64 128ZM41.8797 45L64 88L86.1203 45H41.8797Z" fill="currentColor"/>
    </svg>
);

export const SupabaseLogo: React.FC<{ className?: string }> = ({ className = 'h-6' }) => (
    <svg aria-hidden="true" className={className} viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.5001 7.2001C14.5001 7.2001 10.5001 9.4001 8.8001 10.5001C7.1001 11.6001 4.5001 10.9001 4.5001 10.9001L14.5001 4.9001L14.5001 7.2001Z" fill="#3ECF8E"/>
        <path d="M14.5 4.9001L4.5 10.9001C4.5 10.9001 3.2 10.5 2 9.7001C0.8 8.9001 0.5 8.1001 0.5 8.1001C0.5 8.1001 1.5 8.8001 2.8 9.5001C4.1 10.2001 4.8 10.4001 4.8 10.4001L14.5 4.6001V4.9001Z" fill="url(#paint0_linear_102_105)"/>
        <path d="M0.500092 5.0001C0.500092 5.0001 4.50009 2.8001 6.20009 1.7001C7.90009 0.600096 10.5001 1.3001 10.5001 1.3001L0.500092 7.3001V5.0001Z" fill="#3ECF8E"/>
        <path d="M0.5 7.3001L10.5 1.3001C10.5 1.3001 11.8 1.7001 13 2.5001C14.2 3.3001 14.5 4.1001 14.5 4.1001C14.5 4.1001 13.5 3.4001 12.2 2.7001C10.9 2.0001 10.2 1.8001 10.2 1.8001L0.5 7.6001V7.3001Z" fill="url(#paint1_linear_102_105)"/>
        <path d="M0.500092 8.3001V12.9C0.500092 12.9 3.20009 14.9 8.00009 17.9C12.8001 14.9 14.5001 13.5 14.5001 13.5V8.1001L8.00009 12.1001L0.500092 8.3001Z" fill="#3ECF8E"/>
        <defs><linearGradient id="paint0_linear_102_105" x1="6.8" y1="4.8" x2="8.8" y2="12.5" gradientUnits="userSpaceOnUse"><stop stopColor="#249366"/><stop offset="1" stopColor="#3ECF8E"/></linearGradient><linearGradient id="paint1_linear_102_105" x1="8.2" y1="7.4" x2="6.2" y2="-0.3" gradientUnits="userSpaceOnUse"><stop stopColor="#249366"/><stop offset="1" stopColor="#3ECF8E"/></linearGradient></defs>
    </svg>
);

export const StripeLogo: React.FC<{ className?: string }> = ({ className = 'h-6' }) => (
    <svg className={className} viewBox="0 0 60 25" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="M59.64 14.28h-8.06c.14 1.57 1.22 2.74 3.7 2.74 1.95 0 3.03-.92 3.03-2.22 0-1.63-1.42-2.12-3.8-2.88-3.14-.98-5.2-2.1-5.2-5.12 0-2.8 2.2-4.9 5.5-4.9 3.1 0 5.1 2.08 5.1 4.9H51.8c-.1-1.4-1-2.45-2.73-2.45-1.5 0-2.4.9-2.4 2.03 0 1.5 1.2 1.95 3.5 2.65 3.1 1 5.3 2.1 5.3 5.3 0 2.9-2.3 5.2-6.16 5.2-3.7 0-6.1-2.2-6.1-5.25zm-21-12.7c-2.4 0-4.7.9-6.5 2.7l1.9 1.9c1.3-1.2 2.9-1.9 4.6-1.9s3.3.7 4.6 1.9l1.9-1.9c-1.8-1.8-4.1-2.7-6.5-2.7zm-6.2 17.5c1.1 0 2.1-.4 2.9-1.2l-1.9-1.8c-.4.4-.9.6-1.4.6-.9 0-1.6-.7-1.6-1.6 0-.3.1-.6.3-.9l-1.8-1.8c-.5.8-.8 1.8-.8 2.8 0 2.2 1.8 4 4.1 4zm16.3-3.2c-.4.4-1 .6-1.5.6-1.1 0-1.6-.7-1.6-1.6 0-1.1.7-1.6 1.6-1.6.5 0 1 .2 1.4.6l1.9-1.8c-1-1-2.3-1.5-3.8-1.5-2.2 0-4.1 1.8-4.1 4.1s1.8 4 4.1 4c1.5 0 2.8-.5 3.8-1.5l-1.8-1.8zm-11.5-7.2c-.4-.4-.9-.6-1.4-.6-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6c.5 0 1-.2 1.4-.6l1.8 1.8c-1 1-2.3 1.5-3.8 1.5-2.2 0-4-1.8-4-4s1.8-4 4-4c1.5 0 2.8.5 3.8 1.5l-1.8 1.8zM24.34 1.58h-4.9v21.8h4.9v-21.8zM14.54 1.58h-4.9v21.8h4.9v-21.8zM4.74 1.58H0v21.8h4.8v-9.5h2.6c2.9 0 4.9-1.8 4.9-4.7s-2-4.8-4.9-4.8h-2.6V1.58zm2.6 6.8h-2.6V4.48h2.6c1.5 0 2.3.7 2.3 2s-.8 2-2.3 2z"/>
    </svg>
);

export const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
    </svg>
);

export const DownloadIcon = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

export const BugIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
  </svg>
);

export const PaintBrushIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.998 15.998 0 011.622-3.385m5.043.025a15.998 15.998 0 001.622-3.385m3.388 1.62a15.998 15.998 0 00-1.622-3.385m-5.043.025a15.998 15.998 0 01-3.388-1.621m7.744 4.242a15.998 15.998 0 00-1.622-3.385M12 12.75a3 3 0 110-6 3 3 0 010 6z" />
    </svg>
);

export const UsersIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.228a4.5 4.5 0 00-1.024-.211A4.5 4.5 0 0018 18.72m-7.5-2.228a4.5 4.5 0 00-4.242 0M11.25 10.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
  </svg>
);
export const CloudUploadIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
    </svg>
);

export const HelpCircleIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>
);

export const BetaIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
  </svg>
);

export const IntegrationsIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" className={className}>
        <g>
            <path fill="currentColor" fillRule="evenodd" d="M11.1884 1.04545c-0.1828 -0.814624 -1.33777 -0.808749 -1.5133 0.00659l-0.01749 0.08127c-0.18636 0.86567 -0.86717 1.52373 -1.71451 1.67363 -0.8408 0.14874 -0.8408 1.36238 0 1.51112 0.84734 0.1499 1.52815 0.80797 1.71451 1.67363l0.01749 0.08127c0.17552 0.81534 1.3305 0.82122 1.5133 0.00659l0.0212 -0.09471c0.1935 -0.86249 0.8752 -1.51577 1.7212 -1.66544 0.8423 -0.149 0.8423 -1.3648 0 -1.5138 -0.846 -0.14967 -1.5277 -0.80294 -1.7212 -1.66544l-0.0212 -0.09471Zm-9.5009 0.76705v3.5h3.5v-3.5h-3.5Zm-1.25 -0.14881c0 -0.60817 0.49302 -1.101189 1.10119 -1.101189h3.79762c0.60817 0 1.10119 0.493019 1.10119 1.101189v3.79762c0 0.60817 -0.49302 1.10119 -1.10119 1.10119H1.53869C0.93052 6.5625 0.4375 6.06948 0.4375 5.46131V1.66369Zm1.25 7.14881v3.5h3.5v-3.5h-3.5Zm-1.25 -0.14881c0 -0.60817 0.49302 -1.10119 1.10119 -1.10119h3.79762c0.60817 0 1.10119 0.49302 1.10119 1.10119v3.79761c0 0.6082 -0.49302 1.1012 -1.10119 1.1012H1.53869c-0.60817 0 -1.10119 -0.493 -1.10119 -1.1012V8.66369Zm8.25 3.64881v-3.5h3.5v3.5h-3.5Zm-0.14881 -4.75c-0.60817 0 -1.10119 0.49302 -1.10119 1.10119v3.79761c0 0.6082 0.49302 1.1012 1.10119 1.1012h3.79761c0.6082 0 1.1012 -0.493 1.1012 -1.1012V8.66369c0 -0.60817 -0.493 -1.10119 -1.1012 -1.10119H8.53869Z" clipRule="evenodd" strokeWidth="1"></path>
        </g>
    </svg>
);

export const DotsHorizontalIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
);

export const LayoutIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
  </svg>
);

export const MobileIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18h3" />
  </svg>
);
export const ChevronDownIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

export const CloseIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
export const UploadIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
);

export const DesktopIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-1.621-.87a3 3 0 01-.879-2.122v-1.007M15 15.75a3 3 0 00-3-3H9a3 3 0 00-3 3v.252a3 3 0 01.969 2.121l.63 6.11A3 3 0 009 24h6a3 3 0 002.401-1.215l.63-6.11a3 3 0 01.97-2.121V15.75zM12 12.75a.75.75 0 010-1.5.75.75 0 010 1.5z" />
  </svg>
);

export const FinderIcon: React.FC = () => (
    <div className="w-full h-full bg-gradient-to-br from-sky-400 to-sky-600 rounded-lg flex items-center justify-center text-white text-3xl font-bold">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 9.563V9.75a.75.75 0 01-1.5 0V9.563a.75.75 0 011.5 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 9.563V9.75a.75.75 0 01-1.5 0V9.563a.75.75 0 011.5 0z" />
        </svg>
    </div>
);
export const LaunchpadIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <div className={className + " bg-gray-700 rounded-lg grid grid-cols-2 p-1 gap-0.5"}>
        <div className="bg-red-500 rounded-sm w-full h-full"></div>
        <div className="bg-blue-500 rounded-sm w-full h-full"></div>
        <div className="bg-green-500 rounded-sm w-full h-full"></div>
        <div className="bg-yellow-500 rounded-sm w-full h-full"></div>
    </div>
);
export const NotesIcon: React.FC = () => (
    <div className="w-full h-full bg-gradient-to-b from-yellow-200 to-yellow-300 rounded-lg border-b-8 border-yellow-500">
        <div className="h-4 bg-red-800"></div>
    </div>
);
export const MailIcon: React.FC = () => (
    <div className="w-full h-full bg-sky-500 rounded-lg flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
    </div>
);

export const ReactIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348" className="w-10 h-10 text-sky-500">
        <circle cx="0" cy="0" r="2.05" fill="currentColor"></circle>
        <g stroke="currentColor" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"></ellipse>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"></ellipse>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"></ellipse>
        </g>
    </svg>
);
export const HtmlIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-orange-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
);
export const VueIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 221" className="w-9 h-9">
        <path fill="#41B883" d="M204.8,0,128,134.4,51.2,0H0L128,220.8,256,0Z" />
        <path fill="#34495E" d="M204.8,0,128,134.4,51.2,0H102.4L128,44.8,153.6,0Z" />
    </svg>
);
export const SvelteIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-10 h-10">
        <path fill="#FF3E00" d="M20.315 13.064c.27.02.486-.06.649-.241.162-.18.216-.421.216-.722v-.325a.862.862 0 0 0-.216-.621c-.163-.162-.378-.243-.649-.243H18.23l-1.028-3.085c-.09-.313-.263-.538-.519-.676a.823.823 0 0 0-.676-.04c-.237.081-.433.253-.588.519l-3.328 10.038-5.05-9.977a1.107 1.107 0 0 0-.58-.696 1.01 1.01 0 0 0-.71-.05c-.256.09-.462.27-.616.54l-3.77 8.528H2.16c-.27 0-.487.08-.648.242a.862.862 0 0 0-.216.622v.324c0 .3.054.54.162.721.108.18.306.27.595.27h2.243l.972 2.916c.108.312.297.537.568.675.27.135.54.135.81 0 .27-.138.459-.363.568-.675l3.295-9.886L14.04 20.3c.126.312.333.537.621.675.288.135.59.135.906 0a1.27 1.27 0 0 0 .638-.675l5.13-10.154 1.134 3.376c.09.312.263.537.519.675.256.135.513.135.77 0s.42-.362.486-.675l.946-2.836h1.08c.27 0 .487-.08.649-.242.162-.163.216-.39.216-.685v-.324a.862.862 0 0 0-.216-.622c-.163-.18-.378-.27-.649-.27h-1.944l-.459 1.35z" />
    </svg>
);
export const NodejsIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10">
        <path fill="#8CC84B" d="M11.33 16.32a.55.55 0 0 0-.55-.54h-2a.55.55 0 0 0-.55.54v4.38a.55.55 0 0 0 .55.54h2a.55.55 0 0 0 .55-.54z"/>
        <path fill="#8CC84B" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.34 19.34c-.26.26-1.02.43-1.6.43-1.22 0-2.31-.6-2.31-2.88v-4.9H9.28v4.38a.55.55 0 0 0 .55.54h2a.55.55 0 0 0 .55-.54v.02c0 1.28.93 1.28 1.23 1.28.32 0 1.2-.03 1.2-.03s.2-.18.02-.37zm3.11-2.58c0 1.25-.43 2.15-1.51 2.15-1.01 0-1.55-.67-1.55-1.55s.54-1.58 1.55-1.58c1.08 0 1.51.89 1.51 1.98zm-8.8-2.61a.55.55 0 0 0-.55-.54H6.01a.55.55 0 0 0-.55.54v6.8a.55.55 0 0 0 .55.54h1.16a.55.55 0 0 0 .55-.54v-3.41h.52l1.62 3.41h1.34l-1.94-4.01c.4-.29.66-.74.66-1.28v-1.1z"/>
        <path fill="#8CC84B" d="M16.82 14.12c-.73 0-1.28.53-1.28 1.24s.55 1.21 1.28 1.21c.72 0 1.25-.5 1.25-1.21s-.53-1.24-1.25-1.24z"/>
    </svg>
);
export const TemplateIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
    </svg>
);
export const SchemaIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1.5-1.5m1.5 1.5l1.5 1.5m3.75-3.75l1.5-1.5m1.5 1.5l-1.5 1.5m-3.75-3.75l-1.5 1.5m1.5-1.5l1.5-1.5m-7.5 0h7.5" />
  </svg>
);

export const SlackIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.8 122.8" className={className}>
        <path fill="#E01E5A" d="M25.8,75.1c0,5.3,4.3,9.6,9.6,9.6s9.6-4.3,9.6-9.6s-4.3-9.6-9.6-9.6H25.8V75.1z"/>
        <path fill="#E01E5A" d="M35.4,47.7c-5.3,0-9.6,4.3-9.6,9.6s4.3,9.6,9.6,9.6s9.6-4.3,9.6-9.6V25.8h-9.6V47.7z"/>
        <path fill="#36C5F0" d="M47.7,25.8c-5.3,0-9.6,4.3-9.6,9.6s4.3,9.6,9.6,9.6s9.6-4.3,9.6-9.6s-4.3-9.6-9.6-9.6V25.8z"/>
        <path fill="#36C5F0" d="M75.1,35.4c0-5.3-4.3-9.6-9.6-9.6s-9.6,4.3-9.6,9.6s4.3,9.6,9.6,9.6h21.9v-9.6H75.1z"/>
        <path fill="#2EB67D" d="M97,47.7c5.3,0,9.6-4.3,9.6-9.6s-4.3-9.6-9.6-9.6s-9.6,4.3-9.6,9.6s4.3,9.6,9.6,9.6H97z"/>
        <path fill="#2EB67D" d="M87.4,75.1c0,5.3,4.3,9.6,9.6,9.6s9.6-4.3,9.6-9.6s-4.3-9.6-9.6-9.6v21.9h9.6V75.1z"/>
        <path fill="#ECB22E" d="M75.1,97c5.3,0,9.6-4.3,9.6-9.6s-4.3-9.6-9.6-9.6s-9.6,4.3-9.6,9.6s4.3,9.6,9.6,9.6H75.1z"/>
        <path fill="#ECB22E" d="M47.7,87.4c0,5.3,4.3,9.6,9.6,9.6s9.6-4.3,9.6-9.6s-4.3-9.6-9.6-9.6H25.8v9.6H47.7z"/>
    </svg>
);

export const JiraIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
        <path fill="#2684FF" d="M21.6.012a2.4 2.4 0 0 1 2.392 2.399V21.6a2.4 2.4 0 0 1-2.392 2.399H2.4A2.4 2.4 0 0 1 .008 21.6V2.41A2.4 2.4 0 0 1 2.4.013h19.2zM12.01 5.995l-5.993 5.993a.6.6 0 0 0 .848.848l5.145-5.145l5.145 5.145a.6.6 0 0 0 .848-.848L12.01 5.995z"/>
        <path fill="#0052CC" d="M12.01 18.005l5.993-5.993a.6.6 0 0 0-.848-.848l-5.145 5.145l-5.145-5.145a.6.6 0 0 0-.848.848l5.993 5.993z"/>
    </svg>
);
