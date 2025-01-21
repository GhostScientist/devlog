'use client';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function Home() {
  const posts = [
    {
      id: 1,
      title: 'First Post',
      project: 'Project 1',
      content: 'This is the content of the first post.'
    },
    {
      id: 2,
      title: 'Second Post',
      project: 'Project 2',
      content: 'This is the content of the second post.'
    },
    {
      id: 3,
      title: 'Third Post',
      project: 'Project 3',
      content: 'This is the content of the third post.'
    }
  ];

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>DevLog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="mb-8">
        <h1 className="text-4xl font-bold">DevLog</h1>
      </header>

      <main className="flex flex-col space-y-4">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`}>
            <Card>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.project}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{post.content}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </main>
    </div>
  );
}
