"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, Download, Copy, Check, X, FileCode } from 'lucide-react';

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
  { name: 'favicon-16x16.png', size: 16, desc: 'Browser tab' },
  { name: 'favicon-32x32.png', size: 32, desc: 'HiDPI browser tab' },
  { name: 'favicon-48x48.png', size: 48, desc: 'Windows desktop' },
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
  const [siteName, setSiteName] = useState('My Site');
  const [shortName, setShortName] = useState('My Site');
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
      alert('The image could not be loaded.');
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
      alert('Please upload an image file (PNG, JPG, SVG, WebP).');
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
      zip.file('README.txt', `Generated favicons\n\nCopy the files to the root of your website and add this HTML snippet to the <head>:\n\n${htmlSnippet}`);

      const content = await zip.generateAsync({ type: 'blob' });
      downloadBlob(content, 'favicons.zip');
    } catch (err) {
      alert('Could not generate the ZIP: ' + err.message);
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

  // Transparency grid; reads the theme tokens so it follows light/dark mode
  const checkerboardStyle = {
    backgroundImage:
      'linear-gradient(45deg, rgb(var(--zinc-200)) 25%, transparent 25%), linear-gradient(-45deg, rgb(var(--zinc-200)) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgb(var(--zinc-200)) 75%), linear-gradient(-45deg, transparent 75%, rgb(var(--zinc-200)) 75%)',
    backgroundSize: '12px 12px',
    backgroundPosition: '0 0, 0 6px, 6px -6px, -6px 0px',
    backgroundColor: 'rgb(var(--zinc-50))',
  };

  // Shared class names, matching the site's inputs, toggles and code blocks
  const inputClass =
    'w-full rounded-lg border border-zinc-200 bg-surface px-3 py-2 text-sm text-zinc-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-quartiary-500';
  const colorClass = 'h-9 w-10 shrink-0 cursor-pointer rounded-lg border border-zinc-200 bg-surface';
  const labelClass = 'mb-1.5 block font-mono text-[11px] uppercase tracking-widest text-zinc-500';
  const toggleClass = (active) =>
    `rounded-lg border px-2 py-2 text-xs transition-colors ${
      active
        ? 'border-zinc-900 bg-zinc-900 font-medium text-surface'
        : 'border-zinc-200 bg-surface text-zinc-600 hover:border-zinc-300 hover:text-zinc-900'
    }`;
  const codeButtonClass = (done) =>
    `inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
      done
        ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-400'
        : 'border-night-700 bg-night-900 text-night-300 hover:text-white'
    }`;

  const variant16 = variants.find((v) => v.size === 16);
  const variant32 = variants.find((v) => v.size === 32);

  return (
    <div>
      {!sourceDataURL && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onClick={() => fileInputRef.current?.click()}
          className={`relative cursor-pointer rounded-xl border border-dashed p-10 text-center transition-colors md:p-14 ${
            isDragging
              ? 'border-quartiary-500 bg-quartiary-100/30'
              : 'border-zinc-300 bg-zinc-50/60 hover:border-zinc-400 hover:bg-zinc-50'
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
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-xl border shadow-sm transition-colors ${
                isDragging
                  ? 'border-quartiary-500 bg-quartiary-500 text-white'
                  : 'border-zinc-200 bg-surface text-zinc-900'
              }`}
            >
              <Upload className="h-6 w-6" strokeWidth={1.75} />
            </div>
            <div>
              <p className="mb-1 text-lg text-zinc-900">
                Drop an image here or click to choose one
              </p>
              <p className="font-mono text-xs text-zinc-500">
                PNG, JPG, SVG or WebP · Square, 512×512 or larger recommended
              </p>
            </div>
          </div>
        </div>
      )}

      {isProcessing && variants.length === 0 && (
        <div className="card p-8 text-center">
          <div className="mb-3 inline-block h-8 w-8 animate-spin rounded-full border-2 border-zinc-200 border-t-zinc-900"></div>
          <p className="text-zinc-700">Generating variants…</p>
        </div>
      )}

      {sourceDataURL && variants.length > 0 && (
        <div className="space-y-4">
          <div className="card p-6">
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="flex items-center gap-4">
                <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-zinc-200" style={checkerboardStyle}>
                  <img src={sourceDataURL} alt="Source" className="max-h-full max-w-full object-contain" />
                </div>
                <div>
                  <p className={labelClass}>Source image</p>
                  <p className="text-zinc-900">
                    {sourceDims?.width} × {sourceDims?.height}px
                  </p>
                  <button
                    onClick={reset}
                    className="mt-1 inline-flex items-center gap-1 text-sm text-zinc-500 underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-zinc-900 hover:decoration-zinc-900"
                  >
                    <X className="h-3.5 w-3.5" /> Change image
                  </button>
                </div>
              </div>

              <div className="grid flex-1 grid-cols-1 gap-4 border-zinc-200 sm:grid-cols-3 md:border-l md:pl-6">
                <div>
                  <label className={labelClass}>Site name</label>
                  <input
                    type="text"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Theme color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={themeColor}
                      onChange={(e) => setThemeColor(e.target.value)}
                      className={colorClass}
                    />
                    <input
                      type="text"
                      value={themeColor}
                      onChange={(e) => setThemeColor(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Icon background</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setBgColor('transparent')}
                      className={`flex-1 ${toggleClass(bgColor === 'transparent')}`}
                    >
                      Transparent
                    </button>
                    <input
                      type="color"
                      value={bgColor === 'transparent' ? '#ffffff' : bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className={colorClass}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <p className={`${labelClass} mb-4`}>Browser preview</p>
            <div className="inline-flex max-w-full items-center gap-2 rounded-t-lg border border-b-0 border-zinc-200 bg-zinc-100 p-2">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full border border-zinc-300"></span>
                <span className="h-2.5 w-2.5 rounded-full border border-zinc-300"></span>
                <span className="h-2.5 w-2.5 rounded-full border border-zinc-300"></span>
              </div>
              <div className="flex max-w-xs items-center gap-2 rounded-md border border-zinc-200 bg-surface px-3 py-1.5 text-xs text-zinc-700">
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
                <X className="h-3 w-3 flex-shrink-0 text-zinc-400" />
              </div>
            </div>
            {variant32 && (
              <div className="mt-4 flex items-center gap-3 font-mono text-xs text-zinc-500">
                <span>Actual size:</span>
                <img src={variant16.dataURL} alt="16px" width={16} height={16} />
                <span>16px</span>
                <img src={variant32.dataURL} alt="32px" width={32} height={32} />
                <span>32px</span>
              </div>
            )}
          </div>

          <div className="card p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg">Generated variants</h2>
              <button onClick={downloadAll} className="button button-primary">
                <Download className="h-4 w-4" />
                Download all (ZIP)
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {icoBlob && variant32 && (
                <div className="rounded-xl border border-zinc-200 bg-surface p-3 transition-colors hover:border-zinc-300">
                  <div
                    className="relative mb-2 flex aspect-square items-center justify-center overflow-hidden rounded-lg"
                    style={checkerboardStyle}
                  >
                    <img
                      src={variant32.dataURL}
                      alt="favicon.ico"
                      className="object-contain"
                      style={{ width: '60%', height: '60%' }}
                    />
                    <span className="absolute right-1 top-1 rounded bg-quartiary-500 px-1.5 py-0.5 font-mono text-[10px] text-white">
                      ICO
                    </span>
                  </div>
                  <p className="truncate text-xs font-medium text-zinc-900">favicon.ico</p>
                  <p className="mb-2 text-[11px] text-zinc-500">Multi-resolution</p>
                  <button
                    onClick={() => downloadBlob(icoBlob, 'favicon.ico')}
                    className="button button-secondary button-sm w-full text-xs"
                  >
                    <Download className="h-3 w-3" />Download
                  </button>
                </div>
              )}

              {variants.map((v) => (
                <div
                  key={v.name}
                  className="rounded-xl border border-zinc-200 bg-surface p-3 transition-colors hover:border-zinc-300"
                >
                  <div
                    className="mb-2 flex aspect-square items-center justify-center overflow-hidden rounded-lg"
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
                  <p className="truncate font-mono text-xs text-zinc-900">
                    {v.size}×{v.size}
                  </p>
                  <p className="mb-2 truncate text-[11px] text-zinc-500" title={v.desc}>
                    {v.desc}
                  </p>
                  <button
                    onClick={() => downloadDataURL(v.dataURL, v.name)}
                    className="button button-secondary button-sm w-full text-xs"
                  >
                    <Download className="h-3 w-3" />Download
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-night-800 bg-night-950">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-night-800 px-5 py-3">
              <div className="flex items-center gap-2">
                <FileCode className="h-4 w-4 text-night-500" />
                <h2 className="font-mono text-xs text-night-300">
                  HTML for your &lt;head&gt;
                </h2>
              </div>
              <button onClick={copyHtml} className={codeButtonClass(copied)}>
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" /> Copy
                  </>
                )}
              </button>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-night-300">
              <code>{htmlSnippet}</code>
            </pre>
          </div>

          {/* Web App Manifest */}
          <div className="card p-6">
            <div className="mb-5">
              <h2 className="text-lg">site.webmanifest</h2>
              <p className="mt-1 text-sm text-zinc-500">
                PWA settings for Android, Chrome and other supporting browsers
              </p>
            </div>

            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className={labelClass}>Short name</label>
                <input
                  type="text"
                  value={shortName}
                  onChange={(e) => setShortName(e.target.value)}
                  placeholder={siteName}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Background color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={manifestBg}
                    onChange={(e) => setManifestBg(e.target.value)}
                    className={colorClass}
                  />
                  <input
                    type="text"
                    value={manifestBg}
                    onChange={(e) => setManifestBg(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="sm:col-span-2 lg:col-span-2">
                <label className={labelClass}>Display mode</label>
                <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
                  {['standalone', 'fullscreen', 'minimal-ui', 'browser'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setDisplay(opt)}
                      className={toggleClass(display === opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-night-800 bg-night-950">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-night-800 px-5 py-3">
                <div className="flex items-center gap-2">
                  <FileCode className="h-4 w-4 text-night-500" />
                  <span className="font-mono text-xs text-night-300">site.webmanifest</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={copyManifest} className={codeButtonClass(copiedManifest)}>
                    {copiedManifest ? (
                      <>
                        <Check className="h-3.5 w-3.5" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Copy
                      </>
                    )}
                  </button>
                  <button onClick={downloadManifest} className={codeButtonClass(false)}>
                    <Download className="h-3.5 w-3.5" />Download
                  </button>
                </div>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-night-300">
                <code>{manifestJSON}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      <p className="mt-6 text-center font-mono text-xs text-zinc-500">
        Runs 100% in your browser · Your image is never uploaded
      </p>
    </div>
  );
}
