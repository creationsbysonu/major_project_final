// save this as practice_test.tsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaMoon, FaSun, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const paragraphGroups = {
  easy: [
    "आज बिहान म बिहानै सुत्न गयें तर निद्रा नल्यायो—त्यसपछि मैले केही समय जागर गरेर कफी बनाएँ।",
    "आज मेरो स्कूलमा बिदाको अवसर परेको थियो, त्यसैले म घरमै आराम गरी किताब पढ़्न थालेँ।",
    "आज मैले पाँच किलोमीटर हिँडेँ, जसले शरीरको व्यायाम भयो।",
  ],
  medium: [
    "गत हप्ता मैले एक पुस्तकालय भ्रमण गरें, जहाँ इतिहासका पुस्तकहरू धेरै थिए।",
    "म र परिवारले हाइकिन्गमा गएँ, जुन रमाइलो अनुभव भयो।",
    "मैले कम्प्युटर कोडिङ सिक्न थालेँ, जुन अलि गाह्रो भए तापनि रमाइलो लाग्यो।",
  ],
  hard: [
    "मैले सामुदायिक सफाई अभियानमा भाग लिएँ र धेरै कुरा सिकें।",
    "गोष्ठी कार्यक्रममा मैले “महिला सशक्तिकरण” विषयमा वक्तव्य दिएँ।",
    "मैले ग्रामीण क्षेत्रमा पुस्तक पहुँचका लागि पठनालय परियोजना सुरु गरें।",
  ],
};

type Level = "easy" | "medium" | "hard";

export default function PracticeTest() {
  const [recording, setRecording] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const [bgColor, setBgColor] = useState("bg-green-400 dark:bg-green-600");
  const [label, setLabel] = useState("Fluent");
  const [, setVolume] = useState(0);
  const [chunkCount, setChunkCount] = useState(0);
  const [stutterCount, setStutterCount] = useState(0);

  const [level, setLevel] = useState<Level>("easy");
  const [index, setIndex] = useState(0);
  const [completed, setCompleted] = useState(false);

  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const audioBufferRef = useRef<Float32Array[]>([]);
  const volumeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const paragraph = paragraphGroups[level][index];

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    if (!recording) return;

    const init = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const audioCtx = new AudioContext({ sampleRate: 16000 });
      audioCtxRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      const processor = audioCtx.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      source.connect(processor);
      processor.connect(audioCtx.destination);

      const buffer: Float32Array[] = [];
      processor.onaudioprocess = (e) => {
        const input = e.inputBuffer.getChannelData(0);
        buffer.push(new Float32Array(input));
      };

      audioBufferRef.current = buffer;

      volumeIntervalRef.current = setInterval(() => {
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteTimeDomainData(dataArray);
        const rms = Math.sqrt(dataArray.reduce((acc, val) => acc + (val - 128) ** 2, 0) / dataArray.length) / 128;
        const threshold = 0.01;
        const scaled = Math.min(1, Math.max(0, Math.pow((rms - threshold) * 2.5, 1.3)));
        setVolume(scaled);
      }, 100);

      const interval = setInterval(() => {
        if (buffer.length === 0) return;
        const combined = flattenAndConvertToWav(buffer.splice(0));
        sendWavChunk(combined);
      }, 1500);

      return () => clearInterval(interval);
    };

    init();

    return () => {
      processorRef.current?.disconnect();
      audioCtxRef.current?.close();
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
      volumeIntervalRef.current && clearInterval(volumeIntervalRef.current);
      handleNextParagraph();
    };
  }, [recording]);

  const flattenAndConvertToWav = (chunks: Float32Array[]) => {
    const flat = new Float32Array(chunks.reduce((sum, a) => sum + a.length, 0));
    let offset = 0;
    for (const chunk of chunks) {
      flat.set(chunk, offset);
      offset += chunk.length;
    }
    return encodeWAV(flat, 16000);
  };

  const encodeWAV = (samples: Float32Array, sampleRate: number) => {
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);

    const writeString = (offset: number, str: string) =>
      [...str].forEach((s, i) => view.setUint8(offset + i, s.charCodeAt(0)));

    writeString(0, "RIFF");
    view.setUint32(4, 36 + samples.length * 2, true);
    writeString(8, "WAVE");
    writeString(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, "data");
    view.setUint32(40, samples.length * 2, true);

    for (let i = 0; i < samples.length; i++) {
      const s = Math.max(-1, Math.min(1, samples[i]));
      view.setInt16(44 + i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }

    return new Blob([view], { type: "audio/wav" });
  };

  const sendWavChunk = async (blob: Blob) => {
    const file = new File([blob], "chunk.wav", { type: "audio/wav" });
    const formData = new FormData();
    formData.append("file", file);
    formData.append("chunk_number", chunkCount.toString());

    try {
      const res = await fetch("http://localhost:8000/predict/", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      setChunkCount((c) => c + 1);
      if (json.stutter_detected) {
        setStutterCount((s) => s + 1);
        setLabel("Stutter");
        setBgColor("bg-red-100 dark:bg-red-900");
      } else {
        setLabel("Fluent");
        setBgColor("bg-green-100 dark:bg-green-900");
      }
    } catch (err) {
      console.error("❌ Error uploading", err);
    }
  };

  const handleNextParagraph = () => {
    if (stutterCount > 0) {
      // retry current paragraph
      return;
    }

    const nextIndex = index + 1;
    if (nextIndex < paragraphGroups[level].length) {
      setIndex(nextIndex);
    } else {
      if (level === "easy") setLevel("medium");
      else if (level === "medium") setLevel("hard");
      else setCompleted(true);
      setIndex(0);
    }
  };

  const toggleRecording = () => {
    setRecording((r) => !r);
    if (!recording) {
      setChunkCount(0);
      setStutterCount(0);
      setLabel("Fluent");
    }
  };

  return (
    <motion.div className={`min-h-screen transition-colors duration-500 ${bgColor} flex flex-col items-center justify-center px-4 py-10 text-gray-800 dark:text-white`}>
      <div className="w-full flex justify-between items-center px-4 mb-6">
        <Link to="/" className="flex items-center gap-2 px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded shadow">
          <FaArrowLeft /> Home
        </Link>
        <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded shadow">
          <FaArrowLeft /> Dashboard
        </Link>
        <button onClick={() => setDarkMode(!darkMode)} className="p-3 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white shadow hover:rotate-180 transition-transform duration-500">
          {darkMode ? <FaSun size={22} /> : <FaMoon size={22} />}
        </button>
      </div>

      {completed ? (
        <h2 className="text-3xl font-bold text-green-600 mt-10">🎉 You have successfully completed the Practice Session!</h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-center">Practice - Level: {level.toUpperCase()}</h2>
          <p className="max-w-3xl mt-6 text-lg text-center">{paragraph}</p>
          <motion.div className="w-full max-w-6xl h-72 mt-10 shadow-2xl rounded-xl flex flex-col items-center justify-between py-6 px-6" animate={{ scale: [1, 1.01, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
            <div className="text-2xl font-bold mt-4">{label}</div>
          </motion.div>
          <button className="mt-10 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700" onClick={toggleRecording}>
            {recording ? "Stop" : "Start"} Practice
          </button>
        </>
      )}
    </motion.div>
  );
}
