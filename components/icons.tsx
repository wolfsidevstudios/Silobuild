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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
      <g>
        <path fill="currentColor" fillRule="evenodd" d="M11.5 10c2.5 0 4.625 -0.39167 6.375 -1.175S20.5 7.1 20.5 6s-0.875 -2.04167 -2.625 -2.825S14 2 11.5 2s-4.625 0.39167 -6.375 1.175S2.5 4.9 2.5 6s0.875 2.04167 2.625 2.825S9 10 11.5 10m0 2.5c0.6833 0 1.5375 -0.0708 2.5625 -0.2125 0.4416 -0.061 0.8761 -0.1383 1.3038 -0.2318 -1.3402 0.5947 -2.4418 1.6292 -3.1216 2.9204 -0.2674 0.0159 -0.5157 0.0239 -0.7447 0.0239 -0.6833 0 -1.5375 -0.0708 -2.5625 -0.2125S6.925 14.4167 5.975 14.1s-1.76667 -0.7292 -2.45 -1.2375S2.5 11.7333 2.5 11V8.5c0 0.73333 0.34167 1.35417 1.025 1.8625 0.68333 0.5083 1.5 0.9208 2.45 1.2375s1.9375 0.5458 2.9625 0.6875S10.8167 12.5 11.5 12.5m6.5 -1c-0.2842 0 -0.5642 0.0182 -0.8388 0.0536 0.8921 -0.3102 1.6633 -0.7072 2.3138 -1.1911C20.1583 9.85417 20.5 9.23333 20.5 8.5V11c0 0.3281 -0.0684 0.6336 -0.2052 0.9167 -0.7135 -0.2693 -1.487 -0.4167 -2.2948 -0.4167M11.5 18c0 -0.1682 0.0064 -0.335 0.0189 -0.5H11.5c-0.6833 0 -1.5375 -0.0708 -2.5625 -0.2125S6.925 16.9167 5.975 16.6s-1.76667 -0.7292 -2.45 -1.2375S2.5 14.2333 2.5 13.5V16c0 0.7333 0.34167 1.3542 1.025 1.8625s1.5 0.9208 2.45 1.2375 1.9375 0.5458 2.9625 0.6875S10.8167 20 11.5 20c0.1003 0 0.2043 -0.0015 0.312 -0.0046 -0.2026 -0.6287 -0.312 -1.2993 -0.312 -1.9954m5.5 -4.5c0 1.933 -1.567 3.4999 -3.5 3.4999v2c1.933 0 3.5 1.567 3.5 3.5l1.0001 0.0001H19c0 -1.933 1.567 -3.5001 3.5 -3.5001l0.0001 -2c-1.9329 0 -3.5 -1.5669 -3.5001 -3.4999z" clipRule="evenodd"></path>
      </g>
    </svg>
);
export const SettingsIcon = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" className={className}>
      <g>
        <path fill="currentColor" fillRule="evenodd" d="M9.43876 0.457189c0.47904 -0.609585 1.39284 -0.609585 1.87194 0 0.178 0.226481 0.3013 0.45939 0.4021 0.649781 0.0192 0.03629 0.0376 0.07104 0.0554 0.1039 0.115 0.21232 0.2295 0.39937 0.4254 0.59524 0.1959 0.19586 0.3829 0.31046 0.5952 0.42545 0.0329 0.0178 0.0676 0.03618 0.1039 0.05538 0.1904 0.10079 0.4233 0.22412 0.6498 0.4021 0.6096 0.47905 0.6096 1.39287 0 1.87192 -0.2264 0.17797 -0.4593 0.30127 -0.6497 0.40206 -0.0363 0.01921 -0.0711 0.03762 -0.1039 0.05542 -0.2123 0.11499 -0.3994 0.22959 -0.5953 0.42545 -0.1958 0.19587 -0.3104 0.38292 -0.4254 0.59524 -0.0178 0.03285 -0.0362 0.06758 -0.0554 0.10386 -0.1008 0.19039 -0.2241 0.42334 -0.4021 0.64982 -0.479 0.60959 -1.39286 0.60959 -1.8719 0 -0.17799 -0.22648 -0.30128 -0.45939 -0.40208 -0.64978 -0.01914 -0.03617 -0.03766 -0.07114 -0.0554 -0.1039 -0.115 -0.21232 -0.22959 -0.39937 -0.42546 -0.59524 -0.19586 -0.19586 -0.38291 -0.31046 -0.59523 -0.42545 -0.03287 -0.0178 -0.06761 -0.0362 -0.1039 -0.05541 -0.1904 -0.10079 -0.42331 -0.22409 -0.64979 -0.40207 -0.60958 -0.47905 -0.60958 -1.39287 0 -1.87192 0.22648 -0.17798 0.45938 -0.30128 0.64976 -0.40207 0.03624 -0.01919 0.07108 -0.03763 0.1039 -0.05541 0.21231 -0.11499 0.39936 -0.22959 0.59523 -0.42545 0.19586 -0.19587 0.31046 -0.38292 0.42545 -0.59524 0.01779 -0.03285 0.03618 -0.06758 0.05538 -0.10385 0.1008 -0.190392 0.22411 -0.423351 0.4021 -0.649831ZM5.02075 4.21669c0.34498 -0.01159 0.61524 -0.30066 0.60365 -0.64564 -0.0116 -0.34498 -0.30067 -0.61525 -0.64565 -0.60365 -0.72157 0.02426 -1.42619 0.09276 -2.10216 0.1681 -1.418 0.15806 -2.556563 1.29517 -2.708642 2.71663C0.0781733 6.69124 0 7.57305 0 8.47905c0 0.906 0.0781735 1.78785 0.167948 2.62695 0.15208 1.4214 1.290642 2.5585 2.708642 2.7166 0.84321 0.094 1.73147 0.1775 2.64441 0.1775 0.91293 0 1.80119 -0.0835 2.6444 -0.1775 1.418 -0.1581 2.5566 -1.2952 2.7086 -2.7166 0.0772 -0.7212 0.1457 -1.4737 0.1635 -2.24493 0.008 -0.34508 -0.2653 -0.63128 -0.6104 -0.63924 -0.3451 -0.00795 -0.6313 0.26534 -0.63925 0.61043 -0.01657 0.71876 -0.08072 1.43044 -0.15671 2.14074 -0.06444 0.6023 -0.43409 1.1229 -0.94931 1.4016 -0.21291 -0.4994 -0.54444 -0.9434 -0.97 -1.2913 -0.60353 -0.4933 -1.35905 -0.7627 -2.13853 -0.7627 -0.77948 0 -1.53499 0.2694 -2.13853 0.7627 -0.42696 0.349 -0.76756 0.8223 -0.98576 1.3363 -0.56125 -0.265 -0.97006 -0.8102 -1.03816 -1.4466C1.32236 10.1459 1.25 9.31706 1.25 8.47905c0 -0.838 0.07236 -1.66682 0.16085 -2.49394 0.08941 -0.83563 0.76621 -1.51389 1.60421 -1.6073 0.66646 -0.07429 1.33303 -0.1385 2.00569 -0.16112Zm-0.88441 1.9404c0.35688 -0.35688 0.85733 -0.51914 1.43013 -0.51914 0.5728 0 1.07324 0.16226 1.43013 0.51914 0.35689 0.35689 0.51915 0.85734 0.51915 1.43014 0 0.57279 -0.16226 1.07324 -0.51915 1.43013 -0.35689 0.35689 -0.85733 0.51915 -1.43013 0.51915 -0.5728 0 -1.07325 -0.16226 -1.43013 -0.51915 -0.35689 -0.35689 -0.51915 -0.85734 -0.51915 -1.43013 0 -0.5728 0.16226 -1.07325 0.51915 -1.43014Z" clipRule="evenodd"></path>
      </g>
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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
      <g>
        <path fill="currentColor" fillRule="evenodd" d="M17 1.5c0 1.93296 -1.567 3.49991 -3.5 3.49991v2c1.933 0 3.5 1.56701 3.5 3.49999l1.0001 0.0001H19c0 -1.93298 1.567 -3.50009 3.5 -3.50009l0.0001 -2c-1.9329 0 -3.5 -1.56695 -3.5001 -3.49991zM4.03613 17.8623v2H20.0361v-2zm0 -4v2H20.0361v-2zm0 -4v2h8.99997v-2zm0 -4v2h5.99997v-2z" clipRule="evenodd"></path>
      </g>
    </svg>
);

export const KeyIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5 text-gray-400' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
    </svg>
);

export const GeminiLogo: React.FC<{ className?: string }> = ({ className = 'h-6' }) => (
     <svg className={className} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient x1="38.74%" y1="100%" x2="68.21%" y2="100%" id="a"><stop stop-color="#4285F4" offset="0%"></stop><stop stop-color="#2962FF" offset="100%"></stop></linearGradient><linearGradient x1="31.79%" y1="100%" x2="61.26%" y2="100%" id="b"><stop stop-color="#4285F4" offset="0%"></stop><stop stop-color="#2962FF" offset="100%"></stop></linearGradient></defs><path d="M128 256c70.69 0 128-57.31 128-128S198.69 0 128 0 0 57.31 0 128s57.31 128 128 128z" fillRule="evenodd" fill="#6F32FF"></path><path d="M128 160a32 32 0 100-64 32 32 0 000 64z" fill="#FFF"></path><g fillRule="nonzero" transform="matrix(.48 0 0 .48 66.56 66.56)"><path d="M128 256c70.69 0 128-57.31 128-128S198.69 0 128 0 0 57.31 0 128s57.31 128 128 128z" fill="#6F32FF"></path><path d="M128 160a32 32 0 100-64 32 32 0 000 64z" fill="#FFF"></path><path d="M256 128c0 35.34-14.36 67.24-37.5 90.5L90.5 37.5C113.76 14.36 145.66 0 176 0c44.18 0 80 35.82 80 80v48z" fill="url(#a)"></path><path d="M0 128c0-35.34 14.36-67.24 37.5-90.5L165.5 218.5c-23.26 23.14-55.16 37.5-90.5 37.5-44.18 0-80-35.82-80-80V80z" fill="url(#b)"></path></g></svg>
);

export const VercelIcon: React.FC<{ className?: string }> = ({ className = 'h-6' }) => (
    <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M64 128C99.3462 128 128 99.3462 128 64C128 28.6538 99.3462 0 64 0C28.6538 0 0 28.6538 0 64C0 99.3462 28.6538 128 64 128ZM41.8797 45L64 88L86.1203 45H41.8797Z" fill="currentColor"/>
    </svg>
);

export const SupabaseLogo: React.FC<{ className?: string }> = ({ className = 'h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 96 96" className={className}>
      <defs>
        <linearGradient id="supabase-a" x1="1011.58" x2="3189.12" y1="1286.71" y2="2199.97" gradientUnits="userSpaceOnUse">
          <stop stopColor="#249361"></stop>
          <stop offset="1" stopColor="#3ecf8e"></stop>
        </linearGradient>
        <linearGradient id="supabase-b" x1="139.561" x2="1537.44" y1="-762.054" y2="1869.38" gradientUnits="userSpaceOnUse">
          <stop></stop>
          <stop offset="1" stopOpacity="0"></stop>
        </linearGradient>
      </defs>
      <path fill="url(#supabase-a)" d="M55.7223 93.4383c-2.4014 3.0241-7.2705 1.3672-7.3284-2.4942l-.846-56.4773h37.9752c6.8784 0 10.7146 7.9445 6.4375 13.3315l-36.2383 45.64Z"></path>
      <path fill="url(#supabase-b)" fillOpacity=".2" d="M55.7223 93.4383c-2.4014 3.0241-7.2705 1.3672-7.3284-2.4942l-.846-56.4773h37.9752c6.8784 0 10.7146 7.9445 6.4375 13.3315l-36.2383 45.64Z"></path>
      <path fill="#3ecf8e" d="M40.278 2.56189c2.4014-3.024436 7.2705-1.36726 7.3284 2.49417l.3707 56.47724h-37.5c-6.87853 0-10.714819-7.9446-6.43753-13.3315L40.278 2.56189Z"></path>
    </svg>
);

export const StripeLogo: React.FC<{ className?: string }> = ({ className = 'h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className={className}>
        <path fill="#635bff" d="M23.75 12.163225c0 -1.671125 -0.80945 -2.989725 -2.356525 -2.989725 -1.553625 0 -2.493625 1.3186 -2.493625 2.97665 0 1.964875 1.109725 2.9571 2.7025 2.9571 0.776825 0 1.364325 -0.17625 1.8082 -0.4243v-1.305575c-0.443875 0.22195 -0.95305 0.359025 -1.5993 0.359025 -0.6332 0 -1.194575 -0.221925 -1.2664 -0.9922h3.1921c0 -0.084875 0.01305 -0.424325 0.01305 -0.580975Zm-3.224725 -0.62015c0 -0.737625 0.450425 -1.04445 0.861675 -1.04445 0.3982 0 0.8225 0.306825 0.8225 1.04445h-1.684175ZM16.38015 9.1735c-0.639725 0 -1.050975 0.300275 -1.27945 0.50915l-0.084875 -0.4047h-1.4361v7.611375l1.63195 -0.345975 0.006525 -1.84735c0.235 0.169725 0.580975 0.41125 1.1554 0.41125 1.168475 0 2.2325 -0.94 2.2325 -3.0093 -0.006525 -1.893075 -1.0836 -2.92445 -2.22595 -2.92445Zm-0.391675 4.497625c-0.38515 0 -0.613625 -0.137075 -0.770275 -0.3068l-0.006525 -2.4218c0.169725 -0.1893 0.404725 -0.319875 0.7768 -0.319875 0.594025 0 1.005275 0.66585 1.005275 1.520975 0 0.874725 -0.404725 1.5275 -1.005275 1.5275ZM11.334175 8.78835l1.638475 -0.3525v-1.325125l-1.638475 0.345975v1.33165Zm0 0.496125h1.638475v5.7118h-1.638475V9.284475Zm-1.755975 0.48305 -0.10445 -0.48305h-1.41v5.7118h1.63195V11.1253c0.385125 -0.50265 1.0379 -0.41125 1.240275 -0.33945v-1.501375c-0.2089 -0.07835 -0.97265 -0.22195 -1.357775 0.48305Zm-3.2639 -1.899575 -1.592775 0.339425 -0.006525 5.22875c0 0.966125 0.724575 1.67765 1.6907 1.67765 0.535275 0 0.92695 -0.097925 1.14235 -0.215425v-1.325125c-0.208875 0.08485 -1.240275 0.385125 -1.240275 -0.580975v-2.317375h1.240275v-1.3904h-1.240275l0.006525 -1.416525ZM1.9015275 10.942525c0 -0.254575 0.20889 -0.3525 0.5548625 -0.3525 0.49611 0 1.122785 0.150125 1.618885 0.417775v-1.534025c-0.5418 -0.215425 -1.077075 -0.300275 -1.618885 -0.300275C1.13125 9.1735 0.25 9.86545 0.25 11.02085c0 1.801675 2.48055 1.51445 2.48055 2.29125 0 0.300275 -0.261105 0.3982 -0.62666 0.3982 -0.5418075 0 -1.23375 -0.22195 -1.782085 -0.522225v1.553625c0.607085 0.2611 1.220695 0.372075 1.782085 0.372075 1.357785 0 2.29126 -0.672375 2.29126 -1.840825 -0.00655 -1.9453 -2.4936225 -1.599325 -2.4936225 -2.330425Z" strokeWidth="0.25"></path>
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
  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fill="currentColor" d="M8.2 8.14667c0.35573 -0.30793 0.64107 -0.68873 0.8366 -1.11667 0.19553 -0.42793 0.29673 -0.8929 0.29673 -1.36333 0 -0.88406 -0.3512 -1.7319 -0.97633 -2.35702 -0.62514 -0.62514 -1.473 -0.97631 -2.35702 -0.97631 -0.88405 0 -1.7319 0.35118 -2.35702 0.97631 -0.62514 0.62512 -0.97631 1.47296 -0.97631 2.35702 -0.00001 0.47047 0.1012 0.93544 0.29675 1.36333 0.19555 0.42794 0.48086 0.80874 0.83658 1.11667 -0.93324 0.4226 -1.72502 1.105 -2.28068 1.96566 -0.55566 0.86074 -0.85168 1.8632 -0.85267 2.88767 0 0.1768 0.07024 0.3464 0.19526 0.4714 0.12503 0.125 0.2946 0.19526 0.47141 0.19526s0.34638 -0.07026 0.47141 -0.19526c0.12502 -0.125 0.19526 -0.2946 0.19526 -0.4714 0 -1.06086 0.42143 -2.07826 1.17157 -2.8284 0.75015 -0.75015 1.76756 -1.1716 2.8284 -1.1716s2.07827 0.42145 2.8284 1.1716c0.75018 0.75014 1.1716 1.76754 1.1716 2.8284 0 0.1768 0.0702 0.3464 0.1952 0.4714s0.2946 0.19526 0.4714 0.19526c0.1768 0 0.3464 -0.07026 0.4714 -0.19526s0.1953 -0.2946 0.1953 -0.4714c-0.001 -1.02446 -0.297 -2.02693 -0.85267 -2.88766 -0.55566 -0.86067 -1.3474 -1.54307 -2.28066 -1.96567ZM6 7.66667c -0.39556 0 -0.78224 -0.11727 -1.11114 -0.33707 -0.3289 -0.21973 -0.58525 -0.53213 -0.73662 -0.89756 -0.15137 -0.36546 -0.19098 -0.76759 -0.11381 -1.15555 0.07717 -0.38796 0.26765 -0.74432 0.54736 -1.02403 0.2797 -0.27971 0.63607 -0.47019 1.02403 -0.54736 0.38796 -0.07717 0.79009 -0.03756 1.15558 0.11381 0.3654 0.15138 0.6778 0.40772 0.89753 0.73662 0.6657 0.98813 0.2198 2.31346 -0.99694 2.88278 -0.37507 0.37507 -0.88377 0.5858 -1.4142 0.5858Zm6.49333 0.21333c0.42667 -0.48047 0.70533 -1.07393 0.80253 -1.7091 0.0972 -0.63515 0.0087 -1.28485 -0.25467 -1.8709 -0.26346 -0.58604 -0.69066 -1.08346 -1.2302 -1.43238 -0.53953 -0.34892 -1.1684 -0.5345 -1.808 -0.53467 -0.1768 0 -0.3464 0.07024 -0.4714 0.19526 -0.125 0.12503 -0.1952 0.29459 -0.1952 0.4714s0.0702 0.34638 0.1952 0.47141c0.125 0.125 0.2946 0.19526 0.4714 0.19526 0.5304 0 1.03913 0.21071 1.4142 0.58578 0.37506 0.37507 0.5858 0.88377 0.5858 1.4142 -0.0009 0.35016 -0.0938 0.69393 -0.26927 0.99695 -0.17553 0.30298 -0.42746 0.55465 -0.73073 0.72972 -0.09887 0.057 -0.1814 0.13847 -0.23973 0.23647 -0.0584 0.09806 -0.0906 0.20946 -0.0936 0.32353 -0.0028 0.1132 0.0233 0.2252 0.0758 0.32553 0.0524 0.10027 0.1296 0.1856 0.2242 0.2478l0.26 0.17333 0.0867 0.04667c0.8036 0.38113 1.48153 0.984 1.954 1.73753 0.4724 0.75354 0.71967 1.6264 0.71267 2.5158 0 0.1768 0.07027 0.3464 0.19527 0.4714s0.2946 0.19526 0.4714 0.19526c0.1768 0 0.3464 -0.07026 0.4714 -0.19526s0.1953 -0.2946 0.1953 -0.4714c0.0055 -1.02307 -0.2508 -2.03047 -0.74433 -2.9266 -0.4936 -0.89613 -1.20813 -1.6512 -2.07567 -2.1934Z"></path>
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

export const LaunchpadIcon: React.FC = () => (
    <div className="w-full h-full bg-gray-700 rounded-lg flex items-center justify-center p-2">
        <div className="grid grid-cols-3 gap-1.5">
            <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
            <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
            <div className="w-3 h-3 bg-indigo-500 rounded-sm"></div>
            <div className="w-3 h-3 bg-purple-500 rounded-sm"></div>
            <div className="w-3 h-3 bg-pink-500 rounded-sm"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-sm"></div>
        </div>
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

export const NetlifyIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className={className}>
      <path fill="#05bdba" d="M5.640075 16.726175v-2.406525l0.050175 -0.0502h0.50135l0.050175 0.0502v2.406525l-0.050175 0.050225H5.69025l-0.050175 -0.050225Zm0 -7.04595v-2.4064l0.050175 -0.0502h0.50135l0.050175 0.0502v2.4064l-0.050175 0.050175H5.69025l-0.050175 -0.050175ZM3.46075 14.991325h-0.0709l-0.35445 -0.3546v-0.070925l0.8277 -0.827475 0.375325 0.000175 0.050375 0.049975v0.37535l-0.82805 0.8275Zm-0.00035 -5.98265h-0.0709l-0.35445 0.35465v0.070875l0.8277 0.827525 0.375325 -0.000175 0.050375 -0.050025v-0.375325l-0.82805 -0.827525ZM0.300185 11.699175H3.7094l0.050175 0.050175v0.501325l-0.050175 0.0502H0.300185L0.25 12.250675v-0.501325l0.050185 -0.050175Zm20.190815 0h3.208775l0.050225 0.050175v0.501325l-0.050225 0.0502H20.290625l-0.050225 -0.0502 0.2004 -0.501325 0.0502 -0.050175Z" strokeWidth="0.25"></path>
      <path fill="#014847" d="m9.983 12.214025 -0.050175 0.0502h-1.5552l-0.050175 0.050175c0 0.100375 0.100375 0.401275 0.501675 0.401275 0.15055 0 0.3009 -0.05015 0.351125 -0.15055l0.05015 -0.05015h0.60205l0.050175 0.05015 -0.00325 0.01825c-0.05715 0.3006 -0.312725 0.73435 -1.05025 0.73435 -0.8528 0 -1.25425 -0.60205 -1.25425 -1.304275 0 -0.702225 0.401275 -1.30425 1.204025 -1.30425 0.8028 0 1.2041 0.602025 1.2041 1.30425v0.200575Zm-0.80275 -0.4515 0.05015 -0.050175 -0.0003 -0.00805c-0.00465 -0.071575 -0.06705 -0.39325 -0.4512 -0.39325 -0.401275 0 -0.45145 0.351125 -0.45145 0.4013l0.050175 0.050175h0.802625Zm2.2074 0.75245c0 0.100325 0.050175 0.15055 0.15055 0.15055h0.45145l0.050225 0.05015v0.501675l-0.050225 0.0502h-0.45145c-0.4515 0 -0.852775 -0.20075 -0.852775 -0.752575V11.41125l-0.050225 -0.0502h-0.351075l-0.0502 -0.050175v-0.501675l0.0502 -0.050175h0.351075l0.050225 -0.050175v-0.4515l0.050175 -0.050175h0.602025l0.050175 0.050175v0.4515l0.0502 0.050175h0.55185l0.0502 0.050175v0.501675l-0.0502 0.050175H11.438l-0.0502 0.0502v1.103725h-0.00015Zm1.856125 0.752575h-0.60205l-0.0502 -0.0502V9.80605l0.0502 -0.0502h0.60205l0.050175 0.0502v3.4113l-0.050175 0.0502Zm1.35445 -2.90965h-0.60205l-0.0502 -0.050175v-0.501675l0.0502 -0.0502h0.60205l0.050175 0.0502v0.501675l-0.050175 0.050175Zm0 2.90965h-0.60205l-0.0502 -0.0502v-2.407975l0.0502 -0.050175h0.60205l0.050175 0.050175v2.407975l-0.050175 0.0502Zm2.3578 -3.4615v0.501675l-0.050225 0.050175h-0.45145c-0.100375 0 -0.1506 0.050175 -0.1506 0.15055v0.20075l0.050225 0.050175h0.501675l0.05015 0.050175v0.501675l-0.05015 0.050175h-0.501675l-0.050225 0.0502v1.805925l-0.05015 0.050175h-0.60205l-0.050175 -0.050175v-1.805925l-0.0502 -0.0502h-0.351075l-0.050225 -0.050175v-0.501675l0.050225 -0.050175h0.351075l0.0502 -0.050175v-0.20075c0 -0.545925 0.3927 -0.748225 0.83825 -0.752525l0.466 -0.000075 0.0502 0.0502h0.0002Zm1.8563 3.5115 -0.019225 0.0471c-0.1949 0.47345 -0.404425 0.7557 -1.084675 0.7557H17.4575l-0.050175 -0.050225v-0.50165l0.050175 -0.050175h0.250925l0.029125 -0.00025c0.225625 -0.003925 0.2738 -0.055975 0.322 -0.2005v-0.050175l-0.802625 -1.9565v-0.501675l0.0502 -0.050175h0.451475l0.0502 0.050175 0.60205 1.705775h0.050175l0.602025 -1.705775 0.050175 -0.050175h0.4515l0.050175 0.050175v0.501675l-0.802575 2.006675Zm-12.345225 -0.05 -0.05015 -0.0502 0.000325 -1.453575c0 -0.25075 -0.0986 -0.445175 -0.4013 -0.4515 -0.155625 -0.004025 -0.333725 -0.00035 -0.523975 0.007725l-0.0284 0.029125 0.000375 1.868225 -0.050225 0.0502h-0.60185l-0.050175 -0.0502v-2.434825l0.050175 -0.050175 1.35445 -0.012275c0.67855 0 0.95315 0.466225 0.95315 0.99245v1.504825l-0.05015 0.0502h-0.60225Z" strokeWidth="0.25"></path>
    </svg>
);