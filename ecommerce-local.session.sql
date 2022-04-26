show TABLEs;

create table usuarios (
    id_usuario INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100),
    senha VARCHAR(100)
)
