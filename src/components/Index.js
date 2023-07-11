import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Edit from "../components/Edit";
import "./Index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";

function Index() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    calculateTotalAmount();
  }, [transactions]);

  async function fetchTransactions() {
    try {
      const response = await axios.get("http://localhost:3001/transactions");
      setTransactions(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function calculateTotalAmount() {
    const total = transactions.reduce((sum, transaction) => {
      return sum + transaction.amount;
    }, 0);
    setTotalAmount(total);
  }

  async function handleDeleteTransaction(id) {
    try {
      await axios.delete(`http://localhost:3001/transactions/${id}`);
      fetchTransactions();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container className="shadow-container">
      <h2 className="mt-4">All Transactions</h2>
      <h3>Bank Account Total: {totalAmount}</h3>
      {transactions.map((transaction) => (
        <div key={transaction.id} className="my-3 p-3 bg-light rounded">
          <Row>
            <Col>
              <p className="mb-2">
                <strong>Item Name:</strong> {transaction.item_name}
              </p>
              <p className="mb-2">
                <strong>Amount:</strong> {transaction.amount}
              </p>
              <p className="mb-2">
                <strong>Date:</strong> {transaction.date}
              </p>
              <p className="mb-2">
                <strong>From:</strong> {transaction.from}
              </p>
              <p className="mb-2">
                <strong>Category:</strong> {transaction.category}
              </p>
              <Button
                as={Link}
                to={`/edit/${transaction.id}`}
                variant="primary"
                className="me-2"
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDeleteTransaction(transaction.id)}
              >
                <FontAwesomeIcon icon={faTrash} /> Delete
              </Button>
            </Col>
          </Row>
        </div>
      ))}
    </Container>
  );
}

export default Index;
