import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchPrayerTimes,
  getCurrentPrayer,
  getNextPrayer,
  FALLBACK_PRAYER_TIMES,
} from "../api/prayer-times.jsx";

export const usePrayerTimes = () => {
  // Initialize with current date instead of empty string
  const now = new Date();
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = now.toLocaleDateString("en-US", options);
  
  const [currentDate, setCurrentDate] = useState(formattedDate);
  const [currentTime, setCurrentTime] = useState("");
  const [currentPrayer, setCurrentPrayer] = useState(null);
  const [nextPrayer, setNextPrayer] = useState(null);
  const {
    data,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["prayerTimes"],
    queryFn: fetchPrayerTimes,
    staleTime: 24 * 60 * 60 * 1000, 
    gcTime: 24 * 60 * 60 * 1000,    retry: 2,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    onSuccess: (data) => {
      if (data?.date) {
        setCurrentDate(data.date);
      }
      // We no longer need the fallback here since we set it initially
    },
    onError: () => {
      // We no longer need this fallback since we set the date initially

    }
  });

  const prayerTimes = data?.timings || FALLBACK_PRAYER_TIMES;

  useEffect(() => {
    let mounted = true;
    
    const updateTimeAndPrayers = () => {
      if (!mounted) return;

      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes} WITA`);

      if (prayerTimes) {
        try {
          const current = getCurrentPrayer(prayerTimes);
          const next = getNextPrayer(prayerTimes);
          setCurrentPrayer(current);
          setNextPrayer(next);
        } catch (err) {

        }
      }
    };    updateTimeAndPrayers();
    const timeInterval = setInterval(updateTimeAndPrayers, 60000); 

    return () => {
      mounted = false;
      clearInterval(timeInterval);
    };
  }, [prayerTimes]);
  
  // Set initial time value immediately to avoid loading state
  useEffect(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    setCurrentTime(`${hours}:${minutes} WITA`);
  }, []);return {
    prayerTimes,
    isLoading,
    error: error ? (error.message || 'An error occurred') : null,
    currentDate,
    currentTime,
    currentPrayer,
    nextPrayer,
    refetch
  };
};

export default usePrayerTimes;
