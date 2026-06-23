/**
 * Mock implementation of the game API module.
 *
 * The REST backend has been removed. Every exported function below resolves
 * locally with mock data (via the shared `respond` / `respondPaged` helpers)
 * instead of performing a network request. Exported function names, parameter
 * signatures and the exported types are kept identical so existing consumers
 * (homepage, casino grids, game detail, reviews, bets, etc.) keep working.
 */
import { CategoryType } from '@/base/types/common';
import { GameCreateSessionRequest, GameDemoRequest } from '@/base/types/requestTypes';

import { makeBets, makeGames, mockGames, mockProviders } from '../_mock/db';
import { respond } from '../_mock/respond';

export type SortType = 'popular' | 'asc' | 'desc' | 'new' | 'a-z' | 'z-a' | 'like';
export type ReviewListSortType = 'newest' | 'top_comments' | 'top_likes';

export type CasinoRequest = {
  page: number;
  pageSize: number;
  providers?: string;
  sort?: SortType;
  query?: string;
};

/* -------------------------------------------------------------------------- */
/*                          Local mock data builders                          */
/* -------------------------------------------------------------------------- */

/**
 * Game shape expected by the various list consumers. They read `producerName`,
 * `producerIdentifier`, `profitMultiplier`, `payout`, etc. The shared
 * `mockGames` use slightly different keys, so map them into the consumer shape
 * here (and keep the original keys too, so nothing breaks).
 */
const toApiGame = (g: ReturnType<typeof makeGames>[number]) => ({
  ...g,
  producerName: g.providerName,
  producerIdentifier: g.provider,
  profitMultiplier: g.multiplier,
});

/** A populated list of games in the API ("producer*") shape. */
const apiGames = (count = mockGames.length) => makeGames(count).map(toApiGame);

/** Paginated `{ games, page, pageSize, totalPage, totalCount }` envelope. */
const gamesPage = (page = 1, pageSize = 20, count = mockGames.length) => {
  const games = apiGames(count);
  return {
    games,
    data: games,
    page,
    pageSize,
    total: games.length,
    totalCount: games.length,
    totalPage: Math.max(1, Math.ceil(games.length / Math.max(1, pageSize))),
  };
};

/** Bet rows in the shape the bet tables read (gameName/playerName/profitAmount...). */
const betRows = (count = 15) =>
  makeBets(count).map((b, i) => ({
    id: `bet_${i + 1}`,
    gameName: b.game,
    title: b.game,
    gameIdentifier: b.gameIdentifier,
    identifier: b.gameIdentifier,
    playerName: b.player,
    userName: b.player,
    playerId: b.playerId,
    userId: b.playerId,
    playerAvatar: b.playerAvatar,
    userAvatar: b.playerAvatar,
    betAmount: b.betAmount,
    betAmountUsd: b.betAmountUsd,
    multiplier: b.multiplier,
    profit: b.profit,
    profitUsd: b.profitUsd,
    profitAmount: b.profit,
    profitAmountUsd: b.profitUsd,
    currency: b.currency,
    providerName: 'Pragmatic Play',
    time: b.time,
  }));

/** Theme names returned as a flat string array (consumers do `[...res.data]`). */
const themeNames = ['Adventure', 'Fantasy', 'Egypt', 'Fruits', 'Animals', 'Horror', 'Mythology', 'Ocean'];

/** One representative game-detail object matching the detail consumer. */
const gameDetail = (identifier: string) => {
  const base = apiGames(1)[0];
  return {
    ...base,
    identifier,
    producerIdentifier: base.provider,
    producerName: base.providerName,
    profitMultiplier: base.multiplier,
    allowLocation: true,
    allowDemo: true,
    isExpiration: false,
    favoriteCount: 1280,
    producerDetails: { gameCount: 120 },
  };
};

const ratingStatistics = {
  totalCount: 0,
  averageRating: 0,
  avatars: [] as string[],
  counts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as Record<number, number>,
};

const gameLaunch = {
  gameLauncherUrl: '',
  gameUrl: '',
  strategy: 'iframe',
  lobbyUrl: '',
  tokenId: 'mock-token',
};

/* -------------------------------------------------------------------------- */
/*                                Game lists                                  */
/* -------------------------------------------------------------------------- */

export const api_getPickGames = async (page: number, pageSize: number) => {
  return respond(gamesPage(page, pageSize));
};

export const apiSSR_getPickGames = async (page: number, pageSize: number) => {
  return respond(gamesPage(page, pageSize));
};

export const api_getFavoriteGames = async (page: number, pageSize: number) => {
  return respond(gamesPage(page, pageSize));
};

export const api_getRecentGames = async (page: number, pageSize: number) => {
  return respond(gamesPage(page, pageSize));
};

export const api_getGameDetail = async (identifier: string) => {
  return respond(gameDetail(identifier));
};

export const apiSSR_getGameDetail = async (identifier: string) => {
  return respond(gameDetail(identifier));
};

export const api_getCasinoWithKey = async (key: string, params: CasinoRequest) => {
  return respond(gamesPage(params.page, params.pageSize));
};

export const api_getSlots = async (params: CasinoRequest) => {
  return respond(gamesPage(params.page, params.pageSize));
};

export const api_getProviders = async (category: CategoryType = 'all') => {
  return respond(mockProviders);
};

export const apiSSR_getProviders = async (category: CategoryType = 'all') => {
  return respond(mockProviders);
};

export const api_getLiveCasinos = async (params: CasinoRequest) => {
  return respond(gamesPage(params.page, params.pageSize));
};

export const api_getHotGames = async (params: CasinoRequest) => {
  return respond(gamesPage(params.page, params.pageSize));
};

/* -------------------------------------------------------------------------- */
/*                          Game session / demo launch                        */
/* -------------------------------------------------------------------------- */

export const api_startGameDemo = async (data: GameDemoRequest) => {
  return respond(gameLaunch);
};

export const api_startGameSession = async (data: GameCreateSessionRequest) => {
  return respond(gameLaunch);
};

/* -------------------------------------------------------------------------- */
/*                                Bets / Wins                                 */
/* -------------------------------------------------------------------------- */

export const api_getLatestBets = async () => {
  return respond(betRows(20));
};

export const api_getLatestBetsForGame = async (gameId: string) => {
  return respond(betRows(15));
};

export const api_getLatestBetForUser = async (gameId: string) => {
  return respond(betRows(10));
};

export const api_getRecentBigWins = async (count: number) => {
  return respond(betRows(count || 15));
};

export const api_getTopRelatedGames = async () => {
  return respond(apiGames());
};

/* -------------------------------------------------------------------------- */
/*                            Dashboard / casino data                         */
/* -------------------------------------------------------------------------- */

export const api_getDashboardData = async () => {
  return respond({
    topRatedGames: apiGames(),
    recommendedGames: apiGames(),
    recentBigWins: betRows(15),
  });
};

export const api_getCasinoGameData = async () => {
  return respond({
    slots: apiGames(),
    hotGames: apiGames(),
    liveCasino: apiGames(),
    newReleases: apiGames(),
    blackjacks: apiGames(),
    tableGames: apiGames(),
    recentBigWins: betRows(15),
  });
};

/* -------------------------------------------------------------------------- */
/*                          Games by provider / theme                         */
/* -------------------------------------------------------------------------- */

export const api_getGamesByProvider = async (
  providerIdentifier: string,
  sort: SortType,
  page: number,
  pageSize: number,
) => {
  // Consumer reads `res.data.data` for this endpoint.
  return respond(gamesPage(page, pageSize));
};

export const api_getThemes = async () => {
  return respond(themeNames);
};

export const apiSSR_getThemes = async () => {
  return respond(themeNames);
};

export const api_getGamesByTheme = async (providers: string, page: number, pageSize: number, theme: string) => {
  return respond(gamesPage(page, pageSize));
};

export const api_getGamesByNameAndProvider = async (search: string) => {
  return respond(gamesPage(1, 20));
};

/* -------------------------------------------------------------------------- */
/*                                  Favorite                                  */
/* -------------------------------------------------------------------------- */

export const api_setGameFavorite = async (gameId: string) => {
  return respond({ success: true, state: true, count: 1281 });
};

export const api_getGameFavorite = async (gameId: string) => {
  return respond({ state: false });
};

/* -------------------------------------------------------------------------- */
/*                               Wager contest                                */
/* -------------------------------------------------------------------------- */

const nowSec = () => Math.floor(new Date().getTime() / 1000);

export const api_wagerContestList = async () => {
  const start = nowSec();
  return respond({
    startTime: start,
    currentTime: start,
    endTime: start + 7 * 24 * 3600,
    totalPrizePoolAmountUsd: 50000,
    contesters: betRows(10).map((b, i) => ({
      playerId: b.playerId,
      playerName: b.playerName,
      playerAvatar: b.playerAvatar,
      wageredAmountUsd: 10000 - i * 800,
      prizeAmountUsd: 5000 - i * 400,
      percentage: 20 - i * 2,
    })),
  });
};

export const api_wagerContestHistory = async () => {
  const start = nowSec() - 14 * 24 * 3600;
  return respond({
    lastContentStartTime: start,
    lastContentEndTime: start + 7 * 24 * 3600,
    contest: betRows(10).map((b, i) => ({
      playerId: b.playerId,
      playerName: b.playerName,
      playerAvatar: b.playerAvatar,
      wageredAmountUsd: 9000 - i * 700,
      prizeAmountUsd: 4500 - i * 350,
      percentage: 18 - i * 2,
    })),
  });
};

export const api_wagerContestPosition = async () => {
  return respond({ position: 1, wageredAmountUsd: 0 });
};

/* -------------------------------------------------------------------------- */
/*                                  Reviews                                   */
/* -------------------------------------------------------------------------- */

export const api_reviewRatingStatistics = async (gameId: string) => {
  return respond(ratingStatistics);
};

export const api_reviewGetRating = async (gameId: string) => {
  // Consumer reads `res.data` directly as the numeric rating.
  return respond(0);
};

export const api_reviewSetRating = async (gameId: string, rating: number) => {
  return respond({ success: true, rating });
};

export const api_reviewComment = async (gameId: string) => {
  return respond({ comments: [], totalCount: 0 });
};

export const api_reviewAdd = async (gameId: string, commentId: string = '', text: string) => {
  return respond({
    id: `comment_${new Date().getTime()}`,
    userId: 'usr_demo_001',
    userAvatar: '',
    userName: 'DemoPlayer',
    likesCount: 0,
    text,
    time: new Date().toISOString(),
    like: false,
  });
};

export const api_reviewList = async (
  commentId: string = '',
  gameId: string,
  page: number,
  pageSize: number,
  sort: ReviewListSortType,
  userId: string,
) => {
  return respond({ comments: [], totalCount: 0 });
};

export const api_reviewLike = async (commentId: string) => {
  return respond({ success: true, like: true });
};

export const api_reviewReport = async (commentId: string, reason: string) => {
  return respond({ success: true });
};

/* -------------------------------------------------------------------------- */
/*                              High rollers / SSR                            */
/* -------------------------------------------------------------------------- */

export const api_highRollers = async () => {
  return respond(betRows(20));
};

export const apiSSR_gamesIdentifiers = async () => {
  // Consumer maps each element through `convertGameIdentifierToUrl(game)` — a
  // flat array of identifier strings.
  return respond(mockGames.map((g) => g.identifier));
};
