"use client"

import dynamic from 'next/dynamic';
import React, { useState, useEffect, useRef } from 'react';
import * as Babel from '@babel/standalone';
import * as RNW from 'react-native-web';
import gsap from 'gsap';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

// 1. Safe React Error Boundary to catch component execution crashes gracefully
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; onError: (error: Error) => void; fallback: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.onError(error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// 2. Responsive iPhone 17 Pro Max Shell
const DeviceEmulator: React.FC<{ children: React.ReactNode; isBooting: boolean }> = ({ children, isBooting }) => {
  const appleLogoRef = useRef<HTMLDivElement>(null);
  const appContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isBooting) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

    gsap.set(appleLogoRef.current, { opacity: 0, display: 'none' });
    gsap.set(appContainerRef.current, { opacity: 0, scale: 0.92 });

    tl.to(appleLogoRef.current, { display: 'flex', opacity: 1, duration: 1.2 })
      .to(appleLogoRef.current, { opacity: 0, duration: 0.8, delay: 1.5 })
      .set(appleLogoRef.current, { display: 'none' })

    tl.to(appContainerRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'back.out(1.2)'
    });
  }, [isBooting]);

  return (
    <div className="w-full h-full flex items-center justify-center p-4 select-none">
      <div className="relative h-full max-h-full aspect-[1/1.75] bg-neutral-900 rounded-[48px] border border-neutral-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] p-2 flex flex-col shrink-0">
        
        {/* Internal Screen Area */}
        <div className="relative w-full h-full bg-black rounded-[38px] overflow-hidden flex flex-col">
          
          {/* iOS Status Bar */}
          <div className="absolute top-0 inset-x-0 h-10 grid grid-cols-[1fr_auto_1fr] px-5 z-50 text-black pointer-events-none text-[11px] font-semibold items-center">
            <p>9:41</p>
            {/* Dynamic Island */}
            <div className="w-25 h-6 bg-black rounded-full flex items-center justify-end px-2.5 mt-1 shadow-inner mx-auto">
              <div className="w-1.5 h-1.5 bg-neutral-900 rounded-full border border-neutral-800"></div>
            </div>
            <div className="flex items-center space-x-1 ml-auto">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M2 19h2v3H2v-3zm4-4h2v7H6v-7zm4-4h2v11h-2V11zm4-4h2v15h-2V7zm4-4h2v19h-2V3z"/>
              </svg>
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 21l-12-12c4.5-4.5 11.5-4.5 16 0l-4 4c-2.2-2.2-5.8-2.2-8 0l8 8z"/>
              </svg>
              <div className="w-5 h-2.5 border border-current rounded-2xs p-0.5 flex items-center">
                <div className="h-full w-full bg-current rounded-3xs"></div>
              </div>
            </div>
          </div>

          {/* GSAP Boot Overlay */}
          <div ref={appleLogoRef} className="absolute inset-0 bg-black z-40 hidden flex-col justify-center items-center">
            <svg className="w-12 h-12 fill-white" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.36.13-9.13-1.83-14.33-5.87-3.27-2.52-7.13-7.14-11.58-13.85-4.92-7.43-9.11-16.5-12.57-27.21-3.46-10.71-5.19-21.24-5.19-31.57 0-15.19 3.87-27.46 11.62-36.8 7.74-9.35 17.32-14.07 28.73-14.18 5.03 0 10.45 1.34 16.27 4.03 5.82 2.7 9.51 4.03 11.07 4.03 1.23 0 5.15-1.46 11.75-4.36 6.61-2.9 12.14-4.24 17.6-4.02 17.1.67 30.13 7.15 39.09 19.43-15.42 9.39-22.95 21.84-22.61 37.36.34 12.18 4.97 22.3 13.88 30.37 8.92 8.07 19.23 12.53 30.91 13.41-1.34 3.81-2.91 7.73-4.71 11.76zm-31.57-111.4c0-7.71 2.68-15.03 8.04-21.96 5.37-6.93 12.03-11.45 20-13.56.22 1.68.34 3.24.34 4.7 0 7.37-2.79 14.63-8.38 21.79-5.58 7.15-12.35 11.62-20.29 13.39-.45-1.45-.71-2.9-.71-4.36z"/>
            </svg>
          </div>

          {/* Render Playground App Output Screen */}
          <div ref={appContainerRef} className="flex-1 bg-neutral-100 overflow-y-auto relative text-neutral-900 pt-12 p-4">
            {children}
          </div>

          {/* iOS Home Indicator */}
          <div className="absolute bottom-1 inset-x-0 h-4 flex items-center justify-center z-50 pointer-events-none">
            <div className="w-24 h-1 bg-black rounded-full mix-blend-difference opacity-70"></div>
          </div>

        </div>
      </div>
    </div>
  );
};

// 3. Workspace View Controller
export default function Code() {
  const [code, setCode] = useState<string | undefined>(`
import { View, Text, StyleSheet } from 'react-native-web';
import React from 'react';

export default function Card() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.body}>This is the Playground app.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 6,
  },
  body: {
    fontSize: 15,
    color: '#555',
    lineHeight: 20,
  }
});
`);

  const [compilerError, setCompilerError] = useState<string | null>(null);
  const [playgroundError, setPlaygroundError] = useState<string | null>(null);
  const [activeLogTab, setActiveLogTab] = useState<'compiler' | 'playground'>('compiler');
  
  const [previewElement, setPreviewElement] = useState<React.ReactElement | null>(null);
  const [isEmulatorBooting] = useState<boolean>(true);

  useEffect(() => {
    if (!code) return;

    // Reset runtime error when typing to let the engine re-try evaluation cleanly
    setPlaygroundError(null);

    try {
      const transpiled = Babel.transform(code, {
        presets: ['react', 'typescript', 'env'],
        filename: 'Component.tsx',
      }).code;

      const exports: Record<string, any> = {};
      const customRequire = (moduleName: string) => {
        if (moduleName === 'react') return React;
        if (moduleName === 'react-native-web') return RNW;
        throw new Error(`Module "${moduleName}" not found`);
      };

      const evaluate = new Function('exports', 'require', 'React', transpiled as string);
      evaluate(exports, customRequire, React);

      const Component = exports.default;
      if (typeof Component === 'function') {
        setPreviewElement(<Component />);
        setCompilerError(null);
      } else {
        setCompilerError('No default export found.');
      }
    } catch (error: any) {
      // Print to web developer browser inspect console
      console.error("❌ Compiler Phase Exception Logged:", error.message);
      
      setCompilerError(error.message);
      setPreviewElement(null);
      setActiveLogTab('compiler'); // Auto-focus the Compiler error tab
    }
  }, [code]);

  return (
    <div className="flex h-screen w-screen bg-gray-900 text-gray-100 font-sans overflow-hidden select-none">
      
      {/* Left Column Pane (60% Width) - Contains Editor and Nested Logs */}
      <div className="flex-1/2 border-r border-neutral-800 flex flex-col p-4 overflow-hidden h-full gap-4">
        
        <div className="flex flex-col flex-[1_1_65%] overflow-hidden">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-semibold tracking-wider text-neutral-400 uppercase">React Native Editor (TSX)</h2>
          </div>
          <div className="flex-1 rounded-xl border border-neutral-800 overflow-hidden shadow-2xl">
            <MonacoEditor
              height="100%"
              width="100%"
              language="typescriptreact"
              value={code}
              onChange={(newCode) => setCode(newCode)}
              options={{
                theme: 'vs-dark',
                minimap: { enabled: false },
                automaticLayout: true,
                fontSize: 14,
                padding: { top: 12 },
                "semanticHighlighting.enabled": true,
                acceptSuggestionOnEnter: "on",
                autoClosingBrackets: "always",
                codeLens: true,
                formatOnType: true,
                formatOnPaste: true,
              }}
            />
          </div>
        </div>

        {/* Inner Nested Logs Box (Takes remaining 35% height space) */}
        <div className="flex-[1_1_35%] border border-neutral-800 flex flex-col p-4 bg-neutral-950 rounded-xl overflow-hidden">
          {/* Diagnostic Log Filter Tabs */}
          <div className="flex border-b border-neutral-800 mb-3 text-xs font-semibold uppercase tracking-wider">
            <button 
              onClick={() => setActiveLogTab('compiler')}
              className={`pb-2 pr-4 border-b-2 text-center transition-all ${activeLogTab === 'compiler' ? 'border-blue-500 text-blue-400 font-bold' : 'border-transparent text-neutral-500'}`}
            >
              Compiler {compilerError && <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full ml-1"></span>}
            </button>
            <button 
              onClick={() => setActiveLogTab('playground')}
              className={`pb-2 px-4 border-b-2 text-center transition-all ${activeLogTab === 'playground' ? 'border-red-500 text-red-400 font-bold' : 'border-transparent text-neutral-500'}`}
            >
              Playground {playgroundError && <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full ml-1"></span>}
            </button>
          </div>

          {/* Active Log Message Viewport */}
          <div className="flex-1 overflow-y-auto space-y-2 font-mono text-xs">
            {activeLogTab === 'compiler' ? (
              compilerError ? (
                <div className="p-3 bg-red-950/40 text-red-400 rounded-lg border border-red-900/40 whitespace-pre-wrap break-all">
                  <strong>Compilation Exception:</strong><br/>{compilerError}
                </div>
              ) : (
                <div className="p-3 bg-emerald-950/30 text-emerald-400 rounded-lg border border-emerald-900/30">
                  ✓ Syntax Check Passed. Transpilation ready.
                </div>
              )
            ) : (
              playgroundError ? (
                <div className="p-3 bg-orange-950/40 text-orange-400 rounded-lg border border-orange-900/40 whitespace-pre-wrap break-all">
                  <strong>Runtime Core Exception:</strong><br/>{playgroundError}
                </div>
              ) : (
                <div className="p-3 bg-neutral-900 text-neutral-400 rounded-lg border border-neutral-800">
                  ✓ Runtime Core execution active. No errors detected.
                </div>
              )
            )}
            <div className="p-2 text-neutral-600 text-[10px]">
              [SYS]: Sandbox online. Runtime and syntactic stack errors are reported here.
            </div>
          </div>
        </div>

      </div>

      {/* Live iPhone UI Preview Pane (40% Width) */}
      <div className="flex-1/4 flex flex-col p-4 bg-neutral-950 h-full overflow-hidden">
        <div className="flex-1 bg-neutral-900/30 border border-neutral-800 rounded-xl overflow-hidden relative">
          <DeviceEmulator isBooting={isEmulatorBooting}>
            {/* key={code} ensures fresh instantiation on edit changes, wiping historical error traps */}
            <ErrorBoundary
              key={code}
              onError={(err) => {
                console.error("❌ Runtime Rendering Crash Intercepted:", err.message);
                setPlaygroundError(err.message);
                setActiveLogTab('playground'); // Auto-focus the execution error tab
              }}
              fallback={
                <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 text-xs font-mono">
                  <h3 className="font-bold text-sm mb-1">Playground Crash</h3>
                  <p className="mb-2">{playgroundError || "A reference or type exception halted rendering execution."}</p>
                  <p className="text-[10px] text-neutral-500 italic">Check the Playground tab log for full scope trace detail data.</p>
                </div>
              }
            >
              {previewElement}
            </ErrorBoundary>
          </DeviceEmulator>
        </div>
      </div>

    </div>
  );
}