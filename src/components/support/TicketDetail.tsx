import { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { SupportTicket } from '@/types';

interface TicketDetailProps {
  ticket: SupportTicket;
  onBack: () => void;
  onStatusChange?: (status: string) => void;
  onSendResponse?: (message: string) => void;
}

export function TicketDetail({ ticket, onBack, onStatusChange, onSendResponse }: TicketDetailProps) {
  const [response, setResponse] = useState('');

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive/10 text-destructive';
      case 'medium': return 'bg-warning/10 text-warning';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleSendResponse = () => {
    if (response.trim()) {
      onSendResponse?.(response);
      setResponse('');
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="lg:hidden">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-foreground">{ticket.subject}</h3>
                <p className="text-sm text-muted-foreground">Ticket ID: {ticket.id}</p>
              </div>
              <span className={cn('status-badge', getPriorityColor(ticket.priority))}>
                {ticket.priority} priority
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                {getInitials(ticket.user.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{ticket.user.name}</p>
              <p className="text-xs text-muted-foreground">{ticket.user.email}</p>
            </div>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Status:</span>
            <Select value={ticket.status} onValueChange={onStatusChange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
        {/* Original Message */}
        <div className="flex gap-3">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarFallback className="bg-muted text-muted-foreground text-xs">
              {getInitials(ticket.user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium">{ticket.user.name}</span>
              <span className="text-xs text-muted-foreground">{ticket.createdAt}</span>
            </div>
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm">{ticket.message}</p>
            </div>
          </div>
        </div>

        {/* Responses */}
        {ticket.responses.map((res) => (
          <div key={res.id} className={cn('flex gap-3', res.isAdmin && 'flex-row-reverse')}>
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarFallback className={cn(
                'text-xs',
                res.isAdmin ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              )}>
                {getInitials(res.author)}
              </AvatarFallback>
            </Avatar>
            <div className={cn('flex-1', res.isAdmin && 'text-right')}>
              <div className={cn('flex items-center gap-2 mb-1', res.isAdmin && 'justify-end')}>
                <span className="text-sm font-medium">{res.author}</span>
                <span className="text-xs text-muted-foreground">{res.createdAt}</span>
              </div>
              <div className={cn(
                'p-3 rounded-lg inline-block max-w-[80%]',
                res.isAdmin ? 'bg-primary text-primary-foreground' : 'bg-muted'
              )}>
                <p className="text-sm text-left">{res.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reply Input */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex gap-2">
          <Textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Type your response..."
            className="min-h-[80px] resize-none"
          />
        </div>
        <div className="flex justify-end mt-2">
          <Button onClick={handleSendResponse} disabled={!response.trim()} className="gap-2">
            <Send className="h-4 w-4" />
            Send Response
          </Button>
        </div>
      </div>
    </div>
  );
}
