
<script setup>
    import { provide, reactive } from 'vue'
    import Quicksort from './components/Quicksort.vue'
    import Bubblesort from './components/Bubblesort.vue'
    import Mergesort from './components/Mergesort.vue'

    const NUMBER_OF_BARS = 100

    // init numbers
    const sort = reactive({
        numbers: Array.from(Array(NUMBER_OF_BARS+1).keys()).slice(1),
        pivotIndex: -1,
        leftIndex: -1,
        rightIndex: -1,
        disableSortButtons: true,
        finished: true
    })
    provide('sort', sort)

    /**
     * Shuffles the numbers in the array
     */
    const shuffleNumbers = () => {
        // random numbers
        sort.numbers.sort(() => Math.random() - 0.5)

        // enable sort buttons
        sort.disableSortButtons = false
    }

    /**
     * Checks if sort algorithm is finished
     * 
     * @returns {boolean} Returns true if sort is finished or false if not
     */
    const sortFinished = () => {
        // compare current numbers
        for (let i = 1; i <= NUMBER_OF_BARS; i++) {
            if (sort.numbers[i-1] != i) {

                return false
            }
        }

        return true
    }

    /**
     * Resets the frontend elements
     */
     const handleFinish = () => {
        if (sortFinished()) {
            // reset index
            sort.pivotIndex = -1
            sort.leftIndex = -1
            sort.rightIndex = -1

            sort.finished = true
        }
    }
    provide('handleFinish', handleFinish)
</script>

<template>
  <header>
    <button @click="shuffleNumbers()" :disabled="!sort.finished">Random</button>
    <div class="divider"></div>
    <Quicksort />
    <Bubblesort />
    <Mergesort />
  </header>
  <main>
    <div class="bars">
      <template v-for="(value, key) in sort.numbers">
          <div v-if="key == sort.pivotIndex" class="bar" :style="{height: value + '%', background: '#4285f4'}"></div>
          <div v-else-if="key == sort.leftIndex" class="bar" :style="{height: value + '%', background: '#ee675c'}"></div>
          <div v-else-if="key == sort.rightIndex" class="bar" :style="{height: value + '%', background: '#5bb974'}"></div>
          <div v-else class="bar" :style="{height: value + '%'}"></div>
      </template>
    </div>
  </main>
</template>

<style scoped>
    header {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80px;
        background-color: #fff;
        border-bottom: 1px solid #ddd;
    }

    button {
        background-color: #fff;
        border: none;
        border-radius: 24px;
        padding: 10px 20px;
        cursor: pointer;
        margin-inline: 30px;
        font-weight: 700;
    }

    button:hover, button:active, button.active {
        background-color: #eee;
    }

    button:disabled {
        pointer-events: none;
    }

    .divider {
        height: 50%;
        width: 1px;
        background-color: #ddd;
        margin-inline: 30px;
    }

    .bars {
        display: flex;
        height: 300px;
        max-height: 80%;
        justify-content: center;
    }

    .bar {
        width: 10px;
        background-color: #fdd663;
        border-right: 1px solid #fff;
        transition: all 100ms;
    }
</style>
