import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  ArrowDown, 
  ArrowUp, 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ShieldCheck, 
  Server, 
  Cpu, 
  Info,
  CheckCircle2,
  Lock,
  Radio,
  FileText
} from 'lucide-react';
import { Language, OSILayerNumber, OSILayerInfo } from '../types/network';
import { OSI_LAYERS, SAMPLE_ENCAPSULATION_FLOW } from '../data/osiData';

interface OSISimulatorProps {
  lang: Language;
}

export const OSISimulator: React.FC<OSISimulatorProps> = ({ lang }) => {
  const [selectedLayerNumber, setSelectedLayerNumber] = useState<OSILayerNumber>(7);
  const [flowDirection, setFlowDirection] = useState<'ENCAPSULATION' | 'DECAPSULATION'>('ENCAPSULATION');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1800); // ms per step

  const selectedLayer: OSILayerInfo = OSI_LAYERS.find(l => l.layer === selectedLayerNumber) || OSI_LAYERS[0];
  const currentStep = SAMPLE_ENCAPSULATION_FLOW[currentStepIndex];

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentStepIndex(prev => {
        if (prev < SAMPLE_ENCAPSULATION_FLOW.length - 1) {
          const next = prev + 1;
          setSelectedLayerNumber(SAMPLE_ENCAPSULATION_FLOW[next].layer as OSILayerNumber);
          return next;
        } else {
          setIsPlaying(false);
          return prev;
        }
      });
    }, playbackSpeed);

    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed]);

  const handleStepJump = (idx: number) => {
    setCurrentStepIndex(idx);
    setSelectedLayerNumber(SAMPLE_ENCAPSULATION_FLOW[idx].layer as OSILayerNumber);
  };

  const resetSimulation = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    setSelectedLayerNumber(7);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <Layers className="w-5 h-5" />
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {lang === 'en' ? 'OSI 7-Layer Architecture & Packet Flow' : 'ওএসআই ৭-লেয়ার মডেল ও প্যাকেট এনক্যাপসুলেশন সিমুলেটর'}
              </h1>
            </div>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              {lang === 'en'
                ? 'Interactive visualization of Open Systems Interconnection (OSI) reference model. Explore how data transforms from high-level application requests down to physical voltage pulses, and back.'
                : 'ওএসআই রেফারেন্স মডেলের ৭টি স্তরের বিস্তারিত সিমুলেশন। ব্যবহারকারীর রিকোয়েস্ট কীভাবে ধাপে ধাপে এনক্যাপসুলেশন হয়ে তারের মধ্য দিয়ে বিট আকারে পৌঁছায় এবং আবার ডিক্যাপসুলেশন হয় তা পরীক্ষা করুন।'}
            </p>
          </div>

          {/* Quick Flow Toggle */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-lg border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => {
                setFlowDirection('ENCAPSULATION');
                resetSimulation();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                flowDirection === 'ENCAPSULATION'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ArrowDown className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Encapsulation (L7 → L1)' : 'এনক্যাপসুলেশন (L7 → L1)'}</span>
            </button>
            <button
              onClick={() => {
                setFlowDirection('DECAPSULATION');
                setCurrentStepIndex(6);
                setSelectedLayerNumber(1);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                flowDirection === 'DECAPSULATION'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Decapsulation (L1 → L7)' : 'ডিক্যাপসুলেশন (L1 → L7)'}</span>
            </button>
          </div>
        </div>

        {/* Step-by-step Interactive Controller */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Pause' : 'থামান'}</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{lang === 'en' ? 'Auto Play Flow' : 'অটো প্লে'}</span>
                </>
              )}
            </button>

            <button
              onClick={resetSimulation}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Reset' : 'রিসেট'}</span>
            </button>

            <div className="hidden sm:flex items-center gap-1 text-xs text-slate-400 ml-2">
              <span>{lang === 'en' ? 'Step:' : 'ধাপ:'}</span>
              <span className="font-mono text-cyan-300 font-bold">{currentStepIndex + 1} / 7</span>
            </div>
          </div>

          {/* Stepper buttons */}
          <div className="flex items-center gap-1.5">
            {SAMPLE_ENCAPSULATION_FLOW.map((step, idx) => (
              <button
                key={step.step}
                onClick={() => handleStepJump(idx)}
                className={`w-7 h-7 rounded-md text-xs font-mono font-bold flex items-center justify-center transition ${
                  currentStepIndex === idx
                    ? 'bg-cyan-500 text-slate-950 ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-900'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                title={`Layer ${step.layer}`}
              >
                L{step.layer}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Dual Grid: Interactive Stack on Left, Deep Layer Inspector on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 7 Layers Stack (Interactive Cards) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {lang === 'en' ? 'Interactive Layer Stack' : 'ওএসআই ৭টি লেয়ার স্ট্যাক'}
            </h2>
            <span className="text-[11px] text-slate-500">
              {lang === 'en' ? 'Click any layer to inspect' : 'যেকোনো লেয়ারে ক্লিক করুন'}
            </span>
          </div>

          <div className="space-y-2">
            {OSI_LAYERS.map((item) => {
              const isSelected = selectedLayerNumber === item.layer;
              const isCurrentStep = currentStep.layer === item.layer;

              return (
                <div
                  key={item.layer}
                  onClick={() => setSelectedLayerNumber(item.layer)}
                  className={`group relative cursor-pointer rounded-xl p-3.5 border transition-all duration-200 ${
                    isSelected
                      ? `${item.bgColor} ${item.borderColor} ring-1 ring-cyan-400/50 shadow-lg shadow-black/40`
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                  }`}
                >
                  {/* Active Step Indicator Pill */}
                  {isCurrentStep && (
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-cyan-400 rounded-r animate-pulse" />
                  )}

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shadow"
                        style={{ backgroundColor: `${item.color}25`, color: item.color, border: `1px solid ${item.color}50` }}
                      >
                        L{item.layer}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition">
                            {lang === 'en' ? item.nameEn : item.nameBn}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                          {lang === 'en' ? item.shortDescEn : item.shortDescBn}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="inline-block px-2 py-0.5 text-[10px] font-mono rounded bg-slate-950/80 border border-slate-800 text-slate-300">
                        {lang === 'en' ? item.pdu : item.pduBn}
                      </span>
                    </div>
                  </div>

                  {/* Micro Data preview if selected */}
                  {isSelected && (
                    <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-300">
                      <span className="text-slate-400 font-semibold">{lang === 'en' ? 'PDU:' : 'পিডিইউ:'}</span>
                      <span className="font-mono text-cyan-300">{item.pdu}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-400 font-semibold">{lang === 'en' ? 'Devices:' : 'ডিভাইস:'}</span>
                      <span className="text-slate-300">{item.devices.slice(0, 2).join(', ')}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Layer Dissection & Current Step Encapsulation Preview */}
        <div className="lg:col-span-7 space-y-4">
          {/* Current Encapsulation / Decapsulation State Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                  {lang === 'en' ? `Step ${currentStepIndex + 1}: ${currentStep.actionEn}` : `ধাপ ${currentStepIndex + 1}: ${currentStep.actionBn}`}
                </span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                PDU: {currentStep.pduName}
              </span>
            </div>

            <p className="text-xs text-slate-300 mt-2.5">
              {lang === 'en' ? currentStep.descriptionEn : currentStep.descriptionBn}
            </p>

            {/* Live Packet Header Visualization Box */}
            <div className="mt-3 p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs">
              <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1.5 flex items-center justify-between">
                <span>{lang === 'en' ? 'Data Envelope at this Stage' : 'বর্তমান স্তরের প্যাকেট খাম (Envelope)'}</span>
                <span className="text-cyan-400 font-semibold">{currentStep.addedHeader}</span>
              </div>
              <div className="p-2 rounded bg-slate-900/90 text-cyan-200 border border-cyan-900/30 overflow-x-auto text-[11px] break-all">
                {currentStep.dataRepresentation}
              </div>
            </div>
          </div>

          {/* Deep Layer Details Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="px-2 py-0.5 rounded text-xs font-bold font-mono"
                    style={{ backgroundColor: `${selectedLayer.color}30`, color: selectedLayer.color }}
                  >
                    Layer {selectedLayer.layer}
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {lang === 'en' ? selectedLayer.nameEn : selectedLayer.nameBn}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {lang === 'en' ? 'Protocol Data Unit (PDU):' : 'প্রোটোকল ডাটা ইউনিট (PDU):'}{' '}
                  <span className="text-cyan-300 font-mono font-semibold">{selectedLayer.pdu}</span>
                </p>
              </div>

              {/* Sample Header Added */}
              <div className="text-left sm:text-right">
                <span className="text-[11px] text-slate-400 block">{lang === 'en' ? 'Header Encapsulated:' : 'সংযুক্ত হেডার:'}</span>
                <span className="text-xs font-mono font-semibold text-emerald-400">{selectedLayer.headerAdded}</span>
              </div>
            </div>

            {/* Full Explanation */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                {lang === 'en' ? 'Core Role & Concept' : 'মূল ভূমিকা ও ধারণা'}
              </h4>
              <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-3.5 rounded-lg border border-slate-800/80">
                {lang === 'en' ? selectedLayer.fullDescEn : selectedLayer.fullDescBn}
              </p>
            </div>

            {/* Primary Functions List */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                {lang === 'en' ? 'Key Functions & Responsibilities' : 'প্রধান কার্যাবলী ও দায়িত্বসমূহ'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(lang === 'en' ? selectedLayer.functionsEn : selectedLayer.functionsBn).map((fn, i) => (
                  <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-950/40 border border-slate-800 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{fn}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Protocols & Hardware Devices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* Protocols */}
              <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                  <Radio className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Common Protocols' : 'ব্যবহৃত প্রোটোকলসমূহ'}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedLayer.protocols.map((proto) => (
                    <span
                      key={proto}
                      className="px-2 py-0.5 text-xs font-mono font-medium rounded bg-indigo-950/60 text-indigo-300 border border-indigo-800/60"
                    >
                      {proto}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hardware & Devices */}
              <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  <Server className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Associated Hardware' : 'হার্ডওয়্যার ও ডিভাইস'}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(lang === 'en' ? selectedLayer.devices : selectedLayer.devicesBn).map((dev) => (
                    <span
                      key={dev}
                      className="px-2 py-0.5 text-xs font-medium rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60"
                    >
                      {dev}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Header Structure Sample */}
            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between mb-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                <div className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Sample Header Fields' : 'নমুনা হেডার ফিল্ডসমূহ'}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">Dissection</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                {Object.entries(selectedLayer.sampleHeaderData).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800/80">
                    <span className="text-slate-400">{key}:</span>
                    <span className="text-amber-200 font-semibold">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Threats & Countermeasures */}
            <div className="p-3.5 rounded-lg bg-red-950/20 border border-red-900/40">
              <div className="flex items-center gap-2 text-xs font-semibold text-red-400 uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4 text-red-400" />
                <span>{lang === 'en' ? 'Security Vulnerabilities & Mitigations' : 'সাইবার নিরাপত্তা ঝুঁকি ও প্রতিরোধ'}</span>
              </div>
              <p className="text-xs text-red-200/90 leading-relaxed">
                {lang === 'en' ? selectedLayer.securityAspectsEn : selectedLayer.securityAspectsBn}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
