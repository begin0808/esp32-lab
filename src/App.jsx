import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Wifi, 
  Zap, 
  Layers, 
  Code, 
  Terminal, 
  Play, 
  BookOpen, 
  Github, 
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  CheckCircle,
  ArrowRight,
  Copy,
  Check,
  Download,
  AlertTriangle,
  Settings,
  Thermometer,
  Activity,
  Globe,
  Clock,
  MessageCircle,
  Radio,
  Video,
  Box,
  Monitor,
  Maximize2,
  RefreshCw,
  Share2,
  HelpCircle,
  Award,
  Smartphone,
  Grid,
  Battery,
  Search,
  CheckSquare,
  Image as ImageIcon
} from 'lucide-react';

// --- 元件：SVG 電路圖繪製器 ---
const CircuitDiagram = ({ type }) => {
  if (!type || type === 'none') return (
    <div className="w-full h-64 bg-slate-800/50 rounded-xl border border-slate-700 flex flex-col items-center justify-center text-slate-500">
      <Cpu className="w-12 h-12 mb-3 opacity-30" />
      <span>此專題無需額外外部接線 (或僅需 USB 供電)</span>
    </div>
  );

  // 通用樣式
  const svgStyle = "w-full h-full max-h-[300px] bg-[#1e1e1e] rounded-xl border border-slate-700 font-mono";
  const espStyle = { fill: "#2d3748", stroke: "#4a5568", width: 80, height: 180, rx: 6 };
  const labelStyle = { fill: "#718096", fontSize: 10, textAnchor: "end" };
  const wireStyle = { strokeWidth: 3, fill: "none", strokeLinecap: "round" };

  // 繪製 ESP32 板子的基礎函式
  const renderESP32 = () => (
    <g transform="translate(40, 40)">
      <rect {...espStyle} />
      <text x="40" y="90" fill="#a0aec0" textAnchor="middle" transform="rotate(-90 40 90)" fontSize="14" fontWeight="bold">ESP32</text>
      {/* 模擬一些固定腳位點 */}
      <circle cx="0" cy="20" r="3" fill="#ecc94b" /> <text x="-5" y="23" {...labelStyle} fill="#ecc94b">3V3</text>
      <circle cx="0" cy="40" r="3" fill="#718096" /> <text x="-5" y="43" {...labelStyle}>GND</text>
      <circle cx="80" cy="20" r="3" fill="#718096" /> <text x="90" y="23" {...labelStyle} textAnchor="start">GND</text>
      <circle cx="80" cy="40" r="3" fill="#f56565" /> <text x="90" y="43" {...labelStyle} textAnchor="start" fill="#f56565">VIN</text>
    </g>
  );

  const renderComponent = (content) => (
    <svg viewBox="0 0 400 260" className={svgStyle}>
      {renderESP32()}
      {content}
    </svg>
  );

  // 根據不同類型回傳對應的 SVG 內容
  switch (type) {
    case 'led':
      return renderComponent(
        <>
          {/* 連接線 D2 -> Resistor */}
          <circle cx="120" cy="140" r="3" fill="#4fd1c5" transform="translate(-40, 0)" /> {/* ESP D2 */}
          <text x="70" y="143" {...labelStyle} fill="#4fd1c5">D2</text>
          <path d="M 80 140 L 200 140" stroke="#4fd1c5" {...wireStyle} />
          
          {/* 電阻 220Ω */}
          <rect x="200" y="130" width="40" height="20" fill="#d69e2e" rx="2" />
          <text x="220" y="144" fill="black" fontSize="10" textAnchor="middle">220Ω</text>
          
          {/* 連接線 Resistor -> LED Anode */}
          <path d="M 240 140 L 280 140" stroke="#4fd1c5" {...wireStyle} />

          {/* LED 元件 */}
          <circle cx="290" cy="140" r="10" fill="red" opacity="0.8" />
          <text x="290" y="165" fill="white" fontSize="12" textAnchor="middle">LED</text>
          <line x1="300" y1="140" x2="330" y2="140" stroke="#718096" strokeWidth="2" /> {/* Cathode Leg */}

          {/* 連接線 LED Cathode -> GND */}
          <path d="M 330 140 L 330 200 L 40 200 L 40 80" stroke="#718096" {...wireStyle} />
        </>
      );

    case 'button':
      return renderComponent(
        <>
          {/* ESP D4 */}
          <circle cx="80" cy="160" r="3" fill="#4fd1c5" transform="translate(0, 0)" /> 
          <text x="70" y="163" {...labelStyle} fill="#4fd1c5">D4</text>
          
          {/* 連接線 D4 -> Button Pin 1 */}
          <path d="M 80 160 L 220 160" stroke="#4fd1c5" {...wireStyle} />

          {/* 按鈕元件 */}
          <rect x="220" y="140" width="40" height="40" fill="#4a5568" rx="4" />
          <circle cx="240" cy="160" r="12" fill="#2d3748" stroke="#1a202c" strokeWidth="2" />
          <text x="240" y="195" fill="white" fontSize="12" textAnchor="middle">Button</text>

          {/* 連接線 Button Pin 2 -> GND */}
          <path d="M 260 160 L 300 160 L 300 200 L 40 200 L 40 80" stroke="#718096" {...wireStyle} />
        </>
      );

    case 'pot': // ADC
      return renderComponent(
        <>
          {/* Potentiometer */}
          <rect x="220" y="100" width="40" height="60" fill="#2c5282" rx="4" />
          <circle cx="240" cy="130" r="15" fill="#bee3f8" stroke="#2b6cb0" />
          <text x="240" y="180" fill="white" fontSize="12" textAnchor="middle">Potentiometer</text>

          {/* 3V3 -> Pot Pin 1 */}
          <path d="M 40 60 L 20 60 L 20 20 L 220 20 L 220 110" stroke="#ecc94b" {...wireStyle} />
          
          {/* ESP D34 -> Pot Pin 2 (Middle) */}
          <circle cx="80" cy="180" r="3" fill="#4fd1c5" />
          <text x="70" y="183" {...labelStyle} fill="#4fd1c5">D34</text>
          <path d="M 80 180 L 280 180 L 280 130 L 260 130" stroke="#4fd1c5" {...wireStyle} />

          {/* Pot Pin 3 -> GND */}
          <path d="M 220 150 L 220 200 L 40 200 L 40 80" stroke="#718096" {...wireStyle} />
        </>
      );

    case 'dht':
      return renderComponent(
        <>
          {/* DHT Sensor */}
          <rect x="220" y="100" width="50" height="60" fill="#38b2ac" rx="2" />
          <text x="245" y="135" fill="white" fontSize="12" textAnchor="middle" fontWeight="bold">DHT</text>
          
          {/* VCC */}
          <path d="M 40 60 L 20 60 L 20 20 L 230 20 L 230 100" stroke="#ecc94b" {...wireStyle} />
          {/* Data (D4) */}
          <circle cx="80" cy="160" r="3" fill="#4fd1c5" /> <text x="70" y="163" {...labelStyle} fill="#4fd1c5">D4</text>
          <path d="M 80 160 L 245 160 L 245 160" stroke="#4fd1c5" {...wireStyle} />
          <line x1="245" y1="160" x2="245" y2="100" stroke="#4fd1c5" {...wireStyle} />
          
          {/* GND */}
          <path d="M 260 100 L 260 200 L 40 200 L 40 80" stroke="#718096" {...wireStyle} />
        </>
      );

    case 'sonar':
      return renderComponent(
        <>
          {/* HC-SR04 */}
          <rect x="200" y="100" width="100" height="40" fill="#4299e1" rx="4" />
          <circle cx="220" cy="120" r="12" fill="#cbd5e0" />
          <circle cx="280" cy="120" r="12" fill="#cbd5e0" />
          <text x="250" y="160" fill="white" fontSize="12" textAnchor="middle">HC-SR04</text>

          {/* VCC & GND */}
          <path d="M 40 60 L 20 60 L 20 20 L 210 20 L 210 100" stroke="#ecc94b" {...wireStyle} />
          <path d="M 290 100 L 290 200 L 40 200 L 40 80" stroke="#718096" {...wireStyle} />

          {/* Trig (D5) */}
          <circle cx="80" cy="100" r="3" fill="#ed8936" /> <text x="70" y="103" {...labelStyle} fill="#ed8936">D5</text>
          <path d="M 80 100 L 235 100" stroke="#ed8936" {...wireStyle} />
          
          {/* Echo (D18) */}
          <circle cx="80" cy="120" r="3" fill="#48bb78" /> <text x="70" y="123" {...labelStyle} fill="#48bb78">D18</text>
          <path d="M 80 120 L 260 120 L 260 140" stroke="#48bb78" {...wireStyle} />
        </>
      );

    case 'relay':
      return renderComponent(
        <>
          {/* Relay Module */}
          <rect x="220" y="100" width="60" height="60" fill="#2b6cb0" rx="4" />
          <rect x="235" y="115" width="30" height="30" fill="#3182ce" />
          <text x="250" y="175" fill="white" fontSize="12" textAnchor="middle">Relay</text>

          {/* Control (D2) */}
          <circle cx="120" cy="140" r="3" fill="#4fd1c5" transform="translate(-40, 0)" /> <text x="70" y="143" {...labelStyle} fill="#4fd1c5">D2</text>
          <path d="M 80 140 L 220 140" stroke="#4fd1c5" {...wireStyle} />

          {/* VCC & GND */}
          <path d="M 40 60 L 20 60 L 20 20 L 230 20 L 230 100" stroke="#ecc94b" {...wireStyle} />
          <path d="M 270 100 L 270 200 L 40 200 L 40 80" stroke="#718096" {...wireStyle} />
        </>
      );

    default:
      return null;
  }
};

// --- 元件：腳位圖 Pin (小元件) ---
const PinLabel = ({ x, y, label, type = 'gpio', align = 'left' }) => {
  let color = '#a0aec0'; // default gray
  if (type === 'pwr') color = '#f56565'; // red
  if (type === 'gnd') color = '#4a5568'; // dark gray
  if (type === 'adc') color = '#48bb78'; // green
  if (type === 'touch') color = '#ed8936'; // orange
  if (type === 'comm') color = '#4299e1'; // blue

  return (
    <g>
      <rect x={align === 'left' ? x - 35 : x + 5} y={y - 6} width="30" height="12" rx="2" fill={color} opacity="0.2" />
      <text 
        x={align === 'left' ? x - 10 : x + 10} 
        y={y + 3} 
        fill={color} 
        fontSize="9" 
        fontWeight="bold" 
        textAnchor={align === 'left' ? 'end' : 'start'}
        fontFamily="monospace"
      >
        {label}
      </text>
      <line x1={x} y1={y} x2={align === 'left' ? x - 5 : x + 5} y2={y} stroke={color} strokeWidth="1" />
      <circle cx={x} cy={y} r="2.5" fill="#d4d4d4" stroke="none" />
    </g>
  );
};

// --- 元件：模擬視窗與瀏覽器 ---
const MockWindow = ({ title, children, type = "app", url = "" }) => (
  <div className="w-full rounded-lg overflow-hidden border border-slate-700 bg-slate-800 shadow-2xl my-6">
    <div className={`px-4 py-2 flex items-center border-b border-slate-700 ${type === 'browser' ? 'bg-slate-900' : 'bg-[#2d2d2d]'}`}>
      <div className="flex space-x-1.5 mr-4">
        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
      </div>
      {type === 'browser' ? (
        <div className="flex-1 bg-slate-800 rounded px-3 py-1 text-xs text-slate-400 font-mono text-center flex items-center justify-center">
          <Globe className="w-3 h-3 mr-2" />
          {url}
        </div>
      ) : (
        <span className="text-xs text-slate-400 font-sans">{title}</span>
      )}
    </div>
    <div className={`p-0 ${type === 'browser' ? 'bg-white' : 'bg-[#1e1e1e]'}`}>
      {children}
    </div>
  </div>
);

// --- 資料：快速入門內容 ---
const gettingStartedData = [
  {
    id: 'intro',
    title: '認識 ESP32',
    subtitle: '最強大的物聯網入門晶片',
    content: (
      <div className="space-y-6">
        <p className="text-slate-300 leading-relaxed text-lg">
          ESP32 是由樂鑫科技 (Espressif Systems) 開發的一款低成本、低功耗的系統單晶片 (SoC)。
          它整合了 <strong className="text-cyan-400">Wi-Fi</strong> 和 <strong className="text-blue-400">雙模藍牙</strong> (傳統藍牙 + BLE)，
          並搭載雙核心 32 位元處理器，時脈高達 240 MHz。
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-colors">
            <h4 className="font-bold text-white mb-2 flex items-center text-lg">
              <Zap className="w-5 h-5 text-yellow-400 mr-2" /> 效能強大
            </h4>
            <p className="text-slate-400">雙核心 Xtensa® 32-bit LX6 微處理器，運算速度比 Arduino Uno 快上數十倍。</p>
          </div>
          <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-colors">
            <h4 className="font-bold text-white mb-2 flex items-center text-lg">
              <Wifi className="w-5 h-5 text-cyan-400 mr-2" /> 內建連網
            </h4>
            <p className="text-slate-400">原生支援 Wi-Fi Station/AP 模式與 Bluetooth 4.2/BLE，物聯網開發首選。</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'family',
    title: 'ESP32 家族介紹',
    subtitle: '如何選擇適合你的開發板？',
    content: (
      <div className="space-y-8">
        <p className="text-slate-300">
          ESP32 已經發展出一個龐大的家族，針對不同應用場景推出了多種型號。
          對於初學者，建議先從最經典的 **ESP32 (WROOM)** 開始入手。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ESP32 (Original) */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden relative group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-cyan-500"></div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">ESP32 (經典款)</h3>
                <span className="bg-cyan-500/20 text-cyan-300 text-xs font-bold px-2 py-1 rounded">推薦入門</span>
              </div>
              <ul className="space-y-2 text-sm text-slate-400 mb-4">
                <li className="flex items-center"><Cpu className="w-4 h-4 mr-2" /> 雙核心 Xtensa LX6 (240MHz)</li>
                <li className="flex items-center"><Wifi className="w-4 h-4 mr-2" /> WiFi 4 + 藍牙 4.2 / BLE</li>
                <li className="flex items-center"><Layers className="w-4 h-4 mr-2" /> 豐富 GPIO, DAC, Touch</li>
              </ul>
              <p className="text-slate-300 text-sm border-t border-slate-700 pt-3">
                <strong>適用：</strong> 通用 IoT 專案、學習開發、需要藍牙經典模式的應用。
              </p>
            </div>
          </div>

          {/* ESP32-S3 */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-purple-500"></div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">ESP32-S3 (AI 高階)</h3>
                <span className="bg-purple-500/20 text-purple-300 text-xs font-bold px-2 py-1 rounded">AI & USB</span>
              </div>
              <ul className="space-y-2 text-sm text-slate-400 mb-4">
                <li className="flex items-center"><Cpu className="w-4 h-4 mr-2" /> 雙核心 Xtensa LX7 (AI指令集)</li>
                <li className="flex items-center"><Wifi className="w-4 h-4 mr-2" /> WiFi 4 + BLE 5.0 (無經典藍牙)</li>
                <li className="flex items-center"><Box className="w-4 h-4 mr-2" /> 原生 USB OTG, 更多 IO</li>
              </ul>
              <p className="text-slate-300 text-sm border-t border-slate-700 pt-3">
                <strong>適用：</strong> AI 語音/影像辨識、模擬鍵盤滑鼠 (HID)、高效能需求。
              </p>
            </div>
          </div>

          {/* ESP32-C3 */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-green-500"></div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">ESP32-C3 (低功耗)</h3>
                <span className="bg-green-500/20 text-green-300 text-xs font-bold px-2 py-1 rounded">ESP8266 替代</span>
              </div>
              <ul className="space-y-2 text-sm text-slate-400 mb-4">
                <li className="flex items-center"><Cpu className="w-4 h-4 mr-2" /> 單核心 RISC-V (160MHz)</li>
                <li className="flex items-center"><Wifi className="w-4 h-4 mr-2" /> WiFi 4 + BLE 5.0</li>
                <li className="flex items-center"><Battery className="w-4 h-4 mr-2" /> 極低功耗, 針腳相容 8266</li>
              </ul>
              <p className="text-slate-300 text-sm border-t border-slate-700 pt-3">
                <strong>適用：</strong> 智慧開關、簡單感測器、電池供電裝置。
              </p>
            </div>
          </div>

          {/* ESP32-S2 */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-yellow-500"></div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">ESP32-S2 (USB 專用)</h3>
                <span className="bg-yellow-500/20 text-yellow-300 text-xs font-bold px-2 py-1 rounded">無藍牙</span>
              </div>
              <ul className="space-y-2 text-sm text-slate-400 mb-4">
                <li className="flex items-center"><Cpu className="w-4 h-4 mr-2" /> 單核心 Xtensa LX7</li>
                <li className="flex items-center"><Wifi className="w-4 h-4 mr-2" /> 僅 WiFi 4 (無藍牙)</li>
                <li className="flex items-center"><Box className="w-4 h-4 mr-2" /> 原生 USB OTG, 多達 43 GPIO</li>
              </ul>
              <p className="text-slate-300 text-sm border-t border-slate-700 pt-3">
                <strong>適用：</strong> 簡易 USB 裝置、不需要藍牙的 WiFi 應用。
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'setup',
    title: '開發環境建置',
    subtitle: '安裝 Arduino IDE 與 ESP32 套件',
    content: (
      <div className="space-y-12">
        {/* Step 1 */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-cyan-400 flex items-center">
            <span className="w-8 h-8 rounded-full bg-cyan-900 text-cyan-300 flex items-center justify-center mr-3 text-sm">1</span>
            下載與安裝 Arduino IDE
          </h3>
          <p className="text-slate-300 pl-11">
            前往 Arduino 官方網站下載最新版 IDE (建議 2.0 以上版本)，支援 Windows、macOS 與 Linux。
          </p>
          <div className="pl-11">
            <MockWindow type="browser" url="https://www.arduino.cc/en/software">
              <div className="flex flex-col items-center justify-center py-12 bg-slate-50">
                <div className="text-4xl font-bold text-slate-800 mb-2">Arduino IDE 2.3.2</div>
                <div className="text-slate-500 mb-8">The open-source Arduino Software (IDE) makes it easy to write code...</div>
                <div className="flex space-x-4">
                  <div className="px-6 py-3 bg-teal-600 text-white rounded shadow font-bold">Windows Installer</div>
                  <div className="px-6 py-3 bg-slate-200 text-slate-700 rounded shadow font-bold">macOS Intel</div>
                  <div className="px-6 py-3 bg-slate-200 text-slate-700 rounded shadow font-bold">Linux 64 bits</div>
                </div>
              </div>
            </MockWindow>
            <a href="https://www.arduino.cc/en/software" target="_blank" rel="noreferrer" className="inline-block mt-2 text-cyan-400 hover:text-cyan-300 text-sm">
              前往下載頁面 →
            </a>
          </div>
        </div>

        {/* Step 2 */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-cyan-400 flex items-center">
            <span className="w-8 h-8 rounded-full bg-cyan-900 text-cyan-300 flex items-center justify-center mr-3 text-sm">2</span>
            設定開發板管理員網址
          </h3>
          <p className="text-slate-300 pl-11">
            開啟 IDE，進入 <strong>File (檔案) &gt; Preferences (偏好設定)</strong>。
            <br/>在 "Additional boards manager URLs" 欄位貼上以下網址：
          </p>
          <div className="pl-11">
            <div className="bg-slate-950 p-3 rounded border border-slate-700 font-mono text-xs text-green-400 break-all mb-3 select-all">
              https://dl.espressif.com/dl/package_esp32_index.json
            </div>
            <MockWindow title="Preferences" type="app">
              <div className="p-6 font-sans text-sm text-slate-300">
                <div className="flex items-center mb-4">
                  <div className="w-48 text-right mr-4 text-slate-400">Sketchbook location:</div>
                  <div className="flex-1 bg-[#333] border border-slate-600 h-8 rounded"></div>
                </div>
                <div className="flex items-center mb-4">
                  <div className="w-48 text-right mr-4 text-slate-400">Editor font size:</div>
                  <div className="w-16 bg-[#333] border border-slate-600 h-8 rounded flex items-center px-2">12</div>
                </div>
                <div className="flex items-start">
                  <div className="w-48 text-right mr-4 text-slate-400 pt-2">Additional boards manager URLs:</div>
                  <div className="flex-1 relative">
                    <div className="w-full bg-[#333] border border-cyan-500 h-8 rounded flex items-center px-2 text-green-400 overflow-hidden whitespace-nowrap">
                      https://dl.espressif.com/dl/package_esp32_index.json
                    </div>
                    <div className="absolute right-2 top-2 w-4 h-4 bg-cyan-500 rounded-full"></div>
                  </div>
                </div>
                <div className="flex justify-end mt-8">
                  <div className="px-4 py-1.5 bg-cyan-700 text-white rounded">OK</div>
                  <div className="px-4 py-1.5 bg-[#444] text-white rounded ml-2">Cancel</div>
                </div>
              </div>
            </MockWindow>
          </div>
        </div>

        {/* Step 3 */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-cyan-400 flex items-center">
            <span className="w-8 h-8 rounded-full bg-cyan-900 text-cyan-300 flex items-center justify-center mr-3 text-sm">3</span>
            安裝 ESP32 核心套件
          </h3>
          <p className="text-slate-300 pl-11">
            進入左側選單的 <strong>Boards Manager (開發板管理員)</strong>，搜尋 "esp32"。
            <br/>找到由 <strong>Espressif Systems</strong> 開發的項目，點擊 "INSTALL"。
          </p>
          <div className="pl-11">
            <MockWindow title="Boards Manager" type="app">
              <div className="flex h-64">
                {/* Sidebar Mock */}
                <div className="w-12 border-r border-[#333] flex flex-col items-center py-4 space-y-4">
                  <div className="w-6 h-6 rounded bg-[#444]"></div>
                  <div className="w-6 h-6 rounded bg-cyan-600 shadow-[0_0_10px_rgba(8,145,178,0.5)]"></div>
                  <div className="w-6 h-6 rounded bg-[#444]"></div>
                </div>
                {/* Content */}
                <div className="flex-1 p-4">
                  <div className="mb-4">
                    <div className="w-full bg-[#333] border border-slate-600 h-8 rounded flex items-center px-3 text-slate-300">
                      <Search className="w-4 h-4 mr-2 text-slate-500" /> esp32
                    </div>
                  </div>
                  <div className="border border-[#444] bg-[#252526] p-4 rounded">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-bold text-white">esp32 <span className="text-slate-500 font-normal">by Espressif Systems</span></div>
                      <div className="text-xs text-slate-500">3.0.7</div>
                    </div>
                    <p className="text-xs text-slate-400 mb-4">Boards included in this package: ESP32 Dev Module, ESP32-S3-Box, ESP32C3 Dev Module...</p>
                    <div className="flex items-center">
                      <button className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded">INSTALL</button>
                    </div>
                  </div>
                </div>
              </div>
            </MockWindow>
          </div>
        </div>

        {/* Step 4 */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-cyan-400 flex items-center">
            <span className="w-8 h-8 rounded-full bg-cyan-900 text-cyan-300 flex items-center justify-center mr-3 text-sm">4</span>
            選擇開發板與連接埠
          </h3>
          <p className="text-slate-300 pl-11">
            安裝完成後，將 ESP32 透過 USB 連接電腦。
            <br/>1. 在上方選單選擇開發板為 <strong>DOIT ESP32 DEVKIT V1</strong>。
            <br/>2. 選擇對應的 COM Port (Windows) 或 /dev/cu.usb... (Mac)。
          </p>
          <div className="pl-11">
            <MockWindow title="Arduino IDE" type="app">
              <div className="h-48 flex flex-col">
                <div className="h-8 bg-[#333] flex items-center px-4 text-xs text-slate-300 space-x-4">
                  <span>File</span>
                  <span>Edit</span>
                  <span>Sketch</span>
                  <span className="text-white bg-cyan-700 px-2 py-0.5 rounded">Tools</span>
                  <span>Help</span>
                </div>
                <div className="relative flex-1 bg-[#1e1e1e] p-4">
                  {/* Dropdown Menu Mockup */}
                  <div className="absolute top-0 left-32 w-64 bg-[#252526] border border-[#444] shadow-2xl rounded-b py-1 z-10 text-sm">
                    <div className="px-4 py-1.5 hover:bg-[#37373d] text-slate-300">Auto Format</div>
                    <div className="h-px bg-[#444] my-1"></div>
                    <div className="px-4 py-1.5 bg-[#094771] text-white flex justify-between">
                      <span>Board: "DOIT ESP32 DEVKIT V1"</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                    <div className="px-4 py-1.5 hover:bg-[#37373d] text-slate-300 flex justify-between">
                      <span>Port: "COM3"</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                    <div className="px-4 py-1.5 hover:bg-[#37373d] text-slate-300">Get Board Info</div>
                  </div>
                  {/* Code Area Background */}
                  <div className="text-slate-600 font-mono text-xs">
                    <div>void setup() &#123;</div>
                    <div className="pl-4">Serial.begin(115200);</div>
                    <div>&#125;</div>
                  </div>
                </div>
              </div>
            </MockWindow>
            <div className="mt-4 bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg text-sm text-yellow-200">
              <strong>⚠️ 常見問題：</strong> 如果找不到 Port，可能需要安裝 <strong>CP210x</strong> 或 <strong>CH340</strong> 驅動程式 (視您的開發板晶片而定)。
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'pinout',
    title: '硬體腳位圖',
    subtitle: 'ESP32 DevKit V1 接腳定義 (30-Pin)',
    content: (
      <div className="space-y-6">
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden">
          
          <h4 className="text-white font-bold mb-4 z-10">DOIT ESP32 DevKit V1 (30-Pin Version)</h4>
          
          {/* Detailed SVG Pinout */}
          <svg viewBox="0 0 400 520" className="w-full max-w-md z-10 font-mono">
            {/* Board PCB */}
            <rect x="100" y="20" width="200" height="480" rx="10" fill="#1a202c" stroke="#2d3748" strokeWidth="3" />
            
            {/* ESP32 Module Shield */}
            <rect x="120" y="40" width="160" height="120" fill="#cbd5e0" rx="2" />
            <text x="200" y="100" textAnchor="middle" fill="#4a5568" fontSize="16" fontWeight="bold">ESP-WROOM-32</text>
            <rect x="160" y="110" width="80" height="30" fill="#2d3748" rx="2" /> {/* Antenna area placeholder */}

            {/* USB Connector */}
            <rect x="165" y="480" width="70" height="20" fill="#718096" rx="2" />
            <text x="200" y="495" textAnchor="middle" fill="#1a202c" fontSize="10">Micro USB</text>

            {/* Left Header Pins (1-15) */}
            <g transform="translate(100, 170)">
               <PinLabel x={0} y={0} label="EN" type="pwr" />
               <PinLabel x={0} y={20} label="VP (36)" type="adc" />
               <PinLabel x={0} y={40} label="VN (39)" type="adc" />
               <PinLabel x={0} y={60} label="D34" type="adc" />
               <PinLabel x={0} y={80} label="D35" type="adc" />
               <PinLabel x={0} y={100} label="D32" type="touch" />
               <PinLabel x={0} y={120} label="D33" type="touch" />
               <PinLabel x={0} y={140} label="D25" type="adc" />
               <PinLabel x={0} y={160} label="D26" type="adc" />
               <PinLabel x={0} y={180} label="D27" type="touch" />
               <PinLabel x={0} y={200} label="D14" type="touch" />
               <PinLabel x={0} y={220} label="D12" type="touch" />
               <PinLabel x={0} y={240} label="GND" type="gnd" />
               <PinLabel x={0} y={260} label="D13" type="touch" />
               <PinLabel x={0} y={280} label="D2" type="touch" /> {/* Sometimes different */}
            </g>

            {/* Right Header Pins (16-30) */}
            <g transform="translate(300, 170)">
               <PinLabel x={0} y={0} label="D23" type="comm" align="right" />
               <PinLabel x={0} y={20} label="D22" type="comm" align="right" />
               <PinLabel x={0} y={40} label="TX0 (1)" type="comm" align="right" />
               <PinLabel x={0} y={60} label="RX0 (3)" type="comm" align="right" />
               <PinLabel x={0} y={80} label="D21" type="comm" align="right" />
               <PinLabel x={0} y={100} label="GND" type="gnd" align="right" />
               <PinLabel x={0} y={120} label="D19" type="comm" align="right" />
               <PinLabel x={0} y={140} label="D18" type="comm" align="right" />
               <PinLabel x={0} y={160} label="D5" type="comm" align="right" />
               <PinLabel x={0} y={180} label="TX2 (17)" type="comm" align="right" />
               <PinLabel x={0} y={200} label="RX2 (16)" type="comm" align="right" />
               <PinLabel x={0} y={220} label="D4" type="touch" align="right" />
               <PinLabel x={0} y={240} label="D2 (LED)" type="touch" align="right" /> {/* Often D2 is here on 30 pin */}
               <PinLabel x={0} y={260} label="D15" type="touch" align="right" />
               <PinLabel x={0} y={280} label="GND" type="gnd" align="right" />
               <PinLabel x={0} y={300} label="3V3" type="pwr" align="right" /> {/* Added logic for alignment */}
            </g>
             <g transform="translate(300, 150)">
                 <PinLabel x={0} y={320} label="VIN" type="pwr" align="right" />
             </g>
          </svg>

          {/* Legend */}
          <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 flex flex-wrap gap-3 justify-center text-xs mt-4 z-10">
            <div className="flex items-center"><div className="w-3 h-3 bg-red-500/50 rounded mr-1"></div> Power (VIN/3V3)</div>
            <div className="flex items-center"><div className="w-3 h-3 bg-gray-600/50 rounded mr-1"></div> GND</div>
            <div className="flex items-center"><div className="w-3 h-3 bg-blue-500/50 rounded mr-1"></div> GPIO/Comm</div>
            <div className="flex items-center"><div className="w-3 h-3 bg-green-500/50 rounded mr-1"></div> ADC/Input</div>
            <div className="flex items-center"><div className="w-3 h-3 bg-orange-500/50 rounded mr-1"></div> Touch/GPIO</div>
          </div>
        </div>
        
        <div className="bg-yellow-500/10 border border-yellow-500/30 p-5 rounded-xl">
          <h4 className="text-yellow-400 font-bold mb-3 flex items-center text-lg">
            <AlertTriangle className="w-5 h-5 mr-2" /> 重要注意事項
          </h4>
          <ul className="list-disc list-inside text-yellow-200/90 space-y-2">
            <li><strong>Input Only：</strong> GPIO 34, 35, 36, 39 僅支援輸入，不可輸出電壓。</li>
            <li><strong>ADC2 限制：</strong> 開啟 WiFi 時，ADC2 (GPIO 0, 2, 4, 12-15, 25-27) 無法使用類比讀取。</li>
            <li><strong>開機 Strapping Pins：</strong> GPIO 0, 2, 5, 12, 15 影響開機模式，接線時請避免外接下拉/上拉電阻。</li>
          </ul>
        </div>
      </div>
    )
  }
];

// --- 資料：基礎教學內容 (含 circuitType) ---
const basicTutorialsData = [
  {
    id: 'gpio-out',
    title: 'GPIO 數位輸出',
    subtitle: '控制 LED 閃爍 (Blink)',
    difficulty: '入門',
    wokwiId: '', // Default to home
    circuitType: 'led',
    description: `數位輸出是微控制器最基礎的功能。ESP32 的 GPIO 可以輸出高電位 (3.3V) 或低電位 (0V)。本範例將控制內建 LED 閃爍。`,
    circuit: '將 LED 長腳接 GPIO 2，短腳串聯 220Ω 電阻接 GND。',
    code: `
#define LED_PIN 2

void setup() {
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_PIN, HIGH);
  delay(1000);
  digitalWrite(LED_PIN, LOW);
  delay(1000);
}
    `,
    quiz: [
      { question: "ESP32 輸出高電位時電壓為？", options: ["5V", "3.3V", "12V", "1.8V"], answer: 1 },
      { question: "控制 GPIO 輸出的函式？", options: ["digitalWrite()", "pinMode()", "analogRead()", "Serial.begin()"], answer: 1 }
    ]
  },
  {
    id: 'pwm',
    title: 'PWM 類比輸出',
    subtitle: '製作呼吸燈',
    difficulty: '入門',
    wokwiId: '', 
    circuitType: 'led',
    description: `透過 PWM (脈衝寬度調變) 快速切換開關，可以模擬出類比電壓的效果，進而控制 LED 亮度。`,
    circuit: '同上，使用連接到 GPIO 2 的 LED。',
    code: `
const int ledPin = 2;
const int freq = 5000;
const int ledChannel = 0;
const int resolution = 8;

void setup() {
  ledcSetup(ledChannel, freq, resolution);
  ledcAttachPin(ledPin, ledChannel);
}

void loop() {
  for(int i=0; i<=255; i++){ ledcWrite(ledChannel, i); delay(7); }
  for(int i=255; i>=0; i--){ ledcWrite(ledChannel, i); delay(7); }
}
    `,
    quiz: [
      { question: "PWM 的全名是？", options: ["Power Width Management", "Pulse Width Modulation", "Pin Write Mode", "Pulse Wave Motion"], answer: 1 },
      { question: "8-bit 解析度範圍？", options: ["0-100", "0-1023", "0-255", "0-4095"], answer: 2 }
    ]
  },
  {
    id: 'gpio-in',
    title: 'GPIO 數位輸入',
    subtitle: '讀取按鈕狀態',
    difficulty: '基礎',
    wokwiId: '',
    circuitType: 'button',
    description: `學會輸出後，我們需要學會「聽」。使用 INPUT_PULLUP 模式可以簡化電路，不需要外接電阻。`,
    circuit: '按鈕一端接 GPIO 4，另一端接 GND。',
    code: `
#define BTN_PIN 4
void setup() {
  Serial.begin(115200);
  pinMode(BTN_PIN, INPUT_PULLUP);
}
void loop() {
  int state = digitalRead(BTN_PIN);
  if(state == LOW) Serial.println("Pressed!");
  delay(100);
}
    `,
    quiz: [{ question: "INPUT_PULLUP 沒按下時讀到？", options: ["HIGH", "LOW", "Floating", "0V"], answer: 0 }]
  },
  {
    id: 'adc',
    title: 'ADC 類比輸入',
    subtitle: '讀取電位器數值',
    difficulty: '基礎',
    wokwiId: '',
    circuitType: 'pot',
    description: `ESP32 的 ADC 解析度為 12-bit (0-4095)。將電位器接在類比腳位 (如 D34) 可讀取電壓變化。`,
    circuit: '電位器兩端接 3V3 和 GND，中間腳接 GPIO 34。',
    code: `
#define POT_PIN 34
void setup() { Serial.begin(115200); }
void loop() {
  int val = analogRead(POT_PIN);
  Serial.println(val);
  delay(500);
}
    `,
    quiz: [{ question: "ESP32 ADC 解析度？", options: ["8-bit", "10-bit", "12-bit", "16-bit"], answer: 2 }]
  }
];

// --- 資料：專題實作內容 (含 circuitType & requirements) ---
const projectsData = [
  // --- 入門級 (Beginner) ---
  {
    id: 'b1',
    level: 'beginner',
    title: '智慧調光呼吸燈',
    icon: Zap,
    wokwiId: '', 
    circuitType: 'led',
    description: '利用 PWM 技術控制 LED 亮度，模擬人類呼吸的節奏，學習類比輸出的基本原理。',
    components: ['ESP32 DevKit V1', 'LED', '220Ω 電阻'],
    requirements: ['Arduino IDE (2.0+)', '無需額外函式庫', '測試：觀察 LED 亮度'],
    code: `
const int ledPin = 2;
const int pwmChannel = 0;
const int frequency = 5000;
const int resolution = 8;

void setup() {
  ledcSetup(pwmChannel, frequency, resolution);
  ledcAttachPin(ledPin, pwmChannel);
  Serial.begin(115200);
  Serial.println("Start Breathing...");
}

void loop() {
  for(int duty = 0; duty <= 255; duty++) {
    ledcWrite(pwmChannel, duty);
    delay(10);
  }
  for(int duty = 255; duty >= 0; duty--) {
    ledcWrite(pwmChannel, duty);
    delay(10);
  }
  delay(500);
}
    `,
  },
  {
    id: 'b2',
    level: 'beginner',
    title: '簡易溫濕度監控儀',
    icon: Thermometer,
    wokwiId: '', 
    circuitType: 'dht',
    description: '使用 DHT22 感測器讀取環境溫濕度，並透過序列埠顯示數據，是環境監測的基礎。',
    components: ['ESP32 DevKit V1', 'DHT22 感測器', '4.7kΩ 電阻'],
    requirements: ['Arduino IDE', 'Lib: DHT sensor library', 'Lib: Adafruit Unified Sensor', '測試：Serial Monitor'],
    code: `
#include "DHT.h"
#define DHTPIN 4
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  Serial.println("DHT Test Start");
  dht.begin();
}

void loop() {
  delay(2000);
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  if (isnan(h) || isnan(t)) {
    Serial.println("Failed to read DHT!");
    return;
  }
  Serial.print("Humidity: "); Serial.print(h);
  Serial.print("%  Temp: "); Serial.print(t); Serial.println("°C");
}
    `,
  },
  {
    id: 'b3',
    level: 'beginner',
    title: '超音波測距警報器',
    icon: Activity,
    wokwiId: '', 
    circuitType: 'sonar',
    description: '結合 HC-SR04 超音波感測器測量距離，當物體過近時觸發警報。',
    components: ['ESP32 DevKit V1', 'HC-SR04', '蜂鳴器'],
    requirements: ['Arduino IDE', '無需額外函式庫', '測試：Serial Monitor + 聽聲音'],
    code: `
#define TRIG_PIN 5
#define ECHO_PIN 18
#define BUZZER_PIN 19
#define SOUND_SPEED 0.034

void setup() {
  Serial.begin(115200);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);
}

void loop() {
  digitalWrite(TRIG_PIN, LOW); delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  
  long duration = pulseIn(ECHO_PIN, HIGH);
  float distanceCm = duration * SOUND_SPEED / 2;
  
  Serial.print("Dist: "); Serial.println(distanceCm);

  if (distanceCm > 0 && distanceCm < 10) {
    digitalWrite(BUZZER_PIN, HIGH); delay(100);
    digitalWrite(BUZZER_PIN, LOW); delay(100);
  } else {
    digitalWrite(BUZZER_PIN, LOW); delay(500);
  }
}
    `
  },

  // --- 中階級 (Intermediate) ---
  {
    id: 'm1',
    level: 'intermediate',
    title: '網頁控制家電',
    icon: Globe,
    wokwiId: '',
    circuitType: 'relay',
    description: '將 ESP32 變身為 Web Server，透過手機瀏覽器遠端控制繼電器 (Relay) 開關。',
    components: ['ESP32 DevKit V1', '繼電器模組', 'LED (模擬家電)'],
    requirements: ['Arduino IDE', 'WiFi 環境', '測試：手機/電腦瀏覽器'],
    code: `
#include <WiFi.h>
#include <WebServer.h>

const char* ssid = "Wokwi-GUEST";
const char* password = "";
WebServer server(80);
const int relayPin = 2;

void handleRoot() {
  String html = "<h1>ESP32 Web Control</h1><p><a href='/on'><button>ON</button></a> <a href='/off'><button>OFF</button></a></p>";
  server.send(200, "text/html", html);
}

void setup() {
  Serial.begin(115200);
  pinMode(relayPin, OUTPUT);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) delay(500);
  Serial.println(WiFi.localIP());

  server.on("/", handleRoot);
  server.on("/on", []() { digitalWrite(relayPin, HIGH); server.sendHeader("Location","/"); server.send(303); });
  server.on("/off", []() { digitalWrite(relayPin, LOW); server.sendHeader("Location","/"); server.send(303); });
  server.begin();
}

void loop() { server.handleClient(); }
    `
  },
  {
    id: 'm2',
    level: 'intermediate',
    title: '網路校時時鐘',
    icon: Clock,
    wokwiId: '',
    circuitType: 'none',
    description: '連線至 NTP 伺服器獲取精確時間，並顯示於序列埠，永不慢分。',
    components: ['ESP32 DevKit V1', 'WiFi 連線環境'],
    requirements: ['Arduino IDE', 'WiFi 環境', '無需額外函式庫', '測試：Serial Monitor'],
    code: `
#include <WiFi.h>
#include "time.h"
const char* ssid = "Wokwi-GUEST";
const char* password = "";
const char* ntpServer = "pool.ntp.org";

void printLocalTime(){
  struct tm timeinfo;
  if(!getLocalTime(&timeinfo)){ Serial.println("Failed to obtain time"); return; }
  Serial.println(&timeinfo, "%Y/%m/%d %H:%M:%S");
}

void setup(){
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) delay(500);
  configTime(28800, 0, ntpServer);
  printLocalTime();
}

void loop(){ printLocalTime(); delay(1000); }
    `
  },
  {
    id: 'm3',
    level: 'intermediate',
    title: 'Telegram 互動機器人',
    icon: MessageCircle,
    wokwiId: '',
    circuitType: 'led', // reuse led circuit
    description: '取代已終止的 LINE Notify。建立一個 Telegram Bot，透過手機 App 遠端發送指令控制 ESP32 的 LED 開關，並接收狀態回報。',
    components: ['ESP32 DevKit V1', 'LED', '220Ω 電阻'],
    requirements: [
      'Arduino IDE (2.0 以上版本)',
      'Telegram App (需申請 Bot Token)',
      '函式庫：UniversalTelegramBot',
      '函式庫：ArduinoJson',
      '測試方式：手機傳送 /on 或 /off 給機器人'
    ],
    code: `
// 專題：Telegram 互動機器人
// 功能：手機傳送 "/on" 開燈，"/off" 關燈
// 需安裝函式庫：UniversalTelegramBot, ArduinoJson

#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <UniversalTelegramBot.h>
#include <ArduinoJson.h>

const char* ssid = "Wokwi-GUEST";
const char* password = "";

// 請向 Telegram 的 @BotFather 申請 Token
#define BOTtoken "YOUR_BOT_TOKEN_HERE"

const int ledPin = 2;
WiFiClientSecure client;
UniversalTelegramBot bot(BOTtoken, client);
int botRequestDelay = 1000;
unsigned long lastTimeBotRan;

// 處理接收到的訊息
void handleNewMessages(int numNewMessages) {
  for (int i=0; i<numNewMessages; i++) {
    String chat_id = String(bot.messages[i].chat_id);
    String text = bot.messages[i].text;

    if (text == "/start") {
      String welcome = "歡迎使用 ESP32 機器人!\\n";
      welcome += "請輸入 /on 開燈 或 /off 關燈";
      bot.sendMessage(chat_id, welcome, "");
    }
    else if (text == "/on") {
      digitalWrite(ledPin, HIGH);
      bot.sendMessage(chat_id, "LED 已開啟 ✅", "");
    }
    else if (text == "/off") {
      digitalWrite(ledPin, LOW);
      bot.sendMessage(chat_id, "LED 已關閉 ❌", "");
    }
    else {
      bot.sendMessage(chat_id, "無效指令，請輸入 /on 或 /off", "");
    }
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(ledPin, OUTPUT);
  
  // 連接 WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500); Serial.print(".");
  }
  Serial.println("\\nWiFi Connected!");

  // Telegram 使用 HTTPS，需設為不驗證憑證 (方便開發)
  client.setInsecure();
}

void loop() {
  // 檢查是否有新訊息 (Pollling)
  if (millis() > lastTimeBotRan + botRequestDelay) {
    int numNewMessages = bot.getUpdates(bot.last_message_received + 1);
    while(numNewMessages) {
      handleNewMessages(numNewMessages);
      numNewMessages = bot.getUpdates(bot.last_message_received + 1);
    }
    lastTimeBotRan = millis();
  }
}
    `
  },

  // --- 進階級 (Advanced) ---
  {
    id: 'a1',
    level: 'advanced',
    title: 'ESP-NOW 遠端遙控',
    icon: Radio,
    wokwiId: '',
    circuitType: 'none',
    description: '利用 ESP-NOW 協定進行「多對一」或「一對一」的快速通訊，無需連接 WiFi 路由器。',
    components: ['ESP32 DevKit V1 (x2)'],
    requirements: ['Arduino IDE', '需兩塊開發板', '需 MAC Address', '測試：Serial Monitor'],
    code: `
#include <esp_now.h>
#include <WiFi.h>
uint8_t broadcastAddress[] = {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF};
typedef struct struct_message { char a[32]; int b; } struct_message;
struct_message myData;
esp_now_peer_info_t peerInfo;

void OnDataSent(const uint8_t *mac_addr, esp_now_send_status_t status) {
  Serial.println(status == ESP_NOW_SEND_SUCCESS ? "Success" : "Fail");
}

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  if (esp_now_init() != ESP_OK) return;
  esp_now_register_send_cb(OnDataSent);
  memcpy(peerInfo.peer_addr, broadcastAddress, 6);
  peerInfo.channel = 0; peerInfo.encrypt = false;
  esp_now_add_peer(&peerInfo);
}

void loop() {
  strcpy(myData.a, "Hello"); myData.b = random(1,20);
  esp_now_send(broadcastAddress, (uint8_t *) &myData, sizeof(myData));
  delay(2000);
}
    `
  },
  {
    id: 'a2',
    level: 'advanced',
    title: '即時影像串流',
    icon: Video,
    wokwiId: '',
    circuitType: 'none',
    description: '使用 ESP32-CAM 模組架設視訊監控伺服器 (Camera Web Server)。',
    components: ['ESP32-CAM 模組', 'FTDI 下載器'],
    requirements: ['Arduino IDE', 'Board: AI Thinker ESP32-CAM', '測試：瀏覽器'],
    code: `
#include "esp_camera.h"
#include <WiFi.h>
#define CAMERA_MODEL_AI_THINKER
// ... (因篇幅省略詳細 Pin 定義, 請使用 CameraWebServer 範例) ...
void setup() {
  Serial.begin(115200);
  // Camera Init Logic...
  // WiFi Connect Logic...
  Serial.println("Camera Ready!");
}
void loop() { delay(10000); }
    `
  },
  {
    id: 'a3',
    level: 'advanced',
    title: '雙核心多工處理',
    icon: Box,
    wokwiId: '',
    circuitType: 'none',
    description: '發揮 ESP32 雙核心優勢，將繁重的計算與網路傳輸分配到不同核心。',
    components: ['ESP32 DevKit V1'],
    requirements: ['Arduino IDE', '無需額外硬體', '測試：Serial Monitor'],
    code: `
TaskHandle_t Task1;
void Task1code( void * pvParameters ){
  for(;;){ Serial.print("Core 0: "); Serial.println(xPortGetCoreID()); delay(1000); } 
}
void setup() {
  Serial.begin(115200);
  xTaskCreatePinnedToCore(Task1code, "Task1", 10000, NULL, 1, &Task1, 0);
}
void loop() {
  Serial.print("Core 1: "); Serial.println(xPortGetCoreID()); delay(1000);
}
    `
  }
];

// --- 元件：測驗區塊 ---
const QuizSection = ({ quizData }) => {
  const [userAnswers, setUserAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  if (!quizData || quizData.length === 0) return null;

  const handleSelect = (qIndex, optionIndex) => {
    setUserAnswers(prev => ({...prev, [qIndex]: optionIndex}));
    setShowResult(false); // Reset result if user changes answer
  };

  const calculateScore = () => {
    let correct = 0;
    quizData.forEach((q, i) => {
      if (userAnswers[i] === q.answer) correct++;
    });
    return correct;
  };

  return (
    <div className="mt-12 bg-slate-800 rounded-xl border border-slate-700 p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center">
        <HelpCircle className="w-6 h-6 mr-2 text-orange-400" />
        課後小測驗
      </h3>
      
      <div className="space-y-8">
        {quizData.map((q, qIdx) => (
          <div key={qIdx} className="space-y-3">
            <p className="text-slate-200 font-medium text-lg">{qIdx + 1}. {q.question}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {q.options.map((opt, oIdx) => (
                <button
                  key={oIdx}
                  onClick={() => handleSelect(qIdx, oIdx)}
                  className={`p-3 rounded-lg text-left text-sm transition-all border ${
                    userAnswers[qIdx] === oIdx
                      ? 'bg-cyan-600/20 border-cyan-500 text-cyan-300'
                      : 'bg-slate-700/50 border-transparent text-slate-400 hover:bg-slate-700'
                  } ${
                    showResult && userAnswers[qIdx] === oIdx
                      ? (oIdx === q.answer ? 'bg-green-500/20 border-green-500' : 'bg-red-500/20 border-red-500')
                      : ''
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {showResult && userAnswers[qIdx] !== q.answer && (
               <p className="text-red-400 text-sm flex items-center">
                 <X className="w-3 h-3 mr-1" /> 正確答案是：{q.options[q.answer]}
               </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-700 flex items-center justify-between">
        <div className="text-slate-400 text-sm">
          {showResult ? `得分：${calculateScore()} / ${quizData.length}` : '請完成所有題目'}
        </div>
        <button
          onClick={() => setShowResult(true)}
          disabled={Object.keys(userAnswers).length < quizData.length}
          className={`px-6 py-2 rounded-lg font-bold transition-all flex items-center ${
            Object.keys(userAnswers).length < quizData.length
              ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg'
          }`}
        >
          <Award className="w-4 h-4 mr-2" />
          送出答案
        </button>
      </div>
    </div>
  );
};

// --- 元件：程式碼區塊 ---
const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative group rounded-lg overflow-hidden bg-[#1e1e1e] border border-slate-700 shadow-lg font-mono text-sm my-4">
      <div className="flex justify-between items-center px-4 py-2 bg-[#2d2d2d] border-b border-slate-700">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <button onClick={handleCopy} className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-xs">
          {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />} {copied ? "已複製" : "複製"}
        </button>
      </div>
      <div className="p-4 overflow-x-auto"><pre className="text-slate-300"><code>{code.trim()}</code></pre></div>
    </div>
  );
};

// --- 元件：基礎教學頁面 (Updated) ---
const BasicTutorials = ({ launchSimulator }) => {
  const [activeTab, setActiveTab] = useState(0);
  const activeTutorial = basicTutorialsData[activeTab];

  return (
    <div className="min-h-screen bg-slate-900 pt-16 flex flex-col md:flex-row">
      <aside className="w-full md:w-80 bg-slate-800/50 border-r border-slate-700 overflow-y-auto md:h-[calc(100vh-4rem)] md:sticky md:top-16">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white flex items-center mb-6"><BookOpen className="w-5 h-5 mr-2 text-cyan-400" />基礎課程</h2>
          <div className="space-y-2">
            {basicTutorialsData.map((tutorial, index) => (
              <button key={tutorial.id} onClick={() => setActiveTab(index)} className={`w-full text-left px-4 py-3 rounded-lg transition-all border flex items-center justify-between ${activeTab === index ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300' : 'bg-transparent border-transparent text-slate-400 hover:bg-slate-700'}`}>
                <span className="font-medium">{tutorial.title}</span>{activeTab === index && <ChevronRight className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 pb-8 border-b border-slate-700">
            <h1 className="text-3xl font-bold text-white mb-2">{activeTutorial.title}</h1>
            <p className="text-xl text-slate-400">{activeTutorial.subtitle}</p>
          </div>

          <div className="space-y-10">
            <section>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center"><BookOpen className="w-4 h-4 mr-2 text-blue-400"/>觀念解說</h3>
              <p className="text-slate-300 leading-relaxed">{activeTutorial.description}</p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Activity className="w-4 h-4 mr-2 text-orange-400"/>電路連接圖
              </h3>
              {/* 使用新的 CircuitDiagram 元件 */}
              <CircuitDiagram type={activeTutorial.circuitType} />
              <p className="mt-4 text-slate-400 text-sm flex items-start">
                <ArrowRight className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                {activeTutorial.circuit}
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center"><Code className="w-4 h-4 mr-2 text-green-400"/>程式碼範例</h3>
              <CodeBlock code={activeTutorial.code} />
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => launchSimulator(activeTutorial.wokwiId)}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center"
                >
                  <Play className="w-4 h-4 mr-2" /> 在線上模擬器中執行
                </button>
              </div>
            </section>

            {/* 新增測驗區域 */}
            {activeTutorial.quiz && <QuizSection quizData={activeTutorial.quiz} />}
          </div>
        </div>
      </main>
    </div>
  );
};

// --- 元件：專題實作實驗室 (Updated) ---
const ProjectsLab = ({ launchSimulator }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');

  const levels = {
    beginner: { label: '入門級', color: 'text-green-400', bg: 'bg-green-500/10' },
    intermediate: { label: '中階級', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    advanced: { label: '進階級', color: 'text-red-400', bg: 'bg-red-500/10' }
  };

  const filteredProjects = filter === 'all' ? projectsData : projectsData.filter(p => p.level === filter);

  return (
    <div className="min-h-screen bg-slate-900 pt-16 flex flex-col md:flex-row">
      <aside className={`w-full md:w-80 bg-slate-800/50 border-r border-slate-700 overflow-y-auto md:h-[calc(100vh-4rem)] md:sticky md:top-16 ${selectedProject ? 'hidden md:block' : 'block'}`}>
        <div className="p-6">
          <h2 className="text-xl font-bold text-white flex items-center mb-6"><Zap className="w-5 h-5 mr-2 text-cyan-400" />專題實驗室</h2>
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            {['all', 'beginner', 'intermediate', 'advanced'].map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${filter === f ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}>{f === 'all' ? '全部' : levels[f].label}</button>
            ))}
          </div>
          <div className="space-y-3">
            {filteredProjects.map((project) => (
              <button key={project.id} onClick={() => setSelectedProject(project)} className={`w-full text-left p-4 rounded-xl transition-all border flex flex-col gap-2 ${selectedProject?.id === project.id ? 'bg-slate-700 border-cyan-500/50' : 'bg-slate-800 border-slate-700 hover:bg-slate-700'}`}>
                <div className="flex items-center justify-between w-full">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${levels[project.level].bg} ${levels[project.level].color}`}>{levels[project.level].label}</span>
                  <project.icon className="w-4 h-4 text-slate-500" />
                </div>
                <span className="font-bold text-slate-200">{project.title}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      <main className={`flex-1 overflow-y-auto ${!selectedProject ? 'hidden md:block' : 'block'}`}>
        {selectedProject ? (
          <div className="p-6 md:p-10 max-w-5xl mx-auto animate-fade-in">
            <button onClick={() => setSelectedProject(null)} className="md:hidden mb-4 text-slate-400">← 返回列表</button>
            <div className="mb-8 border-b border-slate-700 pb-8">
              <h1 className="text-3xl font-bold text-white mb-4 flex items-center"><selectedProject.icon className="w-8 h-8 mr-4 text-cyan-400" />{selectedProject.title}</h1>
              <p className="text-xl text-slate-300">{selectedProject.description}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-8">
                <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Box className="w-5 h-5 mr-2 text-blue-400" />
                    所需材料
                  </h3>
                  <ul className="space-y-3">
                    {selectedProject.components.map((comp, idx) => (
                      <li key={idx} className="flex items-start text-slate-300 text-sm">
                        <CheckCircle className="w-4 h-4 text-slate-500 mr-2 mt-0.5 shrink-0" />
                        {comp}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* 軟體與環境需求區塊 */}
                {selectedProject.requirements && (
                  <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                      <Terminal className="w-5 h-5 mr-2 text-pink-400" />
                      軟體與環境需求
                    </h3>
                    <ul className="space-y-3">
                      {selectedProject.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start text-slate-300 text-sm">
                          <CheckCircle className="w-4 h-4 text-slate-500 mr-2 mt-0.5 shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-xl border border-purple-500/30 p-6 text-center">
                  <h3 className="text-lg font-bold text-white mb-2">準備好測試了嗎？</h3>
                  <button 
                    onClick={() => launchSimulator(selectedProject.wokwiId)}
                    className="w-full py-3 rounded-lg bg-white text-purple-900 font-bold hover:bg-purple-50 transition-colors flex items-center justify-center mt-4"
                  >
                    <Play className="w-4 h-4 mr-2" /> 開啟 Wokwi 模擬器
                  </button>
                </div>
              </div>
              <div className="lg:col-span-2 space-y-8">
                {/* SVG 電路圖區域 */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Activity className="w-6 h-6 mr-2 text-orange-400" />
                    電路連接圖
                  </h3>
                  <CircuitDiagram type={selectedProject.circuitType} />
                </div>

                <div>
                   <h3 className="text-xl font-bold text-white mb-4 flex items-center"><Code className="w-6 h-6 mr-2 text-green-400" />程式碼</h3>
                   <CodeBlock code={selectedProject.code} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <h2 className="text-2xl font-bold text-white">請選擇一個專題</h2>
          </div>
        )}
      </main>
    </div>
  );
};

// --- 元件：線上模擬器 (Updated) ---
const Simulator = ({ initialProjectId }) => {
  // 若沒有指定專案 ID，則預設前往 Wokwi 首頁
  const [projectUrl, setProjectUrl] = useState(
    initialProjectId 
      ? `https://wokwi.com/projects/${initialProjectId}/embed` 
      : 'https://wokwi.com/'
  );
  
  // 當傳入的 ID 改變時更新 URL
  useEffect(() => {
    if(initialProjectId) {
      setProjectUrl(`https://wokwi.com/projects/${initialProjectId}/embed`);
    } else {
      setProjectUrl('https://wokwi.com/');
    }
  }, [initialProjectId]);

  return (
    <div className="min-h-screen bg-[#121212] pt-16 flex flex-col h-screen">
      <div className="h-14 bg-[#1e1e1e] border-b border-[#333] flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center text-slate-300">
           <Cpu className="w-5 h-5 mr-2 text-cyan-500" />
           <span className="font-bold">Online Simulator</span>
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="w-16 bg-[#181818] border-r border-[#333] flex flex-col items-center py-4 space-y-4 shrink-0">
          <div className="p-2 rounded-lg bg-green-600 text-white"><Play className="w-5 h-5" /></div>
        </div>
        <div className="flex-1 relative bg-black">
          <iframe src={projectUrl} className="w-full h-full border-0" title="Wokwi Simulator" allow="autoplay"></iframe>
        </div>
      </div>
    </div>
  );
};

// --- 主應用元件 (Updated) ---
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSimulatorId, setCurrentSimulatorId] = useState(null);

  // 核心功能：跳轉至模擬器並載入專案
  const launchSimulator = (wokwiId) => {
    setCurrentSimulatorId(wokwiId || null); // 若無 ID 則設為 null，以觸發 Simulator 元件的預設首頁
    setCurrentPage('simulator');
    setMobileMenuOpen(false);
  };

  const Navbar = ({ setCurrentPage, mobileMenuOpen, setMobileMenuOpen }) => {
    const navItems = [
      { id: 'home', label: '首頁' },
      { id: 'start', label: '快速入門' },
      { id: 'basics', label: '基礎教學' },
      { id: 'projects', label: '專題實作' },
      { id: 'simulator', label: '線上模擬' },
    ];
    return (
      <nav className="bg-slate-900/90 backdrop-blur-md border-b border-slate-700 fixed w-full z-50 top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center cursor-pointer group" onClick={() => setCurrentPage('home')}>
              <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 p-2 rounded-lg"><Cpu className="h-6 w-6 text-white" /></div>
              <span className="ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">ESP32教學與實驗室<span className="text-slate-100 font-medium ml-1 text-base">(南大附中)</span></span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <button key={item.id} onClick={() => setCurrentPage(item.id)} className="text-slate-300 hover:text-cyan-400 hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium transition-colors">{item.label}</button>
                ))}
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700">{mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-800 border-b border-slate-700 px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => { setCurrentPage(item.id); setMobileMenuOpen(false); }} className="text-slate-300 hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium w-full text-left">{item.label}</button>
            ))}
          </div>
        )}
      </nav>
    );
  };

  const HeroSection = () => (
    <div className="relative overflow-hidden bg-slate-900 pt-16">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">掌握物聯網開發，<br /><span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">從這裡開始。</span></h1>
          <div className="mt-10 flex justify-center gap-4">
            <button onClick={() => setCurrentPage('start')} className="px-8 py-3 rounded-lg border border-slate-600 text-slate-300 font-medium text-lg hover:bg-slate-800 transition-all flex items-center"><BookOpen className="w-5 h-5 mr-2" /> 快速入門</button>
            <button onClick={() => setCurrentPage('projects')} className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-lg hover:shadow-lg transition-all flex items-center"><Zap className="w-5 h-5 mr-2" /> 開始實作專題</button>
          </div>
       </div>
    </div>
  );

  const GettingStarted = () => {
    const [activeTab, setActiveTab] = useState(0);
    const activeContent = gettingStartedData[activeTab];
    return (
      <div className="min-h-screen bg-slate-900 pt-16 flex flex-col md:flex-row">
        <aside className="w-full md:w-80 bg-slate-800/50 border-r border-slate-700 p-6">
          <div className="space-y-2">{gettingStartedData.map((item, index) => (<button key={item.id} onClick={() => setActiveTab(index)} className={`w-full text-left px-4 py-3 rounded-lg transition-all border ${activeTab === index ? 'text-cyan-300 border-cyan-500/50' : 'text-slate-400 border-transparent'}`}>{item.title}</button>))}</div>
        </aside>
        <main className="flex-1 p-6 md:p-10"><div className="max-w-4xl mx-auto animate-fade-in">{activeContent.content}</div></main>
      </div>
    );
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home': return <HeroSection />;
      case 'start': return <GettingStarted />;
      case 'basics': return <BasicTutorials launchSimulator={launchSimulator} />;
      case 'projects': return <ProjectsLab launchSimulator={launchSimulator} />;
      case 'simulator': return <Simulator initialProjectId={currentSimulatorId} />;
      default: return <HeroSection />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar setCurrentPage={setCurrentPage} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      
      <main>
        {renderContent()}
      </main>

      <footer className="bg-slate-950 py-12 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                ESP32教學與實驗室(南大附中)
              </span>
              <p className="text-slate-500 text-sm mt-2">
                打造最友善的 IoT 學習體驗
              </p>
            </div>
            <div className="flex space-x-6 text-slate-400">
              <a href="#" className="hover:text-white transition-colors">關於我們</a>
              <a href="#" className="hover:text-white transition-colors">隱私權政策</a>
              <a href="#" className="hover:text-white transition-colors">聯絡資訊</a>
            </div>
          </div>
          <div className="mt-8 text-center text-slate-600 text-sm">
            &copy; 2026 ESP32教學與實驗室(南大附中). All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;