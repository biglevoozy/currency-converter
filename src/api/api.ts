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

      console.log('response from api', data);
      return data;
    } catch (e: unknown) {
      if (typeof e === 'string') {
        console.error(e);
      } else if (e instanceof Error) {
        console.error(e.message);
      }
    }
  },
};
