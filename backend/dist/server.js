"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
(0, database_1.default)()
    .then(() => {
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
})
    .catch((error) => {
    console.error("Falha ao conectar ao banco de dados!", error);
});
