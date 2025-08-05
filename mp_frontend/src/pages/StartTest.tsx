import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMoon, FaSun, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const paragraphGroups = {
  easy: [
    "आज बिहान म बिहानै सुत्न गयें तर निद्रा नल्यायो—त्यसपछि मैले केही समय जागर गरेर कफी बनाएँ, अनि छिमेकका साथीलाई सम्झाएँ।",
    "आज मेरो स्कूलमा बिदाको अवसर परेको थियो, त्यसैले म घरमै आराम गरी, आफ्ना किताबहरू पढ़्न थालेँ।",
    "आज मैले पाँच किलोमीटर हिँडेँ, जसले शरीरको व्यायाम भयो।",
    "नेपाल सुन्दर देश हो। यहाँ हिमाल, पहाड र तराई छन्। मानिसहरू सहयोगी छन्। म बिहान उठेर पढ्न जान्छु। साथीहरूसँग खेल्न रमाइलो लाग्छ।" ,
    "आज विद्यालय गइरहँदा चरा चिच्याइरहेका थिए। मौसम राम्रो थियो। हामी कक्षामा नयाँ कुरा सिक्यौं। साँझ घर आएर आमालाई सुनाएँ।",
    "बुबाले मलाई साइकल किन्नुभयो। म साथीहरूसँग पार्कमा गएँ। हामी दौडियौं, रमाइलो गर्‍यौं। घर फर्किंदा खुसी थिएँ।",
    "दशैं आयो, मामा घर जानुपर्छ। हामीले टिका लगायौं। मिठा परिकार खायौं। सबै आफन्त भेटेर रमाइलो भयो।",
    "हिजो स्कुलमा चित्र बनाउने प्रतियोगिता थियो। मैले फूल बनाएको थिएँ। शिक्षकले मलाई प्रशंसा गर्नुभयो। म धेरै खुसी भएँ।"
  ],
  medium: [
    "गत हप्ता मैले एक पुस्तकालय भ्रमण गरें, जहाँ सिसामको ठूल्ठूलो पुस्तकालय थियो।",
    "एक दिन बिहान म बगैंचामा गयो, त्यहाँ विभिन्न रंगका फूल फुलेका थिए।",
    "म र परिवारले हाइकिन्गमा गएँ, जहाँ हामीलाई पुराना पहाडी बाटो र हिमाली दृश्यले मन्त्रमुग्ध तुल्यायो।",
    "बिहान म छिट्टै उठें र नुहाएर तयार भएँ। आमाले नास्ता बनाइदिनुभयो। म स्कूल जान हिँडें। बाटोमा साथीहरू भेटिए। कक्षामा आज गणित र विज्ञान पढ्यौं। टिफिन समयमा रमाइलो गर्‍यौं। साँझ घर आएर होमवर्क गरें र बुबासँग टिभी हेरेँ।",
    "शनिबार बिहान म आमासँग बजार गइँ। हामीले तरकारी, फलफूल र केही खाजाका सामग्री किन्यौं। घर फर्केर खाना बनायौं। दिउँसो साथीहरू घर आए। हामीले लुकेको खेल खेल्यौं। बेलुका म किताब पढ्न बसें। आजको दिन रमाइलो रह्यो।",
    "आज विद्यालयमा खेलकुद प्रतियोगिता थियो। म दौडमा सहभागी भएँ। साथीहरूले मलाई हौसला दिए। म दोस्रो स्थानमा आएँ। शिक्षकले प्रमाणपत्र दिनुभयो। मैले आमाबुबालाई देखाएँ। उनीहरू गर्व महसुस गर्नुभयो।",
    "हिजो साँझ घरमा लोडसेडिङ भयो। हामीले बत्ती बालेर खाना खायौं। बुबाले पुराना कथा सुनाउनुभयो। म काखमा बसेर सुन्दै थिएँ। कहिलेकाहीँ बिना बिजुली पनि समय रमाइलो हुन सक्छ।",
    "पढाइका साथसाथै खेलकुद पनि महत्त्वपूर्ण छ। प्रत्येक विद्यार्थीले केही खेलमा भाग लिनुपर्छ। यसले शरीरलाई फिट राख्छ र मन पनि ताजा हुन्छ। म फुटबल मन पराउँछु। हरेक शनिबार अभ्यास गर्छु।"
  ],
  hard: [
    "दैनिक योग अभ्यासले शारीरिक र मानसिक स्वास्थ्यमा सकारात्मक असर पार्दछ। बिहानको समयमा शान्त वातावरणमा ध्यान र प्राणायाम गर्नाले दिनभर ऊर्जा मिल्छ। विद्यार्थीहरूका लागि योग एकाग्रता बढाउने उत्कृष्ट उपाय हो। प्रौढहरूका लागि यो तनाव घटाउने माध्यम बन्न सक्छ। अहिलेका व्यस्त जीवनशैलीमा मानिसले आफ्नो शरीरलाई समय नदिँदा धेरै रोगहरू निम्तिन्छन्। योगले यस्ता समस्याबाट बच्न मद्दत गर्छ र जीवनलाई स्वस्थ, सन्तुलित बनाउँछ।",
    "सहरीकरणसँगै वातावरणीय समस्या बढ्दै गएका छन्। हरियाली घट्दै गएको छ, ढल निकास राम्रो नभएकोले पानी जम्ने समस्या देखिन्छ। धूलो, धुवाँ र ध्वनि प्रदूषणले मानिसको स्वास्थ्यमा गम्भीर असर पार्छ। सरकारले नियम बनाएको भए पनि नागरिकको सहकार्य बिना परिवर्तन सम्भव छैन। वृक्षारोपण, फोहोर व्यवस्थापन र सार्वजनिक यातायातको प्रयोगले वातावरण सुधार गर्न सकिन्छ। हरेक व्यक्तिको सानो प्रयासले ठूलो परिवर्तन ल्याउन सक्छ।",
    "नेपाली साहित्यको इतिहास समृद्ध र विविधताले भरिपूर्ण छ। भानुभक्त आचार्यबाट सुरु भएको आधुनिक नेपाली कविता आज विभिन्न स्वरूपमा फस्टाएको छ। कथा, उपन्यास, नाटक र निबन्धहरूमा सामाजिक, राजनीतिक र सांस्कृतिक परिवेश स्पष्ट देखिन्छ। अहिलेका युवा लेखकहरूले पनि नयाँ धार ल्याएका छन्। डिजिटल माध्यमबाट साहित्यको पहुँच अझै बढेको छ। पुस्तक मेला, कविता वाचन कार्यक्रम र अनलाइन पत्रिकाले लेखक र पाठकबीचको सम्बन्ध मजबुत बनाएका छन्।",
    "शिक्षाले हाम्रो जीवनमा गहिरो प्रभाव पार्दछ। शिक्षक मात्र ज्ञान दिने व्यक्ति होइन, उनी मार्गदर्शक, प्रेरणाका स्रोत र आदर्श पनि हुन्। विद्यालयमा जब शिक्षक नयाँ विषय पढाउनुहुन्छ, हामी ध्यानपूर्वक सुन्छौं र प्रश्नहरू सोध्न डराउँदैनौं। ज्ञानको प्राप्तिका लागि शिक्षकप्रति सम्मान हुनु जरुरी छ। राम्रो शिक्षा नै उज्यालो भविष्यको आधार हो। आजको डिजिटल युगमा पनि शिक्षकको भूमिकालाई प्रविधिले विस्थापित गर्न सक्दैन।",
    "हिजोको साँझ निकै रमाइलो रह्यो। हाम्रो परिवार लामो समयपछि एकै ठाउँमा जम्मा भएको थियो। हजुरबुबाले पुराना कथा सुनाउनुभयो जसमा गाउँको जीवनशैली, मेलाहरू र पुराना संस्कारहरूको वर्णन थियो। हामी बच्चाहरू चाखपूर्वक सुन्दै थियौं। बेलुकीको खानामा परिकारहरू थिए—गुन्द्रुकको झोल, मासु, अचार र भात। खानापछि हामीले अन्ताक्षरी खेल्यौं। त्यो समय अमूल्य लाग्यो।",
    "नेपालमा पर्यटकहरूले धेरै कुरा हेर्न सक्छन्। हिमाल आरोहण, जंगल सफारी, बौद्ध स्तूपहरू र प्राचीन दरबारहरू यहाँका मुख्य आकर्षण हुन्। विदेशी पाहुनाहरू काठमाडौं, पोखरा, लुम्बिनी र चितवन जान रुचाउँछन्। स्थानीय खानाहरू, जस्तै म:म:, ढिंडो, सेलरोटी पनि पर्यटकहरूका लागि नयाँ अनुभव बनिरहेका छन्। यहाँको संस्कृति र अतिथि सत्कारको भावना पर्यटकहरूलाई फेरि फर्किन बाध्य बनाउँछ।",
    "विद्यालयमा हरेक वर्ष शैक्षिक भ्रमणको आयोजना गरिन्छ। यसपालि हामी लुम्बिनी गयौं, जहाँ बुद्ध जन्मनुभएको हो। त्यहाँको मायादेवी मन्दिर, पवित्र पोखरी र विभिन्न देशहरूद्वारा निर्माण गरिएका विहारहरू हेर्न लायक छन्। शिक्षकहरूले इतिहास बताइरहनुभएको थियो र हामी नोट पनि गरिरहेका थियौं। भ्रमणले किताबमा पढेका कुरा प्रत्यक्ष रूपमा देख्न पाउने मौका दिन्छ।",
    "आजको युग विज्ञान र प्रविधिको युग हो। इन्टरनेट, स्मार्टफोन र कृत्रिम बुद्धिमत्ताका कारण मानिसको जीवनशैलीमा ठूलो परिवर्तन आएको छ। हामी जुनसुकै जानकारी सजिलै प्राप्त गर्न सक्छौं। बालबालिकाले पनि टेक्नोलोजीको सही प्रयोग गर्न जान्नुपर्छ। यद्यपि, अत्यधिक प्रयोगले नकारात्मक असर पनि पार्न सक्छ, त्यसैले सन्तुलन कायम गर्नु आवश्यक हुन्छ।"
  ],
};

function getRandomFromGroup(group: string[]) {
  return group[Math.floor(Math.random() * group.length)];
}

export default function StartTest() {
  const [recording, setRecording] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  const [currentLevel, setCurrentLevel] = useState<"easy" | "medium" | "hard">("medium");
  const [currentText, setCurrentText] = useState(getRandomFromGroup(paragraphGroups["medium"]));
  const [bgColor, setBgColor] = useState("bg-green-400 dark:bg-green-600");
  const [label, setLabel] = useState("Fluent");
  const [volume, setVolume] = useState(0);
  const [chunkCount, setChunkCount] = useState(0);
  const [stutterCount, setStutterCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState<{ percentage: number; recommendation: string; nextLevel: string } | null>(null);

  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const audioBufferRef = useRef<Float32Array[]>([]);
  const volumeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
      console.error("❌ Failed to upload WAV chunk", err);
    }
  };

  const toggleRecording = () => {
    if (recording) {
      const percentage = ((stutterCount / chunkCount) * 100);
      let nextLevel = currentLevel;
      let recommendation = "";

      if (percentage <= 25) {
        nextLevel = "hard";
        recommendation = "Excellent! You’re ready for harder passages.";
      } else if (percentage <= 60) {
        nextLevel = "medium";
        recommendation = "Not bad! Let's stay at the same level for now.";
      } else {
        nextLevel = "easy";
        recommendation = "Keep practicing! Try an easier paragraph next.";
      }

      setResult({
        percentage: parseFloat(percentage.toFixed(1)),
        recommendation,
        nextLevel,
      });

      setCurrentLevel(nextLevel as "easy" | "medium" | "hard");
      setCurrentText(getRandomFromGroup(paragraphGroups[nextLevel]));
      setShowModal(true);
    }

    setRecording((prev) => !prev);
    setChunkCount(0);
    setStutterCount(0);
    setLabel("Fluent");
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
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white shadow hover:rotate-180 transition-transform duration-500"
        >
          {darkMode ? <FaSun size={22} /> : <FaMoon size={22} />}
        </button>
      </div>

      <h2 className="text-3xl font-bold text-center mb-2">Read the following paragraph:</h2>
      <div className="text-xl font-bold text-white mb-2">Level: {currentLevel.toUpperCase()}</div>
      <p className="max-w-3xl mt-2 text-lg text-center">{currentText}</p>

      <motion.div className="w-full max-w-6xl h-72 mt-10 shadow-2xl rounded-xl flex flex-col items-center justify-between py-6 px-6" animate={{ scale: [1, 1.01, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
        <div className="flex justify-between w-full mb-2">
          <span className="font-semibold">Speaking Volume:</span>
          <span className="text-xl font-bold text-indigo-500">{(volume * 100).toFixed(1)}%</span>
        </div>
        <div className="w-full h-44 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-full flex items-end gap-[1.5px] px-1">
            {Array.from({ length: 100 }).map((_, i) => {
              const wave = Math.sin((i / 100) * Math.PI * 4 + volume * 6);
              const height = Math.max(3, volume * 90 * (1 + wave));
              return (
                <div key={i} className="flex-1 bg-black rounded-sm" style={{ height: `${height}%`, opacity: height / 100 }} />
              );
            })}
          </div>
        </div>
        <div className="text-2xl font-bold mt-4">{label}</div>
      </motion.div>

      <button className="mt-10 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700" onClick={toggleRecording}>
        {recording ? "Stop Test" : "Start Test"}
      </button>

      <AnimatePresence>
        {showModal && result && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl text-center max-w-md w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-indigo-600 mb-4">Test Result</h3>
              <svg width="140" height="140" viewBox="0 0 36 36" className="mx-auto mb-4">
                <circle cx="18" cy="18" r="16" fill="#e5e7eb" />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="transparent"
                  stroke="#22c55e"
                  strokeWidth="4"
                  strokeDasharray={`${100 - result.percentage}, 100`}
                  transform="rotate(-90 18 18)"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="transparent"
                  stroke="#ef4444"
                  strokeWidth="4"
                  strokeDasharray={`${result.percentage}, 100`}
                  transform={`rotate(${(360 * (100 - result.percentage)) / 100 - 90} 18 18)`}
                />
              </svg>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                Stutter Detected: <strong className="text-red-500">{result.percentage}%</strong>
              </p>
              <p className="italic text-green-600 dark:text-green-400 mb-4">{result.recommendation}</p>
              <button
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
                onClick={() => setShowModal(false)}
              >
                Okay
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
