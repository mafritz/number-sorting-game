function getNumbers(howMany, lowerLimit, upperLimit) {
    var numbersToOrder = [];
    if (howMany < 2) {
        console.log('You need at least 2 numbers to play the game.');
    }
    //Get unique random numbers
    while (numbersToOrder.length < howMany) {
        var newNumber = _.random(lowerLimit, upperLimit);
        if (_.indexOf(numbersToOrder, newNumber) == -1) {
            numbersToOrder.push(newNumber);
        }
    }

    console.log(numbersToOrder.slice(0));
    //Check that they are not already in the correct order
    while (compare(numbersToOrder, numbersToOrder)) {
        numbersToOrder = _.shuffle(numbersToOrder);
        console.log(numbersToOrder);
    }
    return numbersToOrder;
}

function getSortedNumbers(numbersToOrder) {
    var sortedNumbers = numbersToOrder.slice(0);
    return sortedNumbers.sort(function (a, b) {
        return +a - +b;
    });
}

function compare(numbersToOrder, userOrder) {
    return getNumbersAsString(getSortedNumbers(numbersToOrder)) === getNumbersAsString(userOrder);
}

function getNumbersAsString(numbersToShow) {
    return numbersToShow.join(", ");
}

//Vue
// This complex tweening logic can now be reused between
// any integers we may wish to animate in our application.
// Components also offer a clean interface for configuring
// more dynamic transitions and complex transition
// strategies.
Vue.component('animated-integer', {
    template: '<span>{{ tweeningValue }}</h2></span>',
    props: {
        value: {
            type: Number,
            required: true
        }
    },
    data: function () {
        return {
            tweeningValue: 0
        }
    },
    watch: {
        value: function (newValue, oldValue) {
            this.tween(oldValue, newValue)
        }
    },
    mounted: function () {
        this.tween(0, this.value)
    },
    methods: {
        tween: function (startValue, endValue) {
            var vm = this;
            var animationFrame;

            function animate(time) {
                TWEEN.update(time);
                animationFrame = requestAnimationFrame(animate)
            }
            new TWEEN.Tween({
                    tweeningValue: startValue
                })
                .to({
                    tweeningValue: endValue
                }, 500)
                .onUpdate(function () {
                    vm.tweeningValue = this.tweeningValue.toFixed(0)
                })
                .onComplete(function () {
                    cancelAnimationFrame(animationFrame)
                })
                .start()
            animationFrame = requestAnimationFrame(animate)
        }
    }
});