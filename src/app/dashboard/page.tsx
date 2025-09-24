'use client'

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Eye, TrendingUp, Users, Award } from 'lucide-react';
import { GlassPanel } from '@/components/glass';

interface Stat {
  title: string;
  value: number;
  icon: any; // You might want to define a more specific type for icons if possible
  color: string;
}

interface UCR {
  id: string;
  title: string;
  creator: { name: string };
  stats: { revenue: number };
}

interface Sighting {
  id: string;
  ucrTitle: string;
  spotter: { name: string };
  reward: number;
}

interface DashboardData {
  stats: {
    totalRevenue: number;
    totalUCRs: number;
    totalSightings: number;
    activeCreators: number;
  };
  revenueOverTime: { date: string; value: number }[];
  ucrsMintedOverTime: { date: string; value: number }[];
  topUCRs: UCR[];
  recentSightings: Sighting[];
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/dashboard-data');
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading Dashboard...</div>;
  }

  if (!data) {
    return <div className="text-center py-12 text-red-500">Failed to load dashboard data.</div>;
  }

  const { stats, revenueOverTime, ucrsMintedOverTime, topUCRs, recentSightings } = data;

  const kpiData = [
    { title: 'Total Revenue', value: `$${stats.totalRevenue.toFixed(2)} USDC`, icon: TrendingUp, color: 'text-green-500' },
    { title: 'Total UCRs', value: stats.totalUCRs, icon: Award, color: 'text-blue-500' },
    { title: 'Total Sightings', value: stats.totalSightings, icon: Eye, color: 'text-purple-500' },
    { title: 'Active Creators', value: stats.activeCreators, icon: Users, color: 'text-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-obsidian-300">
      <div className="container-responsive py-8 sm:py-12">
        <header className="mb-8 sm:mb-12 text-center">
          <h1 className="headline-glitch text-responsive-lg mb-4">Command Center</h1>
          <p className="body-text max-w-3xl mx-auto">
            Monitor the tribute, analyze the trends, and ensure your empire's prosperity.
          </p>
        </header>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {kpiData.map(kpi => {
            const Icon = kpi.icon;
            return (
              <GlassPanel key={kpi.title} className="p-4 sm:p-6 flex items-center space-x-4">
                <div className="p-3 rounded-none bg-glass-200 backdrop-blur-md">
                  <Icon className="h-6 w-6 icon-pixel-active" style={{ color: kpi.color === 'text-green-500' ? '#00FFFF' : 
                                                                        kpi.color === 'text-blue-500' ? '#FF00FF' : 
                                                                        kpi.color === 'text-purple-500' ? '#00FF00' : 
                                                                        '#FFFF00' }} />
                </div>
                <div>
                  <p className="text-sm text-white/70">{kpi.title}</p>
                  <p className="text-2xl font-bold text-white">{kpi.value}</p>
                </div>
              </GlassPanel>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <GlassPanel className="p-4 sm:p-6">
            <h2 className="text-xl font-semibold text-glitch-500 mb-4">Revenue Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} name="Revenue (USDC)" />
              </LineChart>
            </ResponsiveContainer>
          </GlassPanel>
          <GlassPanel className="p-4 sm:p-6">
            <h2 className="text-xl font-semibold text-glitch-500 mb-4">UCRs Minted Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ucrsMintedOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#3B82F6" name="UCRs Minted" />
              </BarChart>
            </ResponsiveContainer>
          </GlassPanel>
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <GlassPanel className="p-4 sm:p-6">
            <h2 className="text-xl font-semibold text-glitch-500 mb-4">Top Performing UCRs</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-glitch-500/20">
                <thead className="bg-glass-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Title</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Creator</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-glitch-500/20">
                  {topUCRs.map(ucr => (
                    <tr key={ucr.id}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-white">{ucr.title}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-white/70">{ucr.creator.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-glitch-500 font-semibold">${ucr.stats.revenue.toFixed(2)} USDC</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassPanel>
          <GlassPanel className="p-4 sm:p-6">
            <h2 className="text-xl font-semibold text-glitch-500 mb-4">Recent Sightings</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-glitch-500/20">
                <thead className="bg-glass-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">UCR Title</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Spotter</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Reward</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-glitch-500/20">
                  {recentSightings.map(sighting => (
                    <tr key={sighting.id}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-white">{sighting.ucrTitle}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-white/70">{sighting.spotter.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-glitch-500 font-semibold">+${sighting.reward.toFixed(4)} USDC</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
