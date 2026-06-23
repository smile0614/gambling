/**
 * Mock-backed bonus / affiliate API.
 *
 * The real REST backend has been removed. Every `api_*` function below now
 * resolves locally with mock data shaped to exactly match what each consumer
 * reads (see the per-function notes). No network requests are made.
 */
import { respond } from '../_mock/respond';

export type bonusCategoryType = 'all' | 'level_up' | 'weekly_cashback' | 'monthly_cashback' | 'deposit_bonus';

/* ------------------------------------------------------------------ */
/* Local mock data                                                     */
/* ------------------------------------------------------------------ */

const USDT_LOGO = '/img/coin/usdt.png';

// Consumed by redux wallet.reducer `getBonusList` which maps over `result.data`.
const MOCK_CLAIM_LIST = [
  {
    id: 'bonus-level-up-1',
    amount: 25,
    amountUsd: 25,
    type: 'level_up',
    typeName: 'Level Up Bonus',
    allowClaim: true,
    symbolName: 'USDT',
    symbolLogo: USDT_LOGO,
  },
  {
    id: 'bonus-weekly-1',
    amount: 10,
    amountUsd: 10,
    type: 'weekly_cashback',
    typeName: 'Weekly Cashback',
    allowClaim: false,
    symbolName: 'USDT',
    symbolLogo: USDT_LOGO,
  },
];

/* ------------------------------------------------------------------ */
/* Affiliate                                                           */
/* ------------------------------------------------------------------ */

// Consumer (affiliate/dashboard.tsx, pages/affiliate) reads named fields off
// `_res.data`: totalRewardEarnedUsd, totalFriendsReferred, totalReferralRewardsUsd,
// totalCommissionRewardsUsd, totalRewardsSentToDate, rewardsActivities[],
// recentRewardsActivities[].
export const api_affiliate = async () => {
  return respond({
    totalRewardEarnedUsd: 0,
    totalFriendsReferred: 0,
    totalReferralRewardsUsd: 0,
    totalCommissionRewardsUsd: 0,
    totalRewardsSentToDate: 0,
    rewardsActivities: [] as Array<{ type: string; amountUsd: number }>,
    recentRewardsActivities: [] as Array<{ logo: string; name: string; amountUsd: number }>,
  });
};

// Consumer (affiliate/referralcode.tsx) reads `_res.data.friends[]` and
// `_res.data.totalCount`.
export const api_affiliateFriends = async (
  page: number,
  pageSize: number,
  userName: string | undefined = undefined,
  userId: string | undefined = undefined,
  registrationStartDate: number | undefined = undefined,
  registrationEndDate: number | undefined = undefined,
  wagerStartDate: number | undefined = undefined,
  wagerEndDate: number | undefined = undefined,
) => {
  void page;
  void pageSize;
  void userName;
  void userId;
  void registrationStartDate;
  void registrationEndDate;
  void wagerStartDate;
  void wagerEndDate;
  return respond({
    friends: [] as Array<Record<string, unknown>>,
    totalCount: 0,
  });
};

// Consumer (affiliate/rewards.tsx `getRewards`) reads named amount fields off
// `_res.data`.
export const api_affiliateRewards = async () => {
  return respond({
    totalCommissionRewardsReceivedAmountUsd: 0,
    commissionRewardsAvailableAmountUsd: 0,
    totalReferralRewardsReceivedAmountUsd: 0,
    referralRewardsAvailableAmountUsd: 0,
  });
};

// Mutation. Consumer (affiliate/rewards.tsx `handleWithdraw`) only awaits it.
export const api_affiliateRewardsWithdraw = async () => {
  return respond({ success: true });
};

// Consumer (affiliate/rewards.tsx `getCommissionData`) reads `_res.data.rewards[]`
// and `_res.data.totalCount`.
export const api_affiliateCommissionRewardsHistory = async (page: number, pageSize: number) => {
  void page;
  void pageSize;
  return respond({
    rewards: [] as Array<Record<string, unknown>>,
    totalCount: 0,
  });
};

// Consumer (affiliate/rewards.tsx `getReferralData`) reads `_res.data.rewards[]`
// and `_res.data.totalCount`.
export const api_affiliateReferralRewardsHistory = async (
  page: number,
  pageSize: number,
  userName: string | undefined = undefined,
  registrationStartDate: number | undefined = undefined,
  registrationEndDate: number | undefined = undefined,
) => {
  void page;
  void pageSize;
  void userName;
  void registrationStartDate;
  void registrationEndDate;
  return respond({
    rewards: [] as Array<Record<string, unknown>>,
    totalCount: 0,
  });
};

/* ------------------------------------------------------------------ */
/* Bonus / rewards                                                     */
/* ------------------------------------------------------------------ */

// Consumer (modal/rakeBack/bonusHistory) reads `_res.data.bonuses[]` and
// `_res.data.totalCount`.
export const api_bonusUsdtHistory = async (page: number, pageSize: number) => {
  void page;
  void pageSize;
  return respond({
    bonuses: [] as Array<Record<string, unknown>>,
    totalCount: 0,
  });
};

// Consumer (redux wallet.reducer `getBonusList`) maps over `result.data`.
export const api_bonusClaimList = async () => {
  return respond(MOCK_CLAIM_LIST);
};

// Mutation. Consumers (rewardDropdown, luckySpinClaim, quest) only await it.
export const api_bonusClaim = async (bonusId: string, type: string = 'level_up') => {
  void bonusId;
  void type;
  return respond({ success: true });
};

// Consumer (bonusLogged/index.page `getBonusStatistics`) reads many named fields
// off `_res.data`, including nested `generalBonus.*`.
export const api_bonusStatistics = async () => {
  return respond({
    totalBonusClaimedUsd: 0,
    totalVipBonusUsd: 0,
    totalSpecialBonusUsd: 0,
    totalGeneralBonusUsd: 0,
    generalBonus: {
      deposit: { depositTimes: 0 },
      spin: {
        logs: [] as Array<{ type: string; time: string }>,
        availableCount: 0,
        reachVipLevel: 0,
        requiredWagerAmountUsd: 0,
        startTime: 0,
        endTime: 0,
        currentWagerAmountUsd: 0,
      },
      quest: {
        dailyCompleteCount: 0,
        weeklyCompleteCount: 0,
      },
    },
  });
};

// `api_bonusDetail` is exported for parity; no current consumer reads a specific
// envelope, so an empty array is returned.
export const api_bonusDetail = async (category: bonusCategoryType = 'all') => {
  void category;
  return respond([] as Array<Record<string, unknown>>);
};

// Consumer (modal/mycasino/reerralRewardsRule) maps over `_res.data` directly.
export const api_referralRule = async () => {
  return respond([] as Array<{ level: number; xp: number; earned: number }>);
};

// Consumer (modal/mycasino/referralRewardsHistory) destructures
// `_res.data` as `{ totalCount, totalPage, rewards }`.
export const api_referralHistory = async (page: number, pageSize: number) => {
  void page;
  void pageSize;
  return respond({
    totalCount: 0,
    totalPage: 0,
    rewards: [] as Array<Record<string, unknown>>,
  });
};

// Consumer (modal/bonusDetails) reads named amount fields off `_res.data`.
export const api_bonusDetailCategories = async () => {
  return respond({
    totalLuckySpinBonusAmountUsd: 0,
    totalQuestBonusAmountUsd: 0,
    weeklyCashbackAmountUsd: 0,
    monthlyCashbackAmountUsd: 0,
    totalDepositBonusAmountUsd: 0,
    totalVipLevelUpBonusAmountUsd: 0,
  });
};

// Consumer (modal/bonusDetails) maps over `_res.data` directly.
export const api_bonusDetailTransactions = async (category: bonusCategoryType = 'all') => {
  void category;
  return respond([] as Array<Record<string, unknown>>);
};

// Mutation. Consumer (bonusLogged/index.page) reads `result.data.status` to
// branch success/failure, so we expose a truthy `status` alongside `success`.
export const api_redeem = async (code: string) => {
  void code;
  return respond({ success: true, status: true });
};
