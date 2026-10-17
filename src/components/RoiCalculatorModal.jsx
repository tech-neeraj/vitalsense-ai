import React, { useState } from 'react';
import { X, Calculator, DollarSign, Clock, ShieldCheck } from 'lucide-react';

export default function RoiCalculatorModal({ onClose }) {
  const [patientCount, setPatientCount] = useState(250);

  const falseAlarms = Math.round(patientCount * 25);
  const hoursSaved = Math.round(patientCount * 0.52);
  const revenueGain = Math.round(patientCount * 470);

  return (
    <div className="modal-overlay">
      <div className="modal-content bg-white border border-slate-200 rounded-xl w-full max-w-xl max-h-[85vh] flex flex-col shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Clinic Time & Revenue Calculator
              </h3>
              <p className="text-xs text-slate-500">
                Calculates hours saved and approved Medicare billing
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5 flex-1 bg-white">
          
          {/* Slider */}
          <div className="space-y-2 p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Patients being monitored:</span>
              <span className="text-sm font-bold text-sky-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                {patientCount} Patients
              </span>
            </div>

            <input
              type="range"
              min={50}
              max={1500}
              step={25}
              value={patientCount}
              onChange={(e) => setPatientCount(Number(e.target.value))}
              className="w-full accent-sky-600 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
            />

            <div className="flex justify-between text-[10px] text-slate-400">
              <span>50 (Small clinic)</span>
              <span>500 (Mid-size group)</span>
              <span>1,500 (Hospital network)</span>
            </div>
          </div>

          {/* 3 Result Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto" />
              <span className="text-[10px] uppercase font-semibold text-slate-500 block">False Alarms Stopped</span>
              <div className="text-base font-bold text-slate-900">{falseAlarms.toLocaleString()} / mo</div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
              <Clock className="w-4 h-4 text-sky-600 mx-auto" />
              <span className="text-[10px] uppercase font-semibold text-slate-500 block">Nurse Hours Saved</span>
              <div className="text-base font-bold text-slate-900">{hoursSaved.toLocaleString()} hrs / mo</div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
              <DollarSign className="w-4 h-4 text-amber-600 mx-auto" />
              <span className="text-[10px] uppercase font-semibold text-slate-500 block">Extra Revenue Gained</span>
              <div className="text-base font-bold text-slate-900">+${revenueGain.toLocaleString()} / yr</div>
            </div>

          </div>

          {/* Plain English Takeaway */}
          <div className="p-3 bg-sky-50 border border-sky-100 rounded-lg text-xs text-sky-900 leading-relaxed">
            <strong>Why this matters:</strong> For {patientCount} patients, doctors usually miss out on over ${revenueGain.toLocaleString()} each year simply because staff don't have time to write manual notes for every alert. VitalSense does the note writing automatically so every bill gets approved.
          </div>

        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
