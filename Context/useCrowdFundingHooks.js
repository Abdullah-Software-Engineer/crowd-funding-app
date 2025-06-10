"use client";

import { useReadContract } from "wagmi";
import { contractAddress, contractABI } from "./constants";

// Hook to get all campaigns
export const useGetCampaigns = () => {
  return useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'getCampaigns',
  });
};

// Hook to get number of campaigns
export const useGetNumberOfCampaigns = () => {
  return useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'numberOfCampaigns',
  });
};

// Hook to get donators for a specific campaign
export const useGetDonators = (campaignId) => {
  return useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'getDonators',
    args: [campaignId],
    enabled: campaignId !== undefined,
  });
};

// Hook to get a specific campaign
export const useGetCampaign = (campaignId) => {
  return useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'campaigns',
    args: [campaignId],
    enabled: campaignId !== undefined,
  });
}; 