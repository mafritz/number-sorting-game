var appPointAndClick = new Vue({
  el: "#app",
  data: {
    warmUp: true,
    showResponse: false,
    showFeedback: false,
    howMany: 5,
    min: 1,
    max: 5,
    orderedNumbers: [],
    replyNumbers: [],
    isRight: null,
  },
  computed: {
    correctAnswer: function () {
      return getSortedNumbers(this.numbersToOrder);
    },
    numbersToOrder: function () {
      return getNumbers(this.howMany, this.min, this.max);
    },
  },
  filters: {
    formatNumber: formatNumber,
  },
  methods: {
    show: function () {
      this.orderedNumbers = getSortedNumbers(this.numbersToOrder);
      this.showResponse = true;
      this.showFeedback = true;
    },
    feedback: function () {
      this.orderedNumbers = getSortedNumbers(this.numbersToOrder);
      this.showResponse = true;
      this.showFeedback = false;
      $("#listNumbers button")
        .addClass("btn-game-disabled")
        .removeClass("alert-warning")
        .attr("disabled", "disabled");
    },
    playAgain: function (howMany, min, max) {
      this.howMany = this.min = this.max = 0;
      this.howMany = +howMany;
      this.min = +min;
      this.max = +max;
      this.numbersToOrder = getNumbers(this.howMany, this.min, this.max);
      this.orderedNumbers = getSortedNumbers(this.numbersToOrder);
      this.showResponse = false;
      this.showFeedback = false;
      this.warmUp = false;
      this.replyNumbers = [];
      $("#listNumbers button")
        .removeClass("btn-game-disabled")
        .addClass("alert-warning")
        .removeAttr("disabled");
    },
    addNumber: function (event) {
      if (event.target.tagName === "BUTTON") {
        this.replyNumbers.push(+event.target.getAttribute("data-num-integer"));
        event.target.disabled = true;
        event.target.classList.remove("alert-warning");
        event.target.classList.add("btn-game-disabled");
      } else {
        this.replyNumbers.push(
          +event.target.parentNode.getAttribute("data-num-integer")
        );
        event.target.parentNode.disabled = true;
        event.target.parentNode.classList.remove("alert-warning");
        event.target.parentNode.classList.add("btn-game-disabled");
      }
      this.checkResponse();
    },
    checkResponse: function () {
      if (+this.howMany === +this.replyNumbers.length) {
        this.isRight = compare(this.numbersToOrder, this.replyNumbers);
        this.showResponse = true;
        this.showFeedback = true;
      }
    },
  },
});
