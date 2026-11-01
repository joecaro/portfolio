"use client";

import { useState } from "react";
import { Lab, LabButton, LabPanel } from "./EvidenceLab";

type Task = { id: string; title: string; context: string; goal: string };
const tasks: Task[] = [
  { id: "TASK-18", title: "Repair stale run summary", context: "A finished attempt exists, but the saved task projection still says running.", goal: "Prefer matching terminal run evidence and persist the repaired summary." },
  { id: "TASK-24", title: "Recover a stopped review", context: "A worker stopped after saving a change; inspect its artifact before retrying.", goal: "Resume from the saved patch, validate it, then request independent review." },
];
const roles = [
  { id: "research", role: "Researcher", title: "Inspect task context", detail: "Read the task brief and find the state source that owns the latest result." },
  { id: "implement", role: "Implementer", title: "Make an isolated change", detail: "Work in a task workspace and save a versioned patch for later inspection." },
  { id: "review", role: "Independent reviewer", title: "Review exact patch", detail: "Check the saved patch and validation receipt before integration." },
] as const;
const statusNames = ["Planned", "Running", "Saved", "Validated", "Reviewed", "Integrated"];
type WorkspaceState = {
  stage: number;
  interrupted: boolean;
  patchVersion: number;
  validatedVersion: number;
  reviewedVersion: number;
  destinationClean: boolean;
};
const initialState = (): WorkspaceState => ({ stage: 0, interrupted: false, patchVersion: 0, validatedVersion: 0, reviewedVersion: 0, destinationClean: true });
const patchText: Record<string, (version: number) => string> = {
  "TASK-18": (version) => `- summary = savedEffortState[taskId]\n+ run = latestTerminalRun(taskId)\n+ summary = reconcile(summary, run)\n+ persistTerminalState(taskId, summary)\n# Patch v${version} · reconcile the matching completed run`,
  "TASK-24": (version) => `- resumeState = emptyWorkflow()\n+ resumeState = latestSavedSnapshot(taskId)\n+ validateSnapshotIdentity(resumeState, taskId)\n+ continueFrom(resumeState)\n# Patch v${version} · reopen the matching saved workspace`,
};

export function AgentWorkspaceDemo() {
  const [taskId, setTaskId] = useState(tasks[0].id);
  const [workspaceByTask, setWorkspaceByTask] = useState<Record<string, WorkspaceState>>(() => Object.fromEntries(tasks.map((item) => [item.id, initialState()])));
  const [showDetails, setShowDetails] = useState("research");
  const state = workspaceByTask[taskId] ?? initialState();
  const { stage, interrupted, patchVersion, validatedVersion, reviewedVersion, destinationClean } = state;
  const task = tasks.find((item) => item.id === taskId)!;
  const nodeStage = stage === 0 ? 0 : stage <= 2 ? 1 : stage <= 3 ? 2 : 3;
  const integrated = stage === 5;
  const readyToIntegrate = patchVersion > 0 && stage >= 4 && validatedVersion === patchVersion && reviewedVersion === patchVersion && destinationClean && !interrupted;
  const validationText = validatedVersion === 0 ? "No validation receipt yet." : `Patch v${validatedVersion} · 3 deterministic checks passed · clean fixture workspace`;

  function updateState(update: (current: WorkspaceState) => WorkspaceState) {
    setWorkspaceByTask((all) => ({ ...all, [taskId]: update(all[taskId] ?? initialState()) }));
  }

  function switchTask(id: string) {
    setTaskId(id); setShowDetails("research");
  }
  function advance() {
    if (interrupted || stage >= 3) return;
    updateState((current) => {
      const next = current.stage + 1;
      return { ...current, stage: next, patchVersion: next === 2 ? current.patchVersion || 1 : current.patchVersion, validatedVersion: next === 3 ? current.patchVersion : current.validatedVersion };
    });
  }
  function completeReview() {
    if (stage !== 3 || validatedVersion !== patchVersion || patchVersion === 0 || interrupted) return;
    updateState((current) => ({ ...current, stage: 4, reviewedVersion: current.patchVersion }));
  }
  function revisePatch() {
    updateState((current) => ({ ...current, patchVersion: current.patchVersion + 1, validatedVersion: 0, reviewedVersion: 0, stage: 2, interrupted: false }));
  }
  function reset() { updateState(() => initialState()); setShowDetails("research"); }
  function setInterruptedState(value: boolean) { updateState((current) => ({ ...current, interrupted: value })); }

  return (
    <Lab title="Agent workspace" kicker="DURABLE CODING WORKFLOW">
      <p className="text-sm leading-6 text-slate-700 dark:text-slate-200">Coordinate task context, role-based work, saved code, review, and integration. Everything below is a deterministic local fixture.</p>
      <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(13rem,0.72fr)_minmax(0,2fr)]">
        <aside className="min-w-0" aria-label="Task list">
          <h4 className="mb-2 font-semibold">Workspace tasks</h4>
          <div className="space-y-2">{tasks.map((item) => <LabButton key={item.id} className="w-full" aria-pressed={taskId === item.id} onClick={() => switchTask(item.id)}><span className="block text-xs opacity-75">{item.id}</span><span className="block whitespace-normal">{item.title}</span><span className="mt-1 block whitespace-normal text-xs font-normal">{item.context}</span></LabButton>)}</div>
          <LabPanel className="mt-3" title="Saved task context"><p className="text-sm">{task.goal}</p><p className="mt-2 text-xs text-slate-600 dark:text-slate-300">Task intent stays separate from any single run or patch.</p></LabPanel>
        </aside>
        <div className="min-w-0 space-y-4">
          <LabPanel title={`Plan · ${task.id}`}>
            <ol className="space-y-2">{roles.map((node, index) => {
              const nodeStatus = index === 0
                ? nodeStage >= 1 ? "Complete" : "Ready"
                : index === 1
                  ? interrupted && stage === 2 ? "Interrupted · patch saved" : nodeStage >= 2 ? "Patch saved" : nodeStage === 1 ? "In progress" : "Waiting"
                  : interrupted && stage === 3 ? "Interrupted"
                    : stage >= 4 && reviewedVersion === patchVersion && patchVersion > 0 ? "Reviewed"
                      : stage === 3 ? "Ready to review" : "Waiting";
              const active = showDetails === node.id;
              return <li key={node.id}><button type="button" onClick={() => setShowDetails(node.id)} aria-pressed={active} className={`flex min-h-11 w-full items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${active ? "border-blue-600 bg-blue-50 dark:border-blue-400 dark:bg-blue-950" : "border-slate-300 dark:border-slate-600"}`}><span className="min-w-0"><span className="block text-xs font-semibold text-blue-700 dark:text-blue-300">{node.role}</span><span className="block whitespace-normal font-medium">{node.title}</span></span><span className="shrink-0 text-xs font-semibold">{nodeStatus}</span></button></li>;
            })}</ol>
            <div className="mt-3 rounded-lg bg-slate-100 p-3 text-sm dark:bg-slate-800" aria-live="polite"><strong>{roles.find((item) => item.id === showDetails)?.role} context</strong><p className="mt-1">{roles.find((item) => item.id === showDetails)?.detail}</p><p className="mt-2 text-xs text-slate-600 dark:text-slate-300">Task: {task.goal}</p></div>
            <div className="mt-4 flex flex-wrap gap-2">
              {stage < 3 && <LabButton onClick={advance} disabled={interrupted}>{stage === 0 ? "Run workflow" : "Advance workflow"}</LabButton>}
              {stage === 3 && <LabButton onClick={completeReview} disabled={interrupted || validatedVersion !== patchVersion || patchVersion === 0}>Complete simulated review</LabButton>}
              {stage >= 2 && stage <= 3 && !interrupted && <LabButton onClick={() => setInterruptedState(true)}>Inject interruption</LabButton>}
              {interrupted && <LabButton onClick={() => setInterruptedState(false)}>Resume from saved state</LabButton>}
              <LabButton onClick={reset}>Reset task</LabButton>
            </div>
            {interrupted && <p className="mt-3 rounded border border-amber-500 bg-amber-50 p-3 text-sm dark:bg-amber-950" role="status">Run interrupted. Task context and {patchVersion ? `patch v${patchVersion}` : "current workspace state"} remain available; resume continues from the saved stage.</p>}
          </LabPanel>

          <div className="grid min-w-0 gap-4 xl:grid-cols-2">
            <LabPanel title={`Saved patch · ${patchVersion ? `v${patchVersion}` : "not created"}`}>
              {patchVersion === 0 ? <p className="text-sm">Advance the workflow to create an illustrative patch.</p> : <>
                <pre className="max-w-full overflow-x-auto rounded bg-slate-950 p-3 text-xs leading-5 text-slate-100"><code>{patchText[taskId](patchVersion)}</code></pre>
                <div className="mt-3 flex flex-wrap items-center gap-2"><LabButton onClick={revisePatch} disabled={integrated}>Revise patch</LabButton><span className="text-xs">Changing the patch invalidates its validation and review.</span></div>
              </>}
            </LabPanel>
            <LabPanel title="Validation receipt">
              <p className="text-sm">{validationText}</p>
              <ul className="mt-2 list-inside list-disc text-xs leading-5"><li>Matching task identity</li><li>Terminal state takes precedence over stale projection</li><li>Saved result can be reopened after interruption</li></ul>
              {validatedVersion > 0 && validatedVersion !== patchVersion && <p className="mt-2 text-sm font-semibold text-amber-800 dark:text-amber-300">Stale receipt: patch changed after validation.</p>}
            </LabPanel>
          </div>

          <LabPanel title="Independent review and integration gate">
            <p className="text-sm">Review applies to one exact patch version. The destination is checked separately from the worker workspace.</p>
            <div className="mt-3 flex flex-wrap gap-2"><LabButton aria-pressed={!destinationClean} disabled={integrated} onClick={() => updateState((current) => ({ ...current, destinationClean: !current.destinationClean }))}>{destinationClean ? "Destination clean" : "Destination has unrelated changes"} · toggle</LabButton><LabButton onClick={() => updateState((current) => ({ ...current, stage: 5 }))} disabled={!readyToIntegrate || integrated}>Approve simulated integration</LabButton></div>
            <ul className="mt-3 space-y-1 text-sm" aria-live="polite"><li>Patch saved: {patchVersion ? `v${patchVersion}` : "no"}</li><li>Validation: {validatedVersion === patchVersion && patchVersion ? "current" : "required or stale"}</li><li>Review: {reviewedVersion === patchVersion && patchVersion ? `approved for v${reviewedVersion}` : "required for current patch"}</li><li>Destination: {destinationClean ? "clean" : "blocked by unrelated changes"}</li></ul>
            <p className="mt-3 rounded border-l-4 border-blue-600 bg-blue-50 p-3 text-sm font-semibold dark:bg-blue-950" role="status">{integrated ? "Simulated integration complete: the exact reviewed patch passed validation into a clean fixture destination." : readyToIntegrate ? "Ready: all gates refer to the same patch and the destination is clean." : "Integration blocked until the exact saved patch is validated and reviewed and the destination is clean."}</p>
          </LabPanel>
        </div>
      </div>
      <div className="sr-only" aria-live="polite">Workflow status: {interrupted ? "Interrupted" : statusNames[stage]} for {task.id}.</div>
    </Lab>
  );
}
