import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  PenSquare,
  MoreHorizontal,
  MessageCircle,
  Repeat,
  Heart,
  BarChart2,
  Search,
  Settings,
} from "lucide-react";

const HomePage = () => {
  const posts = [
    {
      id: 1,
      user: {
        name: "Jane Cooper",
        username: "janecooper",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      },
      content:
        "Just shipped a new feature! 🚀 Really excited about this one. Let me know what you think!",
      time: "2h",
      replies: 12,
      reposts: 25,
      likes: 103,
      views: 2435,
    },
    {
      id: 2,
      user: {
        name: "Alex Morgan",
        username: "alexmorgan",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      },
      content:
        "Working on a new design system that will make our app so much more consistent. Design tokens are a game changer!",
      time: "5h",
      replies: 8,
      reposts: 19,
      likes: 87,
      views: 1254,
    },
  ];

  const trendingTopics = [
    { id: 1, category: "Technology", topic: "#ReactJS", posts: "125K" },
    { id: 2, category: "Sports", topic: "Champions League", posts: "95K" },
    {
      id: 3,
      category: "Entertainment",
      topic: "New Movie Release",
      posts: "85K",
    },
    { id: 4, category: "Business", topic: "#TechLayoffs", posts: "56K" },
  ];

  const whoToFollow = [
    {
      id: 1,
      name: "Tech News",
      username: "technews",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tech",
    },
    {
      id: 2,
      name: "Design Weekly",
      username: "designweekly",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=design",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row mx-auto max-w-7xl">
      {/* Main Content */}
      <div className="flex-grow max-w-xl border-x min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm p-4 border-b">
          <h1 className="text-xl font-bold">Home</h1>
        </div>

        {/* Compose Tweet Input */}
        <div className="p-4 border-b">
          <div className="flex gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="" alt="Your avatar" />
              <AvatarFallback>YA</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="mb-3">
                <textarea
                  className="w-full bg-transparent text-lg resize-none outline-none placeholder:text-muted-foreground"
                  placeholder="What's happening?"
                  rows={3}
                />
              </div>
              <div className="flex justify-end">
                <Button size="sm" className="rounded-full px-4">
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* For You / Following Tabs */}
        <div className="grid grid-cols-2 border-b">
          <button className="flex justify-center p-4 hover:bg-accent/50 relative">
            <span className="font-semibold">For You</span>
            <span className="absolute bottom-0 w-16 h-1 bg-primary rounded-full"></span>
          </button>
          <button className="flex justify-center p-4 hover:bg-accent/50 text-muted-foreground">
            <span className="font-semibold">Following</span>
          </button>
        </div>

        {/* Post Feed */}
        <div className="divide-y">
          {posts.map((post) => (
            <article
              key={post.id}
              className="p-4 hover:bg-accent/50 transition-colors"
            >
              <div className="flex gap-3">
                {/* Avatar */}
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarImage src={post.user.avatar} alt={post.user.name} />
                  <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                </Avatar>

                {/* Post Content */}
                <div className="flex-1 min-w-0">
                  {/* Post Header */}
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1 min-w-0">
                      <span className="font-semibold truncate">
                        {post.user.name}
                      </span>
                      <span className="text-muted-foreground truncate">
                        @{post.user.username}
                      </span>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-muted-foreground">{post.time}</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Post Text */}
                  <p className="mb-3">{post.content}</p>

                  {/* Post Actions */}
                  <div className="flex justify-between text-sm text-muted-foreground max-w-md">
                    <button className="flex items-center gap-1 group">
                      <div className="p-2 rounded-full group-hover:bg-sky-500/10 group-hover:text-sky-500">
                        <MessageCircle className="h-4 w-4" />
                      </div>
                      <span>{post.replies}</span>
                    </button>
                    <button className="flex items-center gap-1 group">
                      <div className="p-2 rounded-full group-hover:bg-green-500/10 group-hover:text-green-500">
                        <Repeat className="h-4 w-4" />
                      </div>
                      <span>{post.reposts}</span>
                    </button>
                    <button className="flex items-center gap-1 group">
                      <div className="p-2 rounded-full group-hover:bg-pink-500/10 group-hover:text-pink-500">
                        <Heart className="h-4 w-4" />
                      </div>
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 group">
                      <div className="p-2 rounded-full group-hover:bg-sky-500/10 group-hover:text-sky-500">
                        <BarChart2 className="h-4 w-4" />
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

      {/* Right Sidebar - Trending & Who to Follow */}
      <div className="hidden lg:block w-80 ml-8 mt-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            type="text"
            placeholder="Search"
            className="pl-10 rounded-full bg-muted"
          />
        </div>

        {/* Trending Section */}
        <div className="bg-muted/50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Trends for you</h2>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-8 w-8"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {trendingTopics.map((trend) => (
              <div key={trend.id} className="group cursor-pointer">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {trend.category}
                    </p>
                    <p className="font-semibold group-hover:underline">
                      {trend.topic}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {trend.posts} posts
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-8 w-8 opacity-0 group-hover:opacity-100"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <button className="text-primary text-sm hover:underline">
              Show more
            </button>
          </div>
        </div>

        {/* Who to Follow */}
        <div className="bg-muted/50 rounded-xl p-4">
          <h2 className="text-xl font-bold mb-4">Who to follow</h2>
          <div className="space-y-4">
            {whoToFollow.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{user.name}</p>
                    <p className="text-muted-foreground truncate text-sm">
                      @{user.username}
                    </p>
                  </div>
                </div>
                <Button className="rounded-full text-sm px-4" size="sm">
                  Follow
                </Button>
              </div>
            ))}
            <button className="text-primary text-sm hover:underline">
              Show more
            </button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-xs text-muted-foreground flex flex-wrap gap-x-2 gap-y-1 px-4">
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Cookie Policy
          </a>
          <a href="#" className="hover:underline">
            Accessibility
          </a>
          <a href="#" className="hover:underline">
            Ads info
          </a>
          <a href="#" className="hover:underline">
            More
          </a>
          <span>© 2025 Threads</span>
        </div>
      </div>

      {/* Floating Compose Button - Mobile Only */}
      <div className="fixed bottom-20 right-4 md:hidden">
        <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
          <PenSquare className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
