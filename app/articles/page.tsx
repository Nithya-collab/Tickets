// import React from 'react';

// const ArticlePage = () => {
//       return (

//            <>
//                  Latest Articles
//            </>
//       )
// }

// export default ArticlePage;


// import ArticleList from '@/components/ArticleList';
// import { fetchArticles } from '@/lib/api';

// export default async function ArticlesPage() {
//   const articles = await fetchArticles();

//   return (
//     <div className="articles-page">
//       <h1 className="text-3xl font-bold">Latest Articles</h1>
//       <ArticleList articles={articles} />
//     </div>
//   );
// }

"use client"
import React, { useState, useEffect } from 'react';
import ArticleList from '@/components/ArticleList';
import ArticleFilter from '@/components/ArticleFilter';

interface Article {
  slug:string,
  title:string,
  image:string,
  content:string
}
const ArticlesPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filter, setFilter] = useState('Popular');

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/articles');
        
        // Check if the response is okay (status in the range 200-299)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        console.log('Fetched articles:', data); // Check the data
        setArticles(data);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      }
    };
    
    loadArticles();
  }, []);

  const handleFilterChange = (category: string) => {
    setFilter(category);
    // Optionally, you can fetch new data based on the filter
  };

  return (
    <div className="articles-page">
      <h1 className="text-3xl font-bold">Latest Articles</h1>
      <ArticleFilter categories={['Popular', 'New Arrivals', 'Premiere']} onFilterChange={handleFilterChange} />
      <ArticleList articles={articles} />
    </div>
  );
};

export default ArticlesPage;



// export default async function ArticlesPage() {
//     const res = await fetch('http://localhost:3000/api/articles'); // Fetch from your API
//     const articles = await res.json();
  
//     return (
//       <div className="articles-page">
//         <h1 className="text-3xl font-bold">Latest Articles</h1>
//         <ul>
//           {articles.map((article: { id: number; title: string; content: string; imageUrl: string }) => (
//             <li key={article.id} className="my-4 p-4 bg-gray-200 rounded-lg">
//               <img src={article.imageUrl} alt={article.title} className="w-full h-auto mb-4 rounded-md" />
//               <h2 className="text-2xl">{article.title}</h2>
//               <p>{article.content}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
  
  