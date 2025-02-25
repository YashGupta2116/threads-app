import React from 'react';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {
  MessageCircle,
  Repeat,
  Heart,
  BarChart2,
  MoreHorizontal,
} from 'lucide-react';

const PostCard = ({post}) => {
  // Check if post exists and has content
  if (!post) return null;

  return (
    <article className='p-4 border rounded-lg hover:bg-accent/10 transition-colors'>
      <div className='flex gap-3'>
        {/* Avatar */}
        <Avatar className='h-10 w-10 flex-shrink-0'>
          <AvatarImage
            src={post.user?.avatar || '/placeholder-avatar.png'}
            alt={post.user?.fullName || 'User'}
          />
          <AvatarFallback>{post.user?.fullName?.[0] || 'U'}</AvatarFallback>
        </Avatar>

        {/* Post Content */}
        <div className='flex-1 min-w-0'>
          {/* Post Header */}
          <div className='flex items-center justify-between mb-1'>
            <div className='flex items-center gap-1 min-w-0'>
              <span className='font-semibold truncate'>
                {post.user?.fullName || 'User'}
              </span>
              <span className='text-muted-foreground truncate'>
                @{post.user?.username || 'username'}
              </span>
              <span className='text-muted-foreground'>·</span>
              <span className='text-muted-foreground'>
                {post.createdAt
                  ? new Date(post.createdAt).toLocaleDateString()
                  : 'Just now'}
              </span>
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
              <span>{post.replies?.length || 0}</span>
            </button>
            <button className='flex items-center gap-1 group'>
              <div className='p-2 rounded-full group-hover:bg-green-500/10 group-hover:text-green-500'>
                <Repeat className='h-4 w-4' />
              </div>
              <span>{post.reposts?.length || 0}</span>
            </button>
            <button className='flex items-center gap-1 group'>
              <div className='p-2 rounded-full group-hover:bg-pink-500/10 group-hover:text-pink-500'>
                <Heart className='h-4 w-4' />
              </div>
              <span>{post.likes?.length || 0}</span>
            </button>
            <button className='flex items-center gap-1 group'>
              <div className='p-2 rounded-full group-hover:bg-sky-500/10 group-hover:text-sky-500'>
                <BarChart2 className='h-4 w-4' />
              </div>
              <span>{post.views || 0}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
