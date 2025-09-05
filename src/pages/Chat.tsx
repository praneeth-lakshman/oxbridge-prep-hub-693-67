import { useParams, Link, Navigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Send, MessageSquare, GraduationCap, User } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

const Chat = () => {
  console.log('Chat component rendering...');
  const { tutorId } = useParams<{ tutorId: string }>();
  console.log('tutorId:', tutorId);
  
  const { user, loading: authLoading } = useAuth();
  console.log('Auth state - user:', user, 'loading:', authLoading);
  
  const [messageInput, setMessageInput] = useState('');
  const [tutor, setTutor] = useState<any>(null);
  const [tutorLoading, setTutorLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load tutor from database
  useEffect(() => {
    const loadTutor = async () => {
      if (!tutorId) {
        setTutorLoading(false);
        return;
      }

      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', tutorId)
          .eq('user_type', 'tutor')
          .single();

        if (error) {
          console.error('Error loading tutor:', error);
          setTutor(null);
        } else {
          // Handle subjects data structure safely
          let specialties: string[] = [];
          if (profile.subjects && typeof profile.subjects === 'object' && !Array.isArray(profile.subjects)) {
            const subjectsObj = profile.subjects as { [key: string]: any };
            if (subjectsObj.exams && Array.isArray(subjectsObj.exams)) {
              specialties = subjectsObj.exams;
            }
          } else if (Array.isArray(profile.subjects)) {
            specialties = profile.subjects as string[];
          }

          setTutor({
            id: profile.id,
            name: profile.name || 'Anonymous Tutor',
            role: "Tutor",
            university: profile.university || 'University',
            course: profile.degree || 'Course',
            year: profile.year || 'Year',
            specialties,
            examRates: profile.exam_rates || {}
          });
        }
      } catch (error) {
        console.error('Error loading tutor:', error);
        setTutor(null);
      } finally {
        setTutorLoading(false);
      }
    };

    loadTutor();
  }, [tutorId]);

  console.log('Found tutor:', tutor);
  
  const { conversation, messages, loading, sending, initializeConversation, sendMessage } = useChat();
  console.log('Chat hook state:', { conversation, messages: messages?.length, loading, sending });

  // Redirect to login if not authenticated
  if (!authLoading && !user) {
    return <Navigate to="/login" replace />;
  }

  // Initialize conversation when component mounts
  useEffect(() => {
    if (tutor && user) {
      initializeConversation({ id: tutor.id, name: tutor.name });
    }
  }, [tutor, user]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || sending) return;

    await sendMessage(messageInput);
    setMessageInput('');
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (authLoading || loading || tutorLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md text-center">
          <CardContent className="p-8">
            <h1 className="text-2xl font-bold text-foreground mb-4">Tutor Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The requested tutor could not be found.
            </p>
            <Button asChild>
              <Link to="/team">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Team
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/team">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Team
            </Link>
          </Button>

          <Card className="shadow-elegant">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">Chat with {tutor.name}</CardTitle>
                  <p className="text-muted-foreground">
                    {tutor.year} {tutor.course} Student at {tutor.university}
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Chat Interface */}
        <Card className="shadow-elegant h-[600px] flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Start your conversation with {tutor.name}
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Ask questions about their tutoring services, availability, or any other queries you might have.
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    message.sender_type === 'client' ? "justify-end" : "justify-start"
                  )}
                >
                  {message.sender_type === 'tutor' && (
                    <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="h-4 w-4 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={cn(
                      "max-w-[70%] rounded-lg px-4 py-2",
                      message.sender_type === 'client'
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={cn(
                      "text-xs mt-1 opacity-70",
                      message.sender_type === 'client' ? "text-primary-foreground" : "text-muted-foreground"
                    )}>
                      {formatTime(message.created_at)}
                    </p>
                  </div>

                  {message.sender_type === 'client' && (
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t border-border p-4">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type your message..."
                disabled={sending}
                className="flex-1"
              />
              <Button 
                type="submit" 
                disabled={!messageInput.trim() || sending}
                size="icon"
              >
                {sending ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
          </div>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 bg-muted/30">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground text-center">
              💡 This is a direct message with your tutor. They'll respond as soon as they're available. 
              Free taster lessons available!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chat;