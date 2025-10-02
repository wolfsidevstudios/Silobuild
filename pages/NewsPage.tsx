import React from 'react';

// Data for news items
const newsItems = [
    {
        title: 'Vercel Deployment is Live!',
        description: 'You can now deploy your projects directly to Vercel with a single click. Connect your account in the new Deploy modal.',
        date: 'October 3, 2025',
        image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=1964&auto=format&fit=crop',
        category: 'New Feature'
    },
    {
        title: 'Autosave Feature Added',
        description: 'Never lose your work again! All projects are now automatically saved to your local storage, so you can pick up right where you left off.',
        date: 'September 28, 2025',
        image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=2069&auto=format&fit=crop',
        category: 'Improvement'
    },
    {
        title: 'AI Planning Step Introduced',
        description: 'The AI now presents a detailed to-do list before making changes, giving you more control and transparency over the development process.',
        date: 'September 25, 2025',
        image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop',
        category: 'AI Update'
    }
];

// Data for articles
const articles = [
    {
        title: 'How to Create Your First App',
        description: 'A step-by-step guide from writing your initial prompt to seeing your live application. We cover the basics of the creation flow.',
        link: '#',
        icon: 'play_circle'
    },
    {
        title: 'Making Changes with the AI Chat',
        description: 'Learn the best practices for prompting the AI to modify your code, add new features, and fix bugs effectively.',
        link: '#',
        icon: 'edit'
    },
    {
        title: 'Deploying to the Web with Vercel',
        description: 'Everything you need to know about our Vercel integration, from generating an access token to sharing your live URL.',
        link: '#',
        icon: 'cloud_upload'
    },
    {
        title: 'Understanding the AI\'s Plan',
        description: 'Dive deeper into the planning and to-do list feature to understand how the AI thinks and how you can guide it better.',
        link: '#',
        icon: 'checklist'
    }
];

const NewsCard: React.FC<typeof newsItems[0]> = ({ title, description, date, image, category }) => (
    <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden group">
        <img src={image} alt={title} className="h-40 w-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="p-5">
            <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
                <span>{category}</span>
                <span>{date}</span>
            </div>
            <h3 className="font-bold text-lg text-white mb-1">{title}</h3>
            <p className="text-gray-400 text-sm">{description}</p>
        </div>
    </div>
);

const ArticleCard: React.FC<typeof articles[0]> = ({ title, description, link, icon }) => (
     <a href={link} className="bg-gray-900 border border-gray-800 rounded-lg p-5 hover:border-blue-500 transition-colors cursor-pointer flex items-start gap-4">
        <div className="bg-blue-500/10 text-blue-400 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
            <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div>
            <h3 className="font-bold text-md text-white">{title}</h3>
            <p className="text-gray-400 text-sm mt-1">{description}</p>
        </div>
    </a>
);


export const NewsPage: React.FC = () => {
    return (
        <>
            <header className="bg-gray-950/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-10">
                <div className="container mx-auto px-6 py-4">
                    <h1 className="text-2xl font-bold text-white">News & Updates</h1>
                    <p className="text-gray-400 text-sm mt-1">The latest features and articles from the Silo Build team.</p>
                </div>
            </header>
            <main className="container mx-auto p-6 space-y-12">
                <section>
                    <h2 className="text-xl font-bold text-white mb-4">Latest News & Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {newsItems.map(item => <NewsCard key={item.title} {...item} />)}
                    </div>
                </section>
                <section>
                    <h2 className="text-xl font-bold text-white mb-4">Articles & Guides</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {articles.map(item => <ArticleCard key={item.title} {...item} />)}
                    </div>
                </section>
            </main>
        </>
    );
};