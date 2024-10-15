// import React from 'react';

// interface ArticlePageProps{
//      params:{slug:string};
// }
// const ArticlePage : React.FC<ArticlePageProps> = ({ params }) => {
//       return (

//            <>
//                  Latest Article About - {params.slug}
//            </>
//       )
// }

// export default ArticlePage;



export default async function ArticlePage({ params }: { params: { slug: string } }) {
    const res = await fetch('http://localhost:3000/api/articles/' + params.slug); // Fetch from your API
    const article = await res.json();

  return (
    <div className="article-page">
      <h1 className="text-4xl font-bold">{article.title}</h1>
      <img src={article.image} alt={article.title} className="my-4" />
      <p className="text-lg">{article.content}</p>
    </div>
  );
}
