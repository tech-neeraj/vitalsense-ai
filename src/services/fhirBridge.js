// HL7 FHIR R4 Interoperability Bridge for VitalSense AI
// Modeled directly after Cerner sandbox implementation in Cerner_poc and mamd_backend FHIRRoutes

export function generateFhirBundle(patient) {
  const now = new Date().toISOString();
  const bundleId = `bundle-vitalsense-${patient.id.toLowerCase()}-${Date.now()}`;
  
  const entries = [];

  // 1. Patient Resource
  entries.push({
    fullUrl: `urn:uuid:patient-${patient.id}`,
    resource: {
      resourceType: "Patient",
      id: patient.id,
      identifier: [
        {
          system: "https://fhir.valleyhealth.org/mrn",
          value: patient.mrn
        }
      ],
      active: true,
      name: [
        {
          use: "official",
          family: patient.name.split(' ')[1] || 'Patient',
          given: [patient.name.split(' ')[0]]
        }
      ],
      gender: patient.gender.toLowerCase(),
      birthDate: `${1955 + (80 - patient.age)}-04-12`,
      managingOrganization: {
        display: patient.clinic
      }
    }
  });

  // 2. Telemetry Observation (Blood Pressure)
  if (patient.currentReading.systolic) {
    entries.push({
      fullUrl: `urn:uuid:obs-bp-${patient.id}`,
      resource: {
        resourceType: "Observation",
        status: "final",
        category: [
          {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "vital-signs",
                display: "Vital Signs"
              }
            ]
          }
        ],
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "85354-9",
              display: "Blood pressure panel with all children optional"
            }
          ],
          text: "Blood Pressure"
        },
        subject: {
          reference: `urn:uuid:patient-${patient.id}`,
          display: patient.name
        },
        effectiveDateTime: now,
        device: {
          display: patient.devices[0]?.type || "Cellular BPM"
        },
        component: [
          {
            code: {
              coding: [{ system: "http://loinc.org", code: "8480-6", display: "Systolic blood pressure" }]
            },
            valueQuantity: {
              value: patient.currentReading.systolic,
              unit: "mmHg",
              system: "http://unitsofmeasure.org",
              code: "mm[Hg]"
            },
            interpretation: [
              {
                coding: [
                  {
                    system: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
                    code: patient.currentReading.systolic > 140 ? "H" : "N",
                    display: patient.currentReading.systolic > 140 ? "High" : "Normal"
                  }
                ]
              }
            ]
          },
          {
            code: {
              coding: [{ system: "http://loinc.org", code: "8462-4", display: "Diastolic blood pressure" }]
            },
            valueQuantity: {
              value: patient.currentReading.diastolic,
              unit: "mmHg",
              system: "http://unitsofmeasure.org",
              code: "mm[Hg]"
            }
          }
        ]
      }
    });
  }

  // 3. Weight Observation (if present)
  if (patient.currentReading.weight) {
    entries.push({
      fullUrl: `urn:uuid:obs-wt-${patient.id}`,
      resource: {
        resourceType: "Observation",
        status: "final",
        code: {
          coding: [{ system: "http://loinc.org", code: "29463-7", display: "Body weight" }],
          text: "Body Weight"
        },
        subject: { reference: `urn:uuid:patient-${patient.id}`, display: patient.name },
        effectiveDateTime: now,
        valueQuantity: {
          value: patient.currentReading.weight,
          unit: "lbs",
          system: "http://unitsofmeasure.org",
          code: "[lb_av]"
        },
        note: [{ text: `48-hour velocity delta: ${patient.currentReading.deltaWeight48h}` }]
      }
    });
  }

  // 4. ClinicalImpression (AI Assessment + Closed-Loop Findings)
  entries.push({
    fullUrl: `urn:uuid:clinical-impression-${patient.id}`,
    resource: {
      resourceType: "ClinicalImpression",
      status: "completed",
      description: patient.aiTriageStatus.clinicalRationale,
      subject: { reference: `urn:uuid:patient-${patient.id}`, display: patient.name },
      assessor: {
        display: `VitalSense AI Autonomous Agent (Validated by ${patient.careCoordinator})`
      },
      effectiveDateTime: now,
      finding: [
        {
          itemCodeableConcept: {
            text: `Risk Category: ${patient.aiTriageStatus.category} (${patient.aiTriageStatus.urgencyBadge})`
          }
        },
        {
          itemCodeableConcept: {
            text: `Micro-Triage Result: ${patient.microTriage.status}`
          }
        }
      ],
      summary: "Automated multi-modal triage evaluated telemetry velocity against 7-day baseline. CPT 99457 interaction documented."
    }
  });

  // 5. CarePlan Update Recommendation
  entries.push({
    fullUrl: `urn:uuid:careplan-${patient.id}`,
    resource: {
      resourceType: "CarePlan",
      status: "active",
      intent: "plan",
      category: [
        {
          coding: [{ system: "http://hl7.org/fhir/us/core/CodeSystem/careplan-category", code: "assess-plan" }]
        }
      ],
      title: "VitalSense RPM Clinical Action Plan",
      description: "Action items generated based on telemetry drift and micro-triage findings.",
      subject: { reference: `urn:uuid:patient-${patient.id}`, display: patient.name },
      period: { start: now },
      activity: [
        {
          detail: {
            kind: "MedicationRequest",
            status: "in-progress",
            description: "Clinical staff titration review and medication adherence reinforcement."
          }
        }
      ]
    }
  });

  return {
    resourceType: "Bundle",
    id: bundleId,
    type: "transaction",
    timestamp: now,
    meta: {
      source: "VitalSense-AI-Autonomous-Engine",
      profile: ["http://hl7.org/fhir/us/core/StructureDefinition/us-core-bundle"]
    },
    entry: entries
  };
}

export function simulateCernerPush(bundle) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 201,
        statusText: "Created",
        server: "Oracle Health (Cerner) Millennium FHIR R4",
        tenantId: "ec2458f2-1e24-41c8-b71b-0e701af7583d",
        endpoint: "https://fhir-ehr-code.cerner.com/r4/ec2458f2-1e24-41c8-b71b-0e701af7583d/Bundle",
        bundleId: bundle.id,
        resourcesCreated: bundle.entry.length,
        transactionTime: new Date().toISOString(),
        correlationId: `cerner-tx-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
      });
    }, 1200);
  });
}
