<script setup>
    import { inject, ref } from 'vue'
    import { sleep } from './helper.js'
    const sort = inject('sort')
    const handleFinish = inject('handleFinish')
    const isActive = ref(false)

    /**
     * Sorts the given numbers with the Mergesort algorithm.
     *
     * @param {number[]} numbers Numbers to sort.
     */
     const mergesort = async (numbers) => {
        sort.disableSortButtons = true
        sort.finished = false

        // add active class to button
        isActive.value = true

        if (numbers.length < 2) {
            return numbers
        }

        // split numbers in half
        const splitted = splitArray(numbers)

        const left = await mergesort(splitted[0])

        await sleep(20)

        const right = await mergesort(splitted[1])

        await sleep(20)

        return merge(left, right)
     }

    /**
     * Merges two arrays und sorts the content.
     *
     * @param {number[]} left Left Array to merge.
     * @param {number[]} right Right array to merge.
     * @returns {number[]} Returns a merged and sorted array.
     */
     const merge = async (left, right) => {
        let before = [...left, ...right]

        let merged = []
        while(left.length > 0 && right.length > 0) {
            if (left[0] <= right[0]) {
                // save first item
                merged.push(left[0])

                // remove first item
                left.shift()
            } else {
                // save first item
                merged.push(right[0])

                // remove first item
                right.shift()
            }
        }

        merged = [...merged, ...left, ...right]

        await visualize(before, merged)

        return merged
    }

    /**
     * Visualizes the changes in the chart.
     *
     * @param {number} before Index to change in the array.
     * @param {number} after Index to change in the array.
     */
    const visualize = async (before, after) => {

        // save the index
        const beforeStartIndex = sort.numbers.indexOf(before[0])

        for (let i = 0; i < after.length; i++) {

            // mark the left and right bar in the chart
            sort.leftIndex = before[i]
            sort.rightIndex = after[i]

            await sleep(20)

            // transfer the change to the chart
            sort.numbers[beforeStartIndex+i] = after[i]
        }

        // check if sort finished
        handleFinish()

        // remove active class if sort is finished
        isActive.value = !sort.finished
    }

    /**
     * Splits a given array in half.
     *
     * @param {number[]} arrayToSplit Array to split.
     * @returns {number[]} Returns a splitted array.
     */
    const splitArray = (arrayToSplit) => {
        const middleIndex = Math.floor(arrayToSplit.length / 2)

        let array = []
        array[0] = arrayToSplit.slice(0, middleIndex)
        array[1] = arrayToSplit.slice(middleIndex)

        return array
    }
</script>

<template>
    <button @click="mergesort(sort.numbers)" :class="{'active': isActive}" :disabled="sort.disableSortButtons">Mergesort</button>
</template>