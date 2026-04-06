import { useMemo } from "react";

const GreetingSection = () => {
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: "Good morning", emoji: "☀️" };
    if (hour < 17) return { text: "Good afternoon", emoji: "🌤️" };
    return { text: "Good evening", emoji: "🌙" };
  }, []);

  return (
    <div className="mb-6">
      <h2 className="font-heading font-bold text-2xl sm:text-3xl">
        {greeting.text}, Madiha {greeting.emoji}
      </h2>
      <p className="text-muted-foreground text-sm mt-1">
        Here's your financial overview
      </p>
    </div>
  );
};

export default GreetingSection;
