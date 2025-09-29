import React from 'react';

export const IconWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "w-5 h-5" }) => (
  <div className={className}>{children}</div>
);

export const AgentIcon = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V5M7.5 7.5l-.707-.707M16.5 7.5l.707-.707M7.5 16.5l-.707.707M16.5 16.5l.707.707M12 12a4 4 0 11-8 0 4 4 0 018 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a4 4 0 118 0 4 4 0 01-8 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v-1a3 3 0 013-3h1" />
    </svg>
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

export const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className={className}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
    </svg>
);

export const VercelIcon: React.FC<{ className?: string }> = ({ className = 'h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className}>
      <path d="M12 2L2 22h20L12 2z"/>
    </svg>
);

export const SendIcon = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);

export const ArrowUpIcon = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
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

export const UploadIcon = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
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
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 96 96" className={className}>
      <title>Gemini</title>
      <desc>
        Google Gemini Streamline Icon: https://streamlinehq.com
      </desc>
      <path fill="url(#gemini_icon_a)" d="M24.1215 53.9996c0 3.1936-.9474 5.7378-2.8422 7.6327-2.1291 2.2568-4.9288 3.3852-8.3992 3.3852-3.3213 0-6.13165-1.1497-8.43103-3.4491C2.14969 59.269 1 56.4374 1 53.0735c0-3.364 1.14969-6.1956 3.44907-8.495 2.29938-2.2994 5.10973-3.449 8.43103-3.449 1.682 0 3.2681.298 4.7585.8942 1.4903.5961 2.7145 1.4371 3.6726 2.5229l-2.1078 2.1078c-.7026-.8517-1.6127-1.517-2.7305-1.996-1.1177-.4791-2.3153-.7186-3.5928-.7186-2.491 0-4.59873.8623-6.32326 2.5868-1.70325 1.7458-2.55487 3.9281-2.55487 6.5469 0 2.6187.85162 4.801 2.55487 6.5468 1.72453 1.7245 3.83226 2.5868 6.32326 2.5868 2.2781 0 4.173-.6387 5.6846-1.9161 1.5116-1.2775 2.3846-3.0339 2.6187-5.2695h-8.3033v-2.7464h11.0818c.1064.5961.1596 1.1709.1596 1.7245Z"></path>
      <path fill="url(#gemini_icon_b)" d="M33.3432 48.4118c2.3442 0 4.2098.7581 5.5969 2.2742 1.3872 1.5162 2.0807 3.6399 2.0807 6.3712l-.0322.3225H28.5689c.0431 1.5485.5592 2.7958 1.5485 3.7421.9892.9462 2.1721 1.4194 3.5484 1.4194 1.8925 0 3.3765-.9463 4.4517-2.8388l2.6453 1.2903c-.7097 1.3334-1.6936 2.3764-2.9517 3.1291-1.2581.7527-2.6829 1.1291-4.2743 1.1291-2.3226 0-4.2367-.7957-5.7421-2.3872-1.5054-1.5914-2.2581-3.6022-2.2581-6.0324 0-2.4086.7312-4.414 2.1936-6.0162 1.4624-1.6022 3.3334-2.4033 5.613-2.4033Zm-.0645 2.7097c-1.1183 0-2.0807.3441-2.8871 1.0323-.8065.6882-1.3388 1.613-1.5968 2.7743h9.0647c-.086-1.0968-.5323-2.0054-1.3388-2.7259-.8064-.7204-1.8871-1.0807-3.242-1.0807Z"></path>
      <path fill="url(#gemini_icon_c)" d="M45.887 64.6852h-2.9588V48.9264h2.8302v2.1869h.1286c.4503-.7718 1.1417-1.4151 2.0744-1.9296.9327-.5146 1.86-.7719 2.7819-.7719 1.1578 0 2.1763.268 3.0553.804.8791.536 1.5223 1.2757 1.9297 2.2191 1.3078-2.0154 3.1196-3.0231 5.4352-3.0231 1.8224 0 3.2268.5575 4.2131 1.6724.9862 1.1149 1.4794 2.7015 1.4794 4.7598v9.8412h-2.9588v-9.391c0-1.4794-.2681-2.546-.8041-3.2-.536-.6539-1.4365-.9809-2.7015-.9809-1.1363 0-2.0905.4824-2.8623 1.4473-.7719.9648-1.1578 2.1011-1.1578 3.409v8.7156h-2.9588v-9.391c0-1.4794-.268-2.546-.804-3.2-.5361-.6539-1.4366-.9809-2.7016-.9809-1.1363 0-2.0904.4824-2.8623 1.4473-.7718.9648-1.1578 2.1011-1.1578 3.409v8.7156Z"></path>
      <path fill="url(#gemini_icon_d)" d="M73.2004 43.4567c0 .5798-.204 1.0738-.612 1.4818-.4081.4081-.902.6121-1.4818.6121-.5799 0-1.0738-.204-1.4819-.6121-.408-.408-.612-.902-.612-1.4818s.204-1.0738.612-1.4818c.4081-.408.902-.612 1.4819-.612.5798 0 1.0737.204 1.4818.612.408.408.612.902.612 1.4818Zm-.612 5.444v15.7845h-2.9637V48.9007h2.9637Z"></path>
      <path fill="url(#gemini_icon_e)" d="M94.9997 43.4567c0 .5798-.204 1.0738-.612 1.4818-.4081.4081-.902.6121-1.4818.6121-.5799 0-1.0738-.204-1.4818-.6121-.4081-.408-.6121-.902-.6121-1.4818s.204-1.0738.6121-1.4818c.408-.408.9019-.612 1.4818-.612.5798 0 1.0737.204 1.4818.612.408.408.612.902.612 1.4818Zm-.612 5.444v15.7845h-2.9636V48.9007h2.9636Z"></path>
      <path fill="url(#gemini_icon_f)" d="M75.1729 48.9264h2.8301v2.1869h.1287c.4502-.7718 1.1417-1.4151 2.0743-1.9296.9327-.5146 1.9029-.7719 2.9106-.7719 1.9297 0 3.4144.5521 4.4543 1.6563 1.0399 1.1042 1.5598 2.6747 1.5598 4.7116v9.9055h-2.9588v-9.7126c-.0643-2.5728-1.3615-3.8593-3.8915-3.8593-1.1792 0-2.1655.4771-2.9588 1.4312-.7933.9541-1.1899 2.0958-1.1899 3.4251v8.7156h-2.9588V48.9264Z"></path>
      <path fill="#076eff" d="M64.9593 44.1073c-.5226-3.4492-3.2298-6.1564-6.679-6.6791 3.4492-.5227 6.1564-3.2299 6.679-6.6791.5227 3.4492 3.2299 6.1564 6.6791 6.6791-3.4492.5227-6.1564 3.2299-6.6791 6.6791Z"></path>
      <defs>
        <radialGradient id="gemini_icon_a" cx="0" cy="0" r="1" gradientTransform="matrix(-2072.3204 2072.3204 -1036.1602 -1036.1602 521.84 521.84)" gradientUnits="userSpaceOnUse"><stop stopColor="#9669FE"></stop><stop offset="1" stopColor="#6493F2"></stop></radialGradient>
        <radialGradient id="gemini_icon_b" cx="0" cy="0" r="1" gradientTransform="matrix(-2072.3204 2072.3204 -1036.1602 -1036.1602 521.84 521.84)" gradientUnits="userSpaceOnUse"><stop stopColor="#9669FE"></stop><stop offset="1" stopColor="#6493F2"></stop></radialGradient>
        <radialGradient id="gemini_icon_c" cx="0" cy="0" r="1" gradientTransform="matrix(-2072.3204 2072.3204 -1036.1602 -1036.1602 521.84 521.84)" gradientUnits="userSpaceOnUse"><stop stopColor="#9669FE"></stop><stop offset="1" stopColor="#6493F2"></stop></radialGradient>
        <radialGradient id="gemini_icon_d" cx="0" cy="0" r="1" gradientTransform="matrix(-2072.3204 2072.3204 -1036.1602 -1036.1602 521.84 521.84)" gradientUnits="userSpaceOnUse"><stop stopColor="#9669FE"></stop><stop offset="1" stopColor="#6493F2"></stop></radialGradient>
        <radialGradient id="gemini_icon_e" cx="0" cy="0" r="1" gradientTransform="matrix(-2072.3204 2072.3204 -1036.1602 -1036.1602 521.84 521.84)" gradientUnits="userSpaceOnUse"><stop stopColor="#9669FE"></stop><stop offset="1" stopColor="#6493F2"></stop></radialGradient>
        <radialGradient id="gemini_icon_f" cx="0" cy="0" r="1" gradientTransform="matrix(-2072.3204 2072.3204 -1036.1602 -1036.1602 521.84 521.84)" gradientUnits="userSpaceOnUse"><stop stopColor="#9669FE"></stop><stop offset="1" stopColor="#6493F2"></stop></radialGradient>
      </defs>
    </svg>
);


// --- START: Added Icons ---

export const BoltIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

export const BugIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

export const ChevronDownIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

export const CloseIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const CloudUploadIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M12 11v9m0 0l-3-3m3 3l3-3" />
    </svg>
);

export const DesktopIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

export const DotsHorizontalIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
    </svg>
);

export const EditIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);

export const FinderIcon: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" className={className}>
      <path fill="#4DB9F7" d="M47 16H17c-1.7 0-3 1.3-3 3v26c0 1.7 1.3 3 3 3h30c1.7 0 3-1.3 3-3V19c0-1.7-1.3-3-3-3z"/>
      <path fill="#2392D3" d="M14 29h36v16c0 1.7-1.3 3-3 3H17c-1.7 0-3-1.3-3-3V29z"/>
      <path fill="#FFFFFF" d="M22 36c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm20 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
      <path fill="#2392D3" d="M37 28c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5z"/>
      <path fill="#FFFFFF" d="M27 28c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5z"/>
    </svg>
);

export const FlaskIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4H7zm0 0a4 4 0 004-4V5a2 2 0 00-2-2H7a2 2 0 00-2 2v12a4 4 0 004 4zm0 0l-2-2m2 2l2-2m-2-2l2-2" />
    </svg>
);

export const HelpCircleIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const HtmlIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className}>
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622-13.23.002.69 7.843h11.332l-.482 5.524-4.061 1.08-3.932-1.08-.25-2.828h-2.601l.416 4.356 6.375 1.756 6.33-1.756.982-11.021H8.531z"/>
    </svg>
);

export const KeyIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
    </svg>
);

export const LaunchpadIcon: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12.83,11.17l-1.41,1.41l-4.24-4.24l1.41-1.41l4.24,4.24M11.5,4.5l-1,1l-2.09-2.09l1-1L11.5,4.5M19,10.59l-1.41,1.41l-4.24-4.24l1.41-1.41l4.24,4.24M13.5,19.5l1-1l2.09,2.09l-1,1L13.5,19.5M3,12c0,3.31,2.69,6,6,6s6-2.69,6-6s-2.69-6-6-6S3,8.69,3,12m6-8c-4.42,0-8,3.58-8,8s3.58,8,8,8s8-3.58,8-8S13.42,4,9,4Z" />
    </svg>
);

export const LayoutIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
);

export const LogoutIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);

export const MailIcon: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
);

export const MobileIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
);

export const NodejsIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className}>
        <path d="M11.72,16.24c-0.12,0.1-0.24,0.18-0.38,0.24c-0.14,0.06-0.28,0.11-0.45,0.13c-0.16,0.02-0.32,0.03-0.5,0.03 c-0.5,0-0.93-0.1-1.29-0.32c-0.36-0.22-0.54-0.57-0.54-1.07V9.45h1.58v5.52c0,0.18,0.04,0.3,0.11,0.36c0.07,0.06,0.19,0.1,0.36,0.1 s0.28-0.04,0.36-0.11c0.09-0.08,0.13-0.2,0.13-0.37V9.45h1.58v5.61c0,0.5-0.18,0.86-0.54,1.07C12.65,16.34,12.22,16.44,11.72,16.24z M17.02,9.65c-0.54-0.1-1-0.15-1.36-0.15c-0.84,0-1.42,0.22-1.74,0.67c-0.32,0.45-0.48,1.15-0.48,2.11v0.12 c0,1.25,0.31,2.18,0.92,2.79c0.62,0.61,1.5,0.92,2.65,0.92c0.26,0,0.54-0.02,0.84-0.07v1.14c-0.4,0.14-0.86,0.21-1.36,0.21 c-0.86,0-1.61-0.22-2.24-0.67c-0.64-0.45-0.96-1.12-0.96-2.02v-0.12c0-1.22,0.28-2.18,0.84-2.88c0.56-0.7,1.4-1.05,2.5-1.05 c0.4,0,0.76,0.04,1.08,0.11V9.65z M12,0v1.73l9.31,5.39v10.74l-9.31,5.39V21.5l7.58-4.38V7.89L12,3.52V1.73L22.95,7.9v10.45 l-10.95,6.32L1.05,18.35V7.9L12,1.73V0z"/>
    </svg>
);

export const NotesIcon: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
    </svg>
);

export const PaintBrushIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
    </svg>
);

export const PlusIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);

export const ReactIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348" fill="none" className={className}>
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
    </svg>
);

export const SchemaIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V4a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V8zM7 8h6v2H7V8z" />
    </svg>
);

export const SparklesIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

export const StripeLogo: React.FC<{ className?: string }> = ({ className = 'h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 102 25" className={className}>
      <path fill="currentColor" d="M83.42 12.03c0-3.1-2.6-5.6-6.15-5.6-4.04 0-6.85 2.87-6.85 6.43 0 4.1 3.2 6.35 7.1 6.35 3.1 0 5.2-1.34 5.8-3.18h-2.5a3.1 3.1 0 01-3.23 2.1c-1.87 0-2.88-1.1-2.88-2.67h8.7v-.76c.01-3.67-.01-5.62-.01-5.62zm-8.68-1.02c.08-1.63 1.1-2.45 2.53-2.45 1.42 0 2.44.82 2.52 2.45h-5.05zM68.55 6.67h2.53v11.22h-2.53V6.67zm-7.66 3.18c-.2-1.8-1.58-2.75-3.3-2.75-2.06 0-3.5 1.26-3.5 3.47v7.8h-2.52V6.67h2.52v.9c.7-.7 1.8-1.15 3.22-1.15 2.6 0 4.1 1.6 4.1 4.53v6.93h-2.52V9.85zM53.1 14.8V6.67h2.52v7.1c0 1.1.78 1.68 1.8 1.68.96 0 1.66-.5 1.66-1.54V6.67h2.52v7.25c0 2.5-1.63 3.82-4.18 3.82-2.5 0-4.32-1.3-4.32-3.95zM43.08 17.89h2.8l3.96-11.22h-2.72l-2.6 7.9-2.6-7.9h-2.73l3.9 11.22zM28.06 6.67h2.7l3.2 8.1v-8.1h2.36v11.22h-2.4l-3.3-8.28v8.28H28.06V6.67z"></path>
      <path fill="currentColor" d="M11.7.2C5.7.2.9 4.3.9 9.8c0 5.4 4.4 9.4 10.7 9.4 2.8 0 5.1-1 6.9-2.6l-1.9-1.9c-1.3 1-2.9 1.6-4.9 1.6-4.2 0-7.2-2.9-7.2-6.5S7.6 3.3 11.7 3.3c2.3 0 4.3.9 5.5 2.4l2-1.6C17.3 1.3 14.7.2 11.7.2z"></path>
    </svg>
);

export const SupabaseLogo: React.FC<{ className?: string }> = ({ className = 'h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M11.213 4.065A.75.75 0 0112 3.5h.004c3.962 0 7.172 3.208 7.172 7.168v.76c.01.21.094.41.252.556l.042.038a.75.75 0 010 1.06l-.042.038c-.158.146-.242.346-.252.556v.76c0 3.96-3.21 7.168-7.172 7.168H12a.75.75 0 01-.787-.565l-.128-.48a1.25 1.25 0 00-1.17-1.021H8.75a.75.75 0 01-.75-.75v-1.5a.75.75 0 01.75-.75h1.165a1.25 1.25 0 001.17-1.022l.128-.48A.75.75 0 0112 11.5h.004c1.43 0 2.588-1.157 2.588-2.584v-.76c-.01-.21-.094-.41-.252-.556l-.042-.038a.75.75 0 010-1.06l.042-.038c.158-.146.242-.346.252-.556v-.76c0-1.427-1.157-2.584-2.588-2.584H12a.75.75 0 00-.75.75v1.5a.75.75 0 00.75.75h.004a1.084 1.084 0 011.084 1.084v3.664a1.084 1.084 0 01-1.084 1.084h-1.16c-1.996 0-3.614 1.618-3.614 3.614v1.5c0 .65.53 1.18 1.18 1.18H10a1.25 1.25 0 001.17 1.02l.128.481z" clipRule="evenodd" />
    </svg>
);

export const SvelteIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className={className}>
        <path fill="#FF3E00" d="M22.5 13.9c.4-.7.4-1.6 0-2.3L20 7.8c-.8-1.3-2.6-1.3-3.4 0l-2.4 4.1c-.2.3-.1.7.2.9s.7.1.9-.2l2.4-4.1c.4-.6 1-.6 1.3 0l1.3 2.3c.2.3 0 .7-.3.9s-.7 0-.9-.3l-1.3-2.3c-.2-.3-.5-.4-.8-.4s-.6.1-.8.4l-3.2 5.5c-.2.3 0 .7.3.9s.7 0 .9-.3l3.2-5.5c.4-.6 1-.6 1.3 0l1.3 2.3c.2.3.6.4.9.2s.4-.6.2-.9l-1.3-2.3c-.4-.7-1.3-.7-1.8 0l-3.2 5.5c-.4.7-1.3.7-1.8 0L9.4 10c-.4-.7-1.3-.7-1.8 0L1.5 18.1c-.4.7-.4 1.6 0 2.3l2.5 4.3c.8 1.3 2.6 1.3 3.4 0l2.4-4.1c.2-.3.1-.7-.2-.9s-.7-.1-.9.2L6.3 24c-.4.6-1 .6-1.3 0l-1.3-2.3c-.2-.3 0-.7.3-.9s.7 0 .9.3l1.3 2.3c.2.3.5.4.8.4s.6-.1.8-.4l3.2-5.5c.2-.3 0-.7-.3-.9s-.7 0-.9.3l-3.2 5.5c-.4.6-1 .6-1.3 0l-1.3-2.3c-.2-.3-.6-.4-.9-.2s-.4.6-.2.9l1.3 2.3c.4.7 1.3.7 1.8 0l3.2-5.5c.4-.7 1.3-.7 1.8 0l6.1 10.6c.4.7 1.3.7 1.8 0L22.5 13.9z"/>
    </svg>
);

export const TemplateIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
);

export const UsersIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm6-11a3 3 0 100-6 3 3 0 000 6zM21 21v-1a6 6 0 00-3-5.224" />
    </svg>
);

export const VueIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className={className}>
        <path fill="#41B883" d="M18.4 3.6L12 14.8 5.6 3.6H0l12 20.8L24 3.6z"/>
        <path fill="#34495E" d="M12 14.8L5.6 3.6H12l6.4 11.2z"/>
    </svg>
);
// --- END: Added Icons ---
