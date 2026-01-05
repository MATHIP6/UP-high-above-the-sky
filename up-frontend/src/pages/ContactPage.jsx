import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  function submit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="col" style={{ maxWidth: 700 }}>
      <div className="card">
        <h1 style={{ marginTop: 0 }}>Contact</h1>
        <div className="small">V1: formulaire simple (envoi simulé).</div>
      </div>

      <form className="card col" onSubmit={submit}>
        <div className="row wrap">
          <div style={{ flex: 1 }}>
            <label>Nom</label>
            <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div style={{ flex: 1 }}>
            <label>Email</label>
            <input className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
        </div>

        <div>
          <label>Sujet</label>
          <input className="input" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
        </div>

        <div>
          <label>Message</label>
          <textarea rows="6" className="input" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
        </div>

        <button className="btn primary" type="submit">Envoyer</button>

        {sent && <div className="card" style={{ borderColor: "#bbf7d0", color: "#166534" }}>Message envoyé (simulation V1).</div>}
      </form>
    </div>
  );
}
