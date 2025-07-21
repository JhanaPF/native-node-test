// Types

const nom: string = "Alice";
const age: number = 30;
const actif: boolean = true;

const notes: number[] = [10, 14, 18];
const couple: [string, number] = ["Bob", 25];

enum Role {
    Admin,
    User,
    Invité,
}

const role: Role = Role.Admin;

type Status = "actif" | "inactif";

type UtilisateurBase = { id: number; nom: string };
type UtilisateurActif = UtilisateurBase & { status: "actif" };

const utilisateur: UtilisateurActif = {
    id: 1,
    nom: "Alice",
    status: "actif"
};

// Functions

function addition(a: number, b: number): number {
    return a + b;
}

function salut(nom: string = "visiteur"): void {
    console.log(`Salut ${nom}`);
}

// Generic function

function identite<T>(val: T): T {
    return val;
}

const a = identite<number>(123);
const b = identite<string>("hello");


// Class

class Animal {
    nom: string;

    constructor(nom: string) {
        this.nom = nom;
    }

    speaks(): void {
        console.log(`${this.nom} is speaking.`);
    }
}

const dog = new Animal("Rex");
dog.speaks();

