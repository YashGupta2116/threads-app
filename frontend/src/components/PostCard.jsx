import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const PostCard = () => {
  return (
    <Card className="p-4">
      <CardContent>
        <h3 className="text-lg font-semibold">Post Title</h3>
        <p className="text-gray-500">Post content goes here...</p>
      </CardContent>
    </Card>
  );
};

export default PostCard;
