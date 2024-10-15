"use client"
import React from 'react';
import ArticleCard from './ArticleCard';

const ArticleList = ({ articles }: { articles: { slug:string,title:string,image:string,content:string }[] }) => {
  return (
    <div className="article-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map((article, index) => (
        <ArticleCard key={index} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;


// title: string, description: string, image: string, slug: string