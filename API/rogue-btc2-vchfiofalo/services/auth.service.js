const store = require('../data/store');
const jwtUtils = require('../utils/jwt');

module.exports = {
    login: (username) => {
        const admin = store.admins.find(a => a.username === username);
        if (!admin) throw new Error('Admin not found');
        return jwtUtils.sign({ username: admin.username, role: 'admin' });
    },
    register: (username, password) => {
        const existing = store.admins.find(a => a.username === username);
        if (existing) throw new Error('Admin exists');
        const admin = { username, password };
        store.admins.push(admin);
        return admin;
    }
};