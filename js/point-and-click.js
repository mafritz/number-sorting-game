var appPointAndClick = new Vue({
    el: '#app',
    data: {
        showResponse: false,
        howMany: 5,
        newHowMany: 5,
        numbersToOrder: getNumbers(5, 10, 100),
        orderedNumbers: [],
        replyNumbers: [],
        isRight: null
    },
    computed: {
        correctAnswer: function () {
            return getSortedNumbers(this.numbersToOrder).join(", ");
        }
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
            if (+this.newHowMany === +this.replyNumbers.length) {
                this.isRight = compare(this.numbersToOrder, this.replyNumbers);
                this.showResponse = true;
            }
        }
    }
});