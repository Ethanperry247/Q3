
const dateDictionary = {
    'oneHour': 60 * 60 * 1000,
    'threeHours': 3 * 60 * 60 * 1000,
    'sixHours': 6 * 60 * 60 * 1000,
    'oneDay': 24 * 60 * 60 * 1000,
    'threeDays': 3 * 24 * 60 * 60 * 1000,
    'oneWeek': 7 * 24 * 60 * 60 * 1000,
    'fourWeeks': 4 * 7 * 24 * 60 * 60 * 1000,
};

class DatePicker {
    constructor() {

        // Bind this to the applicable class methods.
        this.handleChange = this.handleChange.bind(this);
        this.createNewChart = this.createNewChart.bind(this);
        this.removeData = this.removeData.bind(this);
        this.addData = this.addData.bind(this);

        // Create default dates (one month range).
        const endDate = new Date();
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);

        // Start date PickerJS picker.
        const startDatePicker = document.getElementById('js-date-picker-from');
        this.startDatePicker = new Picker(startDatePicker, {
            date: this.formatDate(startDate),
            format: 'YYYY-MM-DD HH:mm:ss',
        });
        startDatePicker.addEventListener("change", this.handleChange);
        startDatePicker.value = this.formatDate(startDate); // Set the start date in html.

        // End date.
        const endDatePicker = document.getElementById('js-date-picker-to');
        this.endDatePicker = new Picker(endDatePicker, {
            date: this.formatDate(endDate),
            format: 'YYYY-MM-DD HH:mm:ss',
        });
        endDatePicker.addEventListener("change", this.handleChange);
        endDatePicker.value = this.formatDate(endDate); // Set the end date in html.

        // The aggregation change dropdown.
        this.aggChange = document.getElementById("submitAggregationChange");
        this.aggChange.addEventListener("change", this.handleChange);

        // The main chart.
        this.ctx = document.getElementById('myChart').getContext('2d');
        this.chart = this.createNewChart();
        this.handleChange();
    }
    
    formatDate(date) {
        try {
            return `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        } catch (e) {
            console.log("Incorrect Date Supplied!");
        }
    }

    addData(label, boxData, cupData) {
        this.chart.data.labels.push(...label);
        this.chart.data.datasets[0].data.push(...boxData);
        this.chart.data.datasets[1].data.push(...cupData);
        this.chart.update();
    }
    
    removeData() {
        this.chart.data.labels = [];
        this.chart.data.datasets.forEach((dataset) => {
            dataset.data = [];
        });
        this.chart.update();
    }

    createNewChart() {
        return new Chart(this.ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: "Boxes",
                    borderColor: '#3993DD',
                    data: [],
                    backgroundColor: '#3993DD33'
                }, {
                    label: "Cups",
                    borderColor: '#907AD6',
                    data: [],
                    backgroundColor: '#907AD633'
                }]
            },
            options: {
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
                        defaultFontFamily: "'Open Sans', sans-serif",
                    }
                },
                scales: {
                    x: {
                        type: 'time',
                    }
                }
            }
        });
    }

    async handleChange() {
        const startDate = new Date(this.startDatePicker.getDate()).getTime();
        const endDate = new Date(this.endDatePicker.getDate()).getTime();
        const newAgg = dateDictionary[this.aggChange.value];
        const arrLength = Math.floor((endDate - startDate) / newAgg);

        const aggregateData = (dataform, data) => {
            return dataform.map((value, index) => {
                return data.filter(item => {
                    const timestamp = (new Date(item.timestamp)).getTime();
                    return timestamp > value && timestamp < value + newAgg;
                }).length;
            });
        };

        if (arrLength > 0) {
            if (arrLength > 200) {
                alert("Too many data points. Try reducing your time range or incresing your data aggreagtion.");
                return;
            }

            const aggArray = new Array(arrLength).fill(0);
            const filledArray = aggArray.map((value, index) => index * newAgg + startDate);

            const cupData = aggregateData(filledArray, await GetCupsPerTime(startDate, endDate));
            const boxData = aggregateData(filledArray, await GetBoxesPerTime(startDate, endDate));

            this.removeData();
            this.addData(filledArray.map(value => this.formatDate(new Date(value))), boxData, cupData);

            } else {
                alert("Invalid Time Range!");
            return;
        }
    }
}

const datePicker = new DatePicker();