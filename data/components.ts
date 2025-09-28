// This file contains a library of React components for the drag-and-drop studio.
// The code snippets use JSX and Tailwind CSS classes.

export interface StudioComponent {
  title: string;
  category: 'Layout' | 'Forms' | 'Elements' | 'Navigation' | 'Data Display' | 'Feedback';
  code: string;
}

export const components: StudioComponent[] = [
  // Layout
  {
    title: 'Container',
    category: 'Layout',
    code: `<div className="container mx-auto px-4">
  {/* Content goes here */}
</div>`
  },
  {
    title: 'Two-Column Grid',
    category: 'Layout',
    code: `<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>Column 1</div>
  <div>Column 2</div>
</div>`
  },
  {
    title: 'Three-Column Grid',
    category: 'Layout',
    code: `<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>`
  },
  {
    title: 'Flex Container',
    category: 'Layout',
    code: `<div className="flex items-center justify-between">
  <div>Item 1</div>
  <div>Item 2</div>
</div>`
  },
  {
    title: 'Card',
    category: 'Layout',
    code: `<div className="bg-white/10 rounded-lg shadow-md p-6 border border-white/20">
  <h3 className="text-xl font-bold mb-2">Card Title</h3>
  <p className="text-gray-300">This is some content inside the card.</p>
</div>`
  },
  {
    title: 'Divider',
    category: 'Layout',
    code: `<div className="border-t border-gray-700 my-4"></div>`
  },
  {
    title: 'Header Section',
    category: 'Layout',
    code: `<div className="text-center py-12">
  <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Page Title</h1>
  <p className="mt-6 text-lg leading-8 text-gray-300">This is a subtitle or a brief description.</p>
</div>`
  },
  {
    title: 'Simple Footer',
    category: 'Layout',
    code: `<footer className="bg-white/5 border-t border-white/10 mt-12">
  <div className="mx-auto max-w-7xl px-6 py-8">
    <p className="text-center text-xs leading-5 text-gray-400">
      &copy; ${new Date().getFullYear()} Company Name, Inc. All rights reserved.
    </p>
  </div>
</footer>`
  },
  
  // Forms
  {
    title: 'Text Input',
    category: 'Forms',
    code: `<div className="mb-4">
  <label htmlFor="text-input" className="block text-sm font-medium text-gray-300 mb-1">
    Label
  </label>
  <input
    type="text"
    id="text-input"
    placeholder="Enter text..."
    className="w-full bg-white/5 border border-white/20 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>`
  },
  {
    title: 'Email Input',
    category: 'Forms',
    code: `<div className="mb-4">
  <label htmlFor="email-input" className="block text-sm font-medium text-gray-300 mb-1">
    Email Address
  </label>
  <input
    type="email"
    id="email-input"
    placeholder="you@example.com"
    className="w-full bg-white/5 border border-white/20 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>`
  },
  {
    title: 'Password Input',
    category: 'Forms',
    code: `<div className="mb-4">
  <label htmlFor="password-input" className="block text-sm font-medium text-gray-300 mb-1">
    Password
  </label>
  <input
    type="password"
    id="password-input"
    placeholder="••••••••"
    className="w-full bg-white/5 border border-white/20 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>`
  },
  {
    title: 'Textarea',
    category: 'Forms',
    code: `<div className="mb-4">
  <label htmlFor="textarea-input" className="block text-sm font-medium text-gray-300 mb-1">
    Message
  </label>
  <textarea
    id="textarea-input"
    rows={4}
    placeholder="Your message here..."
    className="w-full bg-white/5 border border-white/20 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
  ></textarea>
</div>`
  },
  {
    title: 'Select Dropdown',
    category: 'Forms',
    code: `<div className="mb-4">
  <label htmlFor="select-input" className="block text-sm font-medium text-gray-300 mb-1">
    Choose an option
  </label>
  <select
    id="select-input"
    className="w-full bg-white/5 border border-white/20 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option>Option 1</option>
    <option>Option 2</option>
    <option>Option 3</option>
  </select>
</div>`
  },
  {
    title: 'Checkbox',
    category: 'Forms',
    code: `<div className="flex items-center mb-4">
  <input
    id="checkbox-input"
    type="checkbox"
    className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500"
  />
  <label htmlFor="checkbox-input" className="ml-2 block text-sm text-gray-300">
    I agree to the terms
  </label>
</div>`
  },
  {
    title: 'Radio Group',
    category: 'Forms',
    code: `<fieldset className="mb-4">
  <legend className="text-sm font-medium text-gray-300 mb-2">Select one:</legend>
  <div className="space-y-2">
    <div className="flex items-center">
      <input id="radio1" name="radio-group" type="radio" className="h-4 w-4 bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500" />
      <label htmlFor="radio1" className="ml-2 block text-sm text-gray-300">Choice A</label>
    </div>
    <div className="flex items-center">
      <input id="radio2" name="radio-group" type="radio" className="h-4 w-4 bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500" />
      <label htmlFor="radio2" className="ml-2 block text-sm text-gray-300">Choice B</label>
    </div>
  </div>
</fieldset>`
  },
  {
    title: 'Toggle Switch',
    category: 'Forms',
    code: `<label className="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" className="sr-only peer" />
  <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
  <span className="ml-3 text-sm font-medium text-gray-300">Toggle me</span>
</label>`
  },
  {
    title: 'File Input',
    category: 'Forms',
    code: `<div className="mb-4">
  <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="file_input">Upload file</label>
  <input className="block w-full text-sm text-gray-400 border border-white/20 rounded-lg cursor-pointer bg-white/5 focus:outline-none" id="file_input" type="file" />
</div>`
  },

  // Elements
  {
    title: 'Primary Button',
    category: 'Elements',
    code: `<button className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
  Primary Action
</button>`
  },
  {
    title: 'Secondary Button',
    category: 'Elements',
    code: `<button className="px-4 py-2 bg-white/10 text-white rounded-md font-semibold hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500">
  Secondary Action
</button>`
  },
  {
    title: 'Destructive Button',
    category: 'Elements',
    code: `<button className="px-4 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500">
  Delete
</button>`
  },
  {
    title: 'Icon Button',
    category: 'Elements',
    code: `<button className="p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500">
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
</button>`
  },
  {
    title: 'Avatar',
    category: 'Elements',
    code: `<img className="h-12 w-12 rounded-full object-cover" src="https://via.placeholder.com/150" alt="Avatar" />`
  },
  {
    title: 'Avatar Group',
    category: 'Elements',
    code: `<div className="flex -space-x-4">
  <img className="h-10 w-10 rounded-full object-cover border-2 border-gray-800" src="https://via.placeholder.com/150/1" alt="" />
  <img className="h-10 w-10 rounded-full object-cover border-2 border-gray-800" src="https://via.placeholder.com/150/2" alt="" />
  <img className="h-10 w-10 rounded-full object-cover border-2 border-gray-800" src="https://via.placeholder.com/150/3" alt="" />
  <a className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-800 bg-gray-700 text-xs font-medium text-white hover:bg-gray-600" href="#">+9</a>
</div>`
  },
  {
    title: 'Badge',
    category: 'Elements',
    code: `<span className="inline-flex items-center rounded-full bg-blue-500/20 px-2.5 py-0.5 text-xs font-medium text-blue-300">
  Badge
</span>`
  },
  {
    title: 'Spinner',
    category: 'Elements',
    code: `<div className="animate-spin h-8 w-8 rounded-full border-4 border-t-blue-500 border-gray-600"></div>`
  },
  {
    title: 'Progress Bar',
    category: 'Elements',
    code: `<div className="w-full bg-gray-700 rounded-full h-2.5">
  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
</div>`
  },

  // Navigation
  {
    title: 'Navbar',
    category: 'Navigation',
    code: `<nav className="bg-white/5 border-b border-white/10">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 items-center justify-between">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {/* Your Logo Here */}
          <p className="font-bold">Logo</p>
        </div>
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4">
            <a href="#" className="bg-gray-700 text-white rounded-md px-3 py-2 text-sm font-medium">Dashboard</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Team</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Projects</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>`
  },
  {
    title: 'Pagination',
    category: 'Navigation',
    code: `<nav className="flex items-center justify-between">
  <a href="#" className="px-3 py-1 text-sm bg-white/10 rounded-md hover:bg-white/20">Previous</a>
  <div className="hidden md:flex gap-1">
    <a href="#" className="px-3 py-1 text-sm bg-blue-600 rounded-md">1</a>
    <a href="#" className="px-3 py-1 text-sm bg-white/10 rounded-md hover:bg-white/20">2</a>
    <a href="#" className="px-3 py-1 text-sm bg-white/10 rounded-md hover:bg-white/20">3</a>
  </div>
  <a href="#" className="px-3 py-1 text-sm bg-white/10 rounded-md hover:bg-white/20">Next</a>
</nav>`
  },
  {
    title: 'Breadcrumbs',
    category: 'Navigation',
    code: `<nav className="flex" aria-label="Breadcrumb">
  <ol role="list" className="flex items-center space-x-2 text-sm">
    <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
    <li>
      <div className="flex items-center">
        <span className="text-gray-500 mx-2">/</span>
        <a href="#" className="text-gray-400 hover:text-white">Projects</a>
      </div>
    </li>
    <li>
      <div className="flex items-center">
        <span className="text-gray-500 mx-2">/</span>
        <a href="#" className="text-white font-medium">Current Page</a>
      </div>
    </li>
  </ol>
</nav>`
  },
  {
    title: 'Tabs',
    category: 'Navigation',
    code: `<div className="border-b border-gray-700">
  <nav className="-mb-px flex space-x-8" aria-label="Tabs">
    <a href="#" className="border-blue-500 text-blue-400 whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium">My Account</a>
    <a href="#" className="border-transparent text-gray-400 hover:border-gray-500 hover:text-gray-300 whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium">Company</a>
    <a href="#" className="border-transparent text-gray-400 hover:border-gray-500 hover:text-gray-300 whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium">Billing</a>
  </nav>
</div>`
  },
  {
    title: 'Vertical Nav',
    category: 'Navigation',
    code: `<nav className="space-y-1" aria-label="Sidebar">
  <a href="#" className="bg-gray-700 text-white flex items-center px-3 py-2 text-sm font-medium rounded-md">
    Dashboard
  </a>
  <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white flex items-center px-3 py-2 text-sm font-medium rounded-md">
    Team
  </a>
  <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white flex items-center px-3 py-2 text-sm font-medium rounded-md">
    Projects
  </a>
</nav>`
  },

  // Data Display
  {
    title: 'Simple Table',
    category: 'Data Display',
    code: `<div className="overflow-x-auto rounded-lg border border-white/20">
  <table className="min-w-full divide-y-2 divide-gray-700 bg-white/5 text-sm">
    <thead className="text-left">
      <tr>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Name</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Date of Birth</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Role</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-700">
      <tr>
        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-300">John Doe</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-400">24/05/1995</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-400">Web Developer</td>
      </tr>
      <tr>
        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-300">Jane Doe</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-400">04/11/1998</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-400">Web Designer</td>
      </tr>
    </tbody>
  </table>
</div>`
  },
  {
    title: 'Description List',
    category: 'Data Display',
    code: `<dl className="divide-y divide-gray-700">
  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt className="text-sm font-medium leading-6 text-white">Full name</dt>
    <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">John Doe</dd>
  </div>
  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt className="text-sm font-medium leading-6 text-white">Email address</dt>
    <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">johndoe@example.com</dd>
  </div>
  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt className="text-sm font-medium leading-6 text-white">About</dt>
    <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat.</dd>
  </div>
</dl>`
  },
  {
    title: 'Stats Group',
    category: 'Data Display',
    code: `<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
  <div className="bg-white/5 p-4 rounded-lg border border-white/20">
    <p className="text-sm text-gray-400">Total Sales</p>
    <p className="text-2xl font-medium text-white">$10,240</p>
  </div>
  <div className="bg-white/5 p-4 rounded-lg border border-white/20">
    <p className="text-sm text-gray-400">New Users</p>
    <p className="text-2xl font-medium text-white">345</p>
  </div>
  <div className="bg-white/5 p-4 rounded-lg border border-white/20">
    <p className="text-sm text-gray-400">Active Subscriptions</p>
    <p className="text-2xl font-medium text-white">1,200</p>
  </div>
</div>`
  },
  {
    title: 'Accordion',
    category: 'Data Display',
    code: `<div className="divide-y divide-gray-700 rounded-lg border border-white/20">
  <div>
    <h2>
      <button type="button" className="flex w-full items-center justify-between p-4 font-medium text-left">
        <span>Question 1?</span>
        {/* Add icon for open/close state */}
      </button>
    </h2>
    <div className="p-4">
      <p className="text-gray-400">Answer to question 1.</p>
    </div>
  </div>
  <div>
    <h2>
      <button type="button" className="flex w-full items-center justify-between p-4 font-medium text-left">
        <span>Question 2?</span>
      </button>
    </h2>
    {/* Collapsed content */}
  </div>
</div>`
  },

  // Feedback
  {
    title: 'Alert (Success)',
    category: 'Feedback',
    code: `<div role="alert" className="rounded-lg border-s-4 border-green-500 bg-green-900/50 p-4">
  <strong className="block font-medium text-green-300">Success!</strong>
  <p className="mt-2 text-sm text-green-200">
    Your action was completed successfully.
  </p>
</div>`
  },
  {
    title: 'Alert (Error)',
    category: 'Feedback',
    code: `<div role="alert" className="rounded-lg border-s-4 border-red-500 bg-red-900/50 p-4">
  <strong className="block font-medium text-red-300">Something went wrong</strong>
  <p className="mt-2 text-sm text-red-200">
    There was an error processing your request. Please try again.
  </p>
</div>`
  },
  {
    title: 'Alert (Warning)',
    category: 'Feedback',
    code: `<div role="alert" className="rounded-lg border-s-4 border-yellow-500 bg-yellow-900/50 p-4">
  <strong className="block font-medium text-yellow-300">Warning</strong>
  <p className="mt-2 text-sm text-yellow-200">
    Please be aware of this important information.
  </p>
</div>`
  },
  {
    title: 'Modal',
    category: 'Feedback',
    code: `<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
  <div className="bg-gray-800 border border-white/10 rounded-xl p-6 w-full max-w-md">
    <h3 className="text-lg font-bold">Modal Title</h3>
    <p className="mt-2 text-sm text-gray-400">
      This is the content of the modal.
    </p>
    <div className="mt-4 flex justify-end gap-2">
      <button className="px-3 py-1 text-sm rounded-md hover:bg-white/10">Cancel</button>
      <button className="px-3 py-1 text-sm rounded-md bg-blue-600 hover:bg-blue-700">Confirm</button>
    </div>
  </div>
</div>`
  },
  {
    title: 'Tooltip',
    category: 'Feedback',
    code: `<div className="relative group">
  <button className="bg-white/10 p-2 rounded-full">Hover Me</button>
  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
    Tooltip text
  </span>
</div>`
  },
];
