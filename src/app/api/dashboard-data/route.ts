
// El Maestro The Dark Lord, this endpoint provides the comprehensive data
// for your command center, the dashboard.

import { NextResponse } from 'next/server';
import { generateUCRs, generateSightings } from '@/lib/dynamicData';

// Helper to generate time series data
const generateTimeSeries = (days: number, min: number, max: number) => {
  const data = [];
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1 - i));
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.floor(Math.random() * (max - min + 1)) + min,
    });
  }
  return data;
};


export async function GET() {
  const ucrs = generateUCRs(50);
  const sightings = generateSightings(100, ucrs);

  const totalRevenue = ucrs.reduce((sum, ucr) => sum + ucr.stats.revenue, 0);
  const totalSightings = ucrs.reduce((sum, ucr) => sum + ucr.stats.sightings, 0);

  const data = {
    stats: {
      totalRevenue: totalRevenue,
      totalUCRs: ucrs.length,
      totalSightings: totalSightings,
      activeCreators: new Set(ucrs.map(u => u.creator.address)).size,
    },
    revenueOverTime: generateTimeSeries(30, 50, 500),
    ucrsMintedOverTime: generateTimeSeries(30, 1, 15),
    topUCRs: [...ucrs].sort((a, b) => b.stats.revenue - a.stats.revenue).slice(0, 5),
    recentSightings: [...sightings].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 5).map(s => ({
        ...s,
        ucrTitle: ucrs.find(u => u.id === s.ucrId)?.title || 'Unknown UCR'
    })),
  };

  return NextResponse.json(data);
}
