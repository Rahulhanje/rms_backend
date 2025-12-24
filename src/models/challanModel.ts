import pool from "../db";

// Challan type definition
export interface Challan {
  id: string;
  vehicle_id: string;
  issued_by: string;
  violation_type: string;
  amount: number;
  status: string;
  issued_at: Date;
}

// Create a new challan
export const createChallan = async (
  vehicle_id: string,
  issued_by: string,
  violation_type: string,
  amount: number
): Promise<Challan> => {
  const query = `
    INSERT INTO challans (vehicle_id, issued_by, violation_type, amount, status)
    VALUES ($1, $2, $3, $4, 'UNPAID')
    RETURNING *
  `;
  const values = [vehicle_id, issued_by, violation_type, amount];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Get challans by vehicle id
export const getChallansByVehicle = async (vehicle_id: string): Promise<Challan[]> => {
  const query = `SELECT * FROM challans WHERE vehicle_id = $1 ORDER BY issued_at DESC`;
  const result = await pool.query(query, [vehicle_id]);
  return result.rows;
};

// Get challans by user id (for citizens viewing their own challans)
export const getChallansByUser = async (user_id: string): Promise<Challan[]> => {
  const query = `
    SELECT c.* FROM challans c
    JOIN vehicles v ON c.vehicle_id = v.id
    WHERE v.owner_id = $1
    ORDER BY c.issued_at DESC
  `;
  const result = await pool.query(query, [user_id]);
  return result.rows;
};
