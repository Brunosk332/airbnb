import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";
export async function POST(request: Request) {
  const {name, email, password } = await request.json();
  //verify if the email and password are not empty
  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    return NextResponse.json(
      { error: "Preencha todos os campos" },
      { status: 400 },
    );
  }
  //lowercase the email
  const emailFormat = email.toLowerCase();
  //email validation function
  const validateEmail = (emailFormat: string) => {
    const emailRegex = /^[a-z0-9](?:[a-z0-9._%+-]*[a-z0-9])?@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)*\.[a-z]{2,}$/i;
    return emailRegex.test(emailFormat);
  };
  //calling the validateEmail function
  if (!validateEmail(emailFormat)) {
    return NextResponse.json({ error: "E-mail invalido" }, { status: 400 });
  }
  //verify if the name is between 4 and 50characters
  if(name.length < 4 || name.length > 50) {
    return NextResponse.json({error:"o nome deve conter entre 4 e 50 caracteres"}, {status: 400})
  }
  //verify if the email is between 10 and 150 characters
  if(email.length < 10 || email.length > 150) {
    return NextResponse.json({error:"o email deve conter entre 10 e 150 caracteres"}, {status: 400})
  }
  //verify if the password is between 10 and 100 characters
if (password.length < 10 || password.length > 100) {
    return NextResponse.json({ error:"a senha deve conter entre 10 e 100 caracteres" }, {status: 400})
}
//hash th epassword
const password_hash = await bcrypt.hash(password, 10);
  try {

    //check if the email already exists at the database
    const verifyEmail = await pool.query(
      "Select * from airbnb.users where email = $1",
      [emailFormat]
    );
    if (verifyEmail.rows.length > 0) {
      return NextResponse.json(
        { error: "email ja cadastrado" },
        { status: 409 },
      );
    }
    //insert the email and password_hash into the database
    const insert = await pool.query(
      "INSERT INTO airbnb.users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, is_host",
      [name, emailFormat, password_hash]
    );
    return NextResponse.json(insert.rows[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao cadastrar" }, { status: 500 });
  }
}
