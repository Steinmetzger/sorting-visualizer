<script setup>
    import { inject, ref } from 'vue'
    import { sleep, swapItem } from './helper.js'
    const sort = inject('sort')
    const handleFinish = inject('handleFinish')
    const isActive = ref(false)

    /**
     * Sorts the given numbers with the Bubblesort algorithm.
     *
     * @param {number[]} numbers Numbers to sort.
     */
     const bubblesort = async (numbers) => {
        sort.disableSortButtons = true
        sort.finished = false

        // add active class to button
        isActive.value = true

        for (let n = numbers.length; n > 1; n--) {
            for (let i = 0; i < n - 1; i++) {
                if (numbers[i] > numbers[i+1]) {
                    // visualizes the changes in the chart
                    await visualize(i, i + 1)
                }
            }
        }

        // check if sort finished
        handleFinish()

        // remove active class if sort is finished
        isActive.value = !sort.finished
    }

    /**
     * Visualizes the changes in the chart.
     *
     * @param {number} before Index to change in the array.
     * @param {number} after Index to change in the array.
     */
    const visualize = async (before, after) => {
        // mark the left and right bar in the chart
        sort.leftIndex = before
        sort.rightIndex = after

        // transfer the change to the chart
        sort.numbers = swapItem(sort.numbers, before, after)

        await sleep(5)
    }
</script>

<template>
    <button @click="bubblesort(sort.numbers)" :class="{'active': isActive}" :disabled="sort.disableSortButtons">Bubblesort</button>
</template>