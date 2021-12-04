const fs = require('fs');

module.exports = {
    // Add Method
    add(title, body) {
        // Fetch Task From DB File
        const db = this.list();

        // Create New Task Object
        const newTask = { title, body, completed: false };

        // Merge Old Data With new Task
        db.push(newTask);

        // Write Task to DB File
        this.save(db);
    },

    // List Method
    list() {
        return JSON.parse(fs.readFileSync('./db.json'));
    },

    // Report Method
    report(index) {
        const db = this.list();

        return db[index];
    },

    // Remove Method
    remove(index) {
        // Fetch All Data
        const db = this.list();
        
        // Remove Task By Index
        db.splice(index, 1);

        // Save Data
        this.save(db);
    },

    // Update Completed Status Method
    toggle(index) {
        // Fetch All Data
        const db = this.list();
        
        // Fetch Task by Index
        const task = db[index];
        
        // Reverse Task Completed Status
        task.completed = !task.completed;

        // Save Data
        this.save(db);
    },

    // Save Method
    save(data) {
        fs.writeFileSync('./db.json', JSON.stringify(data))
    }
};