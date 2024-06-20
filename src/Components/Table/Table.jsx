import React, { useEffect, useState } from "react";
import "./table.css";
import apis from "../../apis/apis";
import SpinnerLoader from "../PrivateRoutes/SpinnerLoader";
export default function Table() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    apis
      .getExams()
      .then((res) => {
        setExams(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container tablee">
      <div className="d-flex justify-content-between align-items-center py-3">
        <h3>Exam History</h3>
        <button className="btn btn-primary" onClick={() => {
          window.location.href = "/create";
          
        }}>Create</button>
      </div>
      <table className="table-bordered">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Created at</th>
            <th scope="col">Status</th>
            <th scope="col">Link</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => {
            const currentTime = new Date();
            const examStartTime = new Date(exam.start_time);
            const examEndTime = new Date(exam.end_time);

            let status;
            let statusClass;
            if (currentTime < examStartTime) {
              status = "Not started";
              statusClass = "status-not-started";
            } else if (currentTime > examEndTime) {
              status = "Ended";
              statusClass = "status-ended";
            } else {
              status = "Active";
              statusClass = "status-active";
            }

            const createdAt = new Date(exam.created_at);
            const formattedCreatedAt = `${createdAt.toLocaleDateString()} ${createdAt.toLocaleTimeString()}`;

            return (
              <tr key={exam.id}>
                <td>{exam.title}</td>
                <td>{formattedCreatedAt}</td>
                <td className={statusClass}>{status}</td>
                <td>
                  <a href={`/exam/${exam.id}`}>Link</a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
