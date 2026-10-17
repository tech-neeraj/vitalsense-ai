import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, AlertTriangle, ShieldCheck, FileCheck, DollarSign } from 'lucide-react';

const TOUR_STEPS = [
  {
    step: 1,
    badge: "Step 1: The Problem",
    title: "Doctors and nurses get hundreds of false alarms every day",
    icon: AlertTriangle,
    iconColor: "text-amber-500",
    text: "When patients take their blood pressure or step on a scale at home, tiny changes trigger loud alerts for the doctor. Over 70% of these are harmless (like walking upstairs or taking medicine an hour late). Nurses spend hours calling patients who don't answer."
  },
  {
    step: 2,
    badge: "Step 2: The Check-In",
    title: "VitalSense automatically texts the patient first",
    icon: ShieldCheck,
    iconColor: "text-sky-600",
    text: "Instead of waiting for a nurse to dial the phone, VitalSense sends a quick, friendly 2-question text message right away (e.g. 'Did you take your pill today? Are your ankles swollen?'). If it was just exercise, the alert clears itself."
  },
  {
    step: 3,
    badge: "Step 3: Auto-Notes",
    title: "The AI writes the doctor's note and handles billing",
    icon: FileCheck,
    iconColor: "text-emerald-600",
    text: "Medicare pays clinics $52 to $94 per patient per month for monitoring care, but doctors must write detailed notes. VitalSense puts the patient's answers and device numbers into a complete doctor note with 1 click."
  },
  {
    step: 4,
    badge: "Step 4: Business Opportunity",
    title: "A valuable tool Daffodil can sell to any hospital or clinic",
    icon: DollarSign,
    iconColor: "text-emerald-600",
    text: "This solves a huge headache for doctors, cuts false alarms by 68%, and brings in over $100,000 in approved billing per clinic. Daffodil can package this and offer it to healthcare clients everywhere."
  }
];

export default function GuidedTourModal({ onClose, onStartExploring }) {
  const [currentStep, setCurrentStep] = useState(0);

  const stepData = TOUR_STEPS[currentStep];
  const IconComponent = stepData.icon;

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onStartExploring();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content bg-white border border-slate-200 rounded-xl w-full max-w-lg shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Quick 3-Minute Walkthrough
          </span>

          <button 
            onClick={onClose}
            className="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step dots */}
        <div className="px-5 pt-4 flex items-center gap-1.5">
          {TOUR_STEPS.map((s, idx) => (
            <div 
              key={idx}
              className={`h-1 flex-1 rounded-full transition-all ${
                idx === currentStep ? 'bg-sky-600' : idx < currentStep ? 'bg-slate-400' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
            {stepData.badge}
          </span>

          <div className="flex items-start gap-3.5 pt-1">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
              <IconComponent className={`w-5 h-5 ${stepData.iconColor}`} />
            </div>

            <div className="space-y-1.5">
              <h4 className="text-base font-bold text-slate-900 leading-snug">
                {stepData.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {stepData.text}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 disabled:opacity-30 flex items-center gap-1 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <span className="text-xs text-slate-400 font-mono">
            {currentStep + 1} of {TOUR_STEPS.length}
          </span>

          <button
            onClick={handleNext}
            className="px-4 py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-medium text-xs rounded-lg flex items-center gap-1 shadow-sm transition-colors"
          >
            <span>{currentStep === TOUR_STEPS.length - 1 ? 'Start Exploring' : 'Next'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
