// pages/api/movies.js
import { pool } from '../../../db';

export default async function handler(req, res) {
  if (req.method === 'GET') {                                           // GET endpoint
    const { rows } = await pool.query('SELECT * FROM movies');
    res.status(200).json(rows);
  } 

  else if (req.method === 'POST') {                                     // POST endpoint
    const { title, genre } = req.body;
    const { rows } = await pool.query('INSERT INTO movies (title, genre) VALUES ($1, $2) RETURNING *', [title, genre]);
    res.status(201).json(rows[0]);
  } 

  else if (req.method === 'PUT') {                                       // PUT endpoint
    const { id, title, genre } = req.body;

    const existingMovie = await pool.query('SELECT * FROM movies WHERE id = $1', [id]);

    if (existingMovie.rows.length === 0) {
      res.status(404).json({ error: 'Movie not found' });
    } else {
      const { rows } = await pool.query('UPDATE movies SET title = $1, genre = $2 WHERE id = $3 RETURNING *', [title, genre, id]);
      res.status(200).json(rows[0]);
    }
  } 

  else if (req.method === 'DELETE') {                                    // DELETE endpoint
    const { id } = req.body;

    const existingMovie = await pool.query('SELECT * FROM movies WHERE id = $1', [id]);

    if (existingMovie.rows.length === 0) {
      res.status(404).json({ error: 'Movie not found' });
    } else {
      await pool.query('DELETE FROM movies WHERE id = $1', [id]);
      res.status(200).end();
    }
  } 
  
  else {
    res.status(405).end();
  }
}
