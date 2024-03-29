function getNumbers(howMany, lowerLimit, upperLimit) {
    var numbersToOrder = [];
    //Get unique random numbers
    while (numbersToOrder.length < howMany) {
        var newNumber = _.random(lowerLimit, upperLimit);
        if (_.indexOf(numbersToOrder, newNumber) == -1) {
            numbersToOrder.push(newNumber);
        }
    }

    var isAlreadyInOrder = compare(numbersToOrder, numbersToOrder);

    //Check that they are not already in the correct order
    while (isAlreadyInOrder) {
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

function formatNumber(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '\'' + '$2');
    }
    return x1 + x2;
}

//Vue
// This complex tweening logic can now be reused between
// any integers we may wish to animate in our application.
// Components also offer a clean interface for configuring
// more dynamic transitions and complex transition
// strategies.
Vue.component('animated-integer', {
    template: '<span class="animatedInteger">{{ tweeningValue | formatNumber }}</span>',
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
    filters: {
        formatNumber: formatNumber
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
        <div v-if="errors.length">
            <div class="text-danger lead" v-for="e in errors">{{ e }}</div>
        </div>
        <p class="lead ">
            Next time I want to play with
            <input type="number" v-model.number="numbers" class="howManyInput" autocomplete="off" v-bind:style="inputWidth(numbers)" required> numbers between <input type="number" v-model.number="min" class="howManyInput" autocomplete="off" v-bind:style="inputWidth(min)" required> and <input type="number" v-model.number="max" v-bind:style="inputWidth(max)" class="howManyInput" autocomplete="off" required><br>
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
            console.log(this.numbers, this.min, this.max);
            if (!this.validation().length) {
                this.$emit('play', this.numbers, this.min, this.max);
            }
        },
        inputWidth: function (n) {
            return {
                width: 40 + (n.toString().length * 15) + 'px',
            };
        },
        validation: function () {
            this.errors = [];
            if (this.min === this.max) {
                this.errors.push('Provide different values for the minimum and maximum limits of the digits');
            }

            if (this.numbers < 3) {
                this.errors.push('You need to play at least with 3 numbers to have different sorting!');
            }

            if (this.max < this.min) {
                var max = this.min;
                var min = this.max;
                this.max = max;
                this.min = min;
            }

            if (this.min + this.numbers - 1 > this.max) {
                this.errors.push('Sorry, I can\'t generate  ' + this.numbers + ' unique numbers between ' + this.min + ' and ' + this.max + '!');
            }
            return this.errors;
        }
    }
});