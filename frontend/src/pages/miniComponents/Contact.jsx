import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Send, Mail, User, FileText } from "lucide-react";

const Contact = () => {
  const [senderName, setSenderName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios.post("https://mern-stack-portfolio-backend-bf3p.onrender.com/api/v1/message/send",
      { senderName, subject, message },
      { withCredentials: true, headers: { "Content-Type": "application/json" } })
      .then(res => { toast.success(res.data.message); setSenderName(""); setSubject(""); setMessage(""); setLoading(false); })
      .catch(error => { toast.error(error.response.data.message); setLoading(false); });
  };

  return (
    <div className="w-full">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-amber-400 mb-3 font-medium">Get in touch</p>
        <h2 className="section-title text-4xl sm:text-5xl text-white">Contact Me</h2>
      </div>
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div className="flex flex-col gap-6">
          <p className="text-slate-400 text-lg leading-relaxed" style={{ fontFamily: "DM Sans" }}>
            Have a project in mind or want to discuss DevOps / Cloud opportunities? My inbox is always open.
          </p>
          {[
            { icon: <Mail size={18} />, label: "Email", value: "shivanhussain6@gmail.com" },
            { icon: <User size={18} />, label: "Availability", value: "Open for DevOps & Cloud roles" },
          ].map(i => (
            <div key={i.label} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)" }}>
                {i.icon}
              </div>
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wider">{i.label}</p>
                <p className="text-white text-sm mt-0.5">{i.value}</p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleMessage} className="glass rounded-3xl p-8 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-slate-400 text-sm flex items-center gap-2" style={{ fontFamily: "DM Sans" }}><User size={14} />Your Name</label>
            <input className="form-input" placeholder="John Doe" value={senderName} onChange={e => setSenderName(e.target.value)} required />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-slate-400 text-sm flex items-center gap-2" style={{ fontFamily: "DM Sans" }}><FileText size={14} />Subject</label>
            <input className="form-input" placeholder="DevOps Opportunity" value={subject} onChange={e => setSubject(e.target.value)} required />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-slate-400 text-sm flex items-center gap-2" style={{ fontFamily: "DM Sans" }}><Mail size={14} />Message</label>
            <textarea className="form-input resize-none" rows={4} placeholder="Tell me about the role or project..."
              value={message} onChange={e => setMessage(e.target.value)} required />
          </div>
          <button type="submit" disabled={loading} className="btn-primary flex items-center justify-center gap-2 mt-2 w-full">
            {loading ? (<><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="10" /></svg>Sending...</>) : (<><Send size={16} />Send Message</>)}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Contact;
