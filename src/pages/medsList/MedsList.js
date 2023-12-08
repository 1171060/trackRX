import React from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Meds from "../../components/database/Meds";
import "./medsList.css";
import logo from "../../assets/images/logoB.png";

function MedsList(props) {
  return (
    <div style={{ margin: "10px" }}>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th></th>
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
                      <td colspan="2" className="top-aligned">
                        Name:
                      </td>
                      <td colspan="2" className="top-aligned">
                        {item.medName}
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2" className="top-aligned">
                        Start Date:
                      </td>
                      <td colspan="2" className="top-aligned">
                        {item.medStartDate}
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2" className="top-aligned">
                        End Date:
                      </td>
                      <td colspan="2" className="top-aligned">
                        {item.medEndDate}
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2" className="top-aligned">
                        Dosage:
                      </td>
                      <td colspan="2" className="top-aligned">
                        {item.medDose}
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2" className="top-aligned">
                        Frequency:
                      </td>
                      <td colspan="2" className="top-aligned">
                        {item.medFrequency}
                      </td>
                    </tr>
                    <tr>
                      <td colspan="4" className="top-aligned">
                        Instructions:
                      </td>
                    </tr>
                    <tr>
                      <td colspan="4" className="top-aligned">
                        {item.medInstructions}
                      </td>
                    </tr>
                    <tr>
                      <td className="spaceRow">ico1</td>
                      <td className="spaceRow">ico2</td>
                      <td className="spaceRow">ico3</td>
                      <td className="spaceRow">ico4</td>
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

export default MedsList;
