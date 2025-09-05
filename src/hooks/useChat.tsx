import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface Message {
  id: string;
  content: string;
  sender_type: 'client' | 'tutor';
  created_at: string;
  conversation_id: string;
}

export interface Conversation {
  id: string;
  tutor_id: string;
  tutor_name: string;
  client_name: string;
  client_email: string;
  created_at: string;
  updated_at: string;
}

export const useChat = (tutorId?: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  // Find or create conversation
  const initializeConversation = async (tutorData: { id: string; name: string }) => {
    if (!user) return;

    try {
      setLoading(true);

      // Check if conversation already exists
      const { data: existingConversation } = await supabase
        .from('conversations')
        .select('*')
        .eq('client_id', user.id)
        .eq('tutor_id', tutorData.id)
        .maybeSingle();

      if (existingConversation) {
        setConversation(existingConversation);
        return existingConversation;
      }

      // Create new conversation
      const { data: newConversation, error } = await supabase
        .from('conversations')
        .insert({
          client_id: user.id,
          tutor_id: tutorData.id,
          tutor_name: tutorData.name,
          client_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Student',
          client_email: user.email
        })
        .select()
        .single();

      if (error) throw error;

      setConversation(newConversation);
      return newConversation;
    } catch (error) {
      console.error('Error initializing conversation:', error);
      toast({
        title: "Error",
        description: "Failed to start conversation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Load messages for conversation
  const loadMessages = async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      setMessages((data || []) as Message[]);
    } catch (error) {
      console.error('Error loading messages:', error);
      toast({
        title: "Error",
        description: "Failed to load messages.",
        variant: "destructive",
      });
    }
  };

  // Send message
  const sendMessage = async (content: string) => {
    if (!conversation || !user || !content.trim()) return;

    try {
      setSending(true);

      const { data, error } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversation.id,
          content: content.trim(),
          sender_type: 'client'
        })
        .select()
        .single();

      if (error) throw error;

      // Message will be added via real-time subscription
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  // Set up real-time subscriptions
  useEffect(() => {
    if (!conversation) return;

    // Load initial messages
    loadMessages(conversation.id);

    // Subscribe to new messages
    const messagesSubscription = supabase
      .channel(`messages:${conversation.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversation.id}`
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages(prev => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messagesSubscription);
    };
  }, [conversation]);

  return {
    conversation,
    messages,
    loading,
    sending,
    initializeConversation,
    sendMessage
  };
};