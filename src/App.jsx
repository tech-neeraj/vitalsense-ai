import React, { useState } from 'react';
import Header from './components/Header';
import TriageDashboard from './components/TriageDashboard';
import MicroTriageModal from './components/MicroTriageModal';
import SoapNoteModal from './components/SoapNoteModal';
import FhirInspectorModal from './components/FhirInspectorModal';
import RoiCalculatorModal from './components/RoiCalculatorModal';
import GuidedTourModal from './components/GuidedTourModal';
import FeatureShowcaseModal from './components/FeatureShowcaseModal';
import { MOCK_PATIENTS } from './data/mockPatients';

export default function App() {
  const [patients, setPatients] = useState(MOCK_PATIENTS);
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [activeModal, setActiveModal] = useState(null); // 'MICRO_TRIAGE' | 'SOAP_NOTE' | 'FHIR_BRIDGE' | 'ROI' | 'TOUR' | 'FEATURES'

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      
      {/* Header */}
      <Header
        onOpenTour={() => setActiveModal('TOUR')}
        onOpenRoi={() => setActiveModal('ROI')}
        onOpenFeatures={() => setActiveModal('FEATURES')}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <TriageDashboard
          patients={patients}
          onOpenMicroTriage={(p) => {
            setSelectedPatient(p);
            setActiveModal('MICRO_TRIAGE');
          }}
          onOpenSoapNote={(p) => {
            setSelectedPatient(p);
            setActiveModal('SOAP_NOTE');
          }}
          onOpenFhirBridge={(p) => {
            setSelectedPatient(p);
            setActiveModal('FHIR_BRIDGE');
          }}
        />
      </main>

      {/* Modals */}
      {activeModal === 'FEATURES' && (
        <FeatureShowcaseModal
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'MICRO_TRIAGE' && selectedPatient && (
        <MicroTriageModal
          patient={selectedPatient}
          onClose={() => setActiveModal(null)}
          onOpenSoapNote={(p) => {
            setSelectedPatient(p);
            setActiveModal('SOAP_NOTE');
          }}
        />
      )}

      {activeModal === 'SOAP_NOTE' && selectedPatient && (
        <SoapNoteModal
          patient={selectedPatient}
          onClose={() => setActiveModal(null)}
          onOpenFhirBridge={(p) => {
            setSelectedPatient(p);
            setActiveModal('FHIR_BRIDGE');
          }}
        />
      )}

      {activeModal === 'FHIR_BRIDGE' && selectedPatient && (
        <FhirInspectorModal
          patient={selectedPatient}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'ROI' && (
        <RoiCalculatorModal
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'TOUR' && (
        <GuidedTourModal
          onClose={() => setActiveModal(null)}
          onStartExploring={() => setActiveModal(null)}
        />
      )}

      {/* Sober Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>VitalSense AI • Daffodil Innovation Initiative: <em>Build Beyond the Project</em></span>
          <span className="text-slate-400">
            HIPAA-Compliant AI Remote Patient Monitoring
          </span>
        </div>
      </footer>

    </div>
  );
}
