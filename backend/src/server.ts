import connectDB from "./config/database";
import app from "./app"

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch((error) => {
    console.error("Falha ao conectar ao banco de dados!", error);
  });
