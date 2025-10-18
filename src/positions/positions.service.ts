// ✅ NEW FILE
// Raw SQL queries for positions CRUD

import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class PositionsService {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    const [rows]: any = await this.db.pool.query('SELECT * FROM positions');
    return rows;
  }

  async findById(id: number) {
    const [rows]: any = await this.db.pool.query('SELECT * FROM positions WHERE position_id = ?', [id]);
    return rows[0];
  }

  async create(position_code: string, position_name: string, userId: number) {
    const [result]: any = await this.db.pool.query(
      'INSERT INTO positions (position_code, position_name, id) VALUES (?, ?, ?)',
      [position_code, position_name, userId],
    );
    return { position_id: result.insertId, position_code, position_name, id: userId };
  }

  async update(id: number, position_code: string, position_name: string) {
    await this.db.pool.query(
      'UPDATE positions SET position_code = ?, position_name = ?, updated_at = CURRENT_TIMESTAMP WHERE position_id = ?',
      [position_code, position_name, id],
    );
    return { message: 'Position updated successfully' };
  }

  async delete(id: number) {
    await this.db.pool.query('DELETE FROM positions WHERE position_id = ?', [id]);
    return { message: 'Position deleted successfully' };
  }
}
