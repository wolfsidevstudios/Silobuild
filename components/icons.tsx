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

export const DatabaseIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" className={className}>
        <g>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M7 5.5c3.5899 0 6.5 -1.11929 6.5 -2.5S10.5899 0.5 7 0.5C3.41015 0.5 0.5 1.61929 0.5 3S3.41015 5.5 7 5.5Z" strokeWidth="1"></path>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M0.5 3v8c0 1.38 2.91 2.5 6.5 2.5s6.5 -1.12 6.5 -2.5V3" strokeWidth="1"></path>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M13.5 7c0 1.38 -2.91 2.5 -6.5 2.5S0.5 8.38 0.5 7" strokeWidth="1"></path>
        </g>
    </svg>
);

export const SettingsIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" className={className}>
        <g>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M5.91986 2.57056h-0.68701c-0.16877 0.0005 -0.33345 0.05195 -0.47248 0.14763 -0.13903 0.09568 -0.24592 0.23111 -0.30668 0.38857l-0.36026 0.92996 -1.23996 0.70377 -0.98862 -0.15081c-0.16461 -0.02234 -0.33215 0.00475 -0.48133 0.07785 -0.14918 0.0731 -0.27326 0.1889 -0.35648 0.33268l-0.33512 0.58646c-0.085874 0.14608 -0.125439 0.31475 -0.113473 0.48377 0.011966 0.16902 0.074901 0.33044 0.180498 0.46296l0.628355 0.77916v1.40753l-0.611599 0.77916c-0.105597 0.13251 -0.168532 0.29393 -0.180498 0.46296 -0.011966 0.16899 0.027599 0.33769 0.113474 0.48379l0.335123 0.5864c0.08322 0.1438 0.2073 0.2596 0.35647 0.3327 0.14918 0.0731 0.31673 0.1002 0.48134 0.0779l0.98862 -0.1508 1.2232 0.7037 0.36026 0.93c0.06076 0.1574 0.16765 0.2929 0.30668 0.3886 0.13903 0.0956 0.30371 0.1471 0.47248 0.1476h0.70376c0.16877 -0.0005 0.33346 -0.052 0.47249 -0.1476 0.13903 -0.0957 0.24592 -0.2312 0.30668 -0.3886l0.36026 -0.93 1.2232 -0.7037 0.98862 0.1508c0.16461 0.0223 0.33215 -0.0048 0.48133 -0.0779 0.14918 -0.0731 0.27331 -0.1889 0.35651 -0.3327l0.3351 -0.5864c0.0859 -0.1461 0.1254 -0.3148 0.1135 -0.48379 -0.012 -0.16903 -0.0749 -0.33045 -0.1805 -0.46296l-0.62839 -0.77916v-0.90753m-5.86468 0.20376c0 0.33141 0.09828 0.65537 0.2824 0.93093 0.18412 0.27555 0.44581 0.49032 0.75199 0.61715 0.30618 0.12682 0.64309 0.16 0.96813 0.09535 0.32504 -0.06466 0.62361 -0.22424 0.85795 -0.45858s0.39393 -0.53291 0.45858 -0.85795c0.06465 -0.32504 0.03147 -0.66195 -0.09535 -0.96813 -0.12683 -0.30618 -0.3416 -0.56787 -0.61715 -0.75199 -0.27555 -0.18412 -0.59952 -0.2824 -0.93093 -0.2824 -0.4444 0 -0.8706 0.17654 -1.18484 0.49078 -0.31424 0.31424 -0.49078 0.74044 -0.49078 1.18484Z" strokeWidth="1"></path>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M8.10058 3.54225c-0.30704 -0.05341 -0.30704 -0.49417 0 -0.54759C9.2129 2.80115 10.0976 1.95391 10.339 0.850992l0.0185 -0.084542c0.0665 -0.303449 0.4985 -0.305338 0.5676 -0.002481l0.0225 0.098524c0.2504 1.097717 1.1353 1.937797 2.2446 2.130777 0.3086 0.05369 0.3086 0.49669 0 0.55038 -1.1093 0.19298 -1.9942 1.03306 -2.2446 2.13078l-0.0225 0.09852c-0.0691 0.30286 -0.5011 0.30097 -0.5676 -0.00248l-0.0185 -0.08454c-0.2414 -1.10292 -1.1261 -1.95016 -2.23842 -2.14368Z" strokeWidth="1"></path>
        </g>
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
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" className={className}>
        <g>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M3 9.53386c-0.52267 -0.11158 -0.98411 -0.33259 -1.39542 -0.69214C0.967092 8.28445 0.577086 7.49676 0.520362 6.65193s0.224481 -1.67758 0.781758 -2.31508c0.27593 -0.31565 0.61133 -0.57386 0.98706 -0.7599 0.37572 -0.18603 0.78441 -0.29623 1.20272 -0.32432 0.04342 0.00095 0.08619 -0.01054 0.12329 -0.03312 0.03709 -0.02258 0.06695 -0.0553 0.08604 -0.0943 0.28857 -0.83636 0.85515 -1.54852 1.60524 -2.01771 0.7501 -0.46919 1.63837 -0.667052 2.51669 -0.560589 0.87832 0.106463 1.69359 0.510819 2.30984 1.145629 0.6163 0.63481 0.9963 1.46171 1.0767 2.34279 0.0067 0.0464 0.0266 0.0899 0.0572 0.12538 0.0307 0.03547 0.0708 0.06145 0.1157 0.07485 0.6504 0.15322 1.222 0.53959 1.6066 1.08595 0.3846 0.54636 0.5555 1.21479 0.4804 1.8787 -0.0752 0.66392 -0.3912 1.27723 -0.8881 1.72382 -0.3875 0.34816 -0.864 0.57615 -1.3718 0.66162" strokeWidth="1"></path>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M4.52772 11.0958c-0.29811 -0.0519 -0.29811 -0.4798 0 -0.5317 1.07999 -0.1879 1.93897 -1.01049 2.17339 -2.08134l0.01796 -0.08209c0.0645 -0.29462 0.48401 -0.29646 0.55108 -0.00241l0.02182 0.09566c0.24309 1.0658 1.1023 1.88148 2.1793 2.06878 0.29962 0.0522 0.29962 0.4823 0 0.5344 -1.077 0.1874 -1.93621 1.0031 -2.1793 2.0689l-0.02182 0.0956c-0.06707 0.2941 -0.48658 0.2922 -0.55108 -0.0024l-0.01796 -0.0821c-0.23442 -1.0708 -1.0934 -1.8934 -2.17339 -2.0813Z" strokeWidth="1"></path>
        </g>
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
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" className={className}>
        <g>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M5.02002 3.48535h-3.5c-0.26522 0 -0.51957 0.10536 -0.707107 0.29289 -0.187537 0.18754 -0.292893 0.4419 -0.292893 0.70711v8.00005c0 0.2652 0.105356 0.5195 0.292893 0.7071 0.187537 0.1875 0.441887 0.2929 0.707107 0.2929H10.52c0.5523 0 1 -0.4478 1 -1V8.48535" strokeWidth="1"></path>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M0.52002 5.98535h6.5" strokeWidth="1"></path>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m3.02002 10.9854 1.5 -1.50005 -1.5 -1.5" strokeWidth="1"></path>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M6.02002 10.9854h1.5" strokeWidth="1"></path>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M7.39601 3.9486c-0.35093 -0.06105 -0.35093 -0.56483 0 -0.62588 1.27136 -0.22118 2.28254 -1.18955 2.5585 -2.45015l0.02115 -0.09663c0.07594 -0.346833 0.56974 -0.348991 0.64874 -0.002835l0.0257 0.11261c0.2861 1.254655 1.2976 2.214845 2.5654 2.435405 0.3527 0.06137 0.3527 0.56771 0 0.62907 -1.2678 0.22057 -2.2793 1.18076 -2.5654 2.43541l-0.0257 0.11261c-0.079 0.34616 -0.5728 0.344 -0.64874 -0.00283l-0.02115 -0.09663c-0.27596 -1.26061 -1.28714 -2.22897 -2.5585 -2.45015Z" strokeWidth="1"></path>
        </g>
    </svg>
);

export const StripeLogo: React.FC<{ className?: string }> = ({ className = 'h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className={className}>
      <desc>
        Stripe Streamline Icon: https://streamlinehq.com
      </desc>
      <path fill="#635bff" d="M23.75 12.163225c0 -1.671125 -0.80945 -2.989725 -2.356525 -2.989725 -1.553625 0 -2.493625 1.3186 -2.493625 2.97665 0 1.964875 1.109725 2.9571 2.7025 2.9571 0.776825 0 1.364325 -0.17625 1.8082 -0.4243v-1.305575c-0.443875 0.22195 -0.95305 0.359025 -1.5993 0.359025 -0.6332 0 -1.194575 -0.221925 -1.2664 -0.9922h3.1921c0 -0.084875 0.01305 -0.424325 0.01305 -0.580975Zm-3.224725 -0.62015c0 -0.737625 0.450425 -1.04445 0.861675 -1.04445 0.3982 0 0.8225 0.306825 0.8225 1.04445h-1.684175ZM16.38015 9.1735c-0.639725 0 -1.050975 0.300275 -1.27945 0.50915l-0.084875 -0.4047h-1.4361v7.611375l1.63195 -0.345975 0.006525 -1.84735c0.235 0.169725 0.580975 0.41125 1.1554 0.41125 1.168475 0 2.2325 -0.94 2.2325 -3.0093 -0.006525 -1.893075 -1.0836 -2.92445 -2.22595 -2.92445Zm-0.391675 4.497625c-0.38515 0 -0.613625 -0.137075 -0.770275 -0.3068l-0.006525 -2.4218c0.169725 -0.1893 0.404725 -0.319875 0.7768 -0.319875 0.594025 0 1.005275 0.66585 1.005275 1.520975 0 0.874725 -0.404725 1.5275 -1.005275 1.5275ZM11.334175 8.78835l1.638475 -0.3525v-1.325125l-1.638475 0.345975v1.33165Zm0 0.496125h1.638475v5.7118h-1.638475V9.284475Zm-1.755975 0.48305 -0.10445 -0.48305h-1.41v5.7118h1.63195V11.1253c0.385125 -0.50265 1.0379 -0.41125 1.240275 -0.33945v-1.501375c-0.2089 -0.07835 -0.97265 -0.22195 -1.357775 0.48305Zm-3.2639 -1.899575 -1.592775 0.339425 -0.006525 5.22875c0 0.966125 0.724575 1.67765 1.6907 1.67765 0.535275 0 0.92695 -0.097925 1.14235 -0.215425v-1.325125c-0.208875 0.08485 -1.240275 0.385125 -1.240275 -0.580975v-2.317375h1.240275v-1.3904h-1.240275l0.006525 -1.416525ZM1.9015275 10.942525c0 -0.254575 0.20889 -0.3525 0.5548625 -0.3525 0.49611 0 1.122785 0.150125 1.618885 0.417775v-1.534025c-0.5418 -0.215425 -1.077075 -0.300275 -1.618885 -0.300275C1.13125 9.1735 0.25 9.86545 0.25 11.02085c0 1.801675 2.48055 1.51445 2.48055 2.29125 0 0.300275 -0.261105 0.3982 -0.62666 0.3982 -0.5418075 0 -1.23375 -0.22195 -1.782085 -0.522225v1.553625c0.607085 0.2611 1.220695 0.372075 1.782085 0.372075 1.357785 0 2.29126 -0.672375 2.29126 -1.840825 -0.00655 -1.9453 -2.4936225 -1.599325 -2.4936225 -2.330425Z" strokeWidth="0.25"></path>
    </svg>
);

export const SupabaseLogo: React.FC<{ className?: string }> = ({ className = 'h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 96 96" className={className}>
      <desc>
        Supabase Icon Streamline Icon: https://streamlinehq.com
      </desc>
      <path fill="url(#supabase_a)" d="M55.7223 93.4383c-2.4014 3.0241-7.2705 1.3672-7.3284-2.4942l-.846-56.4773h37.9752c6.8784 0 10.7146 7.9445 6.4375 13.3315l-36.2383 45.64Z"></path>
      <path fill="url(#supabase_b)" fillOpacity=".2" d="M55.7223 93.4383c-2.4014 3.0241-7.2705 1.3672-7.3284-2.4942l-.846-56.4773h37.9752c6.8784 0 10.7146 7.9445 6.4375 13.3315l-36.2383 45.64Z"></path>
      <path fill="#3ecf8e" d="M40.278 2.56189c2.4014-3.024436 7.2705-1.36726 7.3284 2.49417l.3707 56.47724h-37.5c-6.87853 0-10.714819-7.9446-6.43753-13.3315L40.278 2.56189Z"></path>
      <defs>
        <linearGradient id="supabase_a" x1="1011.58" x2="3189.12" y1="1286.71" y2="2199.97" gradientUnits="userSpaceOnUse">
          <stop stopColor="#249361"></stop>
          <stop offset="1" stopColor="#3ecf8e"></stop>
        </linearGradient>
        <linearGradient id="supabase_b" x1="139.561" x2="1537.44" y1="-762.054" y2="1869.38" gradientUnits="userSpaceOnUse">
          <stop></stop>
          <stop offset="1" stopOpacity="0"></stop>
        </linearGradient>
      </defs>
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
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" className={className}>
        <g>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M8.8 2.501a1.8 1.8 0 1 0 3.6 0 1.8 1.8 0 1 0 -3.6 0" strokeWidth="1"></path>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M13.3 8.80125v-0.90002c0 -1.4912 -1.2088 -2.70006 -2.7 -2.70006 -1.01687 0 -1.90244 0.56211 -2.36294 1.39254" strokeWidth="1"></path>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M1.6 2.501a1.8 1.8 0 1 0 3.6 0 1.8 1.8 0 1 0 -3.6 0" strokeWidth="1"></path>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M0.699951 8.80125v-0.90002c0 -1.4912 1.208859 -2.70006 2.700059 -2.70006 1.01685 0 1.90241 0.56211 2.36291 1.39254" strokeWidth="1"></path>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M5.201 7.899a1.8 1.8 0 1 0 3.6 0 1.8 1.8 0 1 0 -3.6 0" strokeWidth="1"></path>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M9.70126 13.2989c0 -1.4912 -1.20886 -2.7 -2.70006 -2.7s-2.70005 1.2088 -2.70005 2.7" strokeWidth="1"></path>
        </g>
    </svg>
);

export const VueIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className={className}>
        <path fill="#41B883" d="M18.4 3.6L12 14.8 5.6 3.6H0l12 20.8L24 3.6z"/>
        <path fill="#34495E" d="M12 14.8L5.6 3.6H12l6.4 11.2z"/>
    </svg>
);
// --- END: Added Icons ---

export const LaunchpadIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className={className}>
      <desc>
        Netlify Streamline Icon: https://streamlinehq.com
      </desc>
      <path fill="#05bdba" d="M5.640075 16.726175v-2.406525l0.050175 -0.0502h0.50135l0.050175 0.0502v2.406525l-0.050175 0.050225H5.69025l-0.050175 -0.050225Zm0 -7.04595v-2.4064l0.050175 -0.0502h0.50135l0.050175 0.0502v2.4064l-0.050175 0.050175H5.69025l-0.050175 -0.050175ZM3.46075 14.991325h-0.0709l-0.35445 -0.3546v-0.070925l0.8277 -0.827475 0.375325 0.000175 0.050375 0.049975v0.37535l-0.82805 0.8275Zm-0.00035 -5.98265h-0.0709l-0.35445 0.35465v0.070875l0.8277 0.827525 0.375325 -0.000175 0.050375 -0.050025v-0.375325l-0.82805 -0.827525ZM0.300185 11.699175H3.7094l0.050175 0.050175v0.501325l-0.050175 0.0502H0.300185L0.25 12.250675v-0.501325l0.050185 -0.050175Zm20.190815 0h3.208775l0.050225 0.050175v0.501325l-0.050225 0.0502H20.290625l-0.050225 -0.0502 0.2004 -0.501325 0.0502 -0.050175Z" strokeWidth="0.25"></path>
      <path fill="#014847" d="m9.983 12.214025 -0.050175 0.0502h-1.5552l-0.050175 0.050175c0 0.100375 0.100375 0.401275 0.501675 0.401275 0.15055 0 0.3009 -0.05015 0.351125 -0.15055l0.05015 -0.05015h0.60205l0.050175 0.05015 -0.00325 0.01825c-0.05715 0.3006 -0.312725 0.73435 -1.05025 0.73435 -0.8528 0 -1.25425 -0.60205 -1.25425 -1.304275 0 -0.702225 0.401275 -1.30425 1.204025 -1.30425 0.8028 0 1.2041 0.602025 1.2041 1.30425v0.200575Zm-0.80275 -0.4515 0.05015 -0.050175 -0.0003 -0.00805c-0.00465 -0.071575 -0.06705 -0.39325 -0.4512 -0.39325 -0.401275 0 -0.45145 0.351125 -0.45145 0.4013l0.050175 0.050175h0.802625Zm2.2074 0.75245c0 0.100325 0.050175 0.15055 0.15055 0.15055h0.45145l0.050225 0.05015v0.501675l-0.050225 0.0502h-0.45145c-0.4515 0 -0.852775 -0.20075 -0.852775 -0.752575V11.41125l-0.050225 -0.0502h-0.351075l-0.0502 -0.050175v-0.501675l0.0502 -0.050175h0.351075l0.050225 -0.050175v-0.4515l0.050175 -0.050175h0.602025l0.050175 0.050175v0.4515l0.0502 0.050175h0.55185l0.0502 0.050175v0.501675l-0.0502 0.050175H11.438l-0.0502 0.0502v1.103725h-0.00015Zm1.856125 0.752575h-0.60205l-0.0502 -0.0502V9.80605l0.0502 -0.0502h0.60205l0.050175 0.0502v3.4113l-0.050175 0.0502Zm1.35445 -2.90965h-0.60205l-0.0502 -0.050175v-0.501675l0.0502 -0.0502h0.60205l0.050175 0.0502v0.501675l-0.050175 0.050175Zm0 2.90965h-0.60205l-0.0502 -0.0502v-2.407975l0.0502 -0.050175h0.60205l0.050175 0.050175v2.407975l-0.050175 0.0502Zm2.3578 -3.4615v0.501675l-0.050225 0.050175h-0.45145c-0.100375 0 -0.1506 0.050175 -0.1506 0.15055v0.20075l0.050225 0.050175h0.501675l0.05015 0.050175v0.501675l-0.05015 0.050175h-0.501675l-0.050225 0.0502v1.805925l-0.05015 0.050175h-0.60205l-0.050175 -0.050175v-1.805925l-0.0502 -0.0502h-0.351075l-0.050225 -0.050175v-0.501675l0.050225 -0.050175h0.351075l0.0502 -0.050175v-0.20075c0 -0.545925 0.3927 -0.748225 0.83825 -0.752525l0.466 -0.000075 0.0502 0.0502h0.0002Zm1.8563 3.5115 -0.019225 0.0471c-0.1949 0.47345 -0.404425 0.7557 -1.084675 0.7557H17.4575l-0.050175 -0.050225v-0.50165l0.050175 -0.050175h0.250925l0.029125 -0.00025c0.225625 -0.003925 0.2738 -0.055975 0.322 -0.2005v-0.050175l-0.802625 -1.9565v-0.501675l0.0502 -0.050175h0.451475l0.0502 0.050175 0.60205 1.705775h0.050175l0.602025 -1.705775 0.050175 -0.050175h0.4515l0.050175 0.050175v0.501675l-0.802575 2.006675Zm-12.345225 -0.05 -0.05015 -0.0502 0.000325 -1.453575c0 -0.25075 -0.0986 -0.445175 -0.4013 -0.4515 -0.155625 -0.004025 -0.333725 -0.00035 -0.523975 0.007725l-0.0284 0.029125 0.000375 1.868225 -0.050225 0.0502h-0.60185l-0.050175 -0.0502v-2.434825l0.050175 -0.050175 1.35445 -0.012275c0.67855 0 0.95315 0.466225 0.95315 0.99245v1.504825l-0.05015 0.0502h-0.60225Z" strokeWidth="0.25"></path>
    </svg>
);