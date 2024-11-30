import { NextResponse } from 'next/server';
import type { User } from '../models/User';

// TODO: migrate to a database
let users: User[] = [];
let lastId = 0;

// GET - Get all users
export async function GET() {
  try {
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
    
    // Validate required fields
    if (!body.first_name || !body.last_name || !body.dni) {
      return NextResponse.json(
        { error: 'Los campos first_name, last_name y dni son obligatorios' },
        { status: 400 }
      );
    }

    const newUser: User = {
      id: ++lastId,
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email || null,
      phone_number: body.phone_number || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    users.push(newUser);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al crear usuario' },
      { status: 500 }
    );
  }
} 