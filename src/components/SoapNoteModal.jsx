import React, { useState } from 'react';
import { X, Copy, Check, Download, Share2, FileCheck, Shield, Clock, Pill, Calendar, FlaskConical, CheckCircle2 } from 'lucide-react';

export default function SoapNoteModal({ patient, onClose, onOpenFhirBridge }) {
  const [copied, setCopied] = useState(false);
  const [signed, setSigned] = useState(false);
  const [orderedAction, setOrderedAction] = useState(null);

  const fullText = `CLINICAL CARE & BILLING ENCOUNTER NOTE
Patient: ${patient.name} (${patient.mrn})
Date: ${new Date().toLocaleDateString()}
Clinic: ${patient.clinic}
Doctor: ${patient.doctor} | Nurse: ${patient.nurse}

1. PATIENT REPORT (SUBJECTIVE)
Patient was texted automatically after an out-of-range device reading. Patient stated: "${patient.chat.filter(m => m.sender === 'patient').map(m => m.text).join(' ')}"

2. DEVICE MEASUREMENTS (OBJECTIVE)
Blood Pressure: ${patient.currentReading.bp || 'N/A'} mmHg
Weight: ${patient.currentReading.weight || 'N/A'} (${patient.currentReading.weightChange || 'stable'})
Blood Sugar / Oxygen: ${patient.currentReading.glucose || patient.currentReading.spo2 || 'Normal'}
All readings received via cellular connected monitors.

3. CLINICAL ASSESSMENT
${patient.simpleDiagnosis}. Patient experienced acute reading shift correlated with patient subjective report. Monitored closely to avoid clinic escalation.

4. CARE PLAN & NEXT STEPS
1. Confirm patient takes prescribed daily medication.
2. Clinical Action Taken: ${orderedAction || 'Pending provider review'}
3. Repeat reading scheduled in 2-4 hours.
4. Nurse will follow up if symptoms do not normalize.

BILLING & AUDIT PROOF
CPT Code: ${patient.billing.code} (${patient.billing.title})
Qualifying Clinical Time: ${patient.billing.timeLogged}
Estimated Reimbursement: ${patient.billing.amount}
Status: Verified by ${patient.nurse} for ${patient.doctor}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([fullText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Doctor-Note-${patient.mrn}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content bg-white border border-slate-200 rounded-xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Doctor Clinical Note & Action Orders
              </h3>
              <p className="text-xs text-slate-500">
                {patient.name} • {patient.doctor} • {patient.clinic}
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

        {/* Medicare Billing Ribbon */}
        <div className="px-5 py-2 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-emerald-800">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Medicare Audit-Proof: <strong>{patient.billing.code}</strong> ({patient.billing.timeLogged})</span>
          </div>
          <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
            Approved: {patient.billing.amount}
          </span>
        </div>

        {/* 1-Click Clinical Action Toolbar */}
        <div className="p-3 bg-sky-50/70 border-b border-sky-100 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-sky-950 flex items-center gap-1.5">
              <Pill className="w-3.5 h-3.5 text-sky-700" />
              <span>1-Click Clinical Orders (Direct to EHR / Pharmacy):</span>
            </span>
            {orderedAction && (
              <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Order Transmitted!
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-1.5 sm:gap-2 pt-0.5">
            <button
              onClick={() => setOrderedAction("Adjust Torsemide to 40mg daily x 3 days")}
              className={`w-full sm:w-auto text-left sm:text-center px-2.5 py-1.5 sm:py-1 text-xs rounded-lg border transition-all ${
                orderedAction?.includes("Torsemide")
                  ? 'bg-sky-700 text-white border-sky-800 font-semibold shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-sky-100 border-slate-300'
              }`}
            >
              💊 Increase Torsemide to 40mg (3 Days)
            </button>

            <button
              onClick={() => setOrderedAction("Scheduled Video Follow-up with Dr. Patel tomorrow 10am")}
              className={`w-full sm:w-auto text-left sm:text-center px-2.5 py-1.5 sm:py-1 text-xs rounded-lg border transition-all ${
                orderedAction?.includes("Video")
                  ? 'bg-sky-700 text-white border-sky-800 font-semibold shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-sky-100 border-slate-300'
              }`}
            >
              📅 Schedule Video Call
            </button>

            <button
              onClick={() => setOrderedAction("Order Potassium & Renal BMP Blood Panel")}
              className={`w-full sm:w-auto text-left sm:text-center px-2.5 py-1.5 sm:py-1 text-xs rounded-lg border transition-all ${
                orderedAction?.includes("BMP")
                  ? 'bg-sky-700 text-white border-sky-800 font-semibold shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-sky-100 border-slate-300'
              }`}
            >
              🧪 Order Blood Lab (BMP)
            </button>
          </div>
        </div>

        {/* Note Body */}
        <div className="p-3.5 sm:p-5 overflow-y-auto space-y-2.5 sm:space-y-3 flex-1 text-xs text-slate-700 leading-relaxed bg-white">
          
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
            <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider text-sky-800">
              1. What Patient Said (Automatic Text Check-in)
            </h4>
            <p>
              Patient confirmed: "{patient.chat.filter(m => m.sender === 'patient').map(m => m.text).join(' ')}"
            </p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
            <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider text-slate-700">
              2. Device Measurements (Cellular Monitors)
            </h4>
            <p>
              Blood Pressure: {patient.currentReading.bp || 'Normal'} mmHg • Weight: {patient.currentReading.weight || 'Normal'} {patient.currentReading.weightChange ? `(${patient.currentReading.weightChange})` : ''} • Heart Rate: {patient.currentReading.heartRate || '74 bpm'}.
            </p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
            <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider text-amber-800">
              3. Clinical Assessment
            </h4>
            <p>
              {patient.simpleDiagnosis}. Patient experienced acute reading shift correlated with patient subjective report. Monitored to prevent emergency clinic trip.
            </p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
            <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider text-emerald-800">
              4. Next Steps & Care Plan
            </h4>
            <p>
              1. {orderedAction ? `Active Order: ${orderedAction}.` : 'Confirm patient took prescribed daily medicine.'}
              <br />
              2. Repeat reading scheduled in 2-4 hours.
              <br />
              3. Nurse will follow up if symptoms do not normalize.
            </p>
          </div>

          <div className="p-3 border border-slate-200 rounded-lg flex items-center justify-between bg-slate-50">
            <div>
              <span className="font-bold text-slate-900 block text-xs">Doctor Sign-Off:</span>
              <span className="text-slate-500 text-[11px]">
                {signed ? `✓ Electronically signed by ${patient.nurse} for ${patient.doctor}` : 'Pending final review'}
              </span>
            </div>

            <button
              onClick={() => setSigned(true)}
              disabled={signed}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                signed ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              {signed ? '✓ Signed & Locked' : 'Sign Note'}
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 sm:p-3.5 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopy}
              className="flex-1 sm:flex-initial justify-center px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-300 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex-1 sm:flex-initial justify-center px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-300 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Download</span>
            </button>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenFhirBridge(patient);
            }}
            className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Send to Hospital Record (FHIR)</span>
          </button>
        </div>

      </div>
    </div>
  );
}
