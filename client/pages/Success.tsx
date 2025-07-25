import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

const activationDelay = 10 * 1000; // 10 seconds for testing

const Success: React.FC = () => {
  const navigate = useNavigate();
  const [referralData, setReferralData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchReferral = async () => {
      const email = localStorage.getItem("lastPurchaseEmail");
      if (!email) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`/api/referral/${encodeURIComponent(email)}`);
        if (res.ok) {
          const data = await res.json();
          setReferralData(data);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchReferral();
  }, []);

  const isActive = referralData && (Date.now() - referralData.purchaseTimestamp >= activationDelay);
  const referralLink = referralData ? `${window.location.origin}/product?ref=${referralData.referralCode}` : "";

  const handleCopy = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="bg-green-100 border border-green-300 rounded-lg p-8 shadow-md text-center">
          <h1 className="text-3xl font-bold text-green-700 mb-4">Оплата пройшла успішно!</h1>
          <p className="text-lg text-green-800 mb-6">Дякуємо за покупку. Ваше замовлення прийнято.</p>
          {loading ? (
            <p>Завантаження реферального посилання...</p>
          ) : referralData ? (
            isActive ? (
              <div className="mb-4">
                <p className="mb-2">Ваше реферальне посилання:</p>
                <div className="flex items-center justify-center gap-2">
                  <input
                    className="border rounded px-2 py-1 w-64 text-sm"
                    value={referralLink}
                    readOnly
                  />
                  <Button size="sm" onClick={handleCopy}>{copied ? "Скопійовано!" : "Копіювати"}</Button>
                </div>
              </div>
            ) : (
              <p>Ваше реферальне посилання буде активне через {Math.ceil((activationDelay - (Date.now() - referralData.purchaseTimestamp))/1000)} сек.</p>
            )
          ) : (
            <p>Реферальне посилання не знайдено.</p>
          )}
          <Button className="bg-brand-orange text-white px-8 mt-4" onClick={() => navigate("/")}>На головну</Button>
        </div>
      </div>
    </div>
  );
};

export default Success;
