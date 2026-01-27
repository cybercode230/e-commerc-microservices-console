import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { LoadingScreen } from "../components/LoadingScreen";

export default function Index() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simulate auth check / initialization
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 2500); // 2.5s loading time

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return <LoadingScreen />;
  }

  return <Redirect href="/onboarding" />;
}
