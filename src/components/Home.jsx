import { useState, useContext } from "react";
import { TextField, Button, MenuItem, Alert } from "@mui/material";
import { useEmiCalculator } from "../hooks/useEmiCalculator";
import EmiResult from "./EmiResult";
import { GlobalContext } from "../context/GlobalContext";

const Home = () => {
  const [loan, setLoan] = useState(10000);
  const [rate, setRate] = useState(6.5);
  const [term, setTerm] = useState(4);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState("");
  const { currency } = useContext(GlobalContext);
  const [finalEmi, setFinalEmi] = useState(null);
  const [finalSchedule, setFinalSchedule] = useState([]);

  const { emi, schedule } = useEmiCalculator(loan, rate, term);

  const handleCalculate = () => {
    if (!loan || isNaN(loan) || loan <= 0) {
      setError("Please enter a valid Loan Amount.");
      setShowResult(false);
      return;
    }
    if (!rate || isNaN(rate) || rate <= 0) {
      setError("Please enter a valid Interest Rate.");
      setShowResult(false);
      return;
    }
    if (!term || isNaN(term) || term <= 0) {
      setError("Please enter a valid Term in Years.");
      setShowResult(false);
      return;
    }

    setError(""); // clear previous errors
    setFinalEmi(emi);
    setFinalSchedule(schedule);
    setShowResult(true);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Loan Calculator Dashboard</h1>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "1rem",
          marginTop: "2rem",
          flexWrap: "wrap",
        }}
      >
        <TextField
          label="Loan Amount"
          value={loan}
          onChange={(e) => setLoan(e.target.value)}
        />
        <TextField
          label="Interest Rate (%)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />
        <TextField
          label="Term (Years)"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>
      <Button variant="contained" onClick={handleCalculate}>
        Calculate
      </Button>
      {error && (
        <Alert severity="error" style={{ marginTop: "1rem" }}>
          {error}
        </Alert>
      )}
      {showResult && finalEmi !== null && (
        <EmiResult emi={emi} schedule={finalSchedule} />
      )}
    </div>
  );
};

export default Home;
