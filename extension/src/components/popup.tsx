import { useState } from "react";

const Popup = () => {
  const [input, setInput] = useState(""); // Stores user input
  const [response, setResponse] = useState(""); // Stores OpenAI response
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://localhost:5000/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      const data = await res.json();
      setResponse(data.output);
    } catch (error) {
      console.error("API Error:", error);
      setResponse("Error fetching response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "10px", width: "250px", background: "#fff", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", borderRadius: "5px" }}>
      <p>Enter a prompt:</p>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type something..."
        style={{ width: "100%", padding: "5px", marginBottom: "10px" }}
      />
      <button onClick={handleSubmit} disabled={loading} style={{ padding: "5px 10px", cursor: "pointer" }}>
        {loading ? "Processing..." : "Submit"}
      </button>

      {response && (
        <div style={{ marginTop: "10px", padding: "10px", background: "#f1f1f1", borderRadius: "5px" }}>
          <strong>Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default Popup;
