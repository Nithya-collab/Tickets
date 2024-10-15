import { NextResponse } from 'next/server';

// Sample data for demonstration; replace with your database logic
const articles = [
  { slug: 'first-article', title: 'First Article', image: '/images/article1.jpg', content: 'Content of the first article.' },
  { slug: 'second-article', title: 'Second Article', image: '/images/article2.jpg', content: 'Content of the second article.' },
];

export async function GET() {
  return NextResponse.json(articles);
}
