/**
 * MOCK module. The REST backend has been removed; every `api_*` function below
 * resolves locally with mock data via the `respond` helper (no network calls).
 * Envelopes match exactly what the consuming components read.
 */
import { respond } from '../_mock/respond';

const MOCK_VIP_PROGRESS = {
  totalDepositAmountUsd: 0,
  currentXp: 0,
  currentVipLevel: 0,
  currentVipName: 'Unranked',
  remainingXp: 1000,
  nextVipLevel: 1,
  nextVipName: 'Bronze',
  nextVipXp: 1000,
  nextLevelBonus: 0,
  progress: 0,
  currentVipXp: 0,
};

const MOCK_VIP_LEVEL_SYSTEM = {
  levelUpDetails: [] as any[],
  levelSystem: [] as any[],
};

export const api_getVipProgress = async () => {
  return respond(MOCK_VIP_PROGRESS);
};

export const api_checkDeposit = async () => {
  return respond(0);
};

export const api_vipLevelSystem = async () => {
  return respond(MOCK_VIP_LEVEL_SYSTEM);
};
