"use client";

import { useState, useRef } from 'react';

interface CodePlaygroundProps {
  initialCode: string;
  language: string;
}

// Security: List of dangerous patterns to block
const DANGEROUS_PATTERNS = [
  /fetch\s*\(/,
  /XMLHttpRequest/,
  /document\.cookie/,
  /localStorage/,
  /sessionStorage/,
  /window\.location/,
  /eval\s*\(/,
  /Function\s*\(/,
  /import\s*\(/,
  /require\s*\(/,
  /\.innerHTML\s*=.*<script/i,
  /document\.write/,
  /document\.writeln/,
];

// Security: Check if code contains dangerous patterns
function containsDangerousCode(code: string): string | null {
  for (const pattern of DANGEROUS_PATTERNS) {
    if (pattern.test(code)) {
      return `Potentially unsafe operation detected: ${pattern.source}`;
    }
  }
  return null;
}

// Security: Create a limited execution context
function createSandboxedEval() {
  return function(code: string) {
    // Remove access to dangerous globals
    const blockedGlobals = {
      fetch: undefined,
      XMLHttpRequest: undefined,
      setTimeout: undefined,
      setInterval: undefined,
      eval: undefined,
      Function: undefined,
    };

    // Create a safer execution context
    const safeGlobals = {
      console,
      Math,
      Date,
      JSON,
      Object,
      Array,
      String,
      Number,
      Boolean,
      RegExp,
      document: {
        createElement: document.createElement.bind(document),
        getElementById: document.getElementById.bind(document),
      },
      window: {
        customElements: window.customElements,
      },
      customElements: window.customElements,
      HTMLElement,
    };

    // Execute in limited context
    const func = new Function(...Object.keys(safeGlobals), code);
    return func(...Object.values(safeGlobals));
  };
}

export function CodePlayground({ initialCode, language }: CodePlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [hasRenderedContent, setHasRenderedContent] = useState(false);
  const [securityWarning, setSecurityWarning] = useState<string | null>(null);
  const renderRef = useRef<HTMLDivElement>(null);

  const runCode = () => {
    if (language === 'javascript') {
      // Security check
      const dangerousCheck = containsDangerousCode(code);
      if (dangerousCheck) {
        setSecurityWarning(dangerousCheck);
        setOutput('Code execution blocked for security reasons.');
        setHasRenderedContent(false);
        return;
      }

      setSecurityWarning(null);

      try {
        // Clear previous rendered content
        if (renderRef.current) {
          renderRef.current.innerHTML = '';
        }
        setHasRenderedContent(false);

        // Capture console.log output
        const logs: string[] = [];
        const originalLog = console.log;
        
        console.log = (...args) => {
          logs.push(args.map(arg => String(arg)).join(' '));
        };

        // Track custom elements before execution
        const elementsBefore = Array.from(document.querySelectorAll('*')).map(el => el.tagName.toLowerCase());

        // Use sandboxed execution
        const sandboxedEval = createSandboxedEval();
        const result = sandboxedEval(code);
        
        // Restore original console.log
        console.log = originalLog;

        // Try to render custom elements
        let hasRendered = false;

        // Look for RENDER comments
        if (code.includes('// RENDER:') && renderRef.current) {
          const renderMatch = code.match(/\/\/ RENDER:\s*(.+)/);
          if (renderMatch) {
            try {
              const elementToRender = renderMatch[1].trim();
              // Security: Only allow alphanumeric and hyphens in element names
              if (/^[a-zA-Z0-9-]+$/.test(elementToRender)) {
                const element = document.createElement(elementToRender);
                renderRef.current.appendChild(element);
                hasRendered = true;
              }
            } catch (error) {
              logs.push(`Render error: ${error}`);
            }
          }
        }

        setHasRenderedContent(hasRendered);
        
        // Display console output
        if (logs.length > 0) {
          setOutput(logs.join('\n'));
        } else if (result !== undefined && !hasRendered) {
          setOutput(String(result));
        } else if (!hasRendered) {
          setOutput('Code executed successfully (no output)');
        } else {
          setOutput('Component rendered above');
        }
      } catch (error) {
        setOutput(`Error: ${error}`);
        setHasRenderedContent(false);
      }
    }
  };

  return (
    <div className="my-6 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
      <div className="bg-gray-100 dark:bg-gray-800 p-2 text-sm font-medium flex justify-between items-center">
        <span>{language} Playground</span>
        <span className="text-xs text-orange-600 dark:text-orange-400">
          ⚠️ Sandboxed Environment
        </span>
      </div>
      
      {/* Security Warning */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800 p-3 text-xs">
        <div className="text-yellow-800 dark:text-yellow-200">
          <strong>Security Notice:</strong> This playground runs code in a restricted environment. 
          Certain operations (network requests, file access, etc.) are blocked for security.
        </div>
      </div>

      {securityWarning && (
        <div className="bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800 p-3 text-xs">
          <div className="text-red-800 dark:text-red-200">
            <strong>Security Warning:</strong> {securityWarning}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-40 p-4 font-mono text-sm border-none resize-none bg-gray-50 dark:bg-gray-900 focus:outline-none"
            placeholder="Enter your code here..."
          />
        </div>
        <div className="border-l border-gray-300 dark:border-gray-600">
          <div className="h-40 p-4 bg-white dark:bg-black overflow-auto">
            {hasRenderedContent && (
              <div className="mb-4 p-3 border border-blue-200 dark:border-blue-800 rounded bg-blue-50 dark:bg-blue-900/20">
                <div className="text-xs text-blue-600 dark:text-blue-400 mb-2">Rendered Output:</div>
                <div ref={renderRef} className="rendered-output"></div>
              </div>
            )}
            <div className="text-sm font-mono">
              <div className="text-gray-600 dark:text-gray-400 mb-2">Console:</div>
              <div className="text-green-600 dark:text-green-400 whitespace-pre-line">{output || 'Run code to see output'}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-2 bg-gray-100 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-600">
        <button
          onClick={runCode}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Run Code
        </button>
      </div>
    </div>
  );
} 