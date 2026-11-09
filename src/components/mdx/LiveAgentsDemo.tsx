"use client";

import { useEffect, useState } from "react";

const steps = [
  { state: "Ready", event: "Contact center marked the agent ready" },
  { state: "On call", event: "Call connected", speaker: "Agent", line: "Hi. Is now a good time to talk about your account?" },
  { state: "On call", event: "Customer turn received", speaker: "Customer", line: "Yes. Can I schedule a payment for Friday?" },
  { state: "On call", event: "Payment date checked", speaker: "Agent", line: "Friday is available. Would you like me to schedule it?" },
  { state: "On call", event: "Customer requested a transfer", speaker: "Customer", line: "Actually, I'd like to speak to someone first." },
  { state: "Transferring", event: "Transfer requested", speaker: "Agent", line: "Of course. I'll connect you with someone who can help." },
  { state: "Wrap-up", event: "Transfer completed. Agent unavailable during cleanup." },
  { state: "Ready", event: "Matching ready event received. Agent can take another call." },
];

export function LiveAgentsDemo() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [selected, setSelected] = useState<"01" | "02">("01");
  const finished = step === steps.length - 1;
  const current = steps[step];
  const visibleSteps = steps.slice(0, step + 1);

  useEffect(() => {
    if (!playing || finished) return;
    const timer = window.setTimeout(() => setStep(step + 1), 2400);
    return () => window.clearTimeout(timer);
  }, [playing, finished, step]);

  function togglePlayback() {
    if (finished) {
      setStep(0);
      setPlaying(true);
    } else {
      setPlaying(!playing);
    }
  }

  return (
    <section aria-label="Fictional live agents console" className="rounded-lg border border-neutral-200 bg-slate-50 p-4 dark:border-neutral-700 dark:bg-neutral-800/50 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">Live agents</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">Fictional call replay · transcript only</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={togglePlayback} className="min-h-11 rounded-md bg-blue-700 px-4 text-sm font-semibold text-white">
            {finished ? "Replay call" : playing ? "Pause call" : step === 0 ? "Play call" : "Resume call"}
          </button>
          <button type="button" disabled={finished} onClick={() => { setPlaying(false); setStep(step + 1); }} className="min-h-11 rounded-md border border-neutral-400 px-4 text-sm font-semibold disabled:opacity-50">
            Next event
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-[minmax(10rem,1fr)_minmax(0,2.5fr)]">
        <div aria-label="Choose an agent" className="grid content-start gap-2">
          {(["01", "02"] as const).map(id => (
            <button key={id} type="button" aria-pressed={selected === id} onClick={() => setSelected(id)} className="min-h-14 rounded-md border border-neutral-300 bg-white px-3 py-2 text-left text-sm aria-pressed:border-blue-600 aria-pressed:ring-1 aria-pressed:ring-blue-600 dark:border-neutral-600 dark:bg-neutral-900">
              <span className="block font-semibold">Agent {id}</span>
              <span className="text-neutral-600 dark:text-neutral-300">{id === "01" ? current.state : "Ready"}</span>
            </button>
          ))}
        </div>

        <div className="min-w-0 rounded-md border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
          <h4 className="font-semibold">Agent {selected} details</h4>
          <dl className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <div><dt className="text-neutral-600 dark:text-neutral-400">Contact center</dt><dd>Signed in</dd></div>
            <div><dt className="text-neutral-600 dark:text-neutral-400">State</dt><dd aria-live="polite">{selected === "01" ? current.state : "Ready"}</dd></div>
            <div><dt className="text-neutral-600 dark:text-neutral-400">Call</dt><dd>{selected === "01" && step > 0 ? "Demo call 01" : "None"}</dd></div>
          </dl>

          {selected === "01" ? (
            <div className="mt-5 grid gap-5 border-t border-neutral-200 pt-4 dark:border-neutral-700 lg:grid-cols-2">
              <div>
                <h5 className="text-sm font-semibold">Transcript</h5>
                <ol aria-live="polite" className="mt-2 space-y-2 text-sm">
                  {visibleSteps.filter(item => item.line).map(item => (
                    <li key={item.event} className="rounded-md bg-slate-100 p-2 dark:bg-neutral-800">
                      <span className="block text-xs font-semibold">{item.speaker}</span>{item.line}
                    </li>
                  ))}
                </ol>
                {step === 0 && <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Start the replay to follow the call.</p>}
              </div>
              <div>
                <h5 className="text-sm font-semibold">Contact-center events</h5>
                <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm">
                  {visibleSteps.map(item => <li key={item.event} className={item === current ? "font-semibold" : undefined}>{item.event}</li>)}
                </ol>
              </div>
            </div>
          ) : <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">Available for a call. No current activity.</p>}
        </div>
      </div>
    </section>
  );
}
