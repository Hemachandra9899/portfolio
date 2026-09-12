import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import { ArrowLeft, ArrowUpRight, ArrowUp, ArrowDown, Square, RotateCcw, Plus, FileText, Download, Sparkles } from 'lucide-react';
import { LionScene } from '../components/LionScene';
import './Portfolio.css';
import './AskAI.css';

const ENDPOINT = import.meta.env.VITE_ASSISTANT_URL || 'https://portfolio-bacckend.onrender.com/api/chat';
const BASE = new URL(ENDPOINT, window.location.origin).origin;
const suggestions = [['Explore the work', 'Show me your AI projects'], ['Get the résumé', 'Can I see your resume?'], ['The journey so far', 'Tell me about your experience'], ['Find the right fit', 'What are your strongest technical skills?']];
function safeUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return undefined;
  try { const url = new URL(value, BASE); return ['https:', 'http:', 'mailto:', 'tel:'].includes(url.protocol) ? url.href : undefined; } catch { return undefined; }
}
function ResourceLink({ href, children }) {
  const url = safeUrl(href);
  return url ? <a href={url} target="_blank" rel="noreferrer">{children}</a> : null;
}
function Tags({ items = [] }) { return <div className="answer-tags">{Array.isArray(items) && items.map((item, i) => <span key={i}>{item}</span>)}</div>; }
function ResponseCards({ data }) {
  if (!data) return null;
  if (data.cardType === 'projects' && Array.isArray(data.projects)) return <div className="answer-projects">{data.projects.map((p, i) => <article className="answer-project" key={p.id || i}><span className="resource-kicker">{p.category || 'PROJECT'}<ArrowUpRight size={16} /></span><h3>{p.title}</h3><p>{p.tagline || p.description}</p><Tags items={p.techStack} />{p.keyFeatures?.length > 0 && <details><summary>What’s inside</summary><ul>{p.keyFeatures.map((f, n) => <li key={n}>{f}</li>)}</ul></details>}<div className="resource-actions"><ResourceLink href={p.githubUrl}>View code ↗</ResourceLink><ResourceLink href={p.liveUrl}>Live project ↗</ResourceLink></div></article>)}</div>;
  if (data.cardType === 'resume' && data.resume) { const r = data.resume; return <article className="resume-resource"><div className="pdf-icon"><FileText size={26} /><span>PDF</span></div><div><span className="resource-kicker">THE FULL PICTURE</span><h3>{r.name}</h3><p>{r.title}</p><small>{r.filename}</small><div className="resource-actions"><ResourceLink href={r.viewUrl}>Open résumé ↗</ResourceLink><ResourceLink href={r.downloadUrl}><Download size={14} /> Download PDF</ResourceLink></div></div></article>; }
  if (data.cardType === 'experience' && Array.isArray(data.experience)) return <div className="experience-resources">{data.experience.map((e, i) => <article key={i}><span className="resource-kicker">{e.period}</span><h3>{e.role}</h3><p>{e.company}</p><ul>{e.highlights?.map((h, n) => <li key={n}>{h}</li>)}</ul><Tags items={e.techStack} /></article>)}</div>;
  if (data.cardType === 'skills' && data.skills) return <div className="skill-resources">{Object.entries(data.skills).filter(([, v]) => Array.isArray(v)).map(([k, v]) => <article key={k}><h3>{k.replace(/([A-Z])/g, ' $1')}</h3><Tags items={v} /></article>)}</div>;
  if (data.cardType === 'contact' && data.socialLinks) return <div className="contact-resources">{Object.entries(data.socialLinks).map(([k, v]) => <ResourceLink key={k} href={k === 'email' ? 'mailto:' + v : k === 'phone' ? 'tel:' + v : v}><span>{k}</span>{v}<ArrowUpRight size={16} /></ResourceLink>)}</div>;
  return null;
}
export function AskAI() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [showLatest, setShowLatest] = useState(false);
  const request = useRef(null), retryPrompt = useRef(''), conversation = useRef(null), followLatest = useRef(true), input = useRef(null);
  useEffect(() => { window.scrollTo(0, 0); return () => request.current?.abort('unmount'); }, []);
  useEffect(() => {
    const pane = conversation.current;
    if (!followLatest.current || !pane) return;
    const answer = messages.at(-1)?.role === 'assistant' ? pane.querySelector('.chat-message:last-child') : null;
    const top = answer ? pane.scrollTop + answer.getBoundingClientRect().top - pane.getBoundingClientRect().top - 12 : pane.scrollHeight;
    pane.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }, [messages, pending, error]);
  function onScroll() { const p = conversation.current; const near = p.scrollHeight - p.scrollTop - p.clientHeight < 100; followLatest.current = near; setShowLatest(!near); }
  function latest() { followLatest.current = true; setShowLatest(false); conversation.current?.scrollTo({ top: conversation.current.scrollHeight, behavior: 'smooth' }); }
  function goHome(event) { event.preventDefault(); const go = () => navigate('/#home'); if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) document.startViewTransition(go); else go(); }
  function reset() { request.current?.abort('reset'); request.current = null; setMessages([]); setDraft(''); setError(''); setPending(false); setShowLatest(false); followLatest.current = true; input.current?.focus(); }
  async function send(value, retry = false) {
    const question = value.trim(); if (!question || request.current) return;
    retryPrompt.current = question; setDraft(''); setError(''); setPending(true); followLatest.current = true; setShowLatest(false);
    const history = retry ? messages.slice(0, -1) : messages;
    if (!retry) setMessages(previous => [...previous, { id: crypto.randomUUID(), role: 'user', text: question }]);
    const controller = new AbortController(); request.current = controller;
    const timeout = window.setTimeout(() => controller.abort('timeout'), 90000);
    try {
      const response = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: controller.signal, body: JSON.stringify({ message: question, history: history.slice(-12).map(m => ({ role: m.role, content: m.text })) }) });
      if (!response.ok) throw new Error('unavailable');
      const data = await response.json();
      if (data.success === false || typeof data.answer !== 'string' || !data.answer.trim()) throw new Error('invalid response');
      if (request.current === controller) setMessages(previous => [...previous, { id: crypto.randomUUID(), role: 'assistant', text: data.answer, data }]);
    } catch {
      if (request.current !== controller || ['reset', 'unmount'].includes(controller.signal.reason)) return;
      setError(controller.signal.reason === 'stopped' ? 'Response stopped. You can try again whenever you’re ready.' : controller.signal.reason === 'timeout' ? 'The assistant took a little too long. Please try again.' : 'The assistant couldn’t connect just now. Try again, or explore the portfolio.');
    } finally { clearTimeout(timeout); if (request.current === controller) { request.current = null; setPending(false); } }
  }
  return <div className="portfolio ai-page">
    <header className="ai-header"><Link to="/#home" onClick={goHome} className="monogram" aria-label="Return to portfolio"><img src="/monogram.svg" alt="" width="30" height="30" /></Link><span>HEMACHANDRA / ASK AI</span><Link to="/#home" onClick={goHome}><ArrowLeft size={15} /> Back to portfolio</Link></header>
    <main className="ai-layout"><div className="companion-scene" aria-label="Interactive lion companion"><LionScene initialX={-3.8} modelScale={0.54} /></div>
      <section className="ai-chat" aria-label="Chat with the portfolio assistant">
        <div className="chat-toolbar"><span><span className="status-dot" /> A little context. A better conversation.</span><button onClick={reset}><Plus size={16} /> New chat</button></div>
        <div className="chat-scroll" ref={conversation} onScroll={onScroll} tabIndex={0} aria-label="Scrollable conversation">
          {!messages.length && <div className="chat-welcome"><span className="welcome-symbol"><Sparkles size={25} /></span><span className="eyebrow">MEET THE PERSON BEHIND THE WORK</span><h1>A little curiosity<br />goes a <em>long way.</em></h1><p>Ask about my projects, the problems I solve,<br className="desktop-break" /> or where I could fit into your team.</p><div className="chat-suggestions">{suggestions.map(([label, prompt]) => <button key={label} onClick={() => send(prompt)}><span>{label}</span><ArrowUpRight size={17} /></button>)}</div></div>}
          <div className="chat-messages" role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions">{messages.map(m => <article key={m.id} className={'chat-message ' + m.role}>{m.role === 'assistant' && <div className="answer-label"><img src="/monogram.svg" width="20" height="20" alt="" />Hemachandra’s assistant</div>}<div className="message-content">{m.role === 'user' ? <p>{m.text}</p> : <Markdown urlTransform={safeUrl} components={{ a: ({ href, children }) => <ResourceLink href={href}>{children}</ResourceLink> }}>{m.text}</Markdown>}</div><ResponseCards data={m.data} /></article>)}</div>
          {pending && <div className="thinking" role="status"><Sparkles size={17} /><span>Finding the details</span><i /><i /><i /></div>}
          {error && <div className="chat-error" role="alert"><p>{error}</p><button onClick={() => send(retryPrompt.current, true)}><RotateCcw size={14} /> Try again</button></div>}
        </div>
        <div className="chat-composer">{showLatest && <button className="latest-message" onClick={latest}><ArrowDown size={14} /> Latest messages</button>}<form onSubmit={event => { event.preventDefault(); send(draft); }}><label className="sr-only" htmlFor="question">Your question</label><textarea ref={input} id="question" value={draft} maxLength={2000} onChange={event => setDraft(event.target.value)} placeholder="Ask something about Hemachandra…" rows={2} onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); send(draft); } }} /><div className="composer-bottom"><span>Projects, experience, résumé & more</span>{pending ? <button className="send-button" type="button" onClick={() => request.current?.abort('stopped')} aria-label="Stop response"><Square size={15} /></button> : <button className="send-button" type="submit" disabled={!draft.trim()} aria-label="Send question"><ArrowUp size={19} /></button>}</div></form><p>AI can make mistakes. <a href="mailto:pottingari@gmail.com">Ask Hemachandra directly ↗</a></p></div>
      </section>
    </main>
  </div>;
}
