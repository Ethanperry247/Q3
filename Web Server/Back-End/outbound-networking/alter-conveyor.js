module.exports = function CreateAlterConveyor({ http }) {
    return async (state) => {
        const response = await http.get(`localhost:5000/conveyor/${state}`);
        if (response.data) {
            return true;
        } else {
            return false;
        }
    };
};