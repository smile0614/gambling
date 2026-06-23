/**
 * Mock-backed user API.
 *
 * The backend has been removed: every `api_*` function below resolves locally
 * with mock data instead of performing a network request. Exported names and
 * parameter signatures are kept identical so existing consumers (profile +
 * settings screens, redux auth reducer) keep working unchanged.
 */
import { UserSettingGeneralType, UserSettingPrivacyType, UserSettingVerifiedType } from '@/base/types/common';

import { mockUser } from '../_mock/db';
import { respond, respondPaged } from '../_mock/respond';

/* -------------------------------------------------------------------------- */
/*                            Local mock data                                 */
/* -------------------------------------------------------------------------- */

/** Profile shape consumed via `res.data.*` in profile/spin/cardVipBonus. */
const mockProfile = {
  id: mockUser.id,
  name: mockUser.name,
  avatar: mockUser.avatar,
  currentVipLevel: 12,
  currentVipMedal: 'Bronze',
  totalWins: 74,
  totalBets: 128,
  totalWageredAmountUsd: 15230.55,
  medals: ['fearlessOne', 'chickenDinner', 'loyalPlayer'],
  topThreeFavoriteGames: [
    { id: 'game_1', title: 'Gates of Olympus', identifier: 'pragmatic:gates_of_olympus', totalWageredAmountUsd: 6200.25 },
    { id: 'game_2', title: 'Sweet Bonanza', identifier: 'pragmatic:sweet_bonanza', totalWageredAmountUsd: 5310.1 },
    { id: 'game_3', title: 'Sugar Rush', identifier: 'pragmatic:sugar_rush', totalWageredAmountUsd: 3720.2 },
  ],
};

/** Per-currency bet statistics consumed via `res.data.map(...)`. */
const mockBetStatistics = [
  {
    currencyLogo: '/img/fiats/USDT.png',
    currencyName: 'USDT',
    totalBets: 80,
    totalWins: 46,
    wageredAmount: 9800,
    wageredAmountUsd: 9800,
  },
  {
    currencyLogo: '/img/fiats/BTC.png',
    currencyName: 'BTC',
    totalBets: 48,
    totalWins: 28,
    wageredAmount: 0.085,
    wageredAmountUsd: 5430.55,
  },
];

/** Medal statistics consumed via `res.data.<medal>`. */
const mockMedalStatistics = {
  fearlessOne: 3,
  callMeRichMan: 1,
  chickenDinner: 5,
  ethstop1: 0,
  highestContributor: 2,
  invincibleLuckyDog: 4,
  loyalPlayer: 7,
  theLoadedKing: 1,
  theOldTimer: 6,
  theTopGun: 2,
};

/** Contest history consumed via `res.data.contest` / `res.data.totalCount`. */
const mockContestHistory = [
  { date: '2024-05-01T00:00:00.000Z', position: 1, prize: 250, prizeUsd: 250, currencyLogo: '/img/fiats/USDT.png' },
  { date: '2024-04-01T00:00:00.000Z', position: 3, prize: 100, prizeUsd: 100, currencyLogo: '/img/fiats/USDT.png' },
  { date: '2024-03-01T00:00:00.000Z', position: 5, prize: 50, prizeUsd: 50, currencyLogo: '/img/fiats/USDT.png' },
];

/** Active sessions consumed via `res.data.sessions` / `page` / `totalCount`. */
const mockSessions = [
  {
    id: 'sess_001',
    lastUsedAt: '2024-06-01T12:00:00.000Z',
    ipAddress: '192.168.1.10',
    location: 'New York, US',
    browser: 'Chrome on Windows',
    active: true,
  },
  {
    id: 'sess_002',
    lastUsedAt: '2024-05-28T08:30:00.000Z',
    ipAddress: '10.0.0.5',
    location: 'London, UK',
    browser: 'Safari on iOS',
    active: false,
  },
];

const mockGeneralSetting = {
  settingShowFullNameCrypto: mockUser.settingShowFullNameCrypto,
  settingReceiveMarketPromotion: mockUser.settingReceiveMarketPromotion,
  settingLanguage: mockUser.settingLanguage,
  settingCurrency: mockUser.settingFiatCurrency.id,
  settingViewInFiat: mockUser.settingViewInFiat,
};

const mockPrivacySetting = {
  settingHideUserName: mockUser.settingHideUserName,
  settingHideGamingData: mockUser.settingHideGamingData,
  settingRefuseTipFromStrangers: mockUser.settingRefuseTipFromStrangers,
};

const mockVerifySetting = {
  emailVerified: mockUser.emailVerified,
  phoneVerified: mockUser.phoneVerified,
};

/* -------------------------------------------------------------------------- */
/*                                Profile                                     */
/* -------------------------------------------------------------------------- */

export const api_getProfile = async (userId: string) => {
  return respond({ ...mockProfile, id: userId || mockProfile.id });
};

export const api_getContestHistory = async (userID: string, page: number, page_size: number) => {
  return respond({ contest: mockContestHistory, totalCount: mockContestHistory.length, page, pageSize: page_size });
};

export const api_editUserName = async (userName: string) => {
  return respond({ ...mockUser, name: userName });
};

export const api_uploadAvatar = async (formData: any) => {
  return respond(mockUser);
};

export const api_uploadIdCards = async (formData: any) => {
  return respond({ success: true });
};

/* -------------------------------------------------------------------------- */
/*                                Settings                                    */
/* -------------------------------------------------------------------------- */

export const api_getGeneralSetting = async () => {
  return respond(mockGeneralSetting);
};

export const api_getPrivacySetting = async () => {
  return respond(mockPrivacySetting);
};

export const api_getVerifySetting = async () => {
  return respond(mockVerifySetting);
};

export const api_updateSetting = async (
  data: UserSettingGeneralType | UserSettingPrivacyType | UserSettingVerifiedType,
) => {
  return respond(mockUser);
};

/* -------------------------------------------------------------------------- */
/*                                Sessions                                    */
/* -------------------------------------------------------------------------- */

export const api_getSessions = async (page: number, limit: number) => {
  return respond({ sessions: mockSessions, totalCount: mockSessions.length, page, pageSize: limit });
};

export const api_deleteSession = async (userSessionId: string) => {
  return respond({ success: true });
};

/* -------------------------------------------------------------------------- */
/*                              Two-factor auth                               */
/* -------------------------------------------------------------------------- */

export const api_generateQRCode = async () => {
  return respond({ secretKey: 'DEMOSECRET234567', qrCodeUrl: '' });
};

export const api_confirmQRCode = async (codeOtp: string, password: string) => {
  return respond({ ...mockUser, tfa: true });
};

export const api_disable2FA = async (codeOtp: string, password: string) => {
  return respond({ ...mockUser, tfa: false });
};

/* -------------------------------------------------------------------------- */
/*                                Statistics                                  */
/* -------------------------------------------------------------------------- */

export const api_medalStatistics = async () => {
  return respond(mockMedalStatistics);
};

export const api_BetStatistics = async (userId: string) => {
  return respond(mockBetStatistics);
};
