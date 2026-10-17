import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Share2, 
  PhoneCall, 
  Clock, 
  Filter, 
  ShieldAlert,
  ArrowRight,
  Wifi,
  Sparkles
} from 'lucide-react';

export default function TriageDashboard({ 
  patients, 
  onOpenMicroTriage, 
  onOpenSoapNote, 
  onOpenFhirBridge
}) {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredPatients = patients.filter(p => {
    if (activeFilter === 'URGENT') return p.aiSummary.level === 'urgent' || p.aiSummary.level === 'critical';
    if (activeFilter === 'MEDS') return p.aiSummary.level === 'warning';
    if (activeFilter === 'CLEARED') return p.aiSummary.level === 'filtered';
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* High-Impact Hero Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-sky-100 text-sky-800 rounded">
                Daffodil Innovation Core
              </span>
              <span className="text-xs text-slate-500 font-medium">Remote Patient Monitoring (RPM) Copilot</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Stop drowning in false medical alarms.
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Normally, nurses get hundreds of beep alerts every day for tiny changes in blood pressure or weight. 
              <strong> VitalSense calls or texts the patient to check on them first</strong>, removes false alarms, and writes the doctor’s note automatically.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto shrink-0">
            <div className="flex-1 lg:flex-initial px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-center">
              <span className="block text-[10px] uppercase font-bold text-slate-400">Daily Readings</span>
              <span className="text-base font-bold text-slate-800 font-mono">1,420</span>
            </div>
            <div className="flex-1 lg:flex-initial px-4 py-2.5 bg-rose-50 border border-rose-200 rounded-xl text-center">
              <span className="block text-[10px] uppercase font-bold text-rose-500">Raw Alarms</span>
              <span className="text-base font-bold text-rose-700 font-mono">312 (Overload)</span>
            </div>
            <div className="flex-1 lg:flex-initial px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
              <span className="block text-[10px] uppercase font-bold text-emerald-600">VitalSense Filtered</span>
              <span className="text-base font-bold text-emerald-700 font-mono">98 Actionable</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cohort Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <Filter className="w-3.5 h-3.5" />
          <span>Filter Patient List:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setActiveFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeFilter === 'ALL'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Patients ({patients.length})
          </button>

          <button
            onClick={() => setActiveFilter('URGENT')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeFilter === 'URGENT'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
            <span>Needs Attention Now (2)</span>
          </button>

          <button
            onClick={() => setActiveFilter('MEDS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeFilter === 'MEDS'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span>Forgot Medicine (1)</span>
          </button>

          <button
            onClick={() => setActiveFilter('CLEARED')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeFilter === 'CLEARED'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>False Alarms Cleared (1)</span>
          </button>
        </div>
      </div>

      {/* Patient Cards List */}
      <div className="space-y-4">
        {filteredPatients.map((patient) => {
          const isUrgent = patient.aiSummary.level === 'urgent' || patient.aiSummary.level === 'critical';
          const isWarning = patient.aiSummary.level === 'warning';

          const badgeClass = isUrgent
            ? 'bg-rose-50 text-rose-700 border-rose-200'
            : isWarning
            ? 'bg-amber-50 text-amber-700 border-amber-200'
            : 'bg-emerald-50 text-emerald-700 border-emerald-200';

          return (
            <div 
              key={patient.id}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-slate-300 transition-all space-y-4"
            >
              {/* Top Row: Demographics + Vitals + Urgency Badge */}
              <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
                
                {/* Left: Patient info */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base font-bold text-slate-900">
                      {patient.name}
                    </h2>
                    <span className="text-xs text-slate-500">
                      ({patient.age} yrs, {patient.gender})
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                      {patient.mrn}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-700">
                    Condition: <span className="text-slate-900">{patient.simpleDiagnosis}</span>
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {patient.clinic} • Care Nurse: {patient.nurse}
                  </p>
                </div>

                {/* Center: Vitals Displays */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {patient.currentReading.bp && (
                    <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-center min-w-[110px]">
                      <span className="text-[10px] text-slate-500 block uppercase font-bold">Blood Pressure</span>
                      <span className={`text-sm font-bold font-mono ${(patient.currentReading.bpStatus || '').includes('High') ? 'text-rose-600' : 'text-slate-800'}`}>
                        {patient.currentReading.bp}
                      </span>
                    </div>
                  )}

                  {patient.currentReading.weight && (
                    <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-center min-w-[110px]">
                      <span className="text-[10px] text-slate-500 block uppercase font-bold">Weight</span>
                      <span className="text-sm font-bold font-mono text-rose-600">
                        {patient.currentReading.weight}
                      </span>
                      <span className="block text-[10px] text-rose-500 font-semibold">
                        {patient.currentReading.weightChange}
                      </span>
                    </div>
                  )}

                  {patient.currentReading.glucose && (
                    <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-center min-w-[110px]">
                      <span className="text-[10px] text-slate-500 block uppercase font-bold">Blood Sugar</span>
                      <span className="text-sm font-bold font-mono text-amber-600">
                        {patient.currentReading.glucose}
                      </span>
                    </div>
                  )}

                  {patient.currentReading.spo2 && (
                    <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-center min-w-[110px]">
                      <span className="text-[10px] text-slate-500 block uppercase font-bold">SpO2 (Oxygen)</span>
                      <span className="text-sm font-bold font-mono text-rose-600">
                        {patient.currentReading.spo2}
                      </span>
                    </div>
                  )}

                  {/* Medicare CPT 99457 Billing Box */}
                  <div className="px-3 py-1.5 bg-sky-50 border border-sky-100 rounded-lg text-center min-w-[110px]">
                    <span className="text-[10px] text-sky-700 block uppercase font-bold flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3 text-sky-600" />
                      {patient.billing.code}
                    </span>
                    <span className="text-xs font-bold text-sky-900 font-mono">
                      {patient.billing.timeLogged}
                    </span>
                    <span className="block text-[10px] text-emerald-600 font-bold">
                      ✓ {patient.billing.amount}
                    </span>
                  </div>
                </div>

                {/* Right: Urgency Status Tag */}
                <div className="shrink-0">
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${badgeClass}`}>
                    {patient.aiSummary.badge}
                  </span>
                </div>

              </div>

              {/* Middle Row: "What Happened" & "What VitalSense Did" */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-700 space-y-1.5 leading-relaxed">
                <div>
                  <strong className="text-slate-900 font-bold">What happened: </strong>
                  <span>{patient.aiSummary.whatHappened}</span>
                </div>
                <div>
                  <strong className="text-sky-800 font-bold">What VitalSense did: </strong>
                  <span>{patient.aiSummary.whatAiDid}</span>
                </div>
              </div>

              {/* Bottom Action Row: Clear, High-Impact Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <span>⏱️ <strong>{patient.aiSummary.timeSaved}</strong></span>
                  <span>•</span>
                  <span>📱 Channel: Automated Voice Call & SMS</span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  
                  {/* Primary Call / SMS Button */}
                  <button
                    onClick={() => onOpenMicroTriage(patient)}
                    className="px-3.5 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>AI Voice Call & SMS</span>
                  </button>

                  {/* Doctor Note with 1-Click Orders */}
                  <button
                    onClick={() => onOpenSoapNote(patient)}
                    className="px-3.5 py-1.5 text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Doctor Note & Orders</span>
                  </button>

                  {/* EHR FHIR sync */}
                  <button
                    onClick={() => onOpenFhirBridge(patient)}
                    className="px-3 py-1.5 text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Share2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>Send to Hospital (FHIR)</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
