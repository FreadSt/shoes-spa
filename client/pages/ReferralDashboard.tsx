'use client'
import React, { useEffect, useState } from 'react';

const activationDelay = 10 * 1000; // 10 seconds for testing

const ReferralDashboard: React.FC = () => {
  const [referralData, setReferralData] = useState<any>(null);
  const [referredUsers, setReferredUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReferralData = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }
      try {
        // Get the user's referral data
        const response = await fetch(`/api/referral/${encodeURIComponent(user.email)}`);
        if (!response.ok) {
          setReferralData(null);
          setLoading(false);
          return;
        }
        const data = await response.json();
        setReferralData(data);
        // Fetch referred users by referral code
        if (data.referralCode) {
          const referredRes = await fetch(`/api/referred/${data.referralCode}`);
          if (referredRes.ok) {
            const referred = await referredRes.json();
            setReferredUsers(referred);
          }
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReferralData();
  }, [user]);

  if (loading) return <div>Loading referral data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>Please log in to view your referral information.</div>;
  if (!referralData) return <div>No referral data found for your account.</div>;

  const isReferralActive = Date.now() - referralData.purchaseTimestamp >= activationDelay;
  const referralLink = `${window.location.origin}/product?ref=${referralData.referralCode}`;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Referral Dashboard</h2>
      <div className="mb-4">
        <p>Your Referral Code: <strong>{referralData.referralCode}</strong></p>
        {isReferralActive ? (
          <div>
            <p>Your referral link is active:</p>
            <a href={referralLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{referralLink}</a>
          </div>
        ) : (
          <p>Your referral link will be active after the delay period.</p>
        )}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Referred Users</h3>
        {referredUsers.length === 0 ? (
          <p>No users have purchased using your referral link yet.</p>
        ) : (
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Purchase Time</th>
              </tr>
            </thead>
            <tbody>
              {referredUsers.map((user, idx) => (
                <tr key={idx}>
                  <td className="border px-4 py-2">{user.referredEmail}</td>
                  <td className="border px-4 py-2">{user.status}</td>
                  <td className="border px-4 py-2">{new Date(user.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ReferralDashboard;
