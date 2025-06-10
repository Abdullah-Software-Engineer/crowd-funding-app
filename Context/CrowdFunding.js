"use client";

import React, { createContext, useContext } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { parseEther } from "viem";


//Internal imports
import { contractAddress, contractABI } from "./constants";

export const CrowdFundingContext = createContext();


export const CrowdFundingProvider = ({ children }) => {

  const titleData = "Crowd Funding Contract";

  // Use wagmi's useAccount hook to get connected account
  const { address: currentAccount, isConnected } = useAccount();

  // Use wagmi's useWriteContract hook for contract interactions
  const { writeContract, isPending, isSuccess, error } = useWriteContract();

  const createCampaign = async (campaign) => {
    const { title, description, target, deadline, image } = campaign;

    if (!isConnected || !currentAccount) {
      console.error("Wallet not connected");
      return;
    }

    try {
      // Use wagmi's writeContract instead of ethers
      const result = await writeContract({
        address: contractAddress,
        abi: contractABI,
        functionName: 'createCampaign',
        args: [
          currentAccount,
          title,
          description,
          parseEther(target.toString()), // Use viem's parseEther instead of ethers.utils.parseEther
          new Date(deadline).getTime()
        ],
      });

      console.log("Campaign creation initiated", result);
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };

  // Use wagmi's useReadContract for reading contract data
  const getCampaigns = async () => {
    // This will be handled by useReadContract hook
    // We can create a separate hook for this
  };

  const value = {
    titleData,
    currentAccount,
    isConnected,
    createCampaign,
    getCampaigns,
    isPending,
    isSuccess,
    error
  };

  return (
    <CrowdFundingContext.Provider value={value}>
      {children}
    </CrowdFundingContext.Provider>
  );
};

// Custom hook to use the context
export const useCrowdFunding = () => {
  const context = useContext(CrowdFundingContext);
  if (!context) {
    throw new Error('useCrowdFunding must be used within a CrowdFundingProvider');
  }
  return context;
};
