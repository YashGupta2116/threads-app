import React, {useState} from 'react';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {
  PenSquare,
  MoreHorizontal,
  MessageCircle,
  Repeat,
  Heart,
  BarChart2,
} from 'lucide-react';
import {usePostsStore} from '@/store/usePostsStore';
import {useProfileStore} from '@/store/useProfileStore';

const HomePage = () => {
  const {createdPost, createPost, isCreatingPost} = usePostsStore();

  const [postContent, setPostContent] = useState('');

  const {authUserProfile} = useProfileStore();

  const handlePostSubmit = () => {
    if (postContent.trim()) {
      createPost({
        content: postContent,
        username: authUserProfile?.username,
        fullName: authUserProfile?.fullName,
      });
      setPostContent(''); // Clear the input after posting
    }
  };

  const posts = [];

  return (
    <div className='flex flex-col md:flex-row min-h-screen w-full'>
      {/* Main Content */}
      <div className='flex-grow max-w-2xl border-x min-h-screen'>
        {/* Header */}
        <div className='sticky top-0 z-10 bg-background/80 backdrop-blur-sm p-4 border-b'>
          <h1 className='text-xl font-bold'>Home</h1>
        </div>

        {/* Compose Tweet Input */}
        <div className='p-4 border-b'>
          <div className='flex gap-3'>
            <Avatar className='h-10 w-10'>
              <AvatarImage src='' alt='Your avatar' />
              <AvatarFallback>
                {authUserProfile?.fullName[0] || 'G'}
              </AvatarFallback>
            </Avatar>
            <div className='flex-1'>
              <div className='mb-3'>
                <textarea
                  className='w-full bg-transparent text-lg resize-none outline-none placeholder:text-muted-foreground'
                  placeholder="What's happening?"
                  rows={3}
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                />
              </div>
              <div className='flex justify-end'>
                <Button
                  size='sm'
                  onClick={handlePostSubmit}
                  disabled={isCreatingPost || !postContent.trim()}
                  className='rounded-full px-4'
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* For You / Following Tabs */}
        <div className='grid grid-cols-2 border-b'>
          <button className='flex justify-center p-4 hover:bg-accent/50 relative'>
            <span className='font-semibold'>For You</span>
            <span className='absolute bottom-0 w-16 h-1 bg-primary rounded-full'></span>
          </button>
          <button className='flex justify-center p-4 hover:bg-accent/50 text-muted-foreground'>
            <span className='font-semibold'>Following</span>
          </button>
        </div>

        {/* Post Feed */}
        <div className='divide-y'>
          {posts.map((post) => (
            <article
              key={post.id}
              className='p-4 hover:bg-accent/50 transition-colors'
            >
              <div className='flex gap-3'>
                {/* Avatar */}
                <Avatar className='h-10 w-10 flex-shrink-0'>
                  <AvatarImage src={post.user.avatar} alt={post.user.name} />
                  <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                </Avatar>

                {/* Post Content */}
                <div className='flex-1 min-w-0'>
                  {/* Post Header */}
                  <div className='flex items-center justify-between mb-1'>
                    <div className='flex items-center gap-1 min-w-0'>
                      <span className='font-semibold truncate'>
                        {post.user.name}
                      </span>
                      <span className='text-muted-foreground truncate'>
                        @{post.user.username}
                      </span>
                      <span className='text-muted-foreground'>·</span>
                      <span className='text-muted-foreground'>{post.time}</span>
                    </div>
                    <Button variant='ghost' size='icon' className='h-8 w-8'>
                      <MoreHorizontal className='h-4 w-4' />
                    </Button>
                  </div>

                  {/* Post Text */}
                  <p className='mb-3'>{post.content}</p>

                  {/* Post Actions */}
                  <div className='flex justify-between text-sm text-muted-foreground max-w-md'>
                    <button className='flex items-center gap-1 group'>
                      <div className='p-2 rounded-full group-hover:bg-sky-500/10 group-hover:text-sky-500'>
                        <MessageCircle className='h-4 w-4' />
                      </div>
                      <span>{post.replies}</span>
                    </button>
                    <button className='flex items-center gap-1 group'>
                      <div className='p-2 rounded-full group-hover:bg-green-500/10 group-hover:text-green-500'>
                        <Repeat className='h-4 w-4' />
                      </div>
                      <span>{post.reposts}</span>
                    </button>
                    <button className='flex items-center gap-1 group'>
                      <div className='p-2 rounded-full group-hover:bg-pink-500/10 group-hover:text-pink-500'>
                        <Heart className='h-4 w-4' />
                      </div>
                      <span>{post.likes}</span>
                    </button>
                    <button className='flex items-center gap-1 group'>
                      <div className='p-2 rounded-full group-hover:bg-sky-500/10 group-hover:text-sky-500'>
                        <BarChart2 className='h-4 w-4' />
                      </div>
                      <span>{post.views}</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Floating Compose Button - Mobile Only */}
      <div className='fixed bottom-20 right-4 md:hidden'>
        <Button size='icon' className='h-14 w-14 rounded-full shadow-lg'>
          <PenSquare className='h-6 w-6' />
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
