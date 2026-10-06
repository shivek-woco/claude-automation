import type { Metadata } from "next";
import Link from "next/link";
import SignupForm from "./signup-form";

export const metadata: Metadata = {
  title: "Start your free trial — Shortlist",
  description: "Tell us about your team to start your Shortlist free trial.",
};

export default function SignupPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <div className="wrap header-inner">
          <Link href="/" className="logo" aria-label="Shortlist home">
            <span className="logo-mark" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
            Shortlist
          </Link>
          <div className="header-actions">
            <a href="/login" className="link-quiet">
              Sign in
            </a>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="section signup-section">
          <div className="wrap signup-wrap">
            <div className="signup-intro">
              <h1 className="section-title">Start your free trial</h1>
              <p className="section-intro">
                Tell us a bit about your team. We&rsquo;ll set up your workspace and follow up by
                email.
              </p>
            </div>
            <SignupForm />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <span>&copy; {new Date().getFullYear()} Shortlist</span>
          <ul>
            <li><a href="/privacy">Privacy</a></li>
            <li><a href="/terms">Terms</a></li>
            <li><a href="/security">Security</a></li>
            <li><a href="mailto:hello@example.com">Contact</a></li>
          </ul>
        </div>
      </footer>
    </>
  );
}
