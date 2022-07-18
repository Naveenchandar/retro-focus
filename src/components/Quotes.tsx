import { useEffect } from 'react'
import { useUserInfo } from '../contexts';
import { CreateContextInterface } from '../contexts/user-context';
import { quotes } from '../database';

export const Quotes = (): JSX.Element => {
  const {
    state: { quotesOfTheDay }, dispatch
  } = useUserInfo() as CreateContextInterface;

  useEffect(() => {
    const getQuotes = quotes[Math.floor(Math.random() * quotes.length)].quote;
    dispatch({
      type: "FETCH_QUOTES",
      payload: getQuotes,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="md:text-xl font-medium">{quotesOfTheDay}</div>
  )
}