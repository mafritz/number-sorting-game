var appPointAndClick = new Vue({
    el: '#app',
    data: {
        showResponse: false,
        howMany: 5,
        min: 1,
        max: 5,
        orderedNumbers: [],
        replyNumbers: [],
        isRight: null
    },
    computed: {
        correctAnswer: function () {
            return getSortedNumbers(this.numbersToOrder).join(", ");
        },
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
            this.orderedNumbers = getSortedNumbers(this.numbersToOrder);
            this.showResponse = false;
            this.replyNumbers = [];
            $('#listNumbers button')
                .removeClass('btn-game-disabled')
                .addClass('alert-warning')
                .removeAttr('disabled');
        },
        addNumber: function (event) {
            if (event.target.tagName === 'BUTTON') {
                this.replyNumbers.push(event.target.childNodes[0].innerHTML);
                event.target.disabled = true;
                event.target.classList.remove('alert-warning');
                event.target.classList.add('btn-game-disabled');
            } else {
                this.replyNumbers.push(event.target.innerHTML);
                event.target.parentNode.disabled = true;
                event.target.parentNode.classList.remove('alert-warning');
                event.target.parentNode.classList.add('btn-game-disabled');
            }
            this.checkResponse();
        },
        checkResponse: function () {
            if (+this.howMany === +this.replyNumbers.length) {
                this.isRight = compare(this.numbersToOrder, this.replyNumbers);
                this.showResponse = true;
            }
        }
    }
});