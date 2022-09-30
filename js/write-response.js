var appShowResponse = new Vue({
  el: "#app",
  data: {
    warmUp: true,
    showResponse: false,
    showFeedback: false,
    howMany: 5,
    min: 1,
    max: 5,
    orderedNumbers: [],
    animatedNumbers: [],
    yourAnswer: "",
    userOrder: [],
    isRight: false,
  },
  computed: {
    numbersToOrder: function () {
      return getNumbers(this.howMany, this.min, this.max);
    },
  },
  watch: {
    yourAnswer: function () {
      this.yourAnswer = this.yourAnswer
        .replace(/\s+/g, " ")
        .replaceAll("'", "")
        .replace(/[^0-9\-\s\']/g, "");
      if (this.yourAnswer.trim() !== "") {
        this.userOrder = this.yourAnswer
          .trim()
          .split(" ")
          .map(function (n) {
            if (n.indexOf("'") < 0) {
              return +n;
            }
            if (n === formatNumber(n)) {
              return Number(n.replace(/\D-/g, ""));
            } else {
              return n;
            }
          });
      } else {
        this.userOrder = [];
      }
    },
  },
  methods: {
    show: function () {
      this.orderedNumbers = getSortedNumbers(this.numbersToOrder);
      this.isRight = compare(this.numbersToOrder, this.userOrder);
      this.showResponse = true;
      this.showFeedback = true;
      this.warmUp = false;
    },
    feedback: function () {
      this.orderedNumbers = getSortedNumbers(this.numbersToOrder);
      this.showResponse = true;
      this.showFeedback = false;
      this.warmUp = false;
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
      this.errors = [];
      this.yourAnswer = "";
      document.getElementById("inputAnswer").focus();
    },
    itemClass: function (n) {
      var inArray = _.indexOf(this.userOrder, n) >= 0;
      return {
        "alert-warning": !inArray,
        "btn-game-disabled": inArray,
      };
    },
  },
});
