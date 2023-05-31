export class Symptom {
    id!: number;
    name!: string;
    choosen!: boolean;

    constructor(symptom: any) {
        this.id = symptom.id;
        this.name = symptom.name;
    }
}