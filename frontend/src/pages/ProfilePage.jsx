// import React from "react";

// const ProfilePage = () => {
//   return <div>ProfilePage</div>;
// };

// export default ProfilePage;

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PostCard from "@/components/PostCard";

const ProfilePage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardContent className="flex items-center space-x-4 p-6">
          <Avatar className="w-20 h-20">
            <AvatarImage src="/placeholder-avatar.png" alt="Profile Picture" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">Username</h2>
            <p className="text-gray-500">@handle</p>
            <p className="text-gray-600 mt-2">Bio goes here...</p>
          </div>
          <Button variant="outline">Edit Profile</Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="posts">
        <TabsList className="w-full flex justify-around border-b">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="replies">Replies</TabsTrigger>
          <TabsTrigger value="likes">Likes</TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          <div className="space-y-4">
            <PostCard />
            <PostCard />
            <PostCard />
          </div>
        </TabsContent>

        <TabsContent value="replies">
          <div className="space-y-4">
            <PostCard />
            <PostCard />
          </div>
        </TabsContent>

        <TabsContent value="likes">
          <div className="space-y-4">
            <PostCard />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
