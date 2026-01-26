
"use client";

import { useRouter } from "next/navigation";
import { Screen4VibeCheck } from "@/app/components/Screen4VibeCheck";
import { mockData } from "@/app/data/mockData";
import { ProgressIndicator } from "@/app/components/ProgressIndicator";
import { ShareButtons } from "@/app/components/ShareButtons";

export default function VibeCheckPage() {
  const router = useRouter();

  return (
    <div className="relative w-full h-screen">
      <Screen4VibeCheck vibes={mockData.vibes} />

      <ProgressIndicator
        currentStep={4}
        totalSteps={6}
        onNext={() => router.push("/persona")}
        showNext={true}
      />

      <ShareButtons
        title="My Vibe Check - Stellar Wrapped 2026"
        text={`My Stellar vibe: ${mockData.vibes[0].percentage}% ${mockData.vibes[0].label}! What's yours? 🎨 #StellarWrapped #DeFi`}
        hashtags={["StellarWrapped", "DeFi", "CryptoVibe"]}
      />
    </div>
  );
}
