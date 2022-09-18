var app = new Vue({
  el: "#app",
  data: {
    warmUp: true,
    showResponse: false,
    howMany: 5,
    min: 1,
    max: 5,
    orderedNumbers: [],
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
  methods: {
    show: function () {
      this.orderedNumbers = getSortedNumbers(this.numbersToOrder);
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
      this.warmUp = false;
    },
    checkResponseDragAndDrop: function () {
      var replyNumbers = [];
      $("#listNumbers li").each(function () {
        replyNumbers.push(+$(this).text().replace(/\D-/g, ""));
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
    },
  },
});

$("#listNumbers").sortable({
  cursor: "move",
  placeholder: "ui-state-highlight",
  axis: "x",
  containment: "parent",
  forcePlaceholderSize: true,
  update: function () {
    app.checkResponseDragAndDrop();
  },
});
$("#listNumbers").disableSelection();
