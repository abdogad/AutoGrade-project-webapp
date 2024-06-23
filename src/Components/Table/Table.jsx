import React, { useEffect, useState } from "react";
import "./table.css";
import apis from "../../apis/apis";
import { baseURL, frontbaseURL } from "../../axios/axios";
import { FaCopy } from "react-icons/fa"; // Import the copy icon from react-icons

export default function Table() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedExamId, setCopiedExamId] = useState(null);

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

  const copyToClipboard = (link, examId) => {
    navigator.clipboard.writeText(link).then(() => {
      setCopiedExamId(examId);
      setTimeout(() => setCopiedExamId(null), 2000);
    });
  };

  return (
    <div className="container tablee">
      <div className="d-flex justify-content-between align-items-center py-3">
        <h3>Exam History</h3>
        <button
          className="btn btn-primary"
          onClick={() => {
            window.location.href = "/create";
          }}
        >
          Create
        </button>
      </div>
      {exams.length === 0 ? (
        <div className="no-exams-message">
          <p>No exams available.</p>
        </div>
      ) : (
        <table className="table-bordered">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Created at</th>
              <th scope="col">Status</th>
              <th scope="col">Responses</th>
              <th scope="col" style={{ width: "12%" }}>Copy Link</th> {/* Set width for the Copy Link column */}
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
              const csvLink = `${baseURL}/media/results_${exam.id}.csv`;
              const examLink = `${frontbaseURL}/exam/${exam.id}`;

              return (
                <tr key={exam.id}>
                  <td>{exam.title}</td>
                  <td style={{ fontSize: "0.9rem" }}>{formattedCreatedAt}</td>
                  <td className={statusClass}>{status}</td>
                  <td>
                    <a href={csvLink}>Link</a>
                  </td>
                  <td>
                    <div className="copy-container">
                      <FaCopy
                        className="copy-icon"
                        onClick={() => copyToClipboard(examLink, exam.id)}
                      />
                      {copiedExamId === exam.id && (
                        <span className="tooltip-text">Copied!</span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
