import pool from "../db";

// Payment type definition
export interface Payment {
  id: string;
  challan_id: string;
  user_id: string;
  amount: number;
  status: string;
  paid_at: Date;
}

// Create a new payment
export const createPayment = async (
  challan_id: string,
  user_id: string,
  amount: number
): Promise<Payment> => {
  const query = `
    INSERT INTO payments (challan_id, user_id, amount, status)
    VALUES ($1, $2, $3, 'SUCCESS')
    RETURNING *
  `;
  const values = [challan_id, user_id, amount];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Get payments by user id
export const getPaymentsByUser = async (user_id: string): Promise<Payment[]> => {
  const query = `SELECT * FROM payments WHERE user_id = $1 ORDER BY paid_at DESC`;
  const result = await pool.query(query, [user_id]);
  return result.rows;
};
