export const getCurrentPrayer = (prayerTimes) => {
  if (!prayerTimes) return null;

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = currentHour * 60 + currentMinute; 

  const prayers = [
    { name: "Fajr", time: prayerTimes.Fajr },
    { name: "Dhuhr", time: prayerTimes.Dhuhr },
    { name: "Asr", time: prayerTimes.Asr },
    { name: "Maghrib", time: prayerTimes.Maghrib },
    { name: "Isha", time: prayerTimes.Isha },
  ];

  const prayersInMinutes = prayers.map((prayer) => {
    if (!prayer.time) return { ...prayer, minutesSinceMidnight: 0 };

    const [hours, minutes] = prayer.time.split(":").map(Number);
    return {
      ...prayer,
      minutesSinceMidnight: hours * 60 + minutes,
    };
  });

  prayersInMinutes.sort(
    (a, b) => a.minutesSinceMidnight - b.minutesSinceMidnight
  );

  let currentPrayer = null;
  for (let i = prayersInMinutes.length - 1; i >= 0; i--) {
    if (currentTime >= prayersInMinutes[i].minutesSinceMidnight) {
      currentPrayer = prayersInMinutes[i];
      break;
    }
  }

  if (!currentPrayer) {
    currentPrayer = prayersInMinutes[prayersInMinutes.length - 1];
  }

  return currentPrayer;
};

export const getNextPrayer = (prayerTimes) => {
  if (!prayerTimes) return null;

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = currentHour * 60 + currentMinute;

  const prayers = [
    { name: "Fajr", time: prayerTimes.Fajr },
    { name: "Dhuhr", time: prayerTimes.Dhuhr },
    { name: "Asr", time: prayerTimes.Asr },
    { name: "Maghrib", time: prayerTimes.Maghrib },
    { name: "Isha", time: prayerTimes.Isha },
  ];

  const prayersInMinutes = prayers.map((prayer) => {
    if (!prayer.time) return { ...prayer, minutesSinceMidnight: 0 };

    const [hours, minutes] = prayer.time.split(":").map(Number);
    return {
      ...prayer,
      minutesSinceMidnight: hours * 60 + minutes,
    };
  });

  prayersInMinutes.sort(
    (a, b) => a.minutesSinceMidnight - b.minutesSinceMidnight
  );

  let nextPrayer = null;
  for (let i = 0; i < prayersInMinutes.length; i++) {
    if (currentTime < prayersInMinutes[i].minutesSinceMidnight) {
      nextPrayer = prayersInMinutes[i];
      break;
    }
  }

  if (!nextPrayer) {
    nextPrayer = { ...prayersInMinutes[0] };
    nextPrayer.minutesSinceMidnight += 24 * 60;
  }

  const minutesRemaining = nextPrayer.minutesSinceMidnight - currentTime;
  const hoursRemaining = Math.floor(minutesRemaining / 60);
  const minsRemaining = minutesRemaining % 60;

  return {
    ...nextPrayer,
    timeRemaining: `${hoursRemaining}h ${minsRemaining}m`,
  };
};

export const FALLBACK_PRAYER_TIMES = {
  Fajr: "05:02",
  Dhuhr: "11:59",
  Asr: "15:22",
  Maghrib: "17:55",
  Isha: "18:55",
};

export const fetchPrayerTimes = async () => {
  try {
    const address =
      "RF82 379 Markaz Ulul Ilmi, Perumahan Djipang Permai, Karunrung, Kec. Rappocini, Kota Makassar, Sulawesi Selatan 90221";
    const response = await fetch(
      `https://api.aladhan.com/v1/timingsByAddress?address=${encodeURIComponent(address)}&method=2`
    );

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();

    if (data.code !== 200 || data.status !== "OK") {
      throw new Error("Failed to fetch prayer times from API");
    }

    return {
      timings: data.data.timings,
      date: data.data.date.readable,
    };
  } catch (error) {

    throw error;
  }
};
