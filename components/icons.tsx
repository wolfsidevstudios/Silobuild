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
        <radialGradient id="gemini_icon_a" cx="0" cy="0" r="1" gradientTransform="matrix(-2072.32066 1142.80298 -920.93925 -1670.0004 -1963.09 569.559)" gradientUnits="userSpaceOnUse">
          <stop stop-color="#5baeff"></stop>
          <stop offset="1" stop-color="#9cbfff"></stop>
        </radialGradient>
        <radialGradient id="gemini_icon_b" cx="0" cy="0" r="1" gradientTransform="rotate(99.204 -669.178 172.924) scale(1150.01 1354.75)" gradientUnits="userSpaceOnUse">
          <stop stop-color="#409dff"></stop>
          <stop offset="1" stop-color="#64b0ff"></stop>
        </radialGradient>
        <radialGradient id="gemini_icon_c" cx="0" cy="0" r="1" gradientTransform="rotate(99.486 -734.543 433.268) scale(2610.06 1245.36)" gradientUnits="userSpaceOnUse">
          <stop stop-color="#177cff"></stop>
          <stop offset="1" stop-color="#4da4ff"></stop>
        </radialGradient>
        <radialGradient id="gemini_icon_e" cx="0" cy="0" r="1" gradientTransform="matrix(908.49998 356.6044 -1785.28922 4548.27586 -520.255 -59.705)" gradientUnits="userSpaceOnUse">
          <stop stop-color="#1c7aff"></stop>
          <stop offset="1" stop-color="#8fb9ff"></stop>
        </radialGradient>
        <linearGradient id="gemini_icon_d" x1="273.737" x2="273.737" y1="246.809" y2="2373.6" gradientUnits="userSpaceOnUse">
          <stop stop-color="#076eff"></stop>
          <stop offset="1" stop-color="#3e93ff"></stop>
        </linearGradient>
        <linearGradient id="gemini_icon_f" x1="259.652" x2="1370.39" y1="48.412" y2="1421.03" gradientUnits="userSpaceOnUse">
          <stop stop-color="#076eff"></stop>
          <stop offset="1" stop-color="#69a3ff"></stop>
        </linearGradient>
      </defs>
    </svg>
);

export const SupabaseLogo = ({ className = 'h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 96 96" className={className}>
      <title>Supabase</title>
      <desc>
        Supabase Icon Streamline Icon: https://streamlinehq.com
      </desc>
      <path fill="url(#supabase_icon_a)" d="M55.7223 93.4383c-2.4014 3.0241-7.2705 1.3672-7.3284-2.4942l-.846-56.4773h37.9752c6.8784 0 10.7146 7.9445 6.4375 13.3315l-36.2383 45.64Z"></path>
      <path fill="url(#supabase_icon_b)" fillOpacity=".2" d="M55.7223 93.4383c-2.4014 3.0241-7.2705 1.3672-7.3284-2.4942l-.846-56.4773h37.9752c6.8784 0 10.7146 7.9445 6.4375 13.3315l-36.2383 45.64Z"></path>
      <path fill="#3ecf8e" d="M40.278 2.56189c2.4014-3.024436 7.2705-1.36726 7.3284 2.49417l.3707 56.47724h-37.5c-6.87853 0-10.714819-7.9446-6.43753-13.3315L40.278 2.56189Z"></path>
      <defs>
        <linearGradient id="supabase_icon_a" x1="1011.58" x2="3189.12" y1="1286.71" y2="2199.97" gradientUnits="userSpaceOnUse">
          <stop stopColor="#249361"></stop>
          <stop offset="1" stopColor="#3ecf8e"></stop>
        </linearGradient>
        <linearGradient id="supabase_icon_b" x1="139.561" x2="1537.44" y1="-762.054" y2="1869.38" gradientUnits="userSpaceOnUse">
          <stop></stop>
          <stop offset="1" stopOpacity="0"></stop>
        </linearGradient>
      </defs>
    </svg>
);

export const StripeLogo = ({ className = 'h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="currentColor">
      <title>Stripe</title>
      <desc>
        Stripe Streamline Icon: https://streamlinehq.com
      </desc>
      <path d="M23.75 12.163225c0 -1.671125 -0.80945 -2.989725 -2.356525 -2.989725 -1.553625 0 -2.493625 1.3186 -2.493625 2.97665 0 1.964875 1.109725 2.9571 2.7025 2.9571 0.776825 0 1.364325 -0.17625 1.8082 -0.4243v-1.305575c-0.443875 0.22195 -0.95305 0.359025 -1.5993 0.359025 -0.6332 0 -1.194575 -0.221925 -1.2664 -0.9922h3.1921c0 -0.084875 0.01305 -0.424325 0.01305 -0.580975Zm-3.224725 -0.62015c0 -0.737625 0.450425 -1.04445 0.861675 -1.04445 0.3982 0 0.8225 0.306825 0.8225 1.04445h-1.684175ZM16.38015 9.1735c-0.639725 0 -1.050975 0.300275 -1.27945 0.50915l-0.084875 -0.4047h-1.4361v7.611375l1.63195 -0.345975 0.006525 -1.84735c0.235 0.169725 0.580975 0.41125 1.1554 0.41125 1.168475 0 2.2325 -0.94 2.2325 -3.0093 -0.006525 -1.893075 -1.0836 -2.92445 -2.22595 -2.92445Zm-0.391675 4.497625c-0.38515 0 -0.613625 -0.137075 -0.770275 -0.3068l-0.006525 -2.4218c0.169725 -0.1893 0.404725 -0.319875 0.7768 -0.319875 0.594025 0 1.005275 0.66585 1.005275 1.520975 0 0.874725 -0.404725 1.5275 -1.005275 1.5275ZM11.334175 8.78835l1.638475 -0.3525v-1.325125l-1.638475 0.345975v1.33165Zm0 0.496125h1.638475v5.7118h-1.638475V9.284475Zm-1.755975 0.48305 -0.10445 -0.48305h-1.41v5.7118h1.63195V11.1253c0.385125 -0.50265 1.0379 -0.41125 1.240275 -0.33945v-1.501375c-0.2089 -0.07835 -0.97265 -0.22195 -1.357775 0.48305Zm-3.2639 -1.899575 -1.592775 0.339425 -0.006525 5.22875c0 0.966125 0.724575 1.67765 1.6907 1.67765 0.535275 0 0.92695 -0.097925 1.14235 -0.215425v-1.325125c-0.208875 0.08485 -1.240275 0.385125 -1.240275 -0.580975v-2.317375h1.240275v-1.3904h-1.240275l0.006525 -1.416525ZM1.9015275 10.942525c0 -0.254575 0.20889 -0.3525 0.5548625 -0.3525 0.49611 0 1.122785 0.150125 1.618885 0.417775v-1.534025c-0.5418 -0.215425 -1.077075 -0.300275 -1.618885 -0.300275C1.13125 9.1735 0.25 9.86545 0.25 11.02085c0 1.801675 2.48055 1.51445 2.48055 2.29125 0 0.300275 -0.261105 0.3982 -0.62666 0.3982 -0.5418075 0 -1.23375 -0.22195 -1.782085 -0.522225v1.553625c0.607085 0.2611 1.220695 0.372075 1.782085 0.372075 1.357785 0 2.29126 -0.672375 2.29126 -1.840825 -0.00655 -1.9453 -2.4936225 -1.599325 -2.4936225 -2.330425Z"/>
    </svg>
);

export const GithubIcon = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="currentColor">
      <title>GitHub</title>
      <desc>
        Github Streamline Icon: https://streamlinehq.com
      </desc>
      <path d="M4.78 11.538h-1.976425c-0.050975 0 -0.09235 0.041425 -0.09235 0.0924v0.966325c0 0.050975 0.041375 0.092475 0.09235 0.092475h0.771025v1.20055s-0.173125 0.059025 -0.651775 0.059025c-0.5646675 0 -1.3535 -0.20635 -1.3535 -1.940925 0 -1.734975 0.8214025 -1.96325 1.59255 -1.96325 0.667525 0 0.9551 0.11755 1.138075 0.174175 0.0575 0.017625 0.110675 -0.039625 0.110675 -0.090675l0.2205 -0.93365c0 -0.02385 -0.0081 -0.052575 -0.035325 -0.072125 -0.0743 -0.053 -0.52765 -0.306675 -1.672975 -0.306675C1.6034125 8.81565 0.25 9.377 0.25 12.0755c0 2.698575 1.549555 3.100725 2.855325 3.100725 1.08115 0 1.737025 -0.462025 1.737025 -0.462025 0.027025 -0.01495 0.029975 -0.0527 0.029975 -0.07005v-3.01375c0 -0.050975 -0.04135 -0.0924 -0.092325 -0.0924Zm10.18025 -2.384575c0 -0.051425 -0.04075 -0.0929 -0.091725 -0.0929h-1.11285c-0.05085 0 -0.092175 0.041475 -0.092175 0.0929 0 0.00025 0.0003 2.150625 0.0003 2.150625h-1.73465v-2.150625c0 -0.051425 -0.040925 -0.0929 -0.091825 -0.0929h-1.1128c-0.050625 0 -0.091925 0.041475 -0.091925 0.0929v5.823225c0 0.051375 0.0413 0.0932 0.091925 0.0932h1.1128c0.0509 0 0.091825 -0.041825 0.091825 -0.0932v-2.4908h1.73465s-0.00305 2.4906 -0.00305 2.4908c0 0.051375 0.041275 0.0932 0.092175 0.0932h1.1155c0.050975 0 0.091725 -0.041825 0.091825 -0.0932V9.153425Zm-8.08385 0.77855c0 -0.400725 -0.321275 -0.724525 -0.717625 -0.724525 -0.39595 0 -0.717475 0.3238 -0.717475 0.724525 0 0.400275 0.321525 0.724975 0.717475 0.724975 0.39635 0 0.717625 -0.3247 0.717625 -0.724975Zm-0.0883 3.819325V11.063275c0 -0.051025 -0.041175 -0.09275 -0.092075 -0.09275h-1.109325c-0.050875 0 -0.096425 0.0525 -0.096425 0.103525v3.851125c0 0.113175 0.070525 0.146825 0.161825 0.146825h0.99945c0.109675 0 0.13655 -0.053825 0.13655 -0.14865v-1.17205Zm12.425375 -2.780775h-1.104325c-0.050625 0 -0.091875 0.041725 -0.091875 0.0931v2.855325s-0.280525 0.20525 -0.678725 0.20525c-0.398175 0 -0.50385 -0.180675 -0.50385 -0.57055v-2.490025c0 -0.051375 -0.04115 -0.0931 -0.091825 -0.0931h-1.1208c-0.050575 0 -0.092025 0.041725 -0.092025 0.0931v2.678575c0 1.15805 0.64545 1.44135 1.53335 1.44135 0.7284 0 1.3157 -0.402425 1.3157 -0.402425s0.027975 0.212075 0.0406 0.23725c0.0127 0.025075 0.04565 0.0504 0.08125 0.0504l0.713025 -0.00315c0.0506 0 0.092025 -0.041825 0.092025 -0.09295l-0.00035 -3.90905c0 -0.051375 -0.041275 -0.0931 -0.092175 -0.0931Zm2.544375 3.155875c-0.383025 -0.01165 -0.642825 -0.185475 -0.642825 -0.185475v-1.844075s0.256325 -0.157125 0.5708 -0.185225c0.397675 -0.0356 0.78085 0.084525 0.78085 1.03315 0 1.000375 -0.172925 1.197775 -0.708825 1.181625Zm0.4356 -3.28095c-0.627225 0 -1.05385 0.279825 -1.05385 0.279825v-1.97185c0 -0.051425 -0.041075 -0.0929 -0.091825 -0.0929h-1.115975c-0.05075 0 -0.091975 0.041475 -0.091975 0.0929v5.823225c0 0.051375 0.041225 0.0932 0.092125 0.0932h0.774275c0.034875 0 0.061275 -0.017975 0.080775 -0.049475 0.019225 -0.0313 0.047 -0.268475 0.047 -0.268475s0.45635 0.43245 1.320225 0.43245c1.01415 0 1.595775 -0.514425 1.595775 -2.3094s-0.9289 -2.0295 -1.55655 -2.0295Zm-12.20245 0.115075h-0.834775s-0.001275 -1.10255 -0.001275 -1.1028c0 -0.041725 -0.0215 -0.0626 -0.06975 -0.0626h-1.137575c-0.044225 0 -0.067975 0.01945 -0.067975 0.06195v1.13965s-0.570075 0.137625 -0.6086 0.148725c-0.0384 0.011125 -0.066675 0.046525 -0.066675 0.08875v0.71615c0 0.051525 0.04115 0.09305 0.092025 0.09305h0.58325v1.722825c0 1.279675 0.8976 1.405375 1.503325 1.405375 0.27675 0 0.607825 -0.088875 0.662475 -0.10905 0.03305 -0.01215 0.05225 -0.046375 0.05225 -0.0835l0.000925 -0.7878c0 -0.051375 -0.043375 -0.092975 -0.09225 -0.092975 -0.04865 0 -0.173075 0.0198 -0.3012 0.0198 -0.410025 0 -0.54895 -0.190675 -0.54895 -0.43745 0 -0.246575 -0.00005 -1.637225 -0.00005 -1.637225h0.834825c0.050875 0 0.09205 -0.041525 0.09205 -0.09305v-0.897c0 -0.051375 -0.041175 -0.092825 -0.09205 -0.092825Z"/>
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
        <path d="M20 3H14C13.4477 3 13 3.44772 3 4V10C13 10.5523 13.4477 11 14 11H20C20.5523 11 21 10.5523 21 10V4C21 3.44772 20.5523 3 20 3Z" fill="#3B82F6"/>
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

export const SchemaIcon = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1" ry="1"></rect>
        <rect x="14" y="3" width="7" height="7" rx="1" ry="1"></rect>
        <rect x="3" y="14" width="7" height="7" rx="1" ry="1"></rect>
        <path d="M10 6.5H14" strokeLinecap="round" />
        <path d="M6.5 10V14" strokeLinecap="round" />
        <path d="M17.5 10V14" strokeLinecap="round" />
        <path d="M10 17.5H14" strokeLinecap="round" />
    </svg>
);