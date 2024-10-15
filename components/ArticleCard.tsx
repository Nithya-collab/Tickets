"use client"
import React from 'react';

const ArticleCard = ({ article }: { article: { slug:string,title:string,image:string,content:string} }) => {
  return (
    <div className="article-card">
      <a href={`/articles/${article.slug}`}>
        <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
        <h3 className="mt-2 text-lg font-bold">{article.title}</h3>
        <p className="text-sm text-gray-500">{article.content}</p>
      </a>
    </div>
  );
};

export default ArticleCard;


//title: string, description: string, image: string, slug: string