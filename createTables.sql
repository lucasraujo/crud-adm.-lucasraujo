
CREATE TABLE users(
    "id" BIGSERIAL PRIMARY KEY,
    "name" VARCHAR(20) NOT NULL,
    "email" VARCHAR(100) UNIQUE NOT NULL,
    "password" VARCHAR(120) NOT NULL,
    "admin" BOOLEAN DEFAULT false NOT NULL,
    "active" BOOLEAN DEFAULT true NOT NULL
);

