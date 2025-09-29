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
        <radialGradient id="gemini_icon_a" cx="0" cy="0" r="1" gradientTransform="matrix(-2072.320