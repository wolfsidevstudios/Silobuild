import React from 'react';

export const Icon: React.FC<{ children: React.ReactNode; className?: string, viewBox?: string }> = ({ children, className, viewBox = "0 0 20 20" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${className}`} viewBox={viewBox} fill="currentColor" aria-hidden="true">
        {children}
    </svg>
);

export const ChatIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
    </Icon>
);

export const CodeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
    </Icon>
);

export const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
    </Icon>
);

export const HomeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </Icon>
);

export const SaveIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M7 9a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" />
        <path fillRule="evenodd" d="M3 3a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V3zm2-1a1 1 0 00-1 1v14a1 1 0 001 1h10a1 1 0 001-1V3a1 1 0 00-1-1H5z" clipRule="evenodd" />
    </Icon>
);

export const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className} viewBox="0 0 16 16">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
    </Icon>
);

export const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </Icon>
);

export const BoltIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
    </Icon>
);

export const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </Icon>
);

export const FileIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
    </Icon>
);

export const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
    </Icon>
);

export const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
    </Icon>
);

export const DesktopIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" fill="none" />
    </Icon>
);

export const EditIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
    </Icon>
);

export const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1.586l.707.707a1 1 0 010 1.414l-.707.707V10a1 1 0 01-2 0V6.414l-.707-.707a1 1 0 010-1.414l.707-.707V3a1 1 0 011-1zm0 10a1 1 0 011 1v1.586l.707.707a1 1 0 010 1.414l-.707.707V18a1 1 0 01-2 0v-1.586l-.707-.707a1 1 0 010-1.414l.707-.707V13a1 1 0 011-1zm10-10a1 1 0 011 1v1.586l.707.707a1 1 0 010 1.414l-.707.707V10a1 1 0 01-2 0V6.414l-.707-.707a1 1 0 010-1.414l.707-.707V3a1 1 0 011-1z" clipRule="evenodd" />
    </Icon>
);

export const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </Icon>
);

export const LayoutIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V3zm2 2v10h10V5H5z" clipRule="evenodd" />
    </Icon>
);

export const MobileIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm0 2h6v12H7V4zm3 13a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </Icon>
);

export const DatabaseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM3 10a7 7 0 1114 0 7 7 0 01-14 0z" />
        <path d="M10 4a6 6 0 100 12 6 6 0 000-12zM3 10c0-3.314 2.686-6 6-6" />
    </Icon>
);

export const LogoutIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V5.414l7.293 7.293a1 1 0 001.414-1.414L5.414 4H15a1 1 0 100-2H4a1 1 0 00-1 1z" clipRule="evenodd" />
    </Icon>
);

export const ReactIcon: React.FC<{ className?: string }> = ({ className = 'h-10 w-10 text-blue-400' }) => (
    <svg className={className} viewBox="0 0 119 105" fill="none" stroke="currentColor" strokeWidth="5" xmlns="http://www.w3.org/2000/svg">
        <ellipse rx="58" ry="21" cx="59.5" cy="52.5" transform="rotate(-60 59.5 52.5)"></ellipse>
        <ellipse rx="58" ry="21" cx="59.5" cy="52.5" transform="rotate(60 59.5 52.5)"></ellipse>
        <ellipse rx="58" ry="21" cx="59.5" cy="52.5"></ellipse>
        <circle cx="59.5" cy="52.5" r="12" fill="#61DAFB" stroke="none"></circle>
    </svg>
);

export const HtmlIcon: React.FC<{ className?: string }> = ({ className = 'h-10 w-10 text-orange-500' }) => (
    <Icon className={className}>
        <path d="M3.33 1a.33.33 0 0 0-.33.33v17.34c0 .18.15.33.33.33h13.34a.33.33 0 0 0 .33-.33V1.33A.33.33 0 0 0 16.67 1H3.33ZM15 17H5V3h10v14Z"/>
        <path d="m7.5 7.5-.71 8.5h1.5l.33-4.11.8.8L10.5 12l2.12-2.12-1.06-1.06-.94.94-.94-.94.62-7.22h-1.5l-.38 4.38-1-1Z"/>
    </Icon>
);

export const SupabaseLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`w-auto ${className}`} viewBox="0 0 88 123" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M54.5822 57.241L87.5645 38.353V0L54.5822 18.8878V57.241Z" fill="#3ECF8E"/>
    <path d="M54.582 66.0792L87.5643 84.967V66.0792L54.582 47.1914V66.0792Z" fill="#3ECF8E"/>
    <path d="M54.582 66.0792V84.967L87.5643 66.0792V47.1914L54.582 66.0792Z" fill="#3ECF8E" fillOpacity="0.6"/>
    <path d="M0 84.967L33 103.855V122.743L0 103.855V84.967Z" fill="#3ECF8E"/>
    <path d="M0 66.0792L33 84.967V66.0792L0 47.1914V66.0792Z" fill="#3ECF8E"/>
    <path d="M0 66.0792V84.967L33 66.0792V47.1914L0 66.0792Z" fill="#3ECF8E" fillOpacity="0.6"/>
  </svg>
);

export const GeminiLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`w-6 h-6 ${className}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.68182 22.8409C7.81818 22.8409 10.3636 20.2955 10.3636 17.1591C10.3636 14.0227 7.81818 11.4773 4.68182 11.4773C1.54545 11.4773 0 14.0227 0 17.1591C0 20.2955 1.54545 22.8409 4.68182 22.8409Z" fill="#8E62E6"/>
    <path d="M22.8409 4.68182C22.8409 7.81818 20.2955 10.3636 17.1591 10.3636C14.0227 10.3636 11.4773 7.81818 11.4773 4.68182C11.4773 1.54545 14.0227 0 17.1591 0C20.2955 0 22.8409 1.54545 22.8409 4.68182Z" fill="#5A9EEE"/>
    <path d="M10.3636 4.68182C10.3636 7.81818 7.81818 10.3636 4.68182 10.3636C1.54545 10.3636 0 7.81818 0 4.68182C0 1.54545 1.54545 0 4.68182 0C7.81818 0 10.3636 1.54545 10.3636 4.68182Z" fill="#D45C9D"/>
  </svg>
);

export const StripeLogo: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={`w-6 h-6 ${className}`} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M48 33.366V48H0V33.366C15.4286 33.366 22.1429 27.2683 22.1429 20.0244C22.1429 13.9268 15.4286 6.53658 0 6.53658V0H48V13.4878C32.5714 13.4878 25.8571 20.7317 25.8571 26.8293C25.8571 32.9268 32.5714 40.3171 48 40.3171V33.366Z" fill="#635BFF"/>
    </svg>
);

export const FinderIcon: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`w-full h-full rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 32 32" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 13C10 13 11 11 13 11C15 11 16 13 16 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 13C22 13 21 11 19 11C17 11 16 13 16 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11 20C11 20 16 23 21 20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

export const LaunchpadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`w-full h-full rounded-lg bg-gray-700 flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12.9l7.4-7.5 2.1 2.1-5.3 5.4-2.1 2.1-2.1-2.1zm2.1-2.1l5.3-5.4 5.3 5.4-5.3 5.4-5.3-5.4zM11.5 15l2-2.1 2.2 2.1-2.1 2.1-2.1-2.1z" fill="#fff" /></svg>
    </div>
);
export const NotesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`w-full h-full rounded-lg bg-yellow-200 border-t-[20px] border-yellow-500 ${className}`}></div>
);
export const MailIcon: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`w-full h-full rounded-lg bg-blue-500 flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 8l8 5 8-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 6h16v12H4z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </div>
);
export const SettingsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`w-full h-full rounded-full bg-gray-300 flex items-center justify-center ${className}`}>
        <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
    </div>
);

export const SchemaIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a2 2 0 002 2h1a2 2 0 110 4h-1a2 2 0 00-2 2v1a2 2 0 11-4 0v-1a2 2 0 00-2-2H8a2 2 0 110-4h1a2 2 0 002-2V4z" stroke="currentColor" fill="none"/>
  </Icon>
);
