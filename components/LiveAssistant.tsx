
import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Loader2, Sparkles, X } from 'lucide-react';
import { connectToSpiritualCompanion, encodeAudio, decodeAudio, decodeAudioData } from '../services/liveService';

export const LiveAssistant: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);

  const startSession = async () => {
    setIsConnecting(true);
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext({ sampleRate: 16000 });
        outputContextRef.current = new AudioContext({ sampleRate: 24000 });
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const session = await connectToSpiritualCompanion({
        onopen: () => {
          setIsConnecting(false);
          setIsActive(true);
          const source = audioContextRef.current!.createMediaStreamSource(stream);
          const processor = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
          processor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            const int16 = new Int16Array(inputData.length);
            for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
            session.sendRealtimeInput({
              media: { data: encodeAudio(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' }
            });
          };
          source.connect(processor);
          processor.connect(audioContextRef.current!.destination);
        },
        onmessage: async (msg: any) => {
          const base64Audio = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
          if (base64Audio && outputContextRef.current) {
            setIsSpeaking(true);
            const audioData = decodeAudio(base64Audio);
            const buffer = await decodeAudioData(audioData, outputContextRef.current, 24000);
            const source = outputContextRef.current.createBufferSource();
            source.buffer = buffer;
            source.connect(outputContextRef.current.destination);
            const startTime = Math.max(nextStartTimeRef.current, outputContextRef.current.currentTime);
            source.start(startTime);
            nextStartTimeRef.current = startTime + buffer.duration;
            source.onended = () => setIsSpeaking(false);
          }
        },
        onerror: (e: any) => console.error(e),
        onclose: () => {
            setIsActive(false);
            setIsConnecting(false);
        }
      });
      sessionRef.current = session;
    } catch (err) {
      console.error(err);
      setIsConnecting(false);
    }
  };

  const stopSession = () => {
    if (sessionRef.current) {
        sessionRef.current.close();
        sessionRef.current = null;
    }
    setIsActive(false);
  };

  return (
    <div className="fixed bottom-8 left-8 z-50">
      {isActive ? (
        <div className="glass p-4 rounded-2xl flex items-center gap-4 animate-in slide-in-from-bottom-4">
          <div className={`w-3 h-3 rounded-full ${isSpeaking ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
          <span className="text-sm font-medium">الرفيق الروحي متصل...</span>
          <button onClick={stopSession} className="p-2 hover:bg-white/10 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <button
          onClick={startSession}
          disabled={isConnecting}
          className="w-16 h-16 bg-amber-500 hover:bg-amber-600 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 animate-gold"
        >
          {isConnecting ? <Loader2 className="w-8 h-8 animate-spin" /> : <Sparkles className="w-8 h-8 text-white" />}
        </button>
      )}
    </div>
  );
};
