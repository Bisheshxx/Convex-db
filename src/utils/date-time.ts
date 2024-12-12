export const convertDate = (timestampMs: number) => {
  const now = new Date();
  const date = new Date(timestampMs);

  // Time difference in milliseconds
  const diffMs = now.getTime() - date.getTime();

  // Convert to seconds, minutes, hours
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);

  // Relative time logic
  if (diffSeconds < 60) return "a few seconds ago";
  if (diffMinutes === 1) return "1 minute ago";
  if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
  if (diffHours === 1) return "1 hour ago";
  if (diffHours < 24) return `${diffHours} hours ago`;

  // Format the full date if it's older than 24 hours
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};
