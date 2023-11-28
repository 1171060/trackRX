import React from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Meds from "./Meds";
import "./Home.css";

function Home(props) {
  return (
    <div style={{ margin: "10px" }}>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th
              style={{ textAlign: "center", fontSize: "18pt", width: "100%" }}
            >
              trackRX - Medications List
            </th>
          </tr>
        </thead>
        <tbody>
          {Meds && Meds.length > 0 ? (
            Meds.map((item) => (
              <tr key={item.id}>
                <td>
                  <table>
                    <tr className="headerFooter">
                      <td colSpan="4"> &nbsp; {item.medID} &nbsp;</td>
                    </tr>
                    <tr>
                      <td colspan="2">Name: </td>
                      <td colspan="2">{item.medName}</td>
                    </tr>
                    <tr>
                      <td colspan="2">Start Date: </td>
                      <td colspan="2">{item.medStartDate}</td>
                    </tr>
                    <tr>
                      <td colspan="2">End Date: </td>
                      <td colspan="2">{item.medEndDate}</td>
                    </tr>
                    <tr>
                      <td colspan="2">Dosage: </td>
                      <td colspan="2">{item.medDose}</td>
                    </tr>
                    <tr>
                      <td colspan="2">Frequency: </td>
                      <td colspan="2">{item.medFrequency}</td>
                    </tr>
                    <tr>
                      <td colspan="2">Instructions: </td>
                      <td colspan="2">{item.medInstructions}</td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "center" }}>ico1</td>
                      <td style={{ textAlign: "center" }}>ico2</td>
                      <td style={{ textAlign: "center" }}>ico3</td>
                      <td style={{ textAlign: "center" }}>ico4</td>
                    </tr>
                    <tr className="headerFooter">
                      <td colSpan="4"> &nbsp;</td>
                    </tr>
                  </table>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No records found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default Home;
