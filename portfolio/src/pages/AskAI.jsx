import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ArrowUp, Square, RotateCcw } from 'lucide-react';
import { LionScene } from '../components/LionScene';
import './Portfolio.css';
import './AskAI.css';

// The finished chat UI works in portfolio-demo mode today. Add
// VITE_ASSISTANT_URL later to switch the same interface to the live backend.
const ENDPOINT = import.meta.env.VITE_ASSISTANT_URL;
const suggestions = ['What has Hemachandra built?', 'Tell me about his experience.', 'What technologies does he use?'];

function wait(milliseconds) {
  return new Promise(resolve => window.setTimeout(resolve, milliseconds));
}

function portfolioAnswer(question) {
  const prompt = question.toLowerCase();
  if (prompt.includes('experience') || prompt.includes('work history')) {
    return 'Hemachandra is currently an AI & Data Engineer at Align Labs, building LLM-powered microservices, real-time data pipelines, and campaign automation. Previously, he was an SDET intern at CodeNebula, where he worked on a Web3 platform, REST APIs, CI/CD, and test coverage above 95%.';
  }
  if (prompt.includes('technolog') || prompt.includes('stack') || prompt.includes('skill')) {
    return 'His core toolkit includes Python, Rust, C++, and JavaScript. He builds interfaces with React and Next.js, APIs with Node.js and FastAPI, and works with PostgreSQL, MongoDB, MySQL, Kafka, Docker, microservices, and GitHub Actions.';
  }
  if (prompt.includes('project') || prompt.includes('built') || prompt.includes('portfolio')) {
    return 'His featured work includes Scout, a recursive AI research agent; Second Brain, a semantic personal-knowledge system; SimpleWeb3, a focused Ethereum interface; a PDF RAG assistant; CogniTalk, a local-model chat app; and a credit-card fraud detection pipeline.';
  }
  if (prompt.includes('contact') || prompt.includes('email') || prompt.includes('hire')) {
    return 'You can reach Hemachandra at pottingari@gmail.com. He is also available through LinkedIn and GitHub from the contact section of this portfolio.';
  }
  return 'Hemachandra is a software engineer in Hyderabad who enjoys building reliable products across AI, backend systems, and thoughtful React interfaces. Ask me about his projects, experience, technology stack, or how to contact him.';
}

export function AskAI() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const request = useRef(null);
  const retryPrompt = useRef('');
  const conversation = useRef(null);
  const input = useRef(null);
  useEffect(() => { window.scrollTo(0, 0); return () => request.current?.abort(); }, []);
  useEffect(() => {
    const pane = conversation.current;
    if (pane) pane.scrollTo({ top: pane.scrollHeight, behavior: pending ? 'auto' : 'smooth' });
  }, [messages, pending, error]);

  async function revealAnswer(answer, controller) {
    const id = `assistant-${Date.now()}`;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setMessages(previous => [...previous, { id, role: 'assistant', text: prefersReducedMotion ? answer : '', streaming: !prefersReducedMotion }]);
    if (prefersReducedMotion) return;

    const pieces = answer.match(/\S+\s*/g) || [answer];
    let revealed = '';
    for (let index = 0; index < pieces.length; index += 2) {
      if (controller.signal.aborted) throw new DOMException('Stopped', 'AbortError');
      revealed += pieces.slice(index, index + 2).join('');
      const isDone = index + 2 >= pieces.length;
      setMessages(previous => previous.map(message => message.id === id
        ? { ...message, text: revealed, streaming: !isDone }
        : message));
      if (!isDone) await wait(34);
    }
  }

  function returnToPortfolio(event) {
    event.preventDefault();
    const go = () => navigate('/#home');
    if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.startViewTransition(go);
    } else {
      go();
    }
  }

  async function send(value, retry = false) {
    const question = value.trim();
    if (!question || request.current) return;
    retryPrompt.current = question;
    setDraft(''); setError(''); setPending(true);
    const history = retry ? messages.slice(0, -1) : messages;
    if (!retry) setMessages(previous => [...previous, { id: `user-${Date.now()}`, role: 'user', text: question }]);
    const controller = new AbortController();
    request.current = controller;
    const timeout = window.setTimeout(() => controller.abort('timeout'), 60000);
    try {
      if (!ENDPOINT) {
        await wait(320);
        await revealAnswer(portfolioAnswer(question), controller);
        return;
      }
      // Preserve the existing backend's GET /getnotes?query= contract.
      // Recent turns provide context for follow-up questions without a new API.
      const context = history.slice(-4).map(message => `${message.role}: ${message.text.slice(0, 800)}`).join('\n');
      const query = context ? `Conversation context:\n${context}\n\nCurrent question: ${question}` : question;
      const url = new URL(ENDPOINT, window.location.origin); url.searchParams.set('query', query);
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) throw new Error('unavailable');
      let answer;
      if (response.headers.get('content-type')?.includes('application/json')) {
        const data = await response.json();
        answer = typeof data === 'string' ? data : data.reply || data.answer || data.response;
      } else {
        if (response.headers.get('content-type')?.includes('text/html')) throw new Error('unexpected response');
        answer = await response.text();
      }
      if (typeof answer !== 'string' || !answer.trim()) throw new Error('empty response');
      await revealAnswer(answer.trim(), controller);
    } catch {
      if (controller.signal.reason === 'stopped') {
        setError('Response stopped. You can retry or ask something else.');
      } else {
        const localController = new AbortController();
        request.current = localController;
        try {
          await revealAnswer(portfolioAnswer(question), localController);
        } catch {
          setError('Response stopped. You can retry or ask something else.');
        }
      }
    } finally {
      clearTimeout(timeout); request.current = null; setPending(false);
    }
  }
  return <div className="portfolio ai-page">
    <header className="ai-header"><Link to="/#home" onClick={returnToPortfolio} className="monogram" aria-label="Return to portfolio"><img src="/monogram.svg" alt="" width="34" height="34" /></Link><span>HEMACHANDRA’S AI ASSISTANT</span><Link to="/#home" onClick={returnToPortfolio}><ArrowLeft size={14} /> Back to portfolio</Link></header>
    <main className="ai-layout">
      <section className="ai-companion" aria-label="Interactive lion companion"><div className="companion-intro"><span className="eyebrow">A LITTLE COMPANY WHILE YOU EXPLORE</span><h1>Get to know<br /><em>the human.</em></h1></div><div className="companion-scene"><LionScene initialX={-3.8} modelScale={0.54} /></div><p className="companion-footer">The code, the projects, the person behind them.</p></section>
      <section className={`ai-chat ${messages.length ? 'has-conversation' : ''}`} aria-label="Chat with the portfolio assistant"><div className="chat-heading"><span className="eyebrow">ASK HEMACHANDRA’S AI</span><span className="ai-badge">AI</span></div>
        <div className="chat-scroll" ref={conversation}>
          <div className={`assistant-intro ${messages.length ? 'is-compact' : ''}`}><img src="/monogram.svg" width="23" height="23" alt="" /><div><span>HELLO, CURIOUS HUMAN</span><p>Ask me about Hemachandra’s projects, experience, or the tools he works with.</p></div></div>
          {messages.length === 0 && <div className="chat-suggestions">{suggestions.map(suggestion => <button key={suggestion} onClick={() => send(suggestion)}>{suggestion}<ArrowUpRight size={15} /></button>)}</div>}
          <div className="chat-messages" role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions text">{messages.map(message => <div key={message.id} className={`chat-message ${message.role}`}><span className="message-author">{message.role === 'user' ? 'YOU' : 'ASSISTANT'}</span><p>{message.text}{message.streaming && <span className="stream-caret" aria-hidden="true" />}</p></div>)}</div>
          {pending && <div className="thinking" role="status"><span /><span /><span /><p>Thinking…</p></div>}
          {error && <div className="chat-error" role="alert"><p>{error}</p><button onClick={() => send(retryPrompt.current, true)}><RotateCcw size={13} /> Try again</button></div>}
        </div>
        <div className="chat-composer"><form onSubmit={event => { event.preventDefault(); send(draft); }}><label className="sr-only" htmlFor="question">Your question</label><textarea ref={input} id="question" value={draft} maxLength={2000} onChange={event => setDraft(event.target.value)} placeholder="What would you like to know?" rows={2} onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); send(draft); } }} />{pending ? <button className="send-button" type="button" onClick={() => request.current?.abort('stopped')} aria-label="Stop response"><Square size={15} /></button> : <button className="send-button" type="submit" disabled={!draft.trim()} aria-label="Send question"><ArrowUp size={19} /></button>}</form><p>AI can make mistakes. <Link to="/#work">Explore the work</Link> or <a href="mailto:pottingari@gmail.com">ask Hemachandra directly</a>.</p></div>
      </section>
    </main>
  </div>;
}
