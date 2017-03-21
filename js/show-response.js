var appShowResponse = new Vue({
    el: '#app',
    data: {
        showResponse: false,
        howMany: 5,
        min: 1,
        max: 5,
        orderedNumbers: [],
        animatedNumbers: []
    },
    computed: {
        numbersToOrder: function () {
            return getNumbers(this.howMany, this.min, this.max);
        }
    },
    methods: {
        show: function () {
            this.orderedNumbers = getSortedNumbers(this.numbersToOrder);
            this.showResponse = true;
        },
        playAgain: function (howMany, min, max) {
            this.howMany = +howMany;
            this.min = +min;
            this.max = +max;
            this.numbersToOrder = getNumbers(this.howMany, this.min, this.max);
            this.orderedNumbers = getSortedNumbers(this.numbersToOrder);
            this.showResponse = false;
            this.errors = [];
        }
    }
});