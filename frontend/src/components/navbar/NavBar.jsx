import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Button} from '@/components/ui/button';
import {
  Home,
  Search,
  Bell,
  Mail,
  User,
  PenSquare,
  LogOut,
  X,
  Bookmark,
  Settings,
} from 'lucide-react';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {authStore} from '@/store/authStore';
import {useProfileStore} from '@/store/useProfileStore';

const Navbar = () => {
  const {authUser, logout} = authStore();

  const {authUserProfile, getAuthUserProfile} = useProfileStore();

  useEffect(() => {
    if (authUser) {
      getAuthUserProfile();
    }
  }, [authUser, getAuthUserProfile]); // Ensure the function is included in dependencies

  const handleLogout = async () => {
    await logout();

    console.log('Logged out successfully');
  };

  const navItems = [
    {name: 'Home', path: '/', icon: <Home className='h-5 w-5' />},
    {name: 'Explore', path: '/explore', icon: <Search className='h-5 w-5' />},
    {
      name: 'Notifications',
      path: '/notifications',
      icon: <Bell className='h-5 w-5' />,
    },
    {name: 'Messages', path: '/messages', icon: <Mail className='h-5 w-5' />},
    {
      name: 'Bookmarks',
      path: '/bookmarks',
      icon: <Bookmark className='h-5 w-5' />,
    },
    {name: 'Profile', path: '/profile', icon: <User className='h-5 w-5' />},
  ];

  return (
    <aside className='fixed left-0 top-0 z-40 h-screen w-16 border-r bg-background/95 pt-5 lg:w-64'>
      {/* Logo */}
      <div className='mb-6 flex justify-center lg:justify-start lg:px-4'>
        <Link to='/' className='flex items-center gap-2'>
          <X />
          <span className='hidden text-xl font-bold lg:inline'>Threads</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className='flex flex-col items-center lg:items-start lg:px-2'>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className='flex w-full items-center gap-3 rounded-md p-3 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground my-1 justify-center lg:justify-start'
          >
            {item.icon}
            <span className='hidden lg:inline'>{item.name}</span>
          </Link>
        ))}
      </nav>

      {/*  */}

      {/* User Profile - Bottom */}
      <div className='absolute bottom-5 left-0 right-0 flex justify-center lg:px-4'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='flex h-12 w-12 items-center justify-center rounded-full lg:w-full lg:justify-start lg:gap-2 lg:px-3'
            >
              <Avatar className='h-8 w-8'>
                <AvatarImage src='' alt='User' />
                <AvatarFallback>
                  {authUserProfile?.profilePic || authUserProfile.fullName[0]}
                </AvatarFallback>
              </Avatar>
              <div className='hidden lg:block text-left'>
                <p className='text-sm font-medium'>
                  {authUserProfile?.fullName || 'Guest'}
                </p>
                <p className='text-xs text-muted-foreground'>
                  {authUserProfile?.username || '@'}
                </p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56' align='end' forceMount>
            <DropdownMenuItem asChild>
              <Link to='/profile/:username' className='flex items-center gap-2'>
                <User className='h-4 w-4' />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to='/settings' className='flex items-center gap-2'>
                <Settings className='h-4 w-4' />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='flex items-center gap-2 text-destructive focus:text-destructive'
              onClick={handleLogout}
            >
              <LogOut className='h-4 w-4' />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
};

export default Navbar;
