var appShowResponse = new Vue({
    el: '#app',
    data: {
        showResponse: false,
        howMany: 5,
        min: 1,
        max: 5,
        orderedNumbers: [],
        animatedNumbers: [],
        yourAnswer: '',
        userOrder: null,
        isRight: false
    },
    computed: {
        numbersToOrder: function () {
            return getNumbers(this.howMany, this.min, this.max);
        }
    },
    methods: {
        show: function () {
            this.userOrder = this.yourAnswer.replace(/\s+/g, ' ').trim().split(" ").map(function (n) {
                return +n;
            });
            this.orderedNumbers = getSortedNumbers(this.numbersToOrder);
            this.isRight = compare(this.numbersToOrder, this.userOrder);
            console.log(this.orderedNumbers, this.userOrder, this.isRight);
            this.showResponse = true;
        },
        playAgain: function (howMany, min, max) {
            this.howMany = this.min = this.max = 0;
            this.howMany = +howMany;
            this.min = +min;
            this.max = +max;
            this.numbersToOrder = getNumbers(this.howMany, this.min, this.max);
            this.orderedNumbers = getSortedNumbers(this.numbersToOrder);
            this.showResponse = false;
            this.errors = [];
            this.yourAnswer = '';
            document.getElementById("inputAnswer").focus();
        }
    }
});