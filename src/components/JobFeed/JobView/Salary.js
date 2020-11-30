import React from "react";
import styled from "styled-components";

const Salary = ({ salary }) => {
  const rows = salary.map((obj) => {
    let row = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        row.push(obj[key]);
      }
    }
    return row;
  });

  return (
    <Container>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <TH>Level</TH>
            <TH>Total</TH>
            <TH>Base</TH>
            <TH>Stock</TH>
            <TH>Bonus</TH>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <TD key={j} odd={i % 2}>
                  {cell}
                </TD>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

const Container = styled.div`
  font-size: 0.875em;
  color: #2d3748;
`;

const TH = styled.th`
  padding: 8px;
  text-align: left;
  font-weight: 700;
  border-bottom: 1px solid #edf2f7;
`;

const TD = styled.td`
  padding: 8px;
  background: ${({ odd }) => (odd ? "#f7fafc" : "#ffffff")};
`;

export default Salary;
