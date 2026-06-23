/**
 * MOCK module. The REST backend has been removed; every `api_*` function below
 * resolves locally with mock data via the `respond` helper (no network calls).
 * Envelopes match exactly what the consuming components read.
 */
import { respond } from '../_mock/respond';

type MockSpinItem = {
  symbol: string;
  symbolLogo: string;
  amount: number;
  amountUsd: number;
  id: number;
};

const buildSpinItems = (prefix: string): MockSpinItem[] =>
  Array.from({ length: 8 }).map((_, index) => ({
    symbol: 'USDT',
    symbolLogo: '',
    amount: (index + 1) * 5,
    amountUsd: (index + 1) * 5,
    id: index + 1,
  }));

const MOCK_SPIN_DATA = {
  data: {
    lucky: buildSpinItems('lucky'),
    super: buildSpinItems('super'),
    mega: buildSpinItems('mega'),
  },
  lastSpinner: {
    amount: 25,
    amountUsd: 25,
    symbol: 'USDT',
    symbolLogo: '',
    type: 'lucky',
    userAvatar: '',
    userName: 'Player',
  },
  totalBonusUsd: 0,
};

const MOCK_SPIN_LATEST = Array.from({ length: 5 }).map((_, index) => ({
  amount: (index + 1) * 10,
  amountUsd: (index + 1) * 10,
  symbol: 'USDT',
  symbolLogo: '',
  type: 'lucky',
  userAvatar: '',
  userName: `Player ${index + 1}`,
}));

const nowSeconds = () => Math.floor(Date.now() / 1000);

const MOCK_QUEST_LIST = {
  accumulatedRewards: 0,
  daily: {
    startTime: nowSeconds(),
    endTime: nowSeconds() + 86400,
    currentTime: nowSeconds(),
    quests: [] as any[],
  },
  weekly: {
    startTime: nowSeconds(),
    endTime: nowSeconds() + 604800,
    currentTime: nowSeconds(),
    quests: [] as any[],
  },
};

const MOCK_QUEST_HISTORY = {
  startTime: nowSeconds(),
  endTime: nowSeconds() + 86400,
  unClaimed: { daily: [] as any[], weekly: [] as any[] },
  unFinished: { daily: [] as any[], weekly: [] as any[] },
  claimed: { daily: [] as any[], weekly: [] as any[] },
};

export const api_getSpinData = async () => {
  return respond(MOCK_SPIN_DATA);
};

export const api_getSpinLatest = async () => {
  return respond(MOCK_SPIN_LATEST);
};

export const api_getSpinAvailableCount = async () => {
  return respond({ availableSpinCount: 0 });
};

export const api_postSpinTry = async (spinType: number) => {
  return respond({ spinId: spinType + 1, availableClaim: false, bonusId: '' });
};

export const api_questList = async () => {
  return respond(MOCK_QUEST_LIST);
};

export const api_questHistory = async () => {
  return respond(MOCK_QUEST_HISTORY);
};
