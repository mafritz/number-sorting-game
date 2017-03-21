var appDragAndDrop = new Vue({
    el: '#app',
    data: {
        showResponse: false,
        howMany: 5,
        newHowMany: 5,
        numbersToOrder: getNumbers(5, 10, 100),
        orderedNumbers: [],
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
        },
        checkResponse: function () {
            var replyNumbers = [];
            $("#listNumbers li").each(function () {
                replyNumbers.push(+$(this).text());
            });
            if (compare(this.numbersToOrder, replyNumbers)) {
                this.showResponse = true;
                this.isRight = true;
            } else {
                this.showResponse = false;
                this.isRight = false;
            }
        },
        showFeedback: function () {
            this.showResponse = true;
            this.isRight = false;
        }
    }
});

$("#listNumbers").sortable({
    axis: "x",
    cursor: "move",
    placeholder: "ui-state-highlight",
    forcePlaceholderSize: true,
    update: function () {
        appDragAndDrop.checkResponse();
    }
});
$("#listNumbers").disableSelection();