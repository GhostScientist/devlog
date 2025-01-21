import { useRouter } from 'next/router';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const BlogDetail = () => {
  const router = useRouter();
  const { id } = router.query;

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

  const post = posts.find((post) => post.id === parseInt(id as string));

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>{post.project}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{post.content}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogDetail;
