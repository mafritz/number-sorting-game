var appShowResponse = new Vue({
    el: '#app',
    data: {
        showResponse: false,
        howMany: 5,
        newHowMany: 5,
        numbersToOrder: getNumbers(5, 10, 100),
        orderedNumbers: [],
        animatedNumbers: []
    },
    methods: {
        show: function () {
            this.orderedNumbers = getSortedNumbers(this.numbersToOrder);
            this.showResponse = true;
        },
        playAgain: function () {
            this.numbersToOrder = getNumbers(this.newHowMany, 10, 100);
            this.orderedNumbers = getSortedNumbers(this.numbersToOrder);
            this.showResponse = false;
        }
    }
});