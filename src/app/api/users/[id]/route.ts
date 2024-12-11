import { NextResponse } from 'next/server';
import type { User } from '../../models/User';
import db from '../../../../database/db';

// GET - Get a user by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await params.id;
    const user = await db('users').where('id', userId).first();
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

// PATCH - Update a user
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { id: userId } = await params

    const existingUser = await db('users').where('id', userId).first();
    if (!existingUser) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    if (body.first_name === '' || body.last_name === '' || body.dni === '') {
      return NextResponse.json(
        { error: 'Los campos first_name, last_name y dni no pueden estar vacíos' },
        { status: 400 }
      );
    }

    const updatedFields: Partial<User> = {};
    if (body.first_name) updatedFields.first_name = body.first_name;
    if (body.last_name) updatedFields.last_name = body.last_name;

    const updatedUser = await db('users')
      .where('id', userId)
      .update({
        ...updatedFields,
        updatedAt: new Date(),
      })
      .returning('*');

    return NextResponse.json(updatedUser[0], { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
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
    const { id: userId } = await params

    const existingUser = await db('users').where('id', userId).first();
    if (!existingUser) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    await db('users').where('id', userId).del();

    return NextResponse.json(
      { message: 'Usuario eliminado correctamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Error al eliminar usuario' },
      { status: 500 }
    );
  }
} 