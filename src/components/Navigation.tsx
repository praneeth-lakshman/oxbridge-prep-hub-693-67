import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X, ChevronDown, User, Settings, LogOut, MessageCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const location = useLocation();
  const { user, loading } = useAuth();
  const { toast } = useToast();
  // Fetch unread message count
  useEffect(() => {
    if (!user) return;

    const fetchUnreadCount = async () => {
      try {
        const { data: conversations } = await supabase
          .from('conversations')
          .select(`
            id,
            messages (
              id,
              created_at,
              sender_type
            )
          `)
          .or(`client_id.eq.${user.id},tutor_id.eq.${user.id}`);

        if (conversations) {
          // Count unread messages (messages from the other party)
          let totalUnread = 0;
          conversations.forEach(conv => {
            const messages = conv.messages || [];
            // For simplicity, we'll just count total messages as unread indicator
            if (messages.length > 0) {
              totalUnread += 1;
            }
          });
          setUnreadCount(totalUnread);
        }
      } catch (error) {
        console.error('Error fetching unread count:', error);
      }
    };

    fetchUnreadCount();
  }, [user]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    }
  };

  const examItems = [
    { name: 'TMUA', path: '/tmua' },
    { name: 'MAT', path: '/mat' },
    { name: 'ESAT', path: '/esat' },
  ];

  const pastPapersItems = [
    { name: 'TMUA Past Papers', path: '/tmua/past-papers' },
    { name: 'MAT Past Papers', path: '/mat/past-papers' },
    { name: 'ESAT Past Papers', path: '/esat/past-papers' },
  ];


  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-2"
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <img src="/lovable-uploads/89824f59-4b90-41ca-b98b-e502aca83a14.png" alt="Oxbridge & Imperial Prep" className="h-12" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Exams Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary text-muted-foreground no-underline">
                Exams
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border border-border shadow-lg z-50">
                {examItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link 
                      to={item.path}
                      className="w-full px-3 py-2 text-sm hover:bg-muted text-foreground no-underline"
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Past Papers Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary text-muted-foreground no-underline">
                Past Papers
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border border-border shadow-lg z-50">
                {pastPapersItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link 
                      to={item.path}
                      className="w-full px-3 py-2 text-sm hover:bg-muted text-foreground no-underline"
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Navigation items */}
            <Link
              to="/interview-prep"
              onClick={(e) => {
                if (location.pathname === '/interview-prep') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className={`text-sm font-medium transition-colors hover:text-primary no-underline ${
                location.pathname === '/interview-prep'
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              Interview Prep
            </Link>

            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-primary no-underline ${
                location.pathname === '/about'
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              About Us
            </Link>
            
            {/* Login Button (when not logged in) */}
            {!loading && !user && (
              <Button 
                variant="outline"
                size="sm"
                asChild
              >
                <Link 
                  to="/login"
                  className="no-underline"
                >
                  Login
                </Link>
              </Button>
            )}

            {/* Meet the Team Button */}
            <Button 
              variant="default"
              asChild
            >
              <Link 
                to="/team"
                className="no-underline"
                onClick={(e) => {
                  if (location.pathname === '/team') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    // Clear any hash from URL
                    window.history.pushState(null, '', '/team');
                  }
                }}
              >
                Book Now
              </Link>
            </Button>

            {/* Tutor Inbox Section (when logged in) */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-foreground">Tutor Inbox</span>
                    {unreadCount > 0 && (
                      <span className="bg-destructive text-destructive-foreground text-xs px-1.5 py-0.5 rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5 text-sm text-muted-foreground">
                    {user.email}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2 w-full">
                      <Settings className="h-4 w-4" />
                      Profile Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link 
                      to="/messages" 
                      className="flex items-center gap-2 w-full"
                      onClick={(e) => {
                        if (location.pathname === '/messages') {
                          e.preventDefault();
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                    >
                      <MessageCircle className="h-4 w-4" />
                      View Messages
                      {unreadCount > 0 && (
                        <span className="ml-auto bg-destructive text-destructive-foreground text-xs px-1.5 py-0.5 rounded-full">
                          {unreadCount}
                        </span>
                      )}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="flex items-center gap-2 text-destructive focus:text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border">
              {/* Mobile Exams Section */}
              <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
                Exams
              </div>
              {examItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block pl-6 pr-3 py-2 text-sm font-medium transition-colors hover:text-primary no-underline ${
                    location.pathname === item.path
                      ? 'text-primary'
                      : 'text-foreground'
                  }`}
                  onClick={(e) => {
                    setIsOpen(false);
                    if (item.name === 'TMUA' && location.pathname === '/tmua') {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else if (item.name === 'MAT' && location.pathname === '/mat') {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else if (item.name === 'ESAT' && location.pathname === '/esat') {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Past Papers Section */}
              <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
                Past Papers
              </div>
              {pastPapersItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block pl-6 pr-3 py-2 text-sm font-medium transition-colors hover:text-primary text-muted-foreground no-underline"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Other navigation items */}
              <Link
                to="/interview-prep"
                className={`block px-3 py-2 text-sm font-medium transition-colors hover:text-primary no-underline ${
                  location.pathname === '/interview-prep'
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
                onClick={(e) => {
                  setIsOpen(false);
                  if (location.pathname === '/interview-prep') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              >
                Interview Prep
              </Link>

              <Link
                to="/about"
                className={`block px-3 py-2 text-sm font-medium transition-colors hover:text-primary no-underline ${
                  location.pathname === '/about'
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
               
               {/* Mobile Auth Section */}
               {user ? (
                 <>
                   <div className="px-3 py-2 text-sm font-medium text-muted-foreground border-t border-border">
                     {user.email}
                   </div>
                    
                    {/* Mobile Tutor Inbox Section */}
                    <Link
                      to="/messages"
                      className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary border border-border rounded-md hover:bg-muted no-underline"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4" />
                        Tutor Inbox
                        {unreadCount > 0 && (
                          <span className="ml-auto bg-destructive text-destructive-foreground text-xs px-1.5 py-0.5 rounded-full">
                            {unreadCount}
                          </span>
                        )}
                      </div>
                    </Link>
                    
                    <Link
                      to="/profile"
                      className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary border border-border rounded-md hover:bg-muted no-underline"
                      onClick={() => setIsOpen(false)}
                    >
                      Profile Settings
                    </Link>
                    <button
                      className="block w-full text-left px-3 py-2 text-sm font-medium text-destructive border border-border rounded-md hover:bg-muted"
                      onClick={() => {
                        setIsOpen(false);
                        handleLogout();
                      }}
                    >
                     Sign Out
                   </button>
                 </>
               ) : (
                 <Link
                   to="/login"
                   className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary border border-border rounded-md hover:bg-muted no-underline"
                   onClick={() => setIsOpen(false)}
                 >
                   Login
                 </Link>
               )}

               {/* Mobile Team Button */}
               <Link
                 to="/team"
                 className="block px-3 py-2 text-sm font-medium bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 no-underline"
                 onClick={(e) => {
                   setIsOpen(false);
                   if (location.pathname === '/team') {
                     e.preventDefault();
                     window.scrollTo({ top: 0, behavior: 'smooth' });
                     // Clear any hash from URL
                     window.history.pushState(null, '', '/team');
                   }
                 }}
               >
                 Book Now
               </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;