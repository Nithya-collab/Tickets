import { NextResponse } from 'next/server';

const articles = [
  { slug: 'first-article', title: 'First Article', image: '/images/article1.jpg', content: 'Content of the first article.' },
  { slug: 'second-article', title: 'Second Article', image: '/images/article2.jpg', content: 'Content of the second article.' },
];

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const article = articles.find((art) => art.slug === params.slug);
  return article ? NextResponse.json(article) : NextResponse.json({ message: 'Article not found!' }, { status: 404 });
}
