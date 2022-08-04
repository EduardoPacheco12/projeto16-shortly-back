--Criando o banco de dados da aplicação

CREATE DATABASE "shortly";

--Criando a tabela "users"

CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
)

--Criando a tabela "urls"

CREATE TABLE "urls" (
	"id" SERIAL PRIMARY KEY,
	"url" TEXT NOT NULL,
	"shortUrl" TEXT NOT NULL,
	"view" INTEGER NOT NULL DEFAULT 0,
	"userId" INTEGER NOT NULL REFERENCES users(id),
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
)