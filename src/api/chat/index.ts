/**
 * MOCK module. The REST backend has been removed; every `api_*` function below
 * resolves locally with mock data via the `respond` helper (no network calls).
 * Consumers read chat history as a `res.data` array.
 */
import { respond } from '../_mock/respond';

type MockChatMessage = {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userVipLevel: number;
  time: string;
  text: string;
  replyId: string;
  replyText: string;
  replyTime: string;
  replyUserId: string;
  replyUserName: string;
  replyUserVipLevel: number;
};

const MOCK_CHAT_HISTORY: MockChatMessage[] = [
  {
    id: 'msg-1',
    userId: 'user-1',
    userName: 'Bonenza',
    userAvatar: '',
    userVipLevel: 1,
    time: new Date().toISOString(),
    text: 'Welcome to the chat!',
    replyId: '',
    replyText: '',
    replyTime: '',
    replyUserId: '',
    replyUserName: '',
    replyUserVipLevel: 0,
  },
];

export const api_getChatHistory = async (offset: number, limit: number) => {
  // Only the first page returns mock messages; further pages are empty.
  return respond(offset > 0 ? [] : MOCK_CHAT_HISTORY);
};

export const api_sendChat = async (text: string, replyId?: string) => {
  return respond({ success: true });
};

export const api_leaveMessage = async (text: string) => {
  return respond({ success: true });
};
