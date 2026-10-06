"use client";

import { useActionState } from "react";
import { initialSignupState, submitSignup } from "./actions";

export default function SignupForm() {
  const [state, formAction, pending] = useActionState(submitSignup, initialSignupState);

  if (state.status === "success") {
    return (
      <div className="signup-card signup-success" role="status">
        <h2>You&rsquo;re on the list</h2>
        <p>{state.message}</p>
      </div>
    );
  }

  return (
    <form className="signup-card" action={formAction}>
      <div className="field">
        <label htmlFor="name">Full name</label>
        <input id="name" name="name" type="text" required autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="email">Work email</label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" autoComplete="organization" />
      </div>
      {state.message && (
        <p className="field-error" role="alert">
          {state.message}
        </p>
      )}
      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "Submitting…" : "Start free trial"}
      </button>
      <p className="fine-print">Free for 14 days. No card needed.</p>
    </form>
  );
}
