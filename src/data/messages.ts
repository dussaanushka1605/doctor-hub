import { Patient } from "./patients";

export interface Message {
  id: number;
  conversationId: number;
  senderId: number;
  senderType: 'doctor' | 'patient';
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: number;
  patientId: number;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  patient?: Patient;
  messages?: Message[];
}

export const conversations: Conversation[] = [
  {
    id: 1,
    patientId: 1,
    lastMessage: "I've been experiencing some dizziness in the mornings. Is this normal?",
    lastMessageTime: "2024-12-07T14:30:00Z",
    unreadCount: 1,
  },
  {
    id: 2,
    patientId: 3,
    lastMessage: "The new medication is working well, thank you!",
    lastMessageTime: "2024-12-06T09:15:00Z",
    unreadCount: 0,
  },
  {
    id: 3,
    patientId: 5,
    lastMessage: "Can we reschedule my appointment to next week?",
    lastMessageTime: "2024-12-05T16:45:00Z",
    unreadCount: 0,
  },
  {
    id: 4,
    patientId: 2,
    lastMessage: "I need a refill on my prescription",
    lastMessageTime: "2024-12-04T11:20:00Z",
    unreadCount: 0,
  },
  {
    id: 5,
    patientId: 7,
    lastMessage: "I'm having some side effects from the new medication",
    lastMessageTime: "2024-12-03T13:10:00Z",
    unreadCount: 0,
  },
];

const allMessages: Message[] = [
  // Conversation 1 - John Smith
  {
    id: 1,
    conversationId: 1,
    senderId: 1,
    senderType: 'patient',
    content: "Hello Dr. Johnson, I've been experiencing some dizziness in the mornings. Is this normal?",
    timestamp: "2024-12-07T14:30:00Z",
    read: false,
  },
  {
    id: 2,
    conversationId: 1,
    senderId: 0, // Doctor
    senderType: 'doctor',
    content: "Hello John, morning dizziness can sometimes be related to blood pressure changes. Have you been taking your Lisinopril at the same time each day?",
    timestamp: "2024-12-07T14:45:00Z",
    read: true,
  },
  {
    id: 3,
    conversationId: 1,
    senderId: 1,
    senderType: 'patient',
    content: "I think I've been taking it at different times. Should I be more consistent?",
    timestamp: "2024-12-07T15:00:00Z",
    read: true,
  },
  {
    id: 4,
    conversationId: 1,
    senderId: 0, // Doctor
    senderType: 'doctor',
    content: "Yes, consistency is important. Try taking it at the same time every morning. Also, make sure you're staying hydrated. If the dizziness continues, we might need to adjust your medication.",
    timestamp: "2024-12-07T15:15:00Z",
    read: true,
  },
  {
    id: 5,
    conversationId: 1,
    senderId: 1,
    senderType: 'patient',
    content: "I've been experiencing some dizziness in the mornings. Is this normal?",
    timestamp: "2024-12-07T14:30:00Z",
    read: false,
  },
  
  // Conversation 2 - Michael Brown
  {
    id: 6,
    conversationId: 2,
    senderId: 3,
    senderType: 'patient',
    content: "The new medication is working well, thank you!",
    timestamp: "2024-12-06T09:15:00Z",
    read: true,
  },
  
  // Conversation 3 - Robert Wilson
  {
    id: 7,
    conversationId: 3,
    senderId: 5,
    senderType: 'patient',
    content: "Can we reschedule my appointment to next week?",
    timestamp: "2024-12-05T16:45:00Z",
    read: true,
  },
  {
    id: 8,
    conversationId: 3,
    senderId: 0, // Doctor
    senderType: 'doctor',
    content: "Of course, Robert. What day and time works best for you next week?",
    timestamp: "2024-12-05T17:00:00Z",
    read: true,
  },
  
  // Conversation 4 - Emma Johnson
  {
    id: 9,
    conversationId: 4,
    senderId: 2,
    senderType: 'patient',
    content: "I need a refill on my prescription",
    timestamp: "2024-12-04T11:20:00Z",
    read: true,
  },
  
  // Conversation 5 - David Lee
  {
    id: 10,
    conversationId: 5,
    senderId: 7,
    senderType: 'patient',
    content: "I'm having some side effects from the new medication",
    timestamp: "2024-12-03T13:10:00Z",
    read: true,
  },
  {
    id: 11,
    conversationId: 5,
    senderId: 0, // Doctor
    senderType: 'doctor',
    content: "I'm sorry to hear that, David. Could you please describe the side effects you're experiencing?",
    timestamp: "2024-12-03T13:30:00Z",
    read: true,
  }
];

export const getConversations = (): Conversation[] => {
  return conversations.map(conv => ({
    ...conv,
    patient: getPatientById(conv.patientId)
  })).sort((a, b) => 
    new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
  );
};

export const getConversation = (conversationId: number): (Conversation & { messages: Message[] }) | undefined => {
  const conversation = conversations.find(conv => conv.id === conversationId);
  if (!conversation) return undefined;
  
  return {
    ...conversation,
    patient: getPatientById(conversation.patientId),
    messages: allMessages
      .filter(msg => msg.conversationId === conversationId)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
  };
};

// Helper function to get patient by ID (would typically come from your patients data)
function getPatientById(patientId: number): Patient | undefined {
  // This is a placeholder - in a real app, you would import and use your actual patient data
  // For now, we'll return a minimal patient object with just the ID
  return { id: patientId } as Patient;
}

export const sendMessage = (conversationId: number, content: string, senderId: number): Message => {
  const newMessage: Message = {
    id: Math.max(0, ...allMessages.map(m => m.id)) + 1,
    conversationId,
    senderId,
    senderType: senderId === 0 ? 'doctor' : 'patient',
    content,
    timestamp: new Date().toISOString(),
    read: false,
  };
  
  allMessages.push(newMessage);
  
  // Update the conversation's last message
  const conversation = conversations.find(c => c.id === conversationId);
  if (conversation) {
    conversation.lastMessage = content;
    conversation.lastMessageTime = newMessage.timestamp;
    if (senderId !== 0) { // If message is from patient, increment unread count
      conversation.unreadCount++;
    }
  }
  
  return newMessage;
};
