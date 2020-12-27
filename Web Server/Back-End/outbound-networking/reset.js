module.exports = function CreateReset({ http }) {
    return async () => {
        const response = await http.get(`localhost:5000/reset/$`);
        if (response.data) {
            return true;
        } else {
            return false;
        }
    };
};