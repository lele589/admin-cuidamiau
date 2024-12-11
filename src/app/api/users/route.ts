import { NextResponse } from 'next/server';
import type { User } from '../models/User';
import db from '../../../database/db';

// GET - Get all users
export async function GET() {
  try {
    const users = await db('users').select('*');
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener usuarios' },
      { status: 500 }
    );
  }
}

// POST - Create a new user
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.first_name || !body.last_name || !body.phone_number) {
      return NextResponse.json(
        { error: 'Los campos first_name, last_name y phone_number son obligatorios' },
        { status: 400 }
      );
    }

    const [newUser] = await db('users').insert({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email || null,
      phone_number: body.phone_number,
    }).returning('*');
    
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Error al crear usuario' },
      { status: 500 }
    );
  }
} 