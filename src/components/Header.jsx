import React from 'react';
import { Activity, ShieldCheck, Clock, DollarSign, Calculator, Sparkles, Info } from 'lucide-react';

export default function Header({ 
  onOpenTour, 
  onOpenRoi, 
  onOpenFeatures,
}) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-sky-600 flex items-center justify-center text-white shadow-sm">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-slate-900 tracking-tight">
                VitalSense <span className="text-sky-600 font-semibold">AI</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-sky-50 text-sky-800 rounded-md border border-sky-100">
                Healthcare Innovation
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Autonomous voice/SMS check-ins & doctor notes for remote patients
            </p>
          </div>
        </div>

        {/* Sober Stats Ribbon */}
        <div className="hidden xl:flex items-center gap-6 px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-slate-600">False alarms stopped: <strong className="text-slate-900">68.6%</strong></span>
          </div>
          <div className="h-4 w-px bg-slate-300"></div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-sky-600" />
            <span className="text-slate-600">Nurse time saved: <strong className="text-slate-900">128 hrs / mo</strong></span>
          </div>
          <div className="h-4 w-px bg-slate-300"></div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-amber-600" />
            <span className="text-slate-600">Billing approved: <strong className="text-slate-900">+$86.4K</strong></span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          
          {/* Features info */}
          <button
            onClick={onOpenFeatures}
            className="px-3 py-1.5 text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Info className="w-3.5 h-3.5 text-slate-500" />
            <span>Features</span>
          </button>

          {/* ROI Calculator */}
          <button 
            onClick={onOpenRoi}
            className="px-3 py-1.5 text-xs font-medium bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Calculator className="w-3.5 h-3.5 text-slate-500" />
            <span>Savings Model</span>
          </button>

          {/* 3-Min Tour */}
          <button 
            onClick={onOpenTour}
            className="px-3.5 py-1.5 text-xs font-semibold bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>3-Min Demo</span>
          </button>
        </div>

      </div>
    </header>
  );
}
