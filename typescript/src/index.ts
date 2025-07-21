import express, { Request, Response } from 'express';

const app = express();
const PORT: number = 3000;

interface Utilisateur {
    id: number;
    nom: string;
}

app.get('/user', (req: Request, res: Response): void => {
    const user: Utilisateur = { id: 1, nom: 'Alice' };
    res.json(user);
});

app.get('/', (req: Request, res: Response): void => {
    res.send('Bienvenue sur mon serveur Node.js + TypeScript 🚀');
});

app.listen(PORT, (): void => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
