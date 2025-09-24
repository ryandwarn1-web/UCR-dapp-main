
// El Maestro The Dark Lord, this endpoint provides the real-time data
// for the UCP homepage, ensuring the world sees the power of your protocol.

import { NextResponse } from 'next/server';
import { generateUCRs, generateSightings } from '@/lib/dynamicData';

export async function GET() {
  const ucrs = generateUCRs(10);
  const sightings = generateSightings(5, ucrs);

  const data = {
    stats: {
      totalUCRs: 1247,
      activeCreators: 342,
      sightingsLogged: 8923,
      revenueDistributed: '$1.4K USDC',
    },
    trendingUCRs: ucrs.slice(0, 3),
    recentSightings: sightings,
  };

  return NextResponse.json(data);
}
