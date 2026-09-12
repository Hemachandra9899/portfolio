import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ArrowUp, Square, RotateCcw } from 'lucide-react';
import { LionScene } from '../components/LionScene';
import './Portfolio.css';
import './AskAI.css';

const ENDPOINT = import.meta.env.VITE_ASSISTANT_URL || '/api/getnotes';
const suggestions = ['What has Hemachandra built?', 'Tell me about his experience.', 'What technologies does he use?'];

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
    if (pane) pane.scrollTo({ top: pane.scrollHeight, behavior: 'smooth' });
  }, [messages, pending, error]);

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
    if (!retry) setMessages(previous => [...previous, { role: 'user', text: question }]);
    const controller = new AbortController();
    request.current = controller;
    const timeout = window.setTimeout(() => controller.abort('timeout'), 60000);
    try {
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
      setMessages(previous => [...previous, { role: 'assistant', text: answer.trim() }]);
    } catch {
      if (controller.signal.reason === 'stopped') setError('Response stopped. You can retry or ask something else.');
      else setError('I couldn’t reach the assistant just now. Please try again, or explore the portfolio instead.');
    } finally {
      clearTimeout(timeout); request.current = null; setPending(false);
    }
  }
  return <div className="portfolio ai-page">
    <header className="ai-header"><Link to="/#home" onClick={returnToPortfolio} className="monogram" aria-label="Return to portfolio"><img src="/monogram.svg" alt="" width="34" height="34" /></Link><span>HEMACHANDRA’S AI ASSISTANT</span><Link to="/#home" onClick={returnToPortfolio}><ArrowLeft size={14} /> Back to portfolio</Link></header>
    <main className="ai-layout">
      <section className="ai-companion" aria-label="Interactive lion companion"><div className="companion-intro"><span className="eyebrow">A LITTLE COMPANY WHILE YOU EXPLORE</span><h1>Get to know<br /><em>the human.</em></h1></div><div className="companion-scene"><LionScene /></div><p className="companion-footer">The code, the projects, the person behind them.</p></section>
      <section className="ai-chat" aria-label="Chat with the portfolio assistant"><div className="chat-heading"><div><span className="eyebrow">ASK AWAY</span><h2>A conversation, <em>with a little help.</em></h2></div><span className="ai-badge">AI</span></div>
        <div className="chat-scroll" ref={conversation}>
          <div className="assistant-intro"><img src="/monogram.svg" width="23" height="23" alt="" /><p>Hi, I’m Hemachandra’s AI assistant. Ask me about his projects, experience, or the tools he works with.</p></div>
          {messages.length === 0 && <div className="chat-suggestions">{suggestions.map(suggestion => <button key={suggestion} onClick={() => send(suggestion)}>{suggestion}<ArrowUpRight size={15} /></button>)}</div>}
          <div className="chat-messages" role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions text">{messages.map((message, index) => <div key={index} className={`chat-message ${message.role}`}><span className="message-author">{message.role === 'user' ? 'YOU' : 'ASSISTANT'}</span><p>{message.text}</p></div>)}</div>
          {pending && <div className="thinking" role="status"><span /><span /><span /><p>Thinking…</p></div>}
          {error && <div className="chat-error" role="alert"><p>{error}</p><button onClick={() => send(retryPrompt.current, true)}><RotateCcw size={13} /> Try again</button></div>}
        </div>
        <div className="chat-composer"><form onSubmit={event => { event.preventDefault(); send(draft); }}><label className="sr-only" htmlFor="question">Your question</label><textarea ref={input} id="question" value={draft} maxLength={2000} onChange={event => setDraft(event.target.value)} placeholder="What would you like to know?" rows={2} onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); send(draft); } }} />{pending ? <button className="send-button" type="button" onClick={() => request.current?.abort('stopped')} aria-label="Stop response"><Square size={15} /></button> : <button className="send-button" type="submit" disabled={!draft.trim()} aria-label="Send question"><ArrowUp size={19} /></button>}</form><p>AI can make mistakes. <Link to="/#work">Explore the work</Link> or <a href="mailto:pottingari@gmail.com">ask Hemachandra directly</a>.</p></div>
      </section>
    </main>
  </div>;
}
