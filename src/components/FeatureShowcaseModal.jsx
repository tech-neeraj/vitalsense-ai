import React from 'react';
import { X, Mic, Brain, Globe, Pill, Users, BatteryCharging, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

const FEATURES = [
  {
    icon: Brain,
    title: "1. Deep Patient Medical Context (HIPAA-Safe)",
    desc: "The AI knows Arthur's entire care program, current medications (Torsemide, Lisinopril), sodium restrictions, and past labs. This allows it to talk intelligently and specifically about his actual pills rather than giving generic advice.",
    badge: "Clinical Intelligence"
  },
  {
    icon: Mic,
    title: "2. Hands-Free AI Voice Call Simulator",
    desc: "For elderly patients with poor vision or arthritis who cannot type text messages, the AI can place an automated phone call to their landline or cell phone, speak out loud, and transcribe their voice live.",
    badge: "Senior Accessibility"
  },
  {
    icon: Globe,
    title: "3. Multi-Language Support (English, Spanish, Hindi)",
    desc: "Patients receive texts in their native language (e.g. Spanish or Hindi), reply in their language, and the AI automatically translates everything into English for the clinic's doctor notes.",
    badge: "Health Equity"
  },
  {
    icon: Pill,
    title: "4. 1-Click Medicine Adjustments & Lab Orders",
    desc: "Doctors and nurses can adjust prescriptions (e.g. Torsemide 40mg for 3 days), request blood tests, or schedule video calls with a single click right from the generated clinical note.",
    badge: "Closed-Loop Care"
  },
  {
    icon: Users,
    title: "5. Family & Caregiver Notification Loop",
    desc: "Adult children and family caregivers receive gentle, reassuring SMS updates when their elderly parent has an alert resolved, giving families peace of mind.",
    badge: "Family Peace of Mind"
  },
  {
    icon: BatteryCharging,
    title: "6. Cellular Equipment Health Monitor (Tenovi / Impilo)",
    desc: "Monitors battery levels and cellular connectivity of remote cuffs and scales. Sends proactive recharge reminders to prevent lost transmission days and protect clinic billing.",
    badge: "Revenue Protection"
  }
];

export default function FeatureShowcaseModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[96vh] sm:max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-3.5 sm:px-6 py-2.5 sm:py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  VitalSense Platform Capabilities
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  6 Core Innovations
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Advanced features that go beyond standard remote monitoring systems
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Features List */}
        <div className="p-3.5 sm:p-6 overflow-y-auto space-y-3 sm:space-y-4 flex-1 bg-slate-50/50">
          <div className="grid grid-cols-1 gap-3.5">
            {FEATURES.map((f, idx) => {
              const Icon = f.icon;
              return (
                <div key={idx} className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-sky-300 transition-all space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {f.title}
                      </h4>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                      {f.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-0 sm:pl-10 pt-1">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* HIPAA & Security Seal */}
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-xs text-emerald-900">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              <strong>HIPAA & SOC-2 Compliant Architecture:</strong> All patient data is encrypted in transit and at rest. Patient identifiers (PHI) are shielded through de-identified clinical sessions.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-3.5 sm:px-6 py-2.5 sm:py-3.5 border-t border-slate-200 bg-white flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm text-center"
          >
            Back to Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}
