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
import {useParams} from 'react-router-dom';

const ProfilePage = () => {
  const {
    authUserProfile,
    getAuthUserProfile,
    userProfile,
    getUserProfile,
    isGettingUserProfile,
  } = useProfileStore();
  const {userPosts, gettingUserPosts, getUserPosts} = usePostsStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const {username} = useParams(); // Get username from URL

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      if (username) {
        await getUserProfile(username);
      } else {
        await getAuthUserProfile();
      }
      setLoading(false);
    };

    loadProfile();
  }, [username, getUserProfile, getAuthUserProfile]);

  // Load posts after profile is loaded
  useEffect(() => {
    const currentProfile = username ? userProfile : authUserProfile;
    if (currentProfile?.username) {
      console.log('Loading posts for:', currentProfile.username);
      getUserPosts(currentProfile.username);
    }
  }, [username, authUserProfile, userProfile, getUserPosts]);

  // Determine which profile to display
  const profile = username ? userProfile : authUserProfile;

  if (loading || isGettingUserProfile) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader2 className='size-10 animate-spin' />
      </div>
    );
  }

  // User profile not found
  if (username && !userProfile) {
    return (
      <div className='max-w-4xl mx-auto p-6 text-center'>
        <h2 className='text-xl font-semibold'>User not found</h2>
        <p className='mt-2 text-gray-500'>
          The user @{username} could not be found
        </p>
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto p-6 space-y-6'>
      <Card>
        <CardContent className='flex items-center space-x-4 p-6'>
          <Avatar className='w-20 h-20'>
            <AvatarImage src='/placeholder-avatar.png' alt='Profile Picture' />
            <AvatarFallback>
              {profile?.fullName ? profile.fullName[0] : 'U'}
            </AvatarFallback>
          </Avatar>
          <div className='flex-1'>
            <h2 className='text-xl font-semibold'>{profile?.fullName}</h2>
            <p className='text-gray-500'>@{profile?.username}</p>
            <p className='text-gray-600 mt-2'>{profile?.bio}</p>
          </div>
          {!username && ( // Show "Edit Profile" button only for logged-in user
            <Button variant='outline' onClick={() => setIsEditModalOpen(true)}>
              Edit Profile
            </Button>
          )}
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
            <div className='text-center py-8 text-gray-500'>
              No replies to display
            </div>
          </TabsContent>

          <TabsContent value='likes'>
            <div className='text-center py-8 text-gray-500'>
              No likes to display
            </div>
          </TabsContent>
        </Tabs>
      )}

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
};

export default ProfilePage;
