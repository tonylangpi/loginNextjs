import { NextResponse } from "next/server";
import User from "@/Models/user";
import {conectividad} from '@/libs/mongodb'
import bcryptjs from "bcryptjs";

export async function POST(request: Request) {
  const { fullname, email, password } = await request.json();
  console.log(fullname, email, password);
  if (!password || password.length < 6)
    return NextResponse.json(
      {
        message: "la contraseña debe tener al menos 6 caracteres",
      },
      {
        status: 404,
      }
    );

  try {
    await conectividad();
    const userFound = await User.findOne({ email });
    if (userFound)
      return NextResponse.json(
        {
          message: "Este correo ya esta registrado",
        },
        {
          status: 501,
        }
      );

    const hashpass = await bcryptjs.hash(password, 12);

    const user = new User({
      email,
      fullname,
      passwordHash: hashpass,
    });
    const UserSaved = await user.save();
    console.log(UserSaved);

    return NextResponse.json({
      id_usuario : UserSaved._id,
      fullname: UserSaved.fullname,
      email: UserSaved.email
    });
  } catch (error) {
      console.log(error);
     if(error instanceof Error)
      return NextResponse.json({
        message: error.message
      },{
        status:500
      });
  }
}
