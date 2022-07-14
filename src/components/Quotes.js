import React,{useEffect} from 'react'
import { useUserInfo } from '../contexts';
import { quotes } from '../database';

export const Quotes = () => {
    const {
        state: { quotesOfTheDay }, dispatch
      } = useUserInfo();

    useEffect(() => {
        const getQuotes = quotes[Math.floor(Math.random() * quotes.length)].quote;
        dispatch({
          type: "FETCH_QUOTES",
          payload: getQuotes,
        });
      }, [dispatch]);

  return (
    <div className="md:text-xl font-medium">{quotesOfTheDay}</div>
  )
}