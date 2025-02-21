import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Search, Settings, MoreHorizontal } from "lucide-react";

const TrendingSection = () => {

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
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-4">
          {trendingTopics.map((trend) => (
            <div key={trend.id} className="group cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-muted-foreground">{trend.category}</p>
                  <p className="font-semibold group-hover:underline">{trend.topic}</p>
                  <p className="text-xs text-muted-foreground">{trend.posts} posts</p>
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
          <button className="text-primary text-sm hover:underline">Show more</button>
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
          <button className="text-primary text-sm hover:underline">Show more</button>
        </div>
      </div>

      {/* Footer Links */}
      <div className="text-xs text-muted-foreground flex flex-wrap gap-x-2 gap-y-1 px-4">
        <a href="#" className="hover:underline">Terms of Service</a>
        <a href="#" className="hover:underline">Privacy Policy</a>
        <a href="#" className="hover:underline">Cookie Policy</a>
        <a href="#" className="hover:underline">Accessibility</a>
        <a href="#" className="hover:underline">Ads info</a>
        <a href="#" className="hover:underline">More</a>
        <span>© 2025 Threads</span>
      </div>
    </div>
  );
};

export default TrendingSection;