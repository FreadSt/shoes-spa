'use client'
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext.tsx'; // Adjust the import path as needed
import { ReferralData } from '@shared/api.ts';

const ReferralDashboard: React.FC = () => {
  const { user } = useAuth(); // Get the current user from your AuthContext
  const [referralData, setReferralData] = useState<ReferralData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const activationDelay = 10 * 1000; // 10 seconds for testing (use 17 * 24 * 60 * 60 * 1000 for 17 days)

  useEffect(() => {
    const fetchReferralData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/referral/${user.uid}`);
        if (!response.ok) {
          if (response.status === 404) {
            setReferralData(null);
          } else {
            throw new Error(`Error fetching referral data: ${response.statusText}`);
          }
        } else {
          const data: ReferralData = await response.json();
          setReferralData(data);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReferralData();
  }, [user]);

  if (loading) {
    return <div>Loading referral data...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Please log in to view your referral information.</div>;
  }

  if (!referralData) {
    return <div>No referral data found for your account.</div>;
  }

  const isReferralActive = Date.now() - referralData.purchaseTimestamp >= activationDelay;
  const referralLink = `${window.location.origin}/referral?code=${referralData.referralCode}`;

  return (
    <div>
      <h2>Referral Information</h2>
      <p>Your Referral Code: <strong>{referralData.referralCode}</strong></p>
      {
        isReferralActive ? (
          <div>
            <p>Your referral link is active:</p>
            <a href={referralLink} target="_blank" rel="noopener noreferrer">{referralLink}</a>
          </div>
        ) : (
          <p>Your referral link will be active after the delay period.</p>
        )
      }
    </div>
  );
};

export default ReferralDashboard;
