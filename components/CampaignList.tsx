"use client";

import React from 'react';
import { useGetCampaigns, useGetNumberOfCampaigns } from '@/Context/useCrowdFundingHooks';
import { formatEther } from 'viem';

const CampaignList = () => {
  const { data: campaigns, isLoading: campaignsLoading, error: campaignsError } = useGetCampaigns();
  const { data: numberOfCampaigns, isLoading: countLoading } = useGetNumberOfCampaigns();

  if (campaignsLoading || countLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading campaigns...</div>
      </div>
    );
  }

  if (campaignsError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-600">Error loading campaigns: {campaignsError.message}</div>
      </div>
    );
  }

  if (!campaigns || !Array.isArray(campaigns) || campaigns.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">No campaigns found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-2">Crowdfunding Campaigns</h1>
        <p className="text-gray-600 text-center">
          Total Campaigns: {numberOfCampaigns?.toString() || '0'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign: any, index: number) => (
          <CampaignCard key={index} campaign={campaign} campaignId={index} />
        ))}
      </div>
    </div>
  );
};

const CampaignCard = ({ campaign, campaignId }: { campaign: any; campaignId: number }) => {
  const deadline = new Date(Number(campaign.deadline));
  const isExpired = deadline < new Date();
  const targetAmount = formatEther(campaign.target);
  const collectedAmount = formatEther(campaign.amountCollected);
  const progressPercentage = (Number(collectedAmount) / Number(targetAmount)) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {campaign.image && (
        <img 
          src={campaign.image} 
          alt={campaign.title}
          className="w-full h-48 object-cover"
        />
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 truncate">{campaign.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{campaign.description}</p>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Target:</span>
            <span className="font-medium">{targetAmount} ETH</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Raised:</span>
            <span className="font-medium text-green-600">{collectedAmount} ETH</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">
              {progressPercentage.toFixed(1)}% funded
            </span>
            <span className={`font-medium ${isExpired ? 'text-red-500' : 'text-gray-700'}`}>
              {isExpired ? 'Expired' : deadline.toLocaleDateString()}
            </span>
          </div>
          
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>Owner: {campaign.owner.slice(0, 6)}...{campaign.owner.slice(-4)}</span>
            <span>{campaign.donators.length} donors</span>
          </div>
        </div>
        
        <button 
          className={`w-full mt-4 py-2 px-4 rounded-md font-medium transition-colors ${
            isExpired 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
          disabled={isExpired}
        >
          {isExpired ? 'Campaign Ended' : 'Donate Now'}
        </button>
      </div>
    </div>
  );
};

export default CampaignList; 