'use client';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Home() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedProject, setSelectedProject] = useState('');

  const projects = ['Project 1', 'Project 2', 'Project 3']; // Replace with your actual projects

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Title:', title);
    console.log('Content:', content);
    console.log('Selected Project:', selectedProject);
    // Reset form fields
    setTitle('');
    setContent('');
    setSelectedProject('');
    setOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>DevLog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="mb-8">
        <h1 className="text-4xl font-bold">DevLog</h1>
      </header>

      <main className="flex justify-center">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="px-8 py-4 text-2xl">Post</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[850px]">
            <DialogHeader>
              <DialogTitle>Create Post</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full"
                    placeholder="Enter a title for your post"
                  />
                </div>
                <div>
                  <Label htmlFor="project">Project</Label>
                  <Select value={selectedProject} onValueChange={setSelectedProject}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a project" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((project) => (
                        <SelectItem key={project} value={project}>
                          {project}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      placeholder="Write your post in Markdown..."
                      className="w-full resize-none"
                      rows={10}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                  <div className="border border-gray-300 rounded-md p-2 overflow-auto prose">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit">Post</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </main>

     
    </div>
  );
}