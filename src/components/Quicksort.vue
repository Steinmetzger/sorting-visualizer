<script setup>
    import { inject, ref } from 'vue'
    import { sleep, swapItem } from './helper.js'
    const sort = inject('sort')
    const handleFinish = inject('handleFinish')
    const isActive = ref(false)

    /**
     * Sorts the given numbers with the Quicksort algorithm.
     *
     * @param {number[]} numbers Numbers to sort.
     * @param {number} leftIndex Index of the left index.
     * @param {number} pivotIndex Index of the pivot index.
     */
     const quicksort = async (numbers, leftIndex, pivotIndex) => {
        sort.disableSortButtons = true
        sort.finished = false

        // add active class to button
        isActive.value = true

        if (leftIndex < pivotIndex) {
            // get pointer
            let leftPointer = leftIndex
            let rightPointer = pivotIndex - 1

            // get pivot item
            const pivot = numbers[pivotIndex]

            // mark the pivot element in the chart
            sort.pivotIndex = pivotIndex

            while (leftPointer < rightPointer) {
                // search from the left for an element that is larger than the pivot element
                while( leftPointer < rightPointer && numbers[leftPointer] < pivot) {
                    leftPointer++
                }

                // search from the right for an element that is smaller than the pivot element
                while (rightPointer > leftPointer && numbers[rightPointer] > pivot) {
                    rightPointer--
                }

                // swap numbers if the left is larger then the right
                if (numbers[leftPointer] > numbers[rightPointer]) {
                    // visualizes the changes in the chart
                    await visualize (numbers, leftPointer, rightPointer)
                }
            }

            // swap numbers if the left is larger then the pivot element
            if (numbers[leftPointer] > pivot) {
                // visualizes the changes in the chart
                await visualize (numbers, leftPointer, pivotIndex)
            } else {
                leftPointer = pivotIndex
            }

            await quicksort(numbers, leftIndex, leftPointer - 1)
            await quicksort(numbers, leftPointer + 1, pivotIndex)
        }

        // check if sort finished
        handleFinish()

        // remove active class if sort is finished
        isActive.value = !sort.finished
    }

    /**
     * Visualizes the changes in the chart.
     *
     * @param {number[]} numbers Numbers to show.
     * @param {number} before Index to change in the array.
     * @param {number} after Index to change in the array.
     */
    const visualize = async (numbers, before, after) => {
        // mark the left and right bar in the chart
        sort.leftIndex = before
        sort.rightIndex = after

        // transfer the changes to the chart
        sort.numbers = swapItem(numbers, before, after)

        await sleep(100)
    }
</script>

<template>
    <button @click="quicksort(sort.numbers, 0, sort.numbers.length - 1)" :class="{'active': isActive}" :disabled="sort.disableSortButtons">Quicksort</button>
</template>