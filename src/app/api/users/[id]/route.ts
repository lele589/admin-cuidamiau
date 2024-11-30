import { NextResponse } from 'next/server';
import type { User } from '../../models/User';

declare let users: User[];

// GET - Get a user by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = users.find(u => u.id === Number(params.id));
    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener usuario' },
      { status: 500 }
    );
  }
}

// PUT - Update a user
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const index = users.findIndex(u => u.id === parseInt(params.id));
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    // Validate required fields if provided
    if (body.first_name === '' || body.last_name === '' || body.dni === '') {
      return NextResponse.json(
        { error: 'Los campos first_name, last_name y dni no pueden estar vacíos' },
        { status: 400 }
      );
    }

    users[index] = {
      ...users[index],
      ...body,
      updatedAt: new Date(),
    };

    return NextResponse.json(users[index], { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al actualizar usuario' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a user
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const initialLength = users.length;
    users = users.filter(u => u.id !== parseInt(params.id));
    
    if (users.length === initialLength) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Usuario eliminado correctamente' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al eliminar usuario' },
      { status: 500 }
    );
  }
} 