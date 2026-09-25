import Link from "next/link";
import PipelineBoard from "./components/PipelineBoard";

const STEPS = [
  {
    stage: "applied",
    title: "Post the job once",
    body: "Write the listing in Shortlist and publish it to LinkedIn, Indeed and your careers page together. Every application lands in the same pipeline.",
  },
  {
    stage: "screen",
    title: "Screen with your criteria",
    body: "Add must-have questions to the application. Candidates who don't meet them are set aside for you to review, not rejected automatically.",
  },
  {
    stage: "interview",
    title: "Schedule without the email chain",
    body: "Shortlist checks your interviewers' calendars and sends candidates a link to pick a slot. Reschedules update everyone's calendar.",
  },
  {
    stage: "interview",
    title: "Collect feedback before the debrief",
    body: "Each interviewer fills in a scorecard for the role. They can't see anyone else's scores until they submit their own.",
  },
  {
    stage: "offer",
    title: "Send the offer",
    body: "Build the offer from a template, get approval from finance and have the candidate sign it, all without leaving Shortlist.",
  },
];

const PLANS = [
  {
    name: "Starter",
    price: "$49",
    period: "per month",
    fit: "For teams making their first few hires.",
    items: ["Up to 3 open jobs", "Careers page", "Job board posting", "Email support"],
    cta: "Start free trial",
  },
  {
    name: "Growth",
    price: "$149",
    period: "per month",
    fit: "For teams hiring every month.",
    items: [
      "Up to 15 open jobs",
      "Interview scheduling",
      "Scorecards and debriefs",
      "Offer approvals and e-signature",
    ],
    cta: "Start free trial",
    featured: true,
  },
  {
    name: "Scale",
    price: "Custom",
    period: "billed yearly",
    fit: "For companies with several recruiters.",
    items: ["Unlimited open jobs", "SSO and audit log", "HRIS sync", "Dedicated onboarding"],
    cta: "Book a demo",
  },
];

const FAQS = [
  {
    q: "Can I bring candidates over from my current ATS?",
    a: "Yes. Export a CSV from your current system and upload it. Shortlist maps candidates, jobs and stages, and we'll check the import with you on a call if you're on Growth or Scale.",
  },
  {
    q: "Do hiring managers need a paid seat?",
    a: "No. Plans are priced by open jobs, not by user. Invite as many interviewers and hiring managers as you need.",
  },
  {
    q: "Which calendars and job boards do you support?",
    a: "Google Calendar and Microsoft 365 for scheduling. LinkedIn, Indeed, Glassdoor and Wellfound for posting, plus your own careers page.",
  },
  {
    q: "How do you handle candidate data?",
    a: "Data is encrypted in transit and at rest. You can set how long candidate records are kept, and candidates can ask for their data to be deleted from the careers page.",
  },
  {
    q: "What happens when the trial ends?",
    a: "Choose a plan to keep going. If you don't, your account is paused and your data is kept for 30 days in case you come back.",
  },
];

export default function Home() {
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
          <nav aria-label="Main">
            <ul className="nav-links">
              <li>
                <a href="#how">How it works</a>
              </li>
              <li>
                <a href="#pricing">Pricing</a>
              </li>
              <li>
                <a href="#faq">Questions</a>
              </li>
            </ul>
          </nav>
          <div className="header-actions">
            <a href="/login" className="link-quiet">
              Sign in
            </a>
            <a href="/signup" className="btn btn-primary btn-small">
              Start free trial
            </a>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <h1>See every candidate and every decision in one pipeline.</h1>
              <p className="lede">
                Shortlist is an applicant tracking system for growing teams. It collects
                applications from every job board, gathers interview feedback in one place and
                shows everyone where each hire stands.
              </p>
              <div className="hero-actions">
                <a href="/signup" className="btn btn-primary">
                  Start free trial
                </a>
                <a href="/demo" className="btn btn-secondary">
                  Book a demo
                </a>
              </div>
              <p className="fine-print">Free for 14 days. No card needed.</p>
            </div>
            <PipelineBoard />
          </div>
        </section>

        <section id="how" className="section">
          <div className="wrap">
            <h2 className="section-title">From job post to signed offer</h2>
            <p className="section-intro">
              Shortlist follows the way you already hire. Each step below is a stage in your
              pipeline, and you can rename, add or remove stages for each role.
            </p>
            <ol className="steps">
              {STEPS.map((step, i) => (
                <li key={step.title} className={`step stage-${step.stage}`}>
                  <span className="step-num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section section-split">
          <div className="wrap split-grid">
            <div>
              <h2 className="section-title">Hiring managers can decide without chasing recruiters</h2>
              <p className="section-intro">
                Managers get a short daily summary of candidates waiting on them. They open a
                profile, read the scorecards side by side and move the candidate forward from
                their phone.
              </p>
              <ul className="checks">
                <li>Scorecards are built from the role&rsquo;s requirements, so every interviewer rates the same things.</li>
                <li>Comments mention teammates and notify them by email or Slack.</li>
                <li>Each candidate has one timeline of emails, notes and stage changes.</li>
              </ul>
            </div>
            <figure className="scorecard" aria-label="Example scorecard summary">
              <figcaption>
                <strong>Priya Nair</strong>
                <span>Product designer, final round</span>
              </figcaption>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Interviewer</th>
                    <th scope="col">Craft</th>
                    <th scope="col">Collaboration</th>
                    <th scope="col">Decision</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Dana K.</td>
                    <td>4</td>
                    <td>4</td>
                    <td><span className="verdict verdict-yes">Strong yes</span></td>
                  </tr>
                  <tr>
                    <td>Marcus O.</td>
                    <td>4</td>
                    <td>3</td>
                    <td><span className="verdict verdict-yes">Yes</span></td>
                  </tr>
                  <tr>
                    <td>Ines R.</td>
                    <td>3</td>
                    <td>4</td>
                    <td><span className="verdict verdict-yes">Yes</span></td>
                  </tr>
                  <tr>
                    <td>Sam T.</td>
                    <td>&ndash;</td>
                    <td>&ndash;</td>
                    <td><span className="verdict verdict-wait">Due today</span></td>
                  </tr>
                </tbody>
              </table>
            </figure>
          </div>
        </section>

        <section id="pricing" className="section">
          <div className="wrap">
            <h2 className="section-title">Pay for open jobs, not seats</h2>
            <p className="section-intro">
              Every plan includes unlimited candidates and unlimited team members. Close a job and
              it stops counting.
            </p>
            <div className="plans">
              {PLANS.map((plan) => (
                <article key={plan.name} className={`plan${plan.featured ? " plan-featured" : ""}`}>
                  <h3>{plan.name}</h3>
                  <p className="plan-fit">{plan.fit}</p>
                  <p className="plan-price">
                    <strong>{plan.price}</strong> <span>{plan.period}</span>
                  </p>
                  <ul>
                    {plan.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <a
                    href={plan.cta === "Book a demo" ? "/demo" : "/signup"}
                    className={`btn ${plan.featured ? "btn-primary" : "btn-secondary"}`}
                  >
                    {plan.cta}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section">
          <div className="wrap faq-grid">
            <h2 className="section-title">Questions teams ask before switching</h2>
            <div className="faq-list">
              {FAQS.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="closing">
          <div className="wrap closing-inner">
            <h2>Move your next hire through Shortlist.</h2>
            <p>Set up your first job in about ten minutes. Import the rest when you&rsquo;re ready.</p>
            <div className="hero-actions">
              <a href="/signup" className="btn btn-light">
                Start free trial
              </a>
              <a href="/demo" className="btn btn-outline-light">
                Book a demo
              </a>
            </div>
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
