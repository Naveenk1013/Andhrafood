import React from "react";
import { getTranslations } from "next-intl/server";
import { PantryMatcher } from "@/components/pantry/PantryMatcher";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTe = locale === "te";

  return {
    title: isTe
      ? "నా వంటింట్లో ఉన్న పదార్థాలతో వంటకాలు · ఆంధ్ర రుచులు"
      : "Cook with What I Have · Andhra Kitchen Pantry Matcher",
    description: isTe
      ? "మీ వంటింట్లో ఉన్న పప్పులు, కూరగాయలు, మసాలాలను ఎంచుకోండి — వెంటనే తయారు చేసుకోగల సాంప్రదాయ ఆంధ్ర వంటకాలను తెలుసుకోండి."
      : "Select the ingredients in your kitchen to instantly discover authentic Andhra Pradesh dishes and recipes you can cook right now.",
    openGraph: {
      title: isTe
        ? "ఆంధ్ర కిచెన్ ప్యాంట్రీ · నా దగ్గరున్న పదార్థాలతో వంటకం"
        : "Andhra Kitchen Pantry Matcher · Cook With What You Have",
      description: isTe
        ? "సాంప్రదాయ ఆంధ్ర వంటకాలను మీ వంటింటి సరుకులతో సులభంగా తయారు చేసుకోండి."
        : "Match your kitchen ingredients with 38 traditional Andhra recipes across Coastal Andhra, Rayalaseema, and Uttarandhra.",
    },
  };
}

export default function PantryPage() {
  return (
    <main className="min-h-screen py-4 sm:py-8">
      <PantryMatcher />
    </main>
  );
}
