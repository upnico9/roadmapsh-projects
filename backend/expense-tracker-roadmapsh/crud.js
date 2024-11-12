import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class Crud {
    constructor() {
        this.data = [];

        this.filePath = path.join(__dirname, 'data.json');
        // check if the file exists
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, '[]');
        }
        this.loadData();
    }
    
    loadData() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            this.data = JSON.parse(data);
        } catch (err) {
            console.log(err);
        }
    }
    
    saveData() {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
        } catch (err) {
            console.log(err);
        }
    }
    
    create(item) {
        this.data.push(item);
        this.saveData();
    }
    
    read() {
        return this.data;
    }

    get(id) {
        return this.data.find((el) => el.id === id);
    }
    
    update(id, item) {
        const index = this.data.findIndex((el) => el.id === id);
        if (index !== -1) {
        this.data[index] = item;
        this.saveData();
        }
    }
    
    delete(id) {
        const index = this.data.findIndex((el) => el.id === id);
        if (index !== -1) {
            this.data.splice(index, 1);
            this.saveData();
            }
        }
    }