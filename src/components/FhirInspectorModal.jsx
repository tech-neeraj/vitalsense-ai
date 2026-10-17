import React, { useState } from 'react';
import { X, Copy, Check, Share2, Server, CheckCircle2, Loader2 } from 'lucide-react';
import { generateFhirBundle, simulateCernerPush } from '../services/fhirBridge';

export default function FhirInspectorModal({ patient, onClose }) {
  const [bundle] = useState(() => generateFhirBundle(patient));
  const [copied, setCopied] = useState(false);
  const [isPushing, setIsPushing] = useState(false);
  const [cernerResponse, setCernerResponse] = useState(null);

  const jsonString = JSON.stringify(bundle, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCernerSync = async () => {
    setIsPushing(true);
    setCernerResponse(null);
    try {
      const res = await simulateCernerPush(bundle);
      setCernerResponse(res);
    } finally {
      setIsPushing(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[96vh] sm:max-h-[88vh] flex flex-col shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="px-3.5 sm:px-5 py-2.5 sm:py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Hospital System Sync (HL7 FHIR R4)
              </h3>
              <p className="text-xs text-slate-500">
                Direct export to Cerner Millennium & Epic Systems
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

        {/* Success notification */}
        {cernerResponse && (
          <div className="p-3 bg-emerald-50 border-b border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <strong>Record successfully sent to hospital system!</strong> (ID: {cernerResponse.correlationId})
            </div>
          </div>
        )}

        {/* Code display */}
        <div className="p-3 sm:p-4 overflow-y-auto overflow-x-auto flex-1 bg-slate-900 text-slate-200 font-mono text-[10px] sm:text-[11px] leading-relaxed">
          <pre>{jsonString}</pre>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-3.5 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
          <button
            onClick={handleCopy}
            className="w-full sm:w-auto justify-center px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-300 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copied ? 'Copied' : 'Copy JSON'}</span>
          </button>

          <button
            onClick={handleCernerSync}
            disabled={isPushing}
            className="w-full sm:w-auto justify-center px-4 py-2 sm:py-1.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium rounded-lg flex items-center gap-1.5 shadow-sm transition-colors disabled:opacity-50"
          >
            {isPushing ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Sending to Cerner...</span>
              </>
            ) : (
              <>
                <Server className="w-3.5 h-3.5" />
                <span>Test Send to Cerner Hospital Server</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
