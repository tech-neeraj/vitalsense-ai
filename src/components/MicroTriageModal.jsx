import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Send, Bot, User, Smartphone, ArrowRight, Phone, MessageSquare, 
  CheckCheck, Brain, Volume2, Globe, Users, ShieldCheck, Play, Pause, 
  PhoneCall, PhoneOff, Mic, Sparkles
} from 'lucide-react';

export default function MicroTriageModal({ patient, onClose, onOpenSoapNote }) {
  const [activeTab, setActiveTab] = useState('voice'); // Defaults to voice call to showcase Maya immediately!
  const [selectedLang, setSelectedLang] = useState('en');
  const [messages, setMessages] = useState(() => patient.conversationsByLang?.[selectedLang] || patient.chat);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Two-Sided Voice Call State
  const [isCallActive, setIsCallActive] = useState(false);
  const [activeCallTurn, setActiveCallTurn] = useState(0);
  const [callDuration, setCallDuration] = useState(0);
  const timerRef = useRef(null);

  // Phone numbers
  const patientPhones = {
    'PT-84021': '+1 (555) 319-4820',
    'PT-91344': '+1 (555) 842-1940',
    'PT-77291': '+1 (555) 720-3391',
    'PT-66120': '+1 (555) 491-0283',
  };
  const phone = patientPhones[patient.id] || '+1 (555) 319-4820';

  // Multi-turn script for interactive 2-sided conversation
  const twoSidedCallScript = [
    {
      speaker: "Maya (Nurse AI)",
      role: "ai",
      text: "Hello Arthur, this is Maya, your nurse assistant from Valley Health. I'm calling because your blood pressure was 164 over 98 and your scale showed a 4-pound weight gain this morning. How are you feeling right now?"
    },
    {
      speaker: "Arthur (Patient)",
      role: "patient",
      text: "Hello Maya. Well, I woke up feeling a bit bloated and had some trouble breathing when I was lying flat in bed. My ankles are a little puffy too."
    },
    {
      speaker: "Maya (Nurse AI)",
      role: "ai",
      text: "I understand, Arthur. Thank you for telling me. Did you take your morning Torsemide water pill today, or did you happen to have any salty foods over the weekend?"
    },
    {
      speaker: "Arthur (Patient)",
      role: "patient",
      text: "To be honest, I had some salty canned soup with family last night, and I completely forgot my water pill this morning."
    },
    {
      speaker: "Maya (Nurse AI)",
      role: "ai",
      text: "That explains the sudden fluid retention, Arthur. Please sit resting upright in a comfortable chair. I have documented this in your chart and alerted Nurse Elena and Dr. Patel right now with a medication update. Please do not worry, we are taking care of it."
    }
  ];

  // Helper to speak with calm, slow, nurse practitioner female voice
  const speakText = (text, onEndCallback) => {
    if (!('speechSynthesis' in window)) {
      if (onEndCallback) onEndCallback();
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Pick calm female voice (Samantha, Victoria, Ava, Karen, Zira)
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(v => 
      v.lang.startsWith('en') && 
      (v.name.includes('Samantha') || v.name.includes('Victoria') || v.name.includes('Ava') || 
       v.name.includes('Karen') || v.name.includes('Female') || v.name.includes('Zira') || v.name.includes('Siri'))
    ) || voices.find(v => v.lang.startsWith('en'));

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
    
    // Calm, slow, measured cadence (nurse practitioner tone)
    utterance.rate = 0.86;
    utterance.pitch = 1.08;

    utterance.onend = () => {
      if (onEndCallback) onEndCallback();
    };
    utterance.onerror = () => {
      if (onEndCallback) onEndCallback();
    };

    window.speechSynthesis.speak(utterance);
  };

  // Start 2-Sided Voice Call
  const startTwoSidedCall = () => {
    setIsCallActive(true);
    setActiveCallTurn(0);
    setCallDuration(0);

    timerRef.current = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    // Speak Turn 0 (Maya opening)
    speakText(twoSidedCallScript[0].text, () => {
      // Pause then move to Turn 1 (Patient response)
      setTimeout(() => {
        setActiveCallTurn(1);
        // After patient response, speak Turn 2 (Maya follow-up)
        setTimeout(() => {
          setActiveCallTurn(2);
          speakText(twoSidedCallScript[2].text, () => {
            setTimeout(() => {
              setActiveCallTurn(3);
              setTimeout(() => {
                setActiveCallTurn(4);
                speakText(twoSidedCallScript[4].text, () => {
                  // Call completed
                });
              }, 3000);
            }, 3500);
          });
        }, 3200);
      }, 1000);
    });
  };

  const endCall = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsCallActive(false);
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const formatCallTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Handle language switch for SMS
  const handleLanguageChange = (lang) => {
    setSelectedLang(lang);
    setMessages(patient.conversationsByLang?.[lang] || patient.chat);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsg = {
      sender: 'patient',
      text: inputVal.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      let aiReply = "Thank you for the update. I have added this note directly to your chart for Nurse Elena and Dr. Patel.";
      if (inputVal.toLowerCase().includes('dizzy') || inputVal.toLowerCase().includes('chest')) {
        aiReply = "Please remain seated in a safe position. I have marked this as high priority and alerted the on-call medical team.";
      } else if (inputVal.toLowerCase().includes('pill') || inputVal.toLowerCase().includes('med') || inputVal.toLowerCase().includes('torsemide')) {
        aiReply = `Understood Arthur. I see in your care plan you take Torsemide 20mg. Please confirm when you take your morning dose with water.`;
      }

      setMessages([...updated, {
        sender: 'ai',
        text: aiReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[96vh] sm:max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-900">
                Patient Communication & Voice AI
              </span>
              <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                HIPAA Protected
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Patient: <strong className="text-slate-800">{patient.name}</strong> • Phone: <strong className="text-sky-700 font-mono">{phone}</strong>
            </p>
          </div>

          <button 
            onClick={() => {
              endCall();
              onClose();
            }}
            className="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-3 sm:px-5 py-2 bg-white border-b border-slate-200 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1 min-w-max bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => {
                endCall();
                setActiveTab('voice');
              }}
              className={`px-2.5 sm:px-3 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'voice' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Two-Sided Voice Call</span>
            </button>

            <button
              onClick={() => {
                endCall();
                setActiveTab('sms');
              }}
              className={`px-2.5 sm:px-3 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'sms' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-sky-600" />
              <span>SMS Text Check-In</span>
            </button>

            <button
              onClick={() => {
                endCall();
                setActiveTab('profile');
              }}
              className={`px-2.5 sm:px-3 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'profile' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Brain className="w-3.5 h-3.5 text-purple-600" />
              <span>AI Medical Brain (Context)</span>
            </button>

            <button
              onClick={() => {
                endCall();
                setActiveTab('caregiver');
              }}
              className={`px-2.5 sm:px-3 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'caregiver' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-amber-600" />
              <span>Family Caregiver</span>
            </button>
          </div>

          {activeTab === 'sms' && (
            <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md">
              <Globe className="w-3 h-3 text-slate-400" />
              <button
                onClick={() => handleLanguageChange('en')}
                className={`text-[11px] px-1 font-medium ${selectedLang === 'en' ? 'text-sky-700 font-bold' : 'text-slate-400'}`}
              >
                EN
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={() => handleLanguageChange('es')}
                className={`text-[11px] px-1 font-medium ${selectedLang === 'es' ? 'text-sky-700 font-bold' : 'text-slate-400'}`}
              >
                ES
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={() => handleLanguageChange('hi')}
                className={`text-[11px] px-1 font-medium ${selectedLang === 'hi' ? 'text-sky-700 font-bold' : 'text-slate-400'}`}
              >
                हिंदी
              </button>
            </div>
          )}
        </div>

        {/* TAB 1: TWO-SIDED CONVERSATIONAL VOICE CALL */}
        {activeTab === 'voice' && (
          <div className="p-5 overflow-y-auto space-y-4 flex-1 bg-slate-50/50">
            
            {/* Active Phone Call Header Card */}
            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md ${
                  isCallActive ? 'bg-emerald-600 animate-pulse' : 'bg-slate-700'
                }`}>
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">
                      Maya, NP • Valley Health Voice AI
                    </h4>
                    <span className="text-[10px] font-semibold bg-sky-50 text-sky-800 px-2 py-0.5 rounded-full border border-sky-200">
                      Calm Nurse Practitioner Voice
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Two-way conversational phone call with <strong>{patient.name}</strong> ({phone})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {isCallActive && (
                  <div className="px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 font-mono text-xs font-bold">
                    Call: {formatCallTime(callDuration)}
                  </div>
                )}

                {!isCallActive ? (
                  <button
                    onClick={startTwoSidedCall}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Start Two-Sided Voice Call</span>
                  </button>
                ) : (
                  <button
                    onClick={endCall}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
                  >
                    <PhoneOff className="w-4 h-4" />
                    <span>End Call</span>
                  </button>
                )}
              </div>
            </div>

            {/* Production Retell AI Integration Badge */}
            <div className="p-2.5 bg-sky-50 border border-sky-100 rounded-lg flex items-center justify-between text-xs text-sky-900">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                <span><strong>Retell AI & Twilio Integration:</strong> Powers ultra low-latency (600ms) two-way intelligent phone calls with real-time speech interruption.</span>
              </span>
              <span className="text-[10px] bg-white border border-sky-200 px-2 py-0.5 rounded text-sky-700 font-semibold shrink-0">
                Retell AI Ready
              </span>
            </div>

            {/* Interactive Live Two-Sided Conversation Transcript */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">
                  Live Two-Way Call Transcript:
                </span>
                {isCallActive && (
                  <span className="flex items-center gap-1.5 text-emerald-600 font-semibold animate-pulse text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                    Both Sides Talking Live...
                  </span>
                )}
              </div>

              <div className="space-y-2.5">
                {twoSidedCallScript.map((turn, idx) => {
                  const isTurnActive = isCallActive && idx === activeCallTurn;
                  const isTurnPassed = !isCallActive || idx <= activeCallTurn;
                  const isAi = turn.role === 'ai';

                  if (!isTurnPassed) return null;

                  return (
                    <div 
                      key={idx}
                      className={`p-3.5 rounded-xl border transition-all text-xs leading-relaxed ${
                        isTurnActive 
                          ? 'border-sky-400 bg-white shadow-md ring-2 ring-sky-100'
                          : isAi 
                          ? 'border-slate-200 bg-white shadow-sm'
                          : 'border-emerald-200 bg-emerald-50/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`font-bold flex items-center gap-1.5 ${
                          isAi ? 'text-sky-800' : 'text-emerald-900'
                        }`}>
                          {isAi ? <Bot className="w-3.5 h-3.5 text-sky-600" /> : <User className="w-3.5 h-3.5 text-emerald-600" />}
                          <span>{turn.speaker}</span>
                        </span>
                        {isTurnActive && (
                          <span className="text-[10px] text-sky-600 font-bold animate-pulse">
                            {isAi ? "Maya Speaking (Calm Female Voice)..." : "Arthur Speaking from Landline..."}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-700 pl-5">{turn.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: SMS TEXT MESSAGES */}
        {activeTab === 'sms' && (
          <>
            <div className="p-4 overflow-y-auto space-y-3 flex-1 bg-slate-100">
              <div className="text-center text-[10px] text-slate-400 pb-1">
                Text Message with <strong>Valley Health Care</strong> • Twilio SMS to {phone}
              </div>

              {messages.map((m, idx) => {
                const isAi = m.sender === 'ai';
                return (
                  <div key={idx} className={`flex items-end gap-2 ${isAi ? '' : 'flex-row-reverse'}`}>
                    <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-sm ${
                      isAi ? 'bg-white text-slate-800 rounded-bl-sm border border-slate-200' : 'bg-sky-600 text-white rounded-br-sm'
                    }`}>
                      <p>{m.text}</p>
                      <div className={`flex items-center justify-end gap-1 text-[10px] mt-1 ${isAi ? 'text-slate-400' : 'text-sky-200'}`}>
                        <span>{m.time}</span>
                        {!isAi && <CheckCheck className="w-3 h-3" />}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="text-xs text-slate-500 italic pl-2">
                  VitalSense is typing...
                </div>
              )}
            </div>

            <div className="p-3.5 border-t border-slate-200 bg-white space-y-2">
              <form onSubmit={handleSend} className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Type simulated patient SMS reply..."
                  className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-sky-600 hover:bg-sky-700 text-white font-medium text-xs rounded-lg flex items-center gap-1 transition-colors shadow-sm"
                >
                  <span>Send SMS</span>
                  <Send className="w-3 h-3" />
                </button>
              </form>
            </div>
          </>
        )}

        {/* TAB 3: DEEP PATIENT MEDICAL CONTEXT */}
        {activeTab === 'profile' && (
          <div className="p-6 overflow-y-auto space-y-4 flex-1 bg-slate-50/50 text-xs">
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-purple-950 flex items-start gap-2.5">
              <Brain className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
              <div>
                <strong>How the AI Medical Brain Works:</strong> The AI is fed the patient's exact care programs, medication regimen, allergies, and diet restrictions from MayaMD. This is why Maya asks Arthur about his <em>Torsemide</em> water pill and <em>salty soup</em> rather than generic questions!
              </div>
            </div>

            <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2">
              <h5 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider text-slate-500">
                Active Enrolled Care Programs
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {(patient.clinicalProfile?.carePrograms || []).map((cp, idx) => (
                  <span key={idx} className="bg-sky-50 text-sky-800 border border-sky-200 px-2.5 py-1 rounded-md font-medium">
                    {cp}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2">
              <h5 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider text-slate-500">
                Prescribed Medications & Purposes
              </h5>
              <div className="space-y-1.5">
                {(patient.clinicalProfile?.activeMedications || []).map((m, idx) => (
                  <div key={idx} className="p-2 bg-slate-50 rounded-lg flex items-center justify-between border border-slate-200">
                    <div>
                      <strong className="text-slate-900">{m.name}</strong> ({m.dose})
                      <span className="block text-[11px] text-slate-500">{m.purpose}</span>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      m.takenToday ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {m.takenToday ? 'Taken Today' : 'Missed Morning Dose'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FAMILY CAREGIVER */}
        {activeTab === 'caregiver' && (
          <div className="p-3.5 sm:p-6 overflow-y-auto space-y-3.5 sm:space-y-4 flex-1 bg-white text-xs">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-700" />
                <h4 className="font-bold text-amber-950 text-sm">
                  Family Caregiver Reassurance Loop
                </h4>
              </div>
              <p className="text-amber-900 leading-relaxed">
                When elderly patients live alone, adult children worry constantly. VitalSense automatically sends a reassuring update to the family caregiver so they know their parent is being cared for.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block text-xs">
                    Designated Caregiver: {patient.clinicalProfile?.caregiver?.name}
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    {patient.clinicalProfile?.caregiver?.relation} • {patient.clinicalProfile?.caregiver?.phone}
                  </span>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  SMS Dispatched
                </span>
              </div>

              <div className="p-3.5 bg-white border border-slate-300 rounded-lg text-slate-800 leading-relaxed shadow-sm">
                "{patient.caregiverMessage}"
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-3.5 sm:px-5 py-2.5 sm:py-3 border-t border-slate-200 bg-slate-50 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5 text-xs">
          <span className="text-slate-400 text-[11px] text-center sm:text-left">
            VitalSense Clinical Intelligence Engine
          </span>

          <button
            onClick={() => {
              endCall();
              onClose();
              onOpenSoapNote(patient);
            }}
            className="w-full sm:w-auto justify-center px-4 py-2 sm:py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <span>Proceed to Doctor Note</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
