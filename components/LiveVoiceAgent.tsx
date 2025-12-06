import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { X, Mic, Loader2, Volume2 } from 'lucide-react';
import { createBlob, decode, decodeAudioData } from '../utils/audioUtils';

interface LiveVoiceAgentProps {
  onClose: () => void;
}

export const LiveVoiceAgent: React.FC<LiveVoiceAgentProps> = ({ onClose }) => {
  const [status, setStatus] = useState<'connecting' | 'connected' | 'error' | 'closed'>('connecting');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState<number[]>(new Array(5).fill(10));

  const audioContextRef = useRef<AudioContext | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const sessionRef = useRef<any>(null); // Type 'Session' is complex in the SDK
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  useEffect(() => {
    let mounted = true;

    const startSession = async () => {
      try {
        if (!process.env.API_KEY) {
          throw new Error("API Key missing");
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        // Setup Audio Contexts
        const inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
        const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        
        inputAudioContextRef.current = inputAudioContext;
        audioContextRef.current = outputAudioContext;

        const outputNode = outputAudioContext.createGain();
        outputNode.connect(outputAudioContext.destination);

        // Get Microphone Stream
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;

        // --- Connection Setup ---
        const sessionPromise = ai.live.connect({
          model: 'gemini-2.5-flash-native-audio-preview-09-2025',
          callbacks: {
            onopen: () => {
              if (mounted) setStatus('connected');
              
              // Input Processing (Mic -> Gemini)
              const source = inputAudioContext.createMediaStreamSource(stream);
              const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
              
              scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
                const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                
                // Visualizer logic (simple volume meter)
                const sum = inputData.reduce((a, b) => a + Math.abs(b), 0);
                const avg = sum / inputData.length;
                if(mounted) {
                    setVolume(prev => [...prev.slice(1), Math.min(100, avg * 500)]);
                }

                const pcmBlob = createBlob(inputData);
                sessionPromise.then((session) => {
                  session.sendRealtimeInput({ media: pcmBlob });
                });
              };
              
              source.connect(scriptProcessor);
              scriptProcessor.connect(inputAudioContext.destination);
            },
            onmessage: async (message: LiveServerMessage) => {
              // Output Processing (Gemini -> Speakers)
              const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
              
              if (base64Audio) {
                if (mounted) setIsPlaying(true);
                
                // Ensure context is running (browsers sometimes suspend it)
                if (outputAudioContext.state === 'suspended') {
                    await outputAudioContext.resume();
                }

                nextStartTimeRef.current = Math.max(
                  nextStartTimeRef.current,
                  outputAudioContext.currentTime,
                );

                const audioBuffer = await decodeAudioData(
                  decode(base64Audio),
                  outputAudioContext,
                  24000,
                  1,
                );

                const source = outputAudioContext.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(outputNode);
                
                source.addEventListener('ended', () => {
                  sourcesRef.current.delete(source);
                  if (sourcesRef.current.size === 0 && mounted) setIsPlaying(false);
                });

                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += audioBuffer.duration;
                sourcesRef.current.add(source);
              }

              const interrupted = message.serverContent?.interrupted;
              if (interrupted) {
                console.log("Interrupted");
                sourcesRef.current.forEach(src => src.stop());
                sourcesRef.current.clear();
                nextStartTimeRef.current = 0;
                if(mounted) setIsPlaying(false);
              }
            },
            onclose: () => {
              if (mounted) setStatus('closed');
            },
            onerror: (err) => {
              console.error(err);
              if (mounted) setStatus('error');
            }
          },
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
            },
            systemInstruction: "You are an AI dental consultant for Celestial Smile. You are professional, futuristic, and helpful. Keep answers concise.",
          },
        });

        sessionRef.current = await sessionPromise;
      } catch (e) {
        console.error("Failed to start voice session", e);
        if (mounted) setStatus('error');
      }
    };

    startSession();

    return () => {
      mounted = false;
      // Cleanup
      if (sessionRef.current) {
        sessionRef.current.close();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (inputAudioContextRef.current) {
        inputAudioContextRef.current.close();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-xl animate-fadeIn">
      <div className="w-full max-w-md bg-[#111] border border-zinc-800 rounded-3xl p-8 flex flex-col items-center shadow-2xl relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-8 mt-4 relative">
            {/* Visualizer Circle */}
            <div className={`w-32 h-32 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
                status === 'connected' ? 'border-neon-lime shadow-[0_0_30px_rgba(204,255,0,0.3)]' : 'border-zinc-700'
            }`}>
                {status === 'connecting' && <Loader2 className="w-10 h-10 text-zinc-500 animate-spin" />}
                {status === 'connected' && (
                     <div className="flex gap-1 h-12 items-center">
                        {volume.map((v, i) => (
                            <div 
                                key={i} 
                                className="w-2 bg-neon-lime rounded-full transition-all duration-100"
                                style={{ height: `${Math.max(10, v)}%` }}
                            ></div>
                        ))}
                     </div>
                )}
                {status === 'error' && <div className="text-red-500">!</div>}
            </div>
            {/* Ping animation when speaking */}
            {isPlaying && (
                <div className="absolute inset-0 rounded-full border border-neon-lime animate-ping opacity-20"></div>
            )}
        </div>

        <h3 className="text-2xl font-bold mb-2">Celestial Voice</h3>
        
        <div className="text-center mb-8 h-6">
            {status === 'connecting' && <p className="text-zinc-500 text-sm">Establishing secure link...</p>}
            {status === 'connected' && <p className="text-neon-lime text-sm font-mono uppercase tracking-widest animate-pulse">Listening...</p>}
            {status === 'error' && <p className="text-red-500 text-sm">Connection Failed</p>}
        </div>

        <div className="text-center max-w-xs text-zinc-400 text-sm leading-relaxed">
            Speak naturally. Our AI can answer questions about procedures, scheduling, and aftercare.
        </div>
      </div>
    </div>
  );
};