import { useExchangeRates } from "../hooks/useExchangeRates";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Pagination,
} from "@mui/material";
import { useState } from "react";

const ExchangeRates = () => {
  const { rates, loading } = useExchangeRates();
  const currencies = Object.keys(rates);
  const [page, setPage] = useState(1);

  const rowsPerPage = 10;
  const paginatedCurrencies = currencies.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  if (loading) return <h2>Loading exchange rates...</h2>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Live Exchange Rates (Base: USD)</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Currency</TableCell>
            <TableCell>Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedCurrencies.map((cur) => (
            <TableRow key={cur}>
              <TableCell>{cur}</TableCell>
              <TableCell>{rates[cur]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        count={Math.ceil(currencies.length / rowsPerPage)}
        page={page}
        onChange={(e, value) => setPage(value)}
        color="primary"
        sx={{ marginTop: "1rem" }}
      />
    </div>
  );
};

export default ExchangeRates;
