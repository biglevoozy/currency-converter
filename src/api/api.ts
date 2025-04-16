import { BASE_URL } from '../config/url.config';

type RatesResponse = {
  date: string;
} & { [key: string]: Record<string, number> };

export const api = {
  get: async (date: string, currency: string) => {
    try {
      const response = await fetch(
        `${BASE_URL}${date}/v1/currencies/${currency}.json`,
      );

      if (!response.ok) throw new Error('Failed to fetch data');

      const data = (await response.json()) as Promise<RatesResponse>;

      return data;
    } catch (e: unknown) {
      if (typeof e === 'string') {
        console.error(e);
      } else if (e instanceof Error) {
        console.error(e.message);
      }
    }
  },

  getAvailableCurrencies: async () => {
    try {
      const response = await fetch(`${BASE_URL}latest/v1/currencies.json`);

      if (!response.ok) throw new Error('Failed to fetch data');

      const data = (await response.json()) as ArrayLike<string>;

      const formedData = Object.entries<string>(data);

      return formedData;
    } catch (e: unknown) {
      if (typeof e === 'string') {
        console.error(e);
      } else if (e instanceof Error) {
        console.error(e.message);
      }
    }
  },
};
