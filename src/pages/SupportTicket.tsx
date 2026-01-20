import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { TicketList } from '@/components/support/TicketList';
import { TicketDetail } from '@/components/support/TicketDetail';
import { mockSupportTickets } from '@/data/mockData';
import { SupportTicket as SupportTicketType } from '@/types';
import { toast } from 'sonner';

export default function SupportTicket() {
  const [tickets, setTickets] = useState(mockSupportTickets);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicketType | null>(null);

  const handleStatusChange = (status: string) => {
    if (!selectedTicket) return;
    
    setTickets(prev => prev.map(t => 
      t.id === selectedTicket.id 
        ? { ...t, status: status as SupportTicketType['status'] }
        : t
    ));
    setSelectedTicket(prev => prev ? { ...prev, status: status as SupportTicketType['status'] } : null);
    toast.success(`Ticket status updated to ${status}`);
  };

  const handleSendResponse = (message: string) => {
    if (!selectedTicket) return;
    
    const newResponse = {
      id: `RSP-${Date.now()}`,
      message,
      isAdmin: true,
      createdAt: new Date().toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      author: 'Admin Support',
    };

    setTickets(prev => prev.map(t => 
      t.id === selectedTicket.id 
        ? { ...t, responses: [...t.responses, newResponse], updatedAt: newResponse.createdAt }
        : t
    ));
    setSelectedTicket(prev => prev ? { 
      ...prev, 
      responses: [...prev.responses, newResponse],
      updatedAt: newResponse.createdAt
    } : null);
    toast.success('Response sent successfully');
  };

  return (
    <AdminLayout title="Support Ticket" subtitle="Manage and respond to user support tickets">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ticket List */}
        <div className={selectedTicket ? 'hidden lg:block' : ''}>
          <TicketList
            tickets={tickets}
            onSelectTicket={setSelectedTicket}
            selectedTicketId={selectedTicket?.id}
          />
        </div>

        {/* Ticket Detail */}
        {selectedTicket ? (
          <TicketDetail
            ticket={selectedTicket}
            onBack={() => setSelectedTicket(null)}
            onStatusChange={handleStatusChange}
            onSendResponse={handleSendResponse}
          />
        ) : (
          <div className="hidden lg:flex items-center justify-center bg-card border border-border rounded-lg p-12">
            <div className="text-center text-muted-foreground">
              <p className="text-lg font-medium">Select a ticket</p>
              <p className="text-sm">Choose a ticket from the list to view details</p>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
