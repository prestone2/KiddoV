import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth"; // custom hook for auth

const SubscriptionPage = () => {
  const { user } = useAuth(); // get logged in user

  // Mock subscription plans
  const plans = [
    {
      id: 1,
      name: "Basic Plan",
      price: "KES 500/month",
      features: ["Access to standard games", "No ads", "Community support"],
    },
    {
      id: 2,
      name: "Premium Plan",
      price: "KES 1,200/month",
      features: ["All Basic features", "Exclusive premium games", "Priority support"],
    },
    {
      id: 3,
      name: "Family Plan",
      price: "KES 2,000/month",
      features: ["All Premium features", "Up to 4 family accounts", "Parental controls"],
    },
  ];

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Card className="w-full max-w-md p-6 text-center">
          <CardContent>
            <Lock className="w-12 h-12 mx-auto text-gray-400" />
            <h2 className="mt-4 text-xl font-semibold text-gray-800">
              Subscription Page
            </h2>
            <p className="mt-2 text-gray-600">
              Please{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-800 underline font-medium"
              >
                log in
              </Link>{" "}
              to view and purchase subscription plans.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Choose Your Subscription Plan
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className="shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {plan.name}
                </h2>
                <p className="text-xl text-blue-600 mb-4">{plan.price}</p>
                <ul className="space-y-2 text-gray-600 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Subscribe
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
