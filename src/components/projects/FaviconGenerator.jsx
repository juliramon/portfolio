"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, Download, Copy, Check, X, Sparkles, FileCode } from 'lucide-react';

const loadJSZip = () => {
  return new Promise((resolve, reject) => {
    if (window.JSZip) return resolve(window.JSZip);
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
    script.onload = () => resolve(window.JSZip);
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

const FAVICON_SIZES = [
  { name: 'favicon-16x16.png', size: 16, desc: 'Pestaña navegador' },
  { name: 'favicon-32x32.png', size: 32, desc: 'Pestaña en HiDPI' },
  { name: 'favicon-48x48.png', size: 48, desc: 'Escritorio Windows' },
  { name: 'apple-touch-icon.png', size: 180, desc: 'iOS / iPadOS' },
  { name: 'android-chrome-192x192.png', size: 192, desc: 'Android Chrome' },
  { name: 'android-chrome-512x512.png', size: 512, desc: 'PWA / splash' },
  { name: 'mstile-150x150.png', size: 150, desc: 'Windows tile' },
];

// Convert dataURL to Blob
const dataURLToBlob = (dataURL) => {
  const [header, data] = dataURL.split(',');
  const mime = header.match(/:(.*?);/)[1];
  const binary = atob(data);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
};

// Generate a single variant as dataURL (synchronous, reliable)
const generateVariantSync = (img, size, background) => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  if (background && background !== 'transparent') {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, size, size);
  }

  const ratio = Math.min(size / img.width, size / img.height);
  const w = img.width * ratio;
  const h = img.height * ratio;
  const x = (size - w) / 2;
  const y = (size - h) / 2;
  ctx.drawImage(img, x, y, w, h);

  return canvas.toDataURL('image/png');
};

// Build a multi-image .ico file (16, 32, 48)
const generateIco = (img, background) => {
  const sizes = [16, 32, 48];
  const pngBuffers = sizes.map((s) => {
    const dataURL = generateVariantSync(img, s, background);
    const blob = dataURLToBlob(dataURL);
    return blob;
  });

  return Promise.all(pngBuffers.map((b) => b.arrayBuffer())).then((buffers) => {
    const headerSize = 6;
    const entrySize = 16;
    const totalHeader = headerSize + entrySize * sizes.length;
    const totalSize = totalHeader + buffers.reduce((acc, b) => acc + b.byteLength, 0);

    const buffer = new ArrayBuffer(totalSize);
    const view = new DataView(buffer);
    const bytes = new Uint8Array(buffer);

    view.setUint16(0, 0, true);
    view.setUint16(2, 1, true);
    view.setUint16(4, sizes.length, true);

    let offset = totalHeader;
    sizes.forEach((s, i) => {
      const entryOffset = headerSize + i * entrySize;
      const pngBuffer = buffers[i];
      view.setUint8(entryOffset + 0, s === 256 ? 0 : s);
      view.setUint8(entryOffset + 1, s === 256 ? 0 : s);
      view.setUint8(entryOffset + 2, 0);
      view.setUint8(entryOffset + 3, 0);
      view.setUint16(entryOffset + 4, 1, true);
      view.setUint16(entryOffset + 6, 32, true);
      view.setUint32(entryOffset + 8, pngBuffer.byteLength, true);
      view.setUint32(entryOffset + 12, offset, true);
      bytes.set(new Uint8Array(pngBuffer), offset);
      offset += pngBuffer.byteLength;
    });

    return new Blob([buffer], { type: 'image/x-icon' });
  });
};

export default function FaviconGenerator() {
  const [sourceDataURL, setSourceDataURL] = useState(null);
  const [sourceDims, setSourceDims] = useState(null);
  const [variants, setVariants] = useState([]);
  const [icoBlob, setIcoBlob] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedManifest, setCopiedManifest] = useState(false);
  const [bgColor, setBgColor] = useState('transparent');
  const [siteName, setSiteName] = useState('Mi Sitio');
  const [shortName, setShortName] = useState('Mi Sitio');
  const [themeColor, setThemeColor] = useState('#0ea5e9');
  const [manifestBg, setManifestBg] = useState('#ffffff');
  const [display, setDisplay] = useState('standalone');
  const fileInputRef = useRef(null);

  const processFromDataURL = useCallback((dataURL, bg) => {
    setIsProcessing(true);
    const img = new Image();
    img.onload = async () => {
      setSourceDims({ width: img.width, height: img.height });

      const newVariants = FAVICON_SIZES.map((v) => ({
        ...v,
        dataURL: generateVariantSync(img, v.size, bg),
      }));
      setVariants(newVariants);

      try {
        const ico = await generateIco(img, bg);
        setIcoBlob(ico);
      } catch (e) {
        console.error('ICO generation failed', e);
      }

      setIsProcessing(false);
    };
    img.onerror = () => {
      alert('No se pudo cargar la imagen.');
      setIsProcessing(false);
    };
    img.src = dataURL;
  }, []);

  // Reprocess when bg changes
  useEffect(() => {
    if (sourceDataURL) {
      processFromDataURL(sourceDataURL, bgColor);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bgColor]);

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Por favor sube un archivo de imagen (PNG, JPG, SVG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataURL = e.target.result;
      setSourceDataURL(dataURL);
      processFromDataURL(dataURL, bgColor);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const downloadDataURL = (dataURL, name) => {
    const blob = dataURLToBlob(dataURL);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadBlob = (blob, name) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const htmlSnippet = `<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="msapplication-TileColor" content="${themeColor}">
<meta name="msapplication-config" content="/browserconfig.xml">
<meta name="theme-color" content="${themeColor}">`;

  const manifestObject = {
    name: siteName,
    short_name: shortName || siteName,
    icons: [
      { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    theme_color: themeColor,
    background_color: manifestBg,
    display: display,
    start_url: '/',
  };
  const manifestJSON = JSON.stringify(manifestObject, null, 2);

  const downloadAll = async () => {
    try {
      const JSZip = await loadJSZip();
      const zip = new JSZip();

      for (const v of variants) {
        zip.file(v.name, dataURLToBlob(v.dataURL));
      }
      if (icoBlob) zip.file('favicon.ico', icoBlob);

      zip.file('site.webmanifest', manifestJSON);

      const browserconfig = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="/mstile-150x150.png"/>
      <TileColor>${themeColor}</TileColor>
    </tile>
  </msapplication>
</browserconfig>`;
      zip.file('browserconfig.xml', browserconfig);
      zip.file('README.txt', `Favicons generados\n\nCopia los archivos a la raíz de tu sitio web y añade el siguiente snippet HTML al <head>:\n\n${htmlSnippet}`);

      const content = await zip.generateAsync({ type: 'blob' });
      downloadBlob(content, 'favicons.zip');
    } catch (err) {
      alert('Error al generar el ZIP: ' + err.message);
    }
  };

  const reset = () => {
    setSourceDataURL(null);
    setSourceDims(null);
    setVariants([]);
    setIcoBlob(null);
  };

  const copyHtml = async () => {
    try {
      await navigator.clipboard.writeText(htmlSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      const ta = document.createElement('textarea');
      ta.value = htmlSnippet;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const copyManifest = async () => {
    try {
      await navigator.clipboard.writeText(manifestJSON);
      setCopiedManifest(true);
      setTimeout(() => setCopiedManifest(false), 2000);
    } catch (err) {
      const ta = document.createElement('textarea');
      ta.value = manifestJSON;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopiedManifest(true);
      setTimeout(() => setCopiedManifest(false), 2000);
    }
  };

  const downloadManifest = () => {
    const blob = new Blob([manifestJSON], { type: 'application/manifest+json' });
    downloadBlob(blob, 'site.webmanifest');
  };

  const checkerboardStyle = {
    backgroundImage:
      'linear-gradient(45deg, #e2e8f0 25%, transparent 25%), linear-gradient(-45deg, #e2e8f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e2e8f0 75%), linear-gradient(-45deg, transparent 75%, #e2e8f0 75%)',
    backgroundSize: '12px 12px',
    backgroundPosition: '0 0, 0 6px, 6px -6px, -6px 0px',
    backgroundColor: '#f8fafc',
  };

  const variant16 = variants.find((v) => v.size === 16);
  const variant32 = variants.find((v) => v.size === 32);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur border border-slate-200 mb-4">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span className="text-sm font-medium text-slate-700">Generador todo-en-uno</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-indigo-700 to-blue-600 bg-clip-text text-transparent mb-3">
            Generador de Favicons
          </h1>
          <p className="text-slate-600 text-lg">
            Sube una imagen y obtén todas las variantes que necesita una web moderna
          </p>
        </div>

        {!sourceDataURL && (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-indigo-500 bg-indigo-50 scale-[1.01]'
                : 'border-slate-300 bg-white/70 hover:border-indigo-400 hover:bg-white'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
            />
            <div className="flex flex-col items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${
                isDragging ? 'bg-indigo-500 text-white' : 'bg-indigo-100 text-indigo-600'
              }`}>
                <Upload className="w-8 h-8" />
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-800 mb-1">
                  Arrastra una imagen aquí o haz clic para seleccionar
                </p>
                <p className="text-sm text-slate-500">
                  PNG, JPG, SVG o WebP · Recomendado: 512×512 o superior, cuadrada
                </p>
              </div>
            </div>
          </div>
        )}

        {isProcessing && variants.length === 0 && (
          <div className="bg-white/80 backdrop-blur rounded-2xl border border-slate-200 p-8 text-center">
            <div className="inline-block w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-3"></div>
            <p className="text-slate-700 font-medium">Generando variantes…</p>
          </div>
        )}

        {sourceDataURL && variants.length > 0 && (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur rounded-2xl border border-slate-200 p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img src={sourceDataURL} alt="Origen" className="max-w-full max-h-full object-contain" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">Imagen original</p>
                    <p className="font-semibold text-slate-800">
                      {sourceDims?.width} × {sourceDims?.height}px
                    </p>
                    <button
                      onClick={reset}
                      className="text-sm text-indigo-600 hover:text-indigo-700 font-medium mt-1 inline-flex items-center gap-1"
                    >
                      <X className="w-3.5 h-3.5" /> Cambiar imagen
                    </button>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 md:border-l md:pl-6 md:border-slate-200">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                      Nombre del sitio
                    </label>
                    <input
                      type="text"
                      value={siteName}
                      onChange={(e) => setSiteName(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                      Color tema
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={themeColor}
                        onChange={(e) => setThemeColor(e.target.value)}
                        className="w-10 h-9 rounded-lg border border-slate-200 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={themeColor}
                        onChange={(e) => setThemeColor(e.target.value)}
                        className="flex-1 px-2 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                      Fondo del icono
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setBgColor('transparent')}
                        className={`flex-1 px-2 py-2 text-xs rounded-lg border transition ${
                          bgColor === 'transparent'
                            ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        Transparente
                      </button>
                      <input
                        type="color"
                        value={bgColor === 'transparent' ? '#ffffff' : bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-10 h-9 rounded-lg border border-slate-200 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-2xl border border-slate-200 p-6">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
                Vista previa en navegador
              </h2>
              <div className="bg-slate-200 rounded-t-lg p-2 inline-flex items-center gap-2 max-w-full">
                <div className="flex gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                </div>
                <div className="bg-white rounded px-3 py-1.5 flex items-center gap-2 text-xs text-slate-700 max-w-xs">
                  {variant16 && (
                    <img
                      src={variant16.dataURL}
                      alt=""
                      width={16}
                      height={16}
                      className="flex-shrink-0"
                    />
                  )}
                  <span className="truncate">{siteName}</span>
                  <X className="w-3 h-3 text-slate-400 flex-shrink-0" />
                </div>
              </div>
              {variant32 && (
                <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
                  <span>Tamaño real:</span>
                  <img src={variant16.dataURL} alt="16px" width={16} height={16} />
                  <span>16px</span>
                  <img src={variant32.dataURL} alt="32px" width={32} height={32} />
                  <span>32px</span>
                </div>
              )}
            </div>

            <div className="bg-white/80 backdrop-blur rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-800">
                  Variantes generadas
                </h2>
                <button
                  onClick={downloadAll}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-indigo-700 hover:to-blue-700 transition shadow-sm hover:shadow-md"
                >
                  <Download className="w-4 h-4" />
                  Descargar todo (ZIP)
                </button>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {icoBlob && variant32 && (
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-3 hover:shadow-md transition">
                    <div
                      className="aspect-square rounded-lg flex items-center justify-center mb-2 relative overflow-hidden"
                      style={checkerboardStyle}
                    >
                      <img
                        src={variant32.dataURL}
                        alt="favicon.ico"
                        className="object-contain"
                        style={{ width: '60%', height: '60%' }}
                      />
                      <span className="absolute top-1 right-1 text-[10px] font-bold bg-amber-500 text-white px-1.5 py-0.5 rounded">
                        ICO
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800 truncate">favicon.ico</p>
                    <p className="text-[10px] text-slate-500 mb-2">Multi-resolución</p>
                    <button
                      onClick={() => downloadBlob(icoBlob, 'favicon.ico')}
                      className="w-full text-xs py-1.5 bg-white hover:bg-amber-100 border border-amber-200 text-amber-700 rounded font-medium transition flex items-center justify-center gap-1"
                    >
                      <Download className="w-3 h-3" /> Descargar
                    </button>
                  </div>
                )}

                {variants.map((v) => (
                  <div
                    key={v.name}
                    className="bg-white border border-slate-200 rounded-xl p-3 hover:shadow-md hover:border-indigo-200 transition"
                  >
                    <div
                      className="aspect-square rounded-lg flex items-center justify-center mb-2 overflow-hidden"
                      style={checkerboardStyle}
                    >
                      <img
                        src={v.dataURL}
                        alt={v.name}
                        className="object-contain"
                        style={{
                          width: v.size <= 48 ? `${v.size}px` : '80%',
                          height: v.size <= 48 ? `${v.size}px` : '80%',
                          imageRendering: v.size <= 32 ? 'pixelated' : 'auto',
                        }}
                      />
                    </div>
                    <p className="text-xs font-semibold text-slate-800 truncate">
                      {v.size}×{v.size}
                    </p>
                    <p className="text-[10px] text-slate-500 mb-2 truncate" title={v.desc}>
                      {v.desc}
                    </p>
                    <button
                      onClick={() => downloadDataURL(v.dataURL, v.name)}
                      className="w-full text-xs py-1.5 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-slate-700 hover:text-indigo-700 rounded font-medium transition flex items-center justify-center gap-1"
                    >
                      <Download className="w-3 h-3" /> Descargar
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-slate-400" />
                  <h2 className="text-sm font-semibold text-slate-200">
                    Código HTML para tu &lt;head&gt;
                  </h2>
                </div>
                <button
                  onClick={copyHtml}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition ${
                    copied
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> ¡Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copiar
                    </>
                  )}
                </button>
              </div>
              <pre className="p-6 text-xs text-slate-300 overflow-x-auto leading-relaxed">
                <code>{htmlSnippet}</code>
              </pre>
            </div>

            {/* Web App Manifest */}
            <div className="bg-white/80 backdrop-blur rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">site.webmanifest</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Configuración de la PWA para Android, Chrome y otros navegadores compatibles
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Short name
                  </label>
                  <input
                    type="text"
                    value={shortName}
                    onChange={(e) => setShortName(e.target.value)}
                    placeholder={siteName}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Background color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={manifestBg}
                      onChange={(e) => setManifestBg(e.target.value)}
                      className="w-10 h-9 rounded-lg border border-slate-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={manifestBg}
                      onChange={(e) => setManifestBg(e.target.value)}
                      className="flex-1 px-2 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2 lg:col-span-2">
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Display mode
                  </label>
                  <div className="grid grid-cols-4 gap-1">
                    {['standalone', 'fullscreen', 'minimal-ui', 'browser'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setDisplay(opt)}
                        className={`px-2 py-2 text-xs rounded-lg border transition ${
                          display === opt
                            ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-medium'
                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-mono text-slate-400">site.webmanifest</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyManifest}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition ${
                        copiedManifest
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                      }`}
                    >
                      {copiedManifest ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> ¡Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copiar
                        </>
                      )}
                    </button>
                    <button
                      onClick={downloadManifest}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700 transition"
                    >
                      <Download className="w-3.5 h-3.5" /> Descargar
                    </button>
                  </div>
                </div>
                <pre className="p-5 text-xs text-slate-300 overflow-x-auto leading-relaxed">
                  <code>{manifestJSON}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-slate-400 mt-8">
          Procesamiento 100% en tu navegador · Tu imagen no se sube a ningún servidor
        </p>
      </div>
    </div>
  );
}
