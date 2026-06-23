/**
 * MOCK module. The REST backend has been removed; the function below resolves
 * locally with mock data via the `respond` helper (no network calls).
 * The consumer reads notification history as a `res.data` array.
 */
import { respond } from '../_mock/respond';

type MockNotification = {
  id: string;
  title: string;
  description: string;
  link: string;
  image: string;
  createdAt: string;
};

const MOCK_NOTIFICATIONS: MockNotification[] = [
  {
    id: 'notif-1',
    title: 'Welcome to Bonenza',
    description: 'Thanks for joining. Explore the games and have fun!',
    link: '',
    image: '',
    createdAt: new Date().toString(),
  },
];

export const api_getNotificationHistory = async (offset: number, limit: number) => {
  // Only the first page returns mock notifications; further pages are empty.
  return respond(offset > 0 ? [] : MOCK_NOTIFICATIONS);
};
