import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Brain, ChevronDown, ChevronUp } from 'lucide-react';
import { useChatStore } from '../../stores/chatStore';
import { quickActions } from '../../data/mockData';
import type { ChatMessage, ThoughtStep } from '../../types/chat.types';
import styles from './AIChat.module.css';

// Simulated AI responses
const aiResponses: Record<string, { text: string; sql: string }> = {
  default: {
    text: 'Dựa trên phân tích dữ liệu từ bảng **Fact_Orders**, tôi nhận thấy:\n\n📊 **Doanh thu tháng 12/2024**: R$ 1.65M (tăng **4.15%** so với tháng trước)\n📦 **Tổng đơn hàng**: 11,050 đơn\n⭐ **Đánh giá trung bình**: 4.09/5\n\nXu hướng cho thấy doanh thu đang tăng đều qua các tháng, đặc biệt tháng 11-12 có sự tăng trưởng mạnh nhờ mùa lễ hội cuối năm.',
    sql: 'SELECT DATE_TRUNC(\'month\', order_date) AS month,\n       SUM(payment_value) AS revenue,\n       COUNT(DISTINCT order_id) AS orders\nFROM fact_orders\nWHERE order_date >= \'2024-01-01\'\nGROUP BY 1\nORDER BY 1;',
  },
};

export default function AIChat() {
  const { messages, addMessage, isLoading, setLoading } = useChatStore();
  const [input, setInput] = useState('');
  const [showThought, setShowThought] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const simulateResponse = async (userQuery: string) => {
    setLoading(true);
    const resp = aiResponses.default;

    // Add thought process
    const thoughtSteps: ThoughtStep[] = [
      { id: '1', label: 'Đang phân tích câu hỏi...', status: 'done' },
      { id: '2', label: 'Truy vấn bảng Fact_Orders...', status: 'done' },
      { id: '3', label: 'Tính toán thống kê...', status: 'done' },
      { id: '4', label: 'Tạo báo cáo...', status: 'done' },
    ];

    // Simulate streaming
    const aiMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isStreaming: true,
      sqlQuery: resp.sql,
      thoughtProcess: thoughtSteps,
    };

    addMessage(aiMsg);

    // Stream characters
    let current = '';
    for (let i = 0; i < resp.text.length; i++) {
      current += resp.text[i];
      await new Promise(r => setTimeout(r, 15));
      useChatStore.setState(state => {
        const msgs = [...state.messages];
        msgs[msgs.length - 1] = { ...msgs[msgs.length - 1], content: current };
        return { messages: msgs };
      });
    }

    useChatStore.setState(state => {
      const msgs = [...state.messages];
      msgs[msgs.length - 1] = { ...msgs[msgs.length - 1], isStreaming: false };
      return { messages: msgs };
    });
    setLoading(false);
    void userQuery;
  };

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };
    addMessage(userMsg);
    const query = input.trim();
    setInput('');
    simulateResponse(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.chatPanel}>
        {/* Header */}
        <div className={styles.chatHeader}>
          <div className={styles.chatHeaderIcon}><Bot size={18} /></div>
          <div>
            <div className={styles.chatHeaderTitle}>AI Data Assistant</div>
            <div className={styles.chatHeaderSub}>Powered by Agentic BI • Qwen3 LLM</div>
          </div>
        </div>

        {/* Messages */}
        <div className={styles.messages}>
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                className={`${styles.msgRow} ${msg.role === 'user' ? styles.msgRowUser : styles.msgRowAssistant}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', damping: 20 }}
              >
                <div className={`${styles.msgAvatar} ${msg.role === 'user' ? styles.msgAvatarUser : styles.msgAvatarAI}`}>
                  {msg.role === 'user' ? 'U' : '🤖'}
                </div>
                <div>
                  <div className={`${styles.msgBubble} ${msg.role === 'user' ? styles.msgBubbleUser : styles.msgBubbleAI}`}>
                    {msg.content.split('\n').map((line, i) => (
                      <span key={i}>
                        {line.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
                          part.startsWith('**') && part.endsWith('**')
                            ? <strong key={j}>{part.slice(2, -2)}</strong>
                            : part
                        )}
                        {i < msg.content.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                    {msg.isStreaming && <span className={styles.cursor} />}
                  </div>

                  {/* Thought process */}
                  {msg.thoughtProcess && (
                    <div className={styles.thought}>
                      <button className={styles.thoughtToggle} onClick={() => setShowThought(showThought === msg.id ? null : msg.id)}>
                        <Brain size={12} />
                        Thought Process
                        {showThought === msg.id ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                      </button>
                      {showThought === msg.id && (
                        <div className={styles.thoughtSteps}>
                          {msg.thoughtProcess.map(step => (
                            <div key={step.id} className={styles.thoughtStep}>
                              ✅ {step.label}
                            </div>
                          ))}
                          {msg.sqlQuery && (
                            <div className={styles.sqlBlock}>{msg.sqlQuery}</div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Quick actions */}
        <div className={styles.quickActions}>
          {quickActions.slice(0, 4).map(qa => (
            <motion.button
              key={qa.id}
              className={styles.quickChip}
              onClick={() => { setInput(qa.query); }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {qa.icon} {qa.label}
            </motion.button>
          ))}
        </div>

        {/* Input */}
        <div className={styles.inputArea}>
          <div className={styles.inputWrap}>
            <textarea
              className={styles.input}
              placeholder="Hỏi bất cứ điều gì về dữ liệu..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              id="chat-input"
            />
          </div>
          <motion.button
            className={styles.sendBtn}
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            id="chat-send-btn"
          >
            <Send size={18} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
