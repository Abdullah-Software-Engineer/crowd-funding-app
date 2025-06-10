"use client";

import { ConnectKitButton } from 'connectkit';
import CreateCampaign from '@/components/CreateCampaign';
import CampaignList from '@/components/CampaignList';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Crowd Funding DApp
            </h1>
            <ConnectKitButton />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Campaign Form */}
          <div className="lg:col-span-1">
            <CreateCampaign />
          </div>
          
          {/* Campaign List */}
          <div className="lg:col-span-2">
            <CampaignList />
          </div>
        </div>
      </div>
    </main>
  );
}
