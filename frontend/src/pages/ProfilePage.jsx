import React, {useEffect, useState} from 'react';
import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Avatar, AvatarImage, AvatarFallback} from '@/components/ui/avatar';
import {Tabs, TabsList, TabsTrigger, TabsContent} from '@/components/ui/tabs';
import PostCard from '@/components/PostCard';
import {useProfileStore} from '@/store/useProfileStore';
import {Loader2} from 'lucide-react';
import EditProfileModal from '@/components/EditProfileModal';
import {usePostsStore} from '@/store/usePostsStore';

const ProfilePage = () => {
  const {userProfile} = useProfileStore();
  const {userPosts, gettingUserPosts, getUserPosts} = usePostsStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  console.log(userPosts);

  return (
    <div className='max-w-4xl mx-auto p-6 space-y-6'>
      <Card>
        <CardContent className='flex items-center space-x-4 p-6'>
          <Avatar className='w-20 h-20'>
            <AvatarImage src='/placeholder-avatar.png' alt='Profile Picture' />
            <AvatarFallback>
              {userProfile?.fullName ? userProfile.fullName[0] : 'U'}
            </AvatarFallback>
          </Avatar>
          <div className='flex-1'>
            <h2 className='text-xl font-semibold'>{userProfile?.fullName}</h2>
            <p className='text-gray-500'>@{userProfile?.username}</p>
            <p className='text-gray-600 mt-2'>{userProfile?.bio}</p>
          </div>
          <Button variant='outline' onClick={handleEdit}>
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      {gettingUserPosts ? (
        <div className='flex justify-center py-8'>
          <Loader2 className='h-8 w-8 animate-spin text-primary' />
        </div>
      ) : (
        <Tabs defaultValue='posts'>
          <TabsList className='w-full flex justify-around border-b'>
            <TabsTrigger value='posts'>Posts</TabsTrigger>
            <TabsTrigger value='replies'>Replies</TabsTrigger>
            <TabsTrigger value='likes'>Likes</TabsTrigger>
          </TabsList>

          <TabsContent value='posts'>
            <div className='space-y-4'>
              {Array.isArray(userPosts) && userPosts.length > 0 ? (
                userPosts.map((post) => <PostCard key={post._id} post={post} />)
              ) : (
                <div className='text-center py-8 text-gray-500'>
                  No posts to display
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value='replies'>
            <div className='space-y-4'>
              <div className='text-center py-8 text-gray-500'>
                No replies to display
              </div>
            </div>
          </TabsContent>

          <TabsContent value='likes'>
            <div className='space-y-4'>
              <div className='text-center py-8 text-gray-500'>
                No likes to display
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )}

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
};

export default ProfilePage;
