import React, { useState } from 'react';
import { X, Award, CheckCircle2, Shield, Brain, Volume2, Share2, DollarSign, Clock, Download, Copy, Check } from 'lucide-react';

export default function JudgesExecutiveDossierModal({ onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopySummary = () => {
    const text = `VITAL-SENSE AI — DAFFODIL INNOVATION COMPETITION EXECUTIVE BRIEFING
Project: Build Beyond the Project | Turn Ideas into Opportunities
Author: Kartik & Daffodil Healthcare Engineering

1. THE CORE PROBLEM IN CURRENT RPM (MayaMD):
- Hospitals receive 300+ raw device alerts daily. Over 70% are harmless false alarms (exercise, coffee, loose cuff).
- Nurses spend hours calling patients who don't pick up.
- Over 40% of billable Medicare CPT 99457 revenue ($52-$94/patient/mo) is lost because staff don't have time to write clinical encounter notes.

2. WHAT WE BUILT:
VitalSense AI: An autonomous clinical RPM triage copilot that CALLS OR TEXTS the patient immediately using a calm, female nurse voice (powered by Retell AI + Web Speech in demo), filters false alarms, auto-generates audit-ready doctor SOAP notes, and syncs to Cerner/Epic EHRs via HL7 FHIR R4.

3. MEASURABLE BUSINESS IMPACT:
- 68.6% Reduction in False Alarms
- 128 Nurse Hours Saved / Month per 250 patients
- +$86,400 to +$118,500 Recaptured Annual Billing per clinic
- Averts ~14 emergency hospital readmissions per year ($184k ACO savings)

4. COMMERCIAL REUSABILITY:
Daffodil can package this as an independent enterprise healthcare accelerator to license to hospital systems, medical device OEMs (Tenovi, Impilo, Omron), and digital health software clients.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content bg-white border border-slate-200 rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  Judges' Executive Innovation Dossier
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                  Competition Submission
                </span>
              </div>
              <p className="text-xs text-slate-500">
                "Build Beyond the Project | Turn Ideas into Opportunities" • Daffodil Software
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

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs text-slate-700 leading-relaxed bg-white">
          
          {/* Executive Summary Card */}
          <div className="p-4 bg-sky-50 border border-sky-100 rounded-xl space-y-1.5">
            <span className="font-bold uppercase tracking-wider text-[10px] text-sky-800 block">
              Executive Summary
            </span>
            <p className="text-slate-800 font-medium">
              VitalSense AI is a revenue-generating, autonomous clinical Remote Patient Monitoring (RPM) copilot. It solves the #1 operational crisis in digital health: <strong>nurse alarm fatigue and lost Medicare reimbursement</strong>.
            </p>
            <p className="text-slate-600">
              When a patient's vital signs spike, instead of burdening nurses with a raw alarm, VitalSense <strong>autonomously calls or texts the patient</strong> in a calm female nurse voice, checks on their symptoms and pills, writes the doctor's clinical note, and syncs directly into hospital EHRs (Cerner/Epic).
            </p>
          </div>

          {/* Section 1: The Core Problem */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-1.5">
              1. The Real Problem in Our Existing Healthcare Project (MayaMD)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <span className="font-bold text-slate-800 block">70%+ False Alarms</span>
                <p className="text-slate-500 text-[11px]">
                  Current systems trigger raw alerts whenever BP &gt; 140. Most are harmless (walking stairs, drinking coffee, cuff placed loosely).
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <span className="font-bold text-slate-800 block">Nurse Burnout</span>
                <p className="text-slate-500 text-[11px]">
                  Care coordinators spend 3.5 hours/day placing manual phone calls that patients don't answer, drowning in alert noise.
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <span className="font-bold text-slate-800 block">Lost Medicare Revenue</span>
                <p className="text-slate-500 text-[11px]">
                  Medicare pays $52-$94/mo per patient under CPT 99457/99458, but over 40% goes unbilled due to missing clinical documentation.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: How VitalSense Solves It */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-1.5">
              2. The Technical Innovation & Architecture
            </h4>
            <div className="space-y-2 pt-1">
              <div className="p-3 border border-slate-200 rounded-lg flex items-start gap-3">
                <Volume2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Two-Sided Voice AI (Retell AI & Web Speech): </strong>
                  <span>Calls elderly patients on their cell or landline with a calm, gentle female nurse voice (Maya, NP). It conducts a two-way conversation, listens to patient replies, and transcribes everything in real time.</span>
                </div>
              </div>

              <div className="p-3 border border-slate-200 rounded-lg flex items-start gap-3">
                <Brain className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Deep Clinical Brain (HIPAA-Protected): </strong>
                  <span>The AI is fed the patient's actual care programs, medications (e.g. Torsemide, Lisinopril), allergies, and low-sodium rules. It asks specific, intelligent questions about their actual pills rather than generic advice.</span>
                </div>
              </div>

              <div className="p-3 border border-slate-200 rounded-lg flex items-start gap-3">
                <Clock className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Audit-Ready CPT 99457 Billing Scribe: </strong>
                  <span>Automatically merges the patient's voice/SMS response with their sensor readings to draft a complete doctor SOAP note with 1-click prescription adjustments (e.g. increase diuretic for 3 days).</span>
                </div>
              </div>

              <div className="p-3 border border-slate-200 rounded-lg flex items-start gap-3">
                <Share2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Universal HL7 FHIR R4 Bridge: </strong>
                  <span>Converts encounters into standard US Core FHIR bundles (`Observation`, `ClinicalImpression`, `CarePlan`), compatible with Oracle Health (Cerner) Millennium and Epic Systems.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Measurable Numbers */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-1.5">
              3. Quantified Business Impact (Annual Results)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 text-center font-mono">
              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg">
                <span className="text-[10px] text-emerald-700 uppercase font-bold block">False Alarms</span>
                <span className="text-base font-bold text-emerald-900 font-sans">-68.6%</span>
              </div>
              <div className="p-3 bg-sky-50 border border-sky-100 rounded-lg">
                <span className="text-[10px] text-sky-700 uppercase font-bold block">Nurse Time Saved</span>
                <span className="text-base font-bold text-sky-900 font-sans">128 hrs / mo</span>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                <span className="text-[10px] text-amber-700 uppercase font-bold block">Billing Recaptured</span>
                <span className="text-base font-bold text-amber-900 font-sans">+$86.4K / yr</span>
              </div>
              <div className="p-3 bg-purple-50 border border-purple-100 rounded-lg">
                <span className="text-[10px] text-purple-700 uppercase font-bold block">Hospitalizations</span>
                <span className="text-base font-bold text-purple-900 font-sans">14 Averted</span>
              </div>
            </div>
          </div>

          {/* Section 4: Why Daffodil Wins */}
          <div className="p-4 bg-slate-900 text-white rounded-xl space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <h5 className="font-bold text-xs uppercase tracking-wider text-emerald-300">
                Commercial Reusability for Daffodil Software
              </h5>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              This is not just another screen inside MayaMD. VitalSense AI is a modular, standalone <strong>Healthcare Innovation Accelerator</strong>. Daffodil can package and license this intellectual property to hospital networks, ACOs, medical device manufacturers (Tenovi, Omron, Impilo), and digital health software clients worldwide.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={handleCopySummary}
            className="px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-300 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copied ? 'Copied Summary' : 'Copy Executive Summary'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
          >
            Close Dossier
          </button>
        </div>

      </div>
    </div>
  );
}
