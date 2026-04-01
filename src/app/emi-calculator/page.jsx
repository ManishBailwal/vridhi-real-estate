"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";

export default function EmiCalculator() {
  const [loan, setLoan] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [emi, setEmi] = useState(null);

  const calculateEMI = () => {
    const P = parseFloat(loan);
    const r = parseFloat(rate) / 12 / 100;
    const n = parseFloat(years) * 12;

    if (!P || !r || !n) return;

    const emiValue =
      (P * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1);

    setEmi(emiValue.toFixed(0));
  };

  const clearAll = () => {
    setLoan("");
    setRate("");
    setYears("");
    setEmi(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero */}
      <div className="bg-blue-900 py-20 text-center text-white">
        <Calculator className="mx-auto mb-4 w-12 h-12 text-amber-500" />
        <h1 className="text-4xl font-bold">EMI Calculator</h1>
        <p className="text-slate-300 mt-2">
          Calculate your home loan EMI instantly
        </p>
      </div>

      {/* Calculator Card */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200">

          {/* Loan Amount */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Loan Amount (₹)
            </label>
            <input
              type="number"
              value={loan}
              onChange={(e) => setLoan(e.target.value)}
              placeholder="Enter loan amount"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          {/* Interest */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Interest Rate (%)
            </label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="e.g. 8.5"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          {/* Years */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Loan Tenure (Years)
            </label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="e.g. 20"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={calculateEMI}
              className="flex-1 bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition"
            >
              Calculate
            </button>
            <button
              onClick={clearAll}
              className="flex-1 border border-slate-300 py-3 rounded-lg font-semibold hover:bg-slate-100 transition"
            >
              Clear
            </button>
          </div>

          {/* Result */}
          {emi && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
              <p className="text-slate-600 mb-2">Your Monthly EMI</p>
              <h2 className="text-3xl font-bold text-blue-900">
                ₹ {emi}
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}