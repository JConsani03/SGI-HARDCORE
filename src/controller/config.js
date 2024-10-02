import dotenv from 'dotenv';

dotenv.config();

export const SV_PORT = process.env.SV_PORT || 3333;
export const SV_URL = process.env.SV_URL || `http://localhost:${SV_PORT}/`;