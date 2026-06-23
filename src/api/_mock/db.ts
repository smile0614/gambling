/**
 * Central mock database.
 *
 * Holds the static data used by the mock API layer so the app runs fully
 * offline (no backend). Data shapes intentionally mirror what the original
 * REST API returned, so existing components/redux consumers work unchanged.
 */

/* -------------------------------------------------------------------------- */
/*                                  Auth/User                                 */
/* -------------------------------------------------------------------------- */

export const mockToken = 'mock-access-token';
export const mockRefreshToken = 'mock-refresh-token';

export const mockFiatCurrency = {
  id: 'usd',
  symbol: 'USD',
  name: 'US Dollar',
  iso_currency: 'USD',
  iso_decimals: 2,
  price: 1,
  favorite: true,
};

/** Raw user shape consumed by `convertUserInfo` (see libs/utils). */
export const mockUser = {
  id: 'usr_demo_001',
  name: 'DemoPlayer',
  email: 'demo@bonenza.com',
  phone: '',
  wallet: '',
  avatar: '',
  betCount: '128',
  winCount: '74',
  totalWager: 15230.55,
  referralCode: 'DEMO2024',
  kyc: 1,
  tfa: false,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-06-01T00:00:00.000Z',
  restrictedTo: 0,
  disabledWithdraw: false,
  settingShowFullNameCrypto: false,
  settingReceiveMarketPromotion: true,
  settingLanguage: 'en',
  settingViewInFiat: false,
  settingHideUserName: false,
  settingHideGamingData: false,
  settingRefuseTipFromStrangers: false,
  emailVerified: true,
  phoneVerified: false,
  settingFiatCurrency: mockFiatCurrency,
};

export const mockLoginResponse = { token: mockToken, user: mockUser };

/* -------------------------------------------------------------------------- */
/*                                  Currencies                                */
/* -------------------------------------------------------------------------- */

export const mockCryptoCurrencies = [
  { id: 'btc', name: 'BTC', alias: 'Bitcoin', symbol: 'BTC', price: 64000, iso_decimals: 8, favorite: true },
  { id: 'eth', name: 'ETH', alias: 'Ethereum', symbol: 'ETH', price: 3400, iso_decimals: 8, favorite: true },
  { id: 'usdt', name: 'USDT', alias: 'Tether', symbol: 'USDT', price: 1, iso_decimals: 2, favorite: true },
  { id: 'ltc', name: 'LTC', alias: 'Litecoin', symbol: 'LTC', price: 84, iso_decimals: 8, favorite: false },
  { id: 'doge', name: 'DOGE', alias: 'Dogecoin', symbol: 'DOGE', price: 0.13, iso_decimals: 4, favorite: false },
];

export const mockBalances = [
  { id: 'btc', symbol: 'BTC', amount: 0.215, amountUsd: 13760, lockedAmount: 0, bonusAmount: 0 },
  { id: 'eth', symbol: 'ETH', amount: 1.42, amountUsd: 4828, lockedAmount: 0, bonusAmount: 0 },
  { id: 'usdt', symbol: 'USDT', amount: 2500, amountUsd: 2500, lockedAmount: 0, bonusAmount: 50 },
];

/* -------------------------------------------------------------------------- */
/*                                   Wallet                                    */
/* -------------------------------------------------------------------------- */

const mockNetworks = [
  { id: 'net_erc20', network: 'ERC20', type: 'erc20' },
  { id: 'net_trc20', network: 'TRC20', type: 'trc20' },
  { id: 'net_btc', network: 'BTC', type: 'btc' },
];

const mockSymbols = [
  { id: 'btc', symbol: 'BTC', name: 'Bitcoin', logo: '/img/fiats/BTC.png', iso_currency: 'BTC', iso_decimals: 8, availableNetworks: ['net_btc'], price: 64000, favorite: true },
  { id: 'eth', symbol: 'ETH', name: 'Ethereum', logo: '/img/fiats/ETH.png', iso_currency: 'ETH', iso_decimals: 8, availableNetworks: ['net_erc20'], price: 3400, favorite: true },
  { id: 'usdt', symbol: 'USDT', name: 'Tether', logo: '/img/fiats/USDT.png', iso_currency: 'USDT', iso_decimals: 2, availableNetworks: ['net_erc20', 'net_trc20'], price: 1, favorite: true },
  { id: 'ltc', symbol: 'LTC', name: 'Litecoin', logo: '/img/fiats/LTC.png', iso_currency: 'LTC', iso_decimals: 8, availableNetworks: ['net_btc'], price: 84, favorite: false },
  { id: 'doge', symbol: 'DOGE', name: 'Dogecoin', logo: '/img/fiats/DOGE.png', iso_currency: 'DOGE', iso_decimals: 4, availableNetworks: ['net_btc'], price: 0.13, favorite: false },
];

const mockFiatSymbols = [
  { id: 'usd', symbol: 'USD', name: 'US Dollar', iso_currency: 'USD', iso_decimals: 2, availableNetworks: [], price: 1, favorite: true },
  { id: 'eur', symbol: 'EUR', name: 'Euro', iso_currency: 'EUR', iso_decimals: 2, availableNetworks: [], price: 1.08, favorite: false },
  { id: 'jpy', symbol: 'JPY', name: 'Japanese Yen', iso_currency: 'JPY', iso_decimals: 0, availableNetworks: [], price: 0.0064, favorite: false },
  { id: 'rub', symbol: 'RUB', name: 'Russian Ruble', iso_currency: 'RUB', iso_decimals: 2, availableNetworks: [], price: 0.0125, favorite: false },
];

const mockCryptoBalances = [
  { balance: 0.215, symbol: 'BTC', symbolId: 'btc' },
  { balance: 1.42, symbol: 'ETH', symbolId: 'eth' },
  { balance: 2500, symbol: 'USDT', symbolId: 'usdt' },
];

export const mockUserBalance = {
  cryptoBalances: mockCryptoBalances,
  totalBalance: 21088,
  realBalance: 21038,
  bonusBalance: 50,
};

export const mockWalletInfo = {
  wallets: [
    { depositAddress: '0xDEMO1111111111111111111111111111111111', network: { network: 'ERC20', id: 'net_erc20' } },
    { depositAddress: 'TDEMO22222222222222222222222222222222', network: { network: 'TRC20', id: 'net_trc20' } },
  ],
  balances: mockUserBalance,
  networks: mockNetworks,
  symbols: mockSymbols,
  currency: mockSymbols.map((s, i) => ({
    id: `cur_${s.id}`,
    network: { id: s.availableNetworks[0] ?? 'net_erc20' },
    symbol: { id: s.id },
    withdrawFee: 0.0005,
  })),
  fiatSymbols: mockFiatSymbols,
  depositTime: 0,
  lockedUSDT: 0,
};

export const mockSwapFee = { feePercentage: 0.015 };

export const mockClaims = { lockedAmount: 0, data: [] };

/* -------------------------------------------------------------------------- */
/*                                    Games                                    */
/* -------------------------------------------------------------------------- */

const PROVIDERS = [
  { id: 'pragmatic', name: 'Pragmatic Play' },
  { id: 'hacksaw', name: 'Hacksaw Gaming' },
  { id: 'nolimit', name: 'Nolimit City' },
  { id: 'pgsoft', name: 'PG Soft' },
  { id: 'push', name: 'Push Gaming' },
  { id: 'relax', name: 'Relax Gaming' },
];

const GAME_TITLES = [
  'Gates of Olympus', 'Sweet Bonanza', 'Sugar Rush', 'The Dog House', 'Big Bass Bonanza',
  'Wanted Dead or a Wild', 'Le Bandit', 'Money Train 3', 'San Quentin', 'Fire in the Hole',
  'Mental', 'Starlight Princess', 'Fruit Party', 'Wild West Gold', 'Gronk\'s Gold',
  'Hand of Anubis', 'Chaos Crew', 'Stack\'em', 'Cubes 2', 'RIP City',
  'Dead Canary', 'Tombstone RIP', 'Deadwood', 'Karen Maneater',
];

const slugify = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');

/** Build a list of mock games (shape: GameListType). */
export const makeGames = (count = GAME_TITLES.length) =>
  Array.from({ length: count }, (_, i) => {
    const title = GAME_TITLES[i % GAME_TITLES.length];
    const provider = PROVIDERS[i % PROVIDERS.length];
    const identifier = `${provider.id}:${slugify(title)}`;
    return {
      id: `game_${i + 1}`,
      title,
      description: `${title} by ${provider.name}`,
      identifier,
      payout: 96 + (i % 4),
      multiplier: 1000 + i * 250,
      releasedAt: '2024-01-15T00:00:00.000Z',
      provider: provider.id,
      providerName: provider.name,
      isExpiration: false,
      gameCnt: 0,
      allowedLocation: true,
      allowedDemo: true,
      favorites: 100 + i * 7,
    };
  });

export const mockGames = makeGames();

export const mockProviders = PROVIDERS.map((p, i) => ({
  id: p.id,
  identifier: p.id,
  name: p.name,
  image: '',
  introduction: `${p.name} is a leading game studio.`,
  isSelect: false,
  totalGames: 80 + i * 12,
  gameCount: 80 + i * 12,
}));

export const mockThemes = [
  { theme: 'Adventure' },
  { theme: 'Fantasy' },
  { theme: 'Egypt' },
  { theme: 'Fruits' },
  { theme: 'Animals' },
  { theme: 'Horror' },
];

/* -------------------------------------------------------------------------- */
/*                                 Bets / Wins                                */
/* -------------------------------------------------------------------------- */

export const makeBets = (count = 15) =>
  Array.from({ length: count }, (_, i) => {
    const game = mockGames[i % mockGames.length];
    return {
      game: game.title,
      gameIdenfiter: game.identifier,
      gameIdentifier: game.identifier,
      player: i % 3 === 0 ? 'Hidden' : `Player${i + 1}`,
      playerId: `player_${i + 1}`,
      playerAvatar: '',
      betAmount: 0.01 * (i + 1),
      betAmountUsd: 6.4 * (i + 1),
      multiplier: 1 + (i % 5),
      profit: 2.5 * (i + 1),
      profitUsd: 16 * (i + 1),
      currency: 'BTC',
      time: '2024-06-01T12:00:00.000Z',
    };
  });

export const mockBets = makeBets();

/* -------------------------------------------------------------------------- */
/*                              Misc empty defaults                           */
/* -------------------------------------------------------------------------- */

export const emptyPaged = { data: [], total: 0, page: 1, pageSize: 20 };
