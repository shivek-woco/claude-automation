"use client";

import { useEffect, useState } from "react";

type Stage = "applied" | "screen" | "interview" | "offer";

type Candidate = {
  id: string;
  name: string;
  role: string;
  note: string;
  stage: Stage;
};

const STAGES: { key: Stage; label: string }[] = [
  { key: "applied", label: "Applied" },
  { key: "screen", label: "Phone screen" },
  { key: "interview", label: "Interview" },
  { key: "offer", label: "Offer" },
];

const INITIAL: Candidate[] = [
  { id: "a1", name: "Tomás Reyes", role: "Backend engineer", note: "Referred by Dana", stage: "applied" },
  { id: "a2", name: "Mei Lin", role: "Product designer", note: "Portfolio attached", stage: "applied" },
  { id: "a3", name: "Kwame Asante", role: "Backend engineer", note: "Applied 2h ago", stage: "applied" },
  { id: "s1", name: "Hannah Weiss", role: "Sales lead", note: "Screen Thu 10:00", stage: "screen" },
  { id: "s2", name: "Arjun Mehta", role: "Backend engineer", note: "Screen Fri 14:30", stage: "screen" },
  { id: "i1", name: "Priya Nair", role: "Product designer", note: "4 of 4 scorecards: strong yes", stage: "interview" },
  { id: "i2", name: "Leo Brandt", role: "Sales lead", note: "Onsite Tuesday", stage: "interview" },
  { id: "o1", name: "Sofia Costa", role: "Backend engineer", note: "Offer sent", stage: "offer" },
];

const MOVING_ID = "i1";

export default function PipelineBoard() {
  const [candidates, setCandidates] = useState(INITIAL);
  const [moved, setMoved] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCandidates((prev) =>
        prev.map((c) =>
          c.id === MOVING_ID ? { ...c, stage: "offer", note: "Offer drafted from scorecards" } : c,
        ),
      );
      setMoved(true);
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="board" aria-label="Example hiring pipeline">
      <div className="board-bar">
        <span className="board-title">3 open roles</span>
        <span className="board-status" aria-live="polite">
          {moved ? "Priya Nair moved to Offer" : "Updated just now"}
        </span>
      </div>
      <div className="board-columns">
        {STAGES.map((stage) => {
          const items = candidates.filter((c) => c.stage === stage.key);
          return (
            <section key={stage.key} className={`column stage-${stage.key}`}>
              <h3 className="column-head">
                <span className="stage-dot" aria-hidden="true" />
                {stage.label}
                <span className="column-count">{items.length}</span>
              </h3>
              <ul className="column-list">
                {items.map((c) => (
                  <li
                    key={c.id}
                    className={`candidate${moved && c.id === MOVING_ID ? " candidate-arrived" : ""}`}
                  >
                    <span className="candidate-name">{c.name}</span>
                    <span className="candidate-role">{c.role}</span>
                    <span className="candidate-note">{c.note}</span>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
