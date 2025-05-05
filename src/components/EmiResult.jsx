import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useExchangeRates } from "../hooks/useExchangeRates";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
} from "@mui/material";

const EmiResult = ({ emi, schedule }) => {
  const { currency, setCurrency } = useContext(GlobalContext);
  const { rates, loading } = useExchangeRates();
  const [selectedCurrency, setSelectedCurrency] = useState(currency);

  const handleChange = (e) => {
    setSelectedCurrency(e.target.value);
    setCurrency(e.target.value);
  };

  const convertedEmi = loading
    ? emi
    : (emi * (rates[selectedCurrency] || 1)).toFixed(2);

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Monthly EMI: ${emi}</h2>
      <div style={{ marginBottom: "1rem" }}>
        <Select value={selectedCurrency} onChange={handleChange}>
          {Object.keys(rates).map((cur) => (
            <MenuItem key={cur} value={cur}>
              {cur}
            </MenuItem>
          ))}
        </Select>
      </div>

      <h3>Amortization Schedule ({selectedCurrency})</h3>

      <div
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Month</TableCell>
              <TableCell>Principal</TableCell>
              <TableCell>Interest</TableCell>
              <TableCell>Remaining Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedule.map((row) => (
              <TableRow key={row.month}>
                <TableCell>{row.month}</TableCell>
                <TableCell>
                  {row.principal.toFixed(2)} {selectedCurrency}
                </TableCell>
                <TableCell>
                  {row.interest.toFixed(2)} {selectedCurrency}
                </TableCell>
                <TableCell>
                  {row.balance.toFixed(2)} {selectedCurrency}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EmiResult;
