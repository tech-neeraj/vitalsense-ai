import React from 'react';
import { X, TrendingUp, Activity, Pill, Wifi, Battery, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function PatientTrendModal({ patient, onClose, onOpenSoapNote }) {
  const history = patient.telemetryHistory;

  return (
    <div className="modal-overlay">
      <div className="modal-content bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                7-Day Hemodynamic Trajectory & Telemetry Analysis
              </h3>
              <p className="text-xs text-slate-400">
                {patient.name} ({patient.mrn}) • {patient.primaryDiagnosis}
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-950/50">
          
          {/* Velocity Drift Banner */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase text-cyan-400 tracking-wider block">
                VitalSense Dynamic Velocity Matrix
              </span>
              <p className="text-xs text-slate-300">
                Baseline: <strong>{patient.baselines.systolic?.baseline || 120}/{patient.baselines.diastolic?.baseline || 80} mmHg</strong>
                {patient.baselines.weight && ` • Weight Baseline: ${patient.baselines.weight.baseline} lbs`}
                {patient.baselines.glucose && ` • Fasting Glucose: ${patient.baselines.glucose.baseline} mg/dL`}
              </p>
            </div>

            <div className="px-3 py-1.5 rounded-lg bg-cyan-950/80 border border-cyan-800/80 text-xs text-cyan-300 font-mono font-semibold">
              Dynamic Baseline Window: 7-Day Rolling
            </div>
          </div>

          {/* 7-Day Telemetry History Table */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>Daily Telemetry Log (Tenovi Gateway Sync)</span>
            </h4>

            <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/60">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3">Date</th>
                    <th className="p-3">Systolic / Diastolic</th>
                    {history[0].weight && <th className="p-3">Weight (lbs)</th>}
                    {history[0].glucose && <th className="p-3">Glucose (mg/dL)</th>}
                    {history[0].spo2 && <th className="p-3">SpO2 (%)</th>}
                    <th className="p-3">Resting HR</th>
                    <th className="p-3">AI Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {history.map((row, idx) => {
                    const isLatest = idx === history.length - 1;
                    return (
                      <tr key={idx} className={isLatest ? 'bg-cyan-950/20 font-bold' : 'hover:bg-slate-800/40'}>
                        <td className="p-3 text-slate-300">{row.date}</td>
                        <td className="p-3 text-slate-100">
                          <span className={row.systolic > 140 ? 'text-rose-400 font-bold' : ''}>
                            {row.systolic}
                          </span>
                          {row.diastolic && ` / ${row.diastolic}`} mmHg
                        </td>
                        {row.weight && (
                          <td className={`p-3 ${row.weight > 185 ? 'text-rose-400 font-bold' : 'text-slate-300'}`}>
                            {row.weight}
                          </td>
                        )}
                        {row.glucose && (
                          <td className={`p-3 ${row.glucose > 180 ? 'text-amber-400 font-bold' : 'text-slate-300'}`}>
                            {row.glucose}
                          </td>
                        )}
                        {row.spo2 && (
                          <td className={`p-3 ${row.spo2 < 90 ? 'text-rose-400 font-bold' : 'text-slate-300'}`}>
                            {row.spo2}%
                          </td>
                        )}
                        <td className="p-3 text-slate-400">{row.hr || 74} bpm</td>
                        <td className="p-3 font-sans">
                          {isLatest ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                              Current Reading
                            </span>
                          ) : (
                            <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              Normal
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Active Medication Adherence Matrix */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
              <Pill className="w-3.5 h-3.5 text-emerald-400" />
              <span>Current Medications & Adherence Tracking</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {patient.medications.map((med, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">{med.name}</span>
                    <span className="text-slate-400 text-[11px]">{med.dosage}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    med.adherence.includes('Missed') ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                    med.adherence.includes('Delayed') ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                    'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}>
                    {med.adherence}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Telemetry source: Tenovi Cellular Gateway (Model TNV-BPM)
          </span>

          <button
            onClick={() => {
              onClose();
              onOpenSoapNote(patient);
            }}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20"
          >
            <span>Proceed to CPT 99457 Note</span>
          </button>
        </div>

      </div>
    </div>
  );
}
