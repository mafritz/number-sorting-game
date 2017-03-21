function getNumbers(howMany, lowerLimit, upperLimit) {
    var numbersToOrder = [];
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
        };
    },
    watch: {
        value: function (newValue, oldValue) {
            this.tween(oldValue, newValue);
        }
    },
    mounted: function () {
        this.tween(0, this.value);
    },
    methods: {
        tween: function (startValue, endValue) {
            var vm = this;
            var animationFrame;

            function animate(time) {
                TWEEN.update(time);
                animationFrame = requestAnimationFrame(animate);
            }
            new TWEEN.Tween({
                    tweeningValue: startValue
                })
                .to({
                    tweeningValue: endValue
                }, 500)
                .onUpdate(function () {
                    vm.tweeningValue = this.tweeningValue.toFixed(0);
                })
                .onComplete(function () {
                    cancelAnimationFrame(animationFrame);
                })
                .start();
            animationFrame = requestAnimationFrame(animate);
        }
    }
});

Vue.component('play-again', {
    template: `
    <form v-on:submit.prevent="play">
        <div class="alert alert-danger" v-if="errors.length">
            <p>Please correct the following problems:</p>
            <ul>
                <li v-for="e in errors">{{ e }}</li>
            </ul>
        </div>
        <p class="lead ">
            Next time I want to play with
            <input type="number" v-model="numbers" class="howManyInput" required> numbers between <input type="number" v-model="min" class="howManyInput" required> and <input type="number" v-model="max" class="howManyInput"  required><br>
            <button type="submit" class="btn btn-lg btn-primary ">Play again</button>
        </p>
    </form>
    `,
    props: {
        numbers: {
            type: Number,
            required: true
        },
        min: {
            type: Number,
            required: true
        },
        max: {
            type: Number,
            required: true
        }
    },
    data: function () {
        return {
            errors: []
        };
    },
    methods: {
        play: function () {
            if (!this.validation().length) {
                this.$emit('play', this.numbers, this.min, this.max);
            }
        },
        validation: function () {
            this.errors = [];
            if (this.min === this.max) {
                this.errors.push('Provide different values for the minimum and maximum limits of the digits');
            }

            if (this.max < this.min) {
                var max = this.min;
                var min = this.max;
                this.max = max;
                this.min = min;
            }

            if (this.min + this.numbers - 1 > this.max) {
                this.errors.push('The gap between the minimum and maximum limits is not enough to generate ' + this.numbers + ' different numbers');
            }
            return this.errors;
        }
    }
});