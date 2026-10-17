// Plain-English, realistic patient examples for VitalSense with deep clinical profile & multi-language support

export const MOCK_PATIENTS = [
  {
    id: "PT-84021",
    name: "Arthur Morgan",
    age: 68,
    gender: "Male",
    mrn: "MRN-449102",
    simpleDiagnosis: "Heart Failure & High Blood Pressure",
    doctor: "Dr. Rajiv Patel",
    nurse: "Elena Rostova, RN",
    clinic: "Valley Health Heart Center",
    
    // Deep Patient Context (HIPAA Shielded)
    clinicalProfile: {
      carePrograms: ["Heart Failure RPM Care Plan", "Hypertension Stage 2 Protocol"],
      activeMedications: [
        { name: "Torsemide", dose: "20 mg Daily", purpose: "Water Pill (Diuretic for fluid swelling)", takenToday: false },
        { name: "Lisinopril", dose: "20 mg Daily", purpose: "Blood Pressure Control", takenToday: true },
        { name: "Carvedilol", dose: "12.5 mg BID", purpose: "Heart Rhythm & Pressure", takenToday: true },
        { name: "Spironolactone", dose: "25 mg Daily", purpose: "Potassium-Sparing Diuretic", takenToday: true }
      ],
      dietRestrictions: "Low-sodium diet (< 2,000 mg/day), Fluid intake limit: 2.0 Liters/day",
      allergies: "Penicillin (causes skin hives)",
      recentLabs: "eGFR: 58 (CKD Stage 3a), Potassium: 4.4 (Normal), BNP: 410 pg/mL",
      caregiver: {
        name: "Sarah Morgan",
        relation: "Daughter & Primary Caregiver",
        phone: "+1 (555) 781-9920",
        notifyOnAlerts: true
      }
    },

    devices: [
      { name: "Blood Pressure Cuff (Cellular)", battery: "94%", signal: "Good (-74 dBm)", vendor: "Tenovi" },
      { name: "Digital Weight Scale (Cellular)", battery: "88%", signal: "Good (-76 dBm)", vendor: "Tenovi" }
    ],

    currentReading: {
      bp: "164 / 98",
      bpStatus: "High",
      weight: "186.2 lbs",
      weightChange: "+4.2 lbs in 2 days",
      heartRate: "88 bpm",
      time: "Today, 8:42 AM"
    },

    baseline: {
      normalBp: "128 / 82",
      normalWeight: "182 lbs"
    },

    aiSummary: {
      level: "urgent",
      badge: "Needs Attention: Fluid Build-up",
      riskScore: 89,
      whatHappened: "Arthur's blood pressure jumped to 164/98 and he gained 4.2 lbs in 48 hours.",
      whatAiDid: "VitalSense immediately texted Arthur. Arthur explained that he ate salty soup and forgot his morning Torsemide water pill. VitalSense alerted Nurse Elena with an instant prescription adjustment.",
      timeSaved: "18 mins saved"
    },

    // Multi-Language Conversation Data
    conversationsByLang: {
      en: [
        { sender: "ai", text: "Hi Arthur, this is your care team. We noticed your weight jumped 4 lbs and BP is 164/98 this morning. Are your socks tight or are you having trouble breathing lying flat?", time: "8:43 AM" },
        { sender: "patient", text: "Yes, woke up feeling bloated and my ankles are a bit puffy.", time: "8:46 AM" },
        { sender: "ai", text: "Did you take your Torsemide (water pill) this morning, or have high-sodium foods over the weekend?", time: "8:47 AM" },
        { sender: "patient", text: "I had canned salty soup last night and forgot my Torsemide pill this morning.", time: "8:49 AM" },
        { sender: "ai", text: "Understood Arthur. Nurse Elena and Dr. Patel have been notified. Please sit resting while the nurse reviews your dose.", time: "8:50 AM" }
      ],
      es: [
        { sender: "ai", text: "Hola Arthur, somos su equipo médico. Notamos que su peso subió 4 lbs y su presión arterial está en 164/98. ¿Siente los tobillos hinchados o dificultad para respirar acostado?", time: "8:43 AM" },
        { sender: "patient", text: "Sí, me desperté hinchado y los calcetines me aprietan los tobillos.", time: "8:46 AM" },
        { sender: "ai", text: "¿Tomó su pastilla de agua (Torsemide) esta mañana o comió alimentos con mucha sal el fin de semana?", time: "8:47 AM" },
        { sender: "patient", text: "Comí sopa enlatada salada anoche y olvidé mi pastilla de Torsemide esta mañana.", time: "8:49 AM" },
        { sender: "ai", text: "Entendido Arthur. Hemos notificado a la enfermera Elena y al Dr. Patel. Por favor descanse sentado.", time: "8:50 AM" }
      ],
      hi: [
        { sender: "ai", text: "नमस्ते आर्थर, आपकी मेडिकल टीम। हमने देखा कि आज सुबह आपका वजन 4 पाउंड बढ़ गया और बीपी 164/98 है। क्या आपके टखनों में सूजन है या सांस लेने में तकलीफ हो रही है?", time: "8:43 AM" },
        { sender: "patient", text: "हाँ, आज सुबह पेट फूला हुआ लगा और टखनों में हल्की सूजन है।", time: "8:46 AM" },
        { sender: "ai", text: "क्या आपने आज सुबह अपनी टॉरसेमाइड (Torsemide) दवा ली, या सप्ताहांत में अधिक नमक वाला भोजन खाया?", time: "8:47 AM" },
        { sender: "patient", text: "कल रात डिब्बाबंद नमकीन सूप पिया था और आज सुबह अपनी टॉरसेमाइड की गोली लेना भूल गया।", time: "8:49 AM" },
        { sender: "ai", text: "समझ गया आर्थर। नर्स ऐलेना और डॉ. पटेल को सूचित कर दिया गया है। कृपया आराम से बैठें।", time: "8:50 AM" }
      ]
    },

    // Default chat
    chat: [
      { sender: "ai", text: "Hi Arthur, this is your care team. We noticed your weight jumped 4 lbs and BP is 164/98 this morning. Are your socks tight or are you having trouble breathing lying flat?", time: "8:43 AM" },
      { sender: "patient", text: "Yes, woke up feeling bloated and my ankles are a bit puffy.", time: "8:46 AM" },
      { sender: "ai", text: "Did you take your Torsemide (water pill) this morning, or have high-sodium foods over the weekend?", time: "8:47 AM" },
      { sender: "patient", text: "I had canned salty soup last night and forgot my Torsemide pill this morning.", time: "8:49 AM" },
      { sender: "ai", text: "Understood Arthur. Nurse Elena and Dr. Patel have been notified. Please sit resting while the nurse reviews your dose.", time: "8:50 AM" }
    ],

    voiceCallScript: [
      { speaker: "AI Assistant", text: "Hello Arthur, this is an automated health check from Valley Health Care. We noticed your morning weight went up 4 pounds and your blood pressure was 164 over 98. Are you feeling short of breath?" },
      { speaker: "Arthur", text: "A little bit when I was lying flat, and my ankles are swollen." },
      { speaker: "AI Assistant", text: "Did you take your Torsemide water pill this morning, Arthur?" },
      { speaker: "Arthur", text: "No, I had salty soup last night and forgot my morning pill." },
      { speaker: "AI Assistant", text: "Thank you Arthur. Please rest sitting upright. Nurse Elena and Dr. Patel have your chart and will review your medication right now. Take care." }
    ],

    caregiverMessage: "Hi Sarah, Arthur's blood pressure and weight were elevated this morning due to missed morning Torsemide. VitalSense confirmed he is sitting resting comfortably and Nurse Elena is reviewing his dose. No emergency hospital visit is needed.",

    billing: {
      code: "CPT 99457",
      title: "Monthly Patient Care & Communication (First 20 mins)",
      timeLogged: "24 mins logged",
      amount: "$52.89",
      status: "Approved for billing"
    }
  },
  {
    id: "PT-91344",
    name: "Eleanor Vance",
    age: 61,
    gender: "Female",
    mrn: "MRN-782190",
    simpleDiagnosis: "Type 2 Diabetes & Kidney Care",
    doctor: "Dr. Marcus Thorne",
    nurse: "Sarah Collins, RN",
    clinic: "Valley Health Diabetes Center",
    
    clinicalProfile: {
      carePrograms: ["Diabetes Remote Glucose Program", "Diabetic Nephropathy Monitoring"],
      activeMedications: [
        { name: "Metformin ER", dose: "1000 mg Daily", purpose: "Blood Sugar Regulation", takenToday: false },
        { name: "Jardiance (Empagliflozin)", dose: "10 mg Daily", purpose: "Kidney & Glucose Protection", takenToday: false },
        { name: "Lisinopril", dose: "10 mg Daily", purpose: "Kidney Protection", takenToday: true }
      ],
      dietRestrictions: "Carbohydrate control (< 45g/meal), Avoid sugary beverages",
      allergies: "Sulfa drugs",
      recentLabs: "HbA1c: 7.2%, eGFR: 52 mL/min, Microalbumin: Normal",
      caregiver: {
        name: "David Vance",
        relation: "Spouse",
        phone: "+1 (555) 842-9912",
        notifyOnAlerts: true
      }
    },

    devices: [
      { name: "Blood Sugar Meter (Cellular)", battery: "91%", signal: "Good (-80 dBm)", vendor: "Tenovi" },
      { name: "Blood Pressure Cuff (Cellular)", battery: "96%", signal: "Good (-78 dBm)", vendor: "Tenovi" }
    ],

    currentReading: {
      glucose: "248 mg/dL",
      glucoseStatus: "High (Target is 80-160)",
      bp: "131 / 81",
      bpStatus: "Normal",
      heartRate: "74 bpm",
      time: "Today, 11:15 AM"
    },

    baseline: {
      normalGlucose: "120 mg/dL",
      normalBp: "124 / 78"
    },

    aiSummary: {
      level: "warning",
      badge: "Moderate: Forgot Medicine",
      riskScore: 54,
      whatHappened: "Blood sugar spiked to 248 mg/dL after breakfast.",
      whatAiDid: "VitalSense texted Eleanor right away. She said she was traveling and simply forgot her morning Metformin pill in the hotel room. AI advised taking it now with water.",
      timeSaved: "14 mins saved"
    },

    conversationsByLang: {
      en: [
        { sender: "ai", text: "Hi Eleanor, your blood sugar was 248 mg/dL at 11:15 AM. Are you feeling sick, dizzy, or unusually thirsty?", time: "11:16 AM" },
        { sender: "patient", text: "No, feeling fine. Just realized I left my morning pill box in the hotel room!", time: "11:18 AM" },
        { sender: "ai", text: "Got it! Please take your morning Metformin now, drink a large glass of water, and test again in 2 hours.", time: "11:19 AM" },
        { sender: "patient", text: "Taking it right now, thank you so much!", time: "11:20 AM" }
      ],
      es: [
        { sender: "ai", text: "Hola Eleanor, su glucosa fue de 248 mg/dL a las 11:15 AM. ¿Se siente mareada, con náuseas o sed excesiva?", time: "11:16 AM" },
        { sender: "patient", text: "No, me siento bien. ¡Acabo de darme cuenta de que dejé mis pastillas de la mañana en el hotel!", time: "11:18 AM" },
        { sender: "ai", text: "¡Entendido! Tome su Metformina ahora, beba un vaso de agua y vuelva a medir su azúcar en 2 horas.", time: "11:19 AM" },
        { sender: "patient", text: "La tomo ahora mismo, ¡muchas gracias!", time: "11:20 AM" }
      ],
      hi: [
        { sender: "ai", text: "नमस्ते एलेनोर, सुबह 11:15 बजे आपका ब्लड शुगर 248 mg/dL था। क्या आपको चक्कर आ रहे हैं या बहुत प्यास लग रही है?", time: "11:16 AM" },
        { sender: "patient", text: "नहीं, मैं ठीक महसूस कर रही हूँ। मुझे याद आया कि मैं होटल के कमरे में अपनी सुबह की दवा भूल गई थी!", time: "11:18 AM" },
        { sender: "ai", text: "समझ गया! कृपया अपनी मेटफॉर्मिन की गोली अभी लें, पानी पिएं और 2 घंटे बाद दोबारा जांचें।", time: "11:19 AM" },
        { sender: "patient", text: "मैं अभी ले रही हूँ, बहुत-बहुत धन्यवाद!", time: "11:20 AM" }
      ]
    },

    chat: [
      { sender: "ai", text: "Hi Eleanor, your blood sugar was 248 mg/dL at 11:15 AM. Are you feeling sick, dizzy, or unusually thirsty?", time: "11:16 AM" },
      { sender: "patient", text: "No, feeling fine. Just realized I left my morning pill box in the hotel room!", time: "11:18 AM" },
      { sender: "ai", text: "Got it! Please take your morning Metformin now, drink a large glass of water, and test again in 2 hours.", time: "11:19 AM" },
      { sender: "patient", text: "Taking it right now, thank you so much!", time: "11:20 AM" }
    ],

    caregiverMessage: "Hi David, Eleanor's glucose was 248 mg/dL after breakfast due to a delayed morning Metformin pill while traveling. She has taken it now with water and will retest in 2 hours. No emergency action needed.",

    billing: {
      code: "CPT 99457",
      title: "Monthly Patient Care & Communication",
      timeLogged: "21 mins logged",
      amount: "$52.89",
      status: "Approved for billing"
    }
  },
  {
    id: "PT-77291",
    name: "Marcus Brody",
    age: 74,
    gender: "Male",
    mrn: "MRN-331092",
    simpleDiagnosis: "Severe Lung Disease (COPD) & High BP",
    doctor: "Dr. Alan Hernandez",
    nurse: "Elena Rostova, RN",
    clinic: "Valley Health Lung Center",
    
    clinicalProfile: {
      carePrograms: ["Chronic Obstructive Pulmonary Disease RPM", "Pulmonary Rehab Protocol"],
      activeMedications: [
        { name: "Trelegy Ellipta", dose: "1 Inhalation Daily", purpose: "Long-Acting Bronchodilator", takenToday: true },
        { name: "Albuterol Inhaler", dose: "2 Puffs PRN", purpose: "Fast-Acting Rescue Inhaler", takenToday: true },
        { name: "Amlodipine", dose: "10 mg Daily", purpose: "Blood Pressure", takenToday: true }
      ],
      dietRestrictions: "Avoid high-humidity exposure, Oxygen therapy at 2L/min",
      allergies: "Codeine",
      recentLabs: "FEV1: 42% predicted, Arterial Blood Gas: pO2 58 mmHg",
      caregiver: {
        name: "Carol Brody",
        relation: "Wife",
        phone: "+1 (555) 720-9931",
        notifyOnAlerts: true
      }
    },

    devices: [
      { name: "Pulse Oximeter (Cellular)", battery: "90%", signal: "Good (-72 dBm)", vendor: "Impilo" },
      { name: "Blood Pressure Cuff (Cellular)", battery: "98%", signal: "Good (-74 dBm)", vendor: "Tenovi" }
    ],

    currentReading: {
      spo2: "86%",
      spo2Status: "Critical (Below 90%)",
      bp: "172 / 104",
      bpStatus: "High",
      heartRate: "114 bpm (Fast)",
      time: "Today, 2:18 PM"
    },

    baseline: {
      normalSpo2: "93%",
      normalBp: "134 / 84"
    },

    aiSummary: {
      level: "critical",
      badge: "Critical: Low Oxygen Level",
      riskScore: 97,
      whatHappened: "Oxygen dropped to a dangerous 86% and his heart rate sped up to 114 bpm.",
      whatAiDid: "VitalSense texted Marcus immediately. He replied that he could barely breathe. The AI told him to sit upright, turn on his oxygen, and alerted Dr. Hernandez and emergency services immediately.",
      timeSaved: "22 mins saved"
    },

    chat: [
      { sender: "ai", text: "Marcus, your oxygen reading was low (86%) and your pulse is fast (114 bpm). Are you having trouble catching your breath?", time: "2:19 PM" },
      { sender: "patient", text: "Yes... Can barely speak... lips feel numb...", time: "2:21 PM" },
      { sender: "ai", text: "URGENT: Marcus, sit upright and start your supplemental oxygen at 2L now. We have notified Dr. Hernandez and an ambulance is being alerted.", time: "2:22 PM" }
    ],

    caregiverMessage: "URGENT NOTICE for Carol: Marcus had an oxygen reading of 86%. Our medical team has connected with him, started emergency oxygen protocol, and Dr. Hernandez's on-call team is responding now.",

    billing: {
      code: "CPT 99458",
      title: "Extended Patient Care & Emergency Coordination",
      timeLogged: "38 mins logged",
      amount: "$94.99",
      status: "Approved for billing"
    }
  },
  {
    id: "PT-66120",
    name: "Sarah Jenkins",
    age: 54,
    gender: "Female",
    mrn: "MRN-192840",
    simpleDiagnosis: "Heart Stent Recovery",
    doctor: "Dr. Rajiv Patel",
    nurse: "Elena Rostova, RN",
    clinic: "Valley Health Heart Center",
    
    clinicalProfile: {
      carePrograms: ["Post-PCI Cardiac Stent Recovery Program"],
      activeMedications: [
        { name: "Brilinta (Ticagrelor)", dose: "90 mg BID", purpose: "Antiplatelet / Blood Thinner", takenToday: true },
        { name: "Baby Aspirin", dose: "81 mg Daily", purpose: "Stent Thrombosis Prevention", takenToday: true },
        { name: "Atorvastatin", dose: "80 mg QHS", purpose: "Cholesterol / Plaque Stabilization", takenToday: true }
      ],
      dietRestrictions: "Mediterranean Heart-Healthy Diet, Daily brisk walking 30 mins",
      allergies: "No known allergies",
      recentLabs: "LDL: 62 mg/dL (Goal < 70), Cardiac Troponin: Negative",
      caregiver: {
        name: "Mark Jenkins",
        relation: "Husband",
        phone: "+1 (555) 491-8842",
        notifyOnAlerts: false
      }
    },

    devices: [
      { name: "Blood Pressure Cuff (Cellular)", battery: "92%", signal: "Good (-77 dBm)", vendor: "Tenovi" }
    ],

    currentReading: {
      bp: "142 / 88",
      bpStatus: "Slightly High",
      heartRate: "86 bpm",
      time: "Today, 9:10 AM",
      repeatReading: "Retest: 124/78 (Normal)"
    },

    baseline: {
      normalBp: "122 / 76"
    },

    aiSummary: {
      level: "filtered",
      badge: "Normal: False Alarm Cleared",
      riskScore: 18,
      whatHappened: "Blood pressure was slightly high (142/88) right after walking.",
      whatAiDid: "VitalSense asked if she had just finished exercising. Sarah said yes. AI asked her to sit for 10 minutes and retest. Her second test was completely normal (124/78). AI cleared the alert, saving the nurse from wasting a phone call.",
      timeSaved: "15 mins saved"
    },

    chat: [
      { sender: "ai", text: "Hi Sarah, your blood pressure reading was a little elevated (142/88). Did you just finish exercising, walking, or drinking coffee?", time: "9:11 AM" },
      { sender: "patient", text: "Yes, I just walked in the door from my 2-mile morning walk!", time: "9:12 AM" },
      { sender: "ai", text: "Great job on the walk! Please sit down calmly for 10 minutes with both feet on the floor, then take another reading.", time: "9:13 AM" },
      { sender: "ai", text: "Second reading received: 124/78. Your heart recovered normally. Alert cleared and recorded to your chart.", time: "9:24 AM" }
    ],

    caregiverMessage: "Hi Mark, Sarah's blood pressure reading was slightly elevated after her morning walk, but normalized to 124/78 after 10 minutes of rest. All normal.",

    billing: {
      code: "CPT 99454",
      title: "Monthly Device Data Transmission (16+ days recorded)",
      timeLogged: "18 mins logged",
      amount: "$55.72",
      status: "Approved for billing"
    }
  }
];
