/**
 * Wallet API — mock implementation (no backend).
 * Function names/signatures preserved; data resolved locally.
 */
import { RolloverRequest, TransactionRequest, WithdrawRequest } from '@/base/types/requestTypes';
import { CurrencySymbolType } from '@/base/types/wallet';

import { mockSwapFee, mockUserBalance, mockWalletInfo } from '../_mock/db';
import { respond, respondPaged } from '../_mock/respond';

export const api_getWalletInfo = async () => {
  return respond(mockWalletInfo);
};

export const api_getUserBalance = async () => {
  return respond(mockUserBalance);
};

export const api_withdraw = async (data: WithdrawRequest) => {
  return respond({ success: true });
};

export const api_exchangeRate = async (from: string, to: string) => {
  return respond({ rate: 1 });
};

export const api_swap = async (from: string, to: string, amount: number) => {
  return respond({ success: true });
};

export const api_getTransactions = async ({ page = 1, pageSize = 20 }: TransactionRequest) => {
  return respondPaged([], page, pageSize);
};

export const api_getRollover = async ({ page = 1, pageSize = 20 }: RolloverRequest) => {
  return respondPaged([], page, pageSize);
};

export const api_getDepositTime = async () => {
  return respond({ times: 0 });
};

export const api_getInitData = async () => {
  return respond(mockWalletInfo);
};

export const api_setCurrencyFavorite = async (currencyId: string, currencyType: CurrencySymbolType) => {
  return respond({ success: true });
};

export const api_getClaims = async () => {
  return respond({ lockedAmount: 0 });
};

export const api_postClaims = async (amount: number) => {
  return respond({ success: true });
};

export const api_withdrawInfo = async (symbolId: string) => {
  return respond({ fee: 0.0005, minWithdraw: 0.001 });
};

export const api_swapFeeInfo = async () => {
  return respond(mockSwapFee);
};

export const api_chatTip = async (receiverId: string, symbolId: string, amount: number) => {
  return respond({ success: true });
};
