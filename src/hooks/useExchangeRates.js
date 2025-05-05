import { useEffect, useState } from "react";
import axios from "axios";
export const useExchangeRates = () => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await axios.get(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        setRates(res.data.rates);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  return { rates, loading };
};
