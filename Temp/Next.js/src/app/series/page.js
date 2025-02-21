// src/app/sets/page.js

import { fetchLocalData } from '@/utils/fetchLocalData';
import SetsPageClient from "./SetsPageClient";

export const metadata = {
  title: "LilyCove - Pokémon Series and Sets",
  description:
    "Explore all Pokémon series and sets with details like total cards, release dates, and logos. Your ultimate hub for Pokémon TCG.",
};

export default async function SetsPage() {
  const { seriesData, setsData } = fetchLocalData();

  return (
    <div>
      <SetsPageClient seriesData={seriesData} setsData={setsData} />
    </div>
  );
}
